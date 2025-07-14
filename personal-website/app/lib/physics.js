// lib/physics.js
import Matter from 'matter-js';

let engine = null;
let world = null;
let runner = null;
let mouse, mouseConstraint;
const bodies = new Map();

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

const initialPositions = new Map();

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

            el.style.transform = `
  translate(${translateX}px, ${translateY}px)
  rotate(${body.angle}rad)
`;
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
