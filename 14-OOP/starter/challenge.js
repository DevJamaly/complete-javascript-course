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

/* const Car = function (make, speed) {
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
} */

//===================CHALLENGE 2====================
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = parseInt(speed, 10) || 0;
  }

  accelerate = function () {
    this.speed += 10;
    this.printSpeed('accelerated');
  };

  brake = function () {
    this.speed = Math.max(0, this.speed - 5);
    this.printSpeed('braked');
  };

  printSpeed = function (actionStr) {
    const subject = actionStr
      ? `${this.make} ${actionStr} and its`
      : `${this.make}'s`;
    const speedVal =
      Math.random() > 0.5 ? `${this.speed} km/h` : `${this.speedUS} mi/h`;
    console.log(`The ${subject} speed is: ${speedVal}`);
  };

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const runCarTest = function (car) {
  car.printSpeed();
  for (let i = 0; i < randomNum(3, 8); i++) {
    Math.random() > 0.5 ? car.accelerate() : car.brake();
  }
};

const bmw = new Car('BMW', '120km/h');
const mercedes = new Car('Mercedes', '95km/h');
const ford = new Car('Ford', '120km/h');

console.log(bmw, mercedes, ford);
runCarTest(bmw);
runCarTest(mercedes);
runCarTest(ford);
