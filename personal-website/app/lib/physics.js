// lib/physics.js
import Matter from 'matter-js';

let engine = null;
let world = null;
let runner = null;
let mouse, mouseConstraint;
const bodies = new Map();
const initialPositions = new Map();
const wireVisuals = new Map();

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

export function addPhysicalWire(startBody, startOffset = { x: 0, y: 0 }, segmentCount = 15) {
    const segmentLength = 15;
    const segmentWidth = 8;
    const segments = [];
    const visuals = [];

    let previousBody = null;

    for (let i = 0; i < segmentCount; i++) {
        const segment = Matter.Bodies.rectangle(
            startBody.position.x + startOffset.x,
            startBody.position.y + startOffset.y + i * segmentLength,
            segmentWidth,
            segmentLength,
            {
                collisionFilter: { group: -1 }, // Prevent segments from colliding with each other
                frictionAir: 0.02,
            }
        );

        Matter.World.add(world, segment);
        segments.push(segment);

        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.width = `${segmentWidth}px`;
        el.style.height = `${segmentLength}px`;
        el.style.background = '#666';
        el.style.borderRadius = '2px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '1';
        el.style.transformOrigin = 'center';
        el.style.transform = `
  translate(${segment.position.x - segmentWidth / 2}px, ${segment.position.y - segmentLength / 2}px)
  rotate(${segment.angle}rad)
`;
        document.getElementById("container").appendChild(el);
        visuals.push({ body: segment, el });

        if (previousBody) {
            const constraint = Matter.Constraint.create({
                bodyA: previousBody,
                bodyB: segment,
                length: segmentLength,
                stiffness: 0.8,
            });
            Matter.World.add(world, constraint);
        }

        previousBody = segment;
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

    wireVisuals.set(startBody, visuals);
}

export function addCapsule(el, { x = 100, y = 100 } = {}) {
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
            restitution: 0.5,
            friction: 0.3,
            frictionAir: 0.01,
        }
    );

    Matter.World.add(world, body);
    bodies.set(el, body);

    addPhysicalWire(body, { x: 50, y: 0 });

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
       wireVisuals.forEach((segments) => {
  for (let i = 0; i < segments.length - 1; i++) {
    const { body: currBody, el: currEl } = segments[i];
    const { body: nextBody } = segments[i + 1];

    const p0 = currBody.position;
    const p1 = nextBody.position;

    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Position at midpoint
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;

    // Set the style to connect p0 and p1
    currEl.style.width = `${length}px`;
    currEl.style.height = `8px`; // fixed thickness for wire segment
    currEl.style.transformOrigin = 'center center';

    currEl.style.transform = `
      translate(${midX}px, ${midY}px)
      rotate(${angle}rad)
      translate(-50%, -50%)
    `;
  }

  // Last segment: you can either hide it or position it normally:
  if (segments.length > 0) {
    const last = segments[segments.length - 1];
    last.el.style.width = `8px`;
    last.el.style.height = `8px`;
    last.el.style.transform = `
      translate(${last.body.position.x}px, ${last.body.position.y}px)
      translate(-50%, -50%)
    `;
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