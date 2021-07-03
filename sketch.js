const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Con = Matter.Constraint;
const Body = Matter.Body;

let engine;
let world;
var ball;
var ball2;
var ground;
var con;
var con2;



function setup() {
	createCanvas(400,400);
	rectMode(CENTER);
	ellipseMode(RADIUS);

	engine = Engine.create();
	world = engine.world;

	var ballOptions = {
		restitution: 0.8
	}

	ball = Bodies.circle(200, 50, 10, ballOptions);
	World.add(world, ball);

	ball2 = Bodies.circle(350, 10, 12, ballOptions);
	World.add(world, ball2);

	console.log(ball);
	console.log(ball2);

	// Point b is the second connecting point of the constraint and this could be a point on a body

	con = Con.create({
		pointA: {x: 200, y: 20},
		bodyB: ball,
		//pointB: {x: 0, y: 0},
		length: 100,
		stifness: 0.1
	});

	World.add(world, con);

	con2 = Con.create({
		pointA: {x: 150, y: 0},
		bodyB: ball2,
		//pointB: {x: 0, y: 0}
		length: 100,
		stifness: 0.1
	});

	World.add(world, con2);
}

function draw() {
	background(200, 225, 255);
	Engine.update(engine);

	// Ball
	ellipse(ball.position.x, ball.position.y, 10, 10);

	// Ball 2
	ellipse(ball2.position.x, ball2.position.y, 12, 12);

	// Con
	push();
	stroke(255, 255, 255);
	strokeWeight(2);
	line(con.pointA.x, con.pointA.y, ball.position.x, ball.position.y);
	line(con2.pointA.x, con2.pointA.y, ball2.position.x, ball2.position.y);
	pop();

}

function keyPressed() {
	if(keyCode === 39) {
		Body.applyForce(ball, {x: 0, y: 0}, {x: 0.05, y: 0})
	}
}

