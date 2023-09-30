
/**
 * THE STRATEGY PATTERN
 * 
 * defines a family(group) of algorithms(Fly behavior 
 * interface, Quacking behavior interface), 
 * encapsulates each one (creates classes for each type of 
 * flying, quacking, ...) and makes them interchangeable.
 * 
 * algorithms can vary based on the clients
 * 
 * 
 * Design principles:
 * Encapsulate what varies
 * Composition over inheritance
 * Program to interfaces, not implementations
 */ 


interface FlyBehavior {
    fly: () => void
}

class Fly implements FlyBehavior {
    constructor() {}

    fly() {
        console.log("Flapping wings in the air")
    }
}

class CantFly implements FlyBehavior {
    constructor() {}

    fly() {
        console.log("No air time unfortunately")
    }
}

interface QuackBehavior {
    quack: () => void
}

class Quack implements QuackBehavior {
    quack() {
        console.log("QUACK!")
    }
}

class Squeak implements QuackBehavior {

    quack() {
        console.log("SQUEAK!")
    }
}

class Duck {

    // HAS-A relationship with the Duck
    flyBehavior: FlyBehavior
    quackBehavior: QuackBehavior

    constructor() {
        this.flyBehavior = new Fly()
        this.quackBehavior = new Quack()
    }

    // Duck related actions
    display() {
        console.log("A standard duck")
    }

    swim() {
        console.log("Exceptional buoyancy!")
    }

    performQuack() {
        this.quackBehavior.quack()
    }  

    performFly() {
        this.flyBehavior.fly()
    }

    // methods for changing behaviors dynamically
    setQuackBehavior(behavior: QuackBehavior) {
        this.quackBehavior = behavior
    }

    setFlyBehavior(behavior: FlyBehavior) {
        this.flyBehavior = behavior
    }
}


class RubberDuck extends Duck {
    constructor() {
        super()
        this.flyBehavior = new CantFly()
        this.quackBehavior = new Squeak()
    }

    display() {
        console.log("A yellow duck manufactured in mainland China")
    }
}


const duck1 = new Duck()
const duck2 = new RubberDuck()

duck1.performQuack()
duck2.performQuack()