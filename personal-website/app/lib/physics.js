// lib/physics.js
import Matter from 'matter-js';

let engine = null;
let world = null;
let runner = null;
let mouse, mouseConstraint;
const bodies = new Map();
const initialPositions = new Map();
const wireVisuals = new Map();
const ports = [];

const SNAP_DISTANCE = 20;      // distance to snap
const DETACH_DISTANCE = 35;    // distance required to pull away

let onPluggedCallback = null;
let plugStack = []; // LIFO stack for currently snapped plugs

export function setOnPluggedCallback(cb) {
  onPluggedCallback = cb;
}

function updateActiveContent() {
  // Top of stack or null
  const topPlug = plugStack.length > 0 ? plugStack[plugStack.length - 1] : null;
  if (onPluggedCallback) onPluggedCallback(topPlug);
}

export function initPhysics() {
    if (engine) return;

    engine = Matter.Engine.create();
    world = engine.world;
    world.gravity.y = 1.2;

    mouse = Matter.Mouse.create(document.body);
    mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false },
            angularStiffness: 0.4, // how much rotation resistance to drag
        },
    });


    Matter.World.add(world, mouseConstraint);

    Matter.Events.on(mouseConstraint, 'startdrag', (event) => {
        console.log('Drag started', event.body);
    });

    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
        console.log('Drag ended', event.body);
    });

    runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
}

export function addPhysicalWire(startBody, startOffset = { x: 0, y: 0 }, segmentCount = 20, content) {
    const segmentLength = 20;
    const segmentWidth = 12;
    const segments = [];
    const visuals = [];

    let previousBody = null;

    for (let i = 0; i < segmentCount; i++) {
        const segment = Matter.Bodies.circle(
            startBody.position.x + startOffset.x,
            startBody.position.y + startOffset.y + i * segmentLength,
            i == segmentCount - 1 ? segmentWidth * 2 : segmentWidth,
            {
                collisionFilter: { group: -1 },
                frictionAir: 0.02,
            }
        );

        Matter.World.add(world, segment);
        segments.push(segment);

        if (previousBody) {
            const constraint = Matter.Constraint.create({
                bodyA: previousBody,
                bodyB: segment,
                length: segmentLength,
                stiffness: 0.5,
            });
            Matter.World.add(world, constraint);
        }

        previousBody = segment;
    }

    // Visuals (n - 1)
    for (let i = 0; i < segments.length - 1; i++) {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.background = '#666';
        el.style.borderRadius = '2px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '1';
        el.style.transformOrigin = 'center';
        document.getElementById("container").appendChild(el);

        visuals.push({ bodyA: segments[i], bodyB: segments[i + 1], el });
    }

    // Attach first segment to capsule
    const attach = Matter.Constraint.create({
        bodyA: startBody,
        pointA: startOffset,
        bodyB: segments[0],
        pointB: { x: 0, y: -segmentLength / 2 },
        stiffness: 1,
    });

    Matter.World.add(world, attach);

    const plugEl = document.createElement('div');
    plugEl.style.position = 'absolute';
    plugEl.style.width = '40px';
    plugEl.style.height = '40px';
    plugEl.style.pointerEvents = 'none';
    plugEl.style.zIndex = '3';
    plugEl.style.transformOrigin = 'center';

    // === Main trapezoid body ===
    // Wide side is at the *bottom* where prongs attach
    const bodyEl = document.createElement('div');
    bodyEl.style.position = 'absolute';
    bodyEl.style.top = '0';
    bodyEl.style.left = '50%';
    bodyEl.style.transform = 'translateX(-50%)';
    bodyEl.style.width = '36px';
    bodyEl.style.height = '24px';
    bodyEl.style.background = '#777';
    bodyEl.style.border = '2px solid #333';
    bodyEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
    // Flipped trapezoid: narrow top (wire side), wide bottom (socket side)
    bodyEl.style.clipPath = 'polygon(80% 0%, 20% 0%, 0 100%, 100% 100%)';
    bodyEl.style.zIndex = '10'
    plugEl.appendChild(bodyEl);

    // === Two prongs attached to wide *bottom* edge ===
    for (let i = 0; i < 2; i++) {
        const prong = document.createElement('div');
        prong.style.position = 'absolute';
        // Place below the trapezoid bottom edge
        prong.style.bottom = '10px'; // extend below the wide side
        prong.style.left = i === 0 ? '12px' : '22px';
        prong.style.width = '4px';
        prong.style.height = '10px';
        prong.style.background = '#ccc';
        prong.style.border = '1px solid #555';
        prong.style.boxShadow = '0 0 2px rgba(0,0,0,0.3)';
        prong.style.zIndex = '0';
        plugEl.appendChild(prong);
    }

    document.getElementById('container').appendChild(plugEl);

    console.log(content)

    // Store visual segments + plug
    wireVisuals.set(startBody, {
        segments: visuals,
        plug: { body: segments[segments.length - 1], el: plugEl, snapped: false, content: content },
    });
}

