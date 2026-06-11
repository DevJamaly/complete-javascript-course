'use strict';
//===================CHALLENGE 1====================
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = parseInt(speed, 10) || 0;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  this.printSpeed('accelerated');
};

Car.prototype.brake = function () {
  this.speed = Math.max(0, this.speed - 5);
  this.printSpeed('braked');
};

Car.prototype.printSpeed = function (actionStr) {
  const subject = actionStr
    ? `${this.make} ${actionStr} and its`
    : `${this.make}'s`;
  console.log(`The ${subject} speed is: ${this.speed} km/h`);
};

const bmw = new Car('BMW', '120km/h');
const mercedes = new Car('Mercedes', '95km/h');
console.log(bmw);
console.log(mercedes);

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

bmw.printSpeed();
for (let i = 0; i < randomNum(3, 8); i++) {
  Math.random() > 0.5 ? bmw.accelerate() : bmw.brake();
}

mercedes.printSpeed();
for (let i = 0; i < randomNum(3, 8); i++) {
  Math.random() > 0.5 ? mercedes.accelerate() : mercedes.brake();
}
