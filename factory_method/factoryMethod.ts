/**
 * Factory method
 *
 * defines an interface for creating an object,
 * but lets sublasses decide which class to instantiate.
 *
 * Lets a class defer instantiation to subclasses
 *
 *
 */

enum Color {
  Blue = "blue",
  Green = "green",
  Red = "red",
  Silver = "silver",
  Yellow = "yellow",
}

// Car manufacturer classes and subclasses
class CarManufacturer {
  constructor() {}

  sellCar(color: Color) {
    console.log("A new car was sold!");
    console.log("Creating a brand new car...");
    const newCar = this.createCar(color);
    console.log("Car created!");
    return newCar;
  }

  // this method is overrided in every subclass
  createCar(color: Color): Car {
    throw Error("Create subclass first and override this method!");
  }
}

class SkodaManufacturer {
  createCar(color: Color): Car {
    return new SkodaCar(color);
  }
}
class BMWManufacturer {
  createCar(color: Color): Car {
    return new BMWCar(color);
  }
}
class FordManufacturer {
  createCar(color: Color): Car {
    return new FordCar(color);
  }
}
class HondaManufacturer {
  createCar(color: Color): Car {
    return new HondaCar(color);
  }
}

// Car class and subclasses

class Car {
  color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  description(): string {
    return "A generic car.";
  }
}

class SkodaCar extends Car {
  description(): string {
    return `A ${this.color} Czech car`;
  }
}

class BMWCar extends Car {
  description(): string {
    return `A ${this.color} German car`;
  }
}

class FordCar extends Car {
  description(): string {
    return `A ${this.color} American car`;
  }
}

class HondaCar extends Car {
  description(): string {
    return `A ${this.color} Japanese car`;
  }
}

// Example

const skoda = new SkodaManufacturer();
const honda = new HondaManufacturer();

const car1 = skoda.createCar(Color.Silver);
const car2 = honda.createCar(Color.Blue);

console.log(car1.description());
console.log(car2.description());