export function registerPorts() {
    const portEls = document.querySelectorAll('.trapezoid-port'); // any class you use
    portEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;

        // Create static physics body matching port location
        const portBody = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
            isStatic: true,
            label: 'port',
        });
        Matter.World.add(world, portBody);

        ports.push({ body: portBody, el }); // store ref for snapping
    });
}

export function addCapsule(el, { x = 100, y = 100 } = {}, content) {
    if (!engine || !el) return;

    const width = el.offsetWidth;
    const height = el.offsetHeight;

    // Save initial position to use as offset
    initialPositions.set(el, { x, y });

    const body = Matter.Bodies.rectangle(
        x + width / 2,
        y + height / 2,
        width,
        height,
        {
            restitution: 0.3,
            friction: 0.3,
            frictionStatic: 2,
            frictionAir: 0.01,
        }
    );

    Matter.World.add(world, body);
    bodies.set(el, body);

    addPhysicalWire(body, { x: width / 2 - 5, y: height / 2 - 10 }, 20,content);

    // Make sure the element's initial CSS position matches x, y
    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.willChange = 'transform';
}

export function addScreen(el) {
    requestAnimationFrame(() => {
        if (el) {
            const rect = el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const x = rect.left + width / 2;
            const y = rect.top + height / 2;

            const screenBody = Matter.Bodies.rectangle(x, y, width, height, {
                isStatic: true,
                label: 'screen',
            });

            Matter.World.add(world, screenBody);
        }
    });
}

export function tick() {
    requestAnimationFrame(() => {
        Matter.Engine.update(engine, 1000 / 60);

        bodies.forEach((body, el) => {
            const initPos = initialPositions.get(el) || { x: 0, y: 0 };
            // Translate relative to initial CSS position
            const translateX = body.position.x - (initPos.x + el.offsetWidth / 2);
            const translateY = body.position.y - (initPos.y + el.offsetHeight / 2);

            el.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${body.angle}rad)`;
        });
        wireVisuals.forEach(({ segments, plug }) => {
            segments.forEach(({ bodyA, bodyB, el }) => {
                const p0 = bodyA.position;
                const p1 = bodyB.position;

                const dx = p1.x - p0.x;
                const dy = p1.y - p0.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                const midX = (p0.x + p1.x) / 2;
                const midY = (p0.y + p1.y) / 2;

                el.style.width = `${length}px`;
                el.style.height = `8px`;
                el.style.transformOrigin = 'center center';
                el.style.transform = `
      translate(${midX}px, ${midY}px)
      rotate(${angle}rad)
      translate(-50%, -50%)
    `;
            });
            if (plug) {
                const { body, el } = plug;
                el.style.transform = `
      translate(${body.position.x + el.offsetWidth / 2}px, ${body.position.y}px)
      translate(-50%, -50%) rotate(${body.angle}rad)
    `;
                const x = body.position.x;
                const y = body.position.y;
                if (!plug.snapped) {
                    // Not snapped yet → check for proximity
                    for (let { body: portBody } of ports) {
                        const dx = portBody.position.x - x;
                        const dy = portBody.position.y - y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < SNAP_DISTANCE) {
                            // Snap exactly onto port
                            Matter.Body.setPosition(body, {
                                x: portBody.position.x,
                                y: portBody.position.y,
                            });
                            Matter.Body.setVelocity(body, { x: 0, y: 0 });
                            Matter.Body.setAngularVelocity(body, 0);

                            // Disable collisions with the port
                            body.collisionFilter.mask = 0;

                            plugStack.push(plug);
                            updateActiveContent();

                            plug.snapped = true;
                            plug.snapTarget = portBody;
                            break;
                        }
                    }
                } else {
                    // Already snapped → check if pulled away
                    const portBody = plug.snapTarget;
                    const dx = x - portBody.position.x;
                    const dy = y - portBody.position.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > DETACH_DISTANCE) {
                        // ✅ Detach plug → restore normal collision
                        body.collisionFilter.mask = 0xFFFFFFFF; // restore default mask
                        plug.snapped = false;
                        plug.snapTarget = null;
                        plugStack = plugStack.filter((p) => p !== plug);
                        updateActiveContent();
                    } else {
                        // Keep plug locked on the port position
                        Matter.Body.setPosition(body, {
                            x: portBody.position.x,
                            y: portBody.position.y,
                        });
                        Matter.Body.setVelocity(body, { x: 0, y: 0 });
                        Matter.Body.setAngularVelocity(body, 0);
                    }
                }

            }
        });

        tick();
    });
}

export function addWalls() {
    const thickness = 100; // Make thick enough to prevent tunneling
    const width = window.innerWidth;
    const height = window.innerHeight;

    const walls = [
        // Top
        Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
        // Bottom
        Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
        // Left
        Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
        // Right
        Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
    ];

    Matter.World.add(world, walls);
}