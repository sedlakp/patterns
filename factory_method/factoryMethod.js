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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Color;
(function (Color) {
    Color["Blue"] = "blue";
    Color["Green"] = "green";
    Color["Red"] = "red";
    Color["Silver"] = "silver";
    Color["Yellow"] = "yellow";
})(Color || (Color = {}));
// Car manufacturer classes and subclasses
var CarManufacturer = /** @class */ (function () {
    function CarManufacturer() {
    }
    CarManufacturer.prototype.sellCar = function (color) {
        console.log("A new car was sold!");
        console.log("Creating a brand new car...");
        var newCar = this.createCar(color);
        console.log("Car created!");
        return newCar;
    };
    // this method is overrided in every subclass
    CarManufacturer.prototype.createCar = function (color) {
        throw Error("Create subclass first and override this method!");
    };
    return CarManufacturer;
}());
var SkodaManufacturer = /** @class */ (function () {
    function SkodaManufacturer() {
    }
    SkodaManufacturer.prototype.createCar = function (color) {
        return new SkodaCar(color);
    };
    return SkodaManufacturer;
}());
var BMWManufacturer = /** @class */ (function () {
    function BMWManufacturer() {
    }
    BMWManufacturer.prototype.createCar = function (color) {
        return new BMWCar(color);
    };
    return BMWManufacturer;
}());
var FordManufacturer = /** @class */ (function () {
    function FordManufacturer() {
    }
    FordManufacturer.prototype.createCar = function (color) {
        return new FordCar(color);
    };
    return FordManufacturer;
}());
var HondaManufacturer = /** @class */ (function () {
    function HondaManufacturer() {
    }
    HondaManufacturer.prototype.createCar = function (color) {
        return new HondaCar(color);
    };
    return HondaManufacturer;
}());
// Car class and subclasses
var Car = /** @class */ (function () {
    function Car(color) {
        this.color = color;
    }
    Car.prototype.description = function () {
        return "A generic car.";
    };
    return Car;
}());
var SkodaCar = /** @class */ (function (_super) {
    __extends(SkodaCar, _super);
    function SkodaCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkodaCar.prototype.description = function () {
        return "A ".concat(this.color, " Czech car");
    };
    return SkodaCar;
}(Car));
var BMWCar = /** @class */ (function (_super) {
    __extends(BMWCar, _super);
    function BMWCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BMWCar.prototype.description = function () {
        return "A ".concat(this.color, " German car");
    };
    return BMWCar;
}(Car));
var FordCar = /** @class */ (function (_super) {
    __extends(FordCar, _super);
    function FordCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FordCar.prototype.description = function () {
        return "A ".concat(this.color, " American car");
    };
    return FordCar;
}(Car));
var HondaCar = /** @class */ (function (_super) {
    __extends(HondaCar, _super);
    function HondaCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HondaCar.prototype.description = function () {
        return "A ".concat(this.color, " Japanese car");
    };
    return HondaCar;
}(Car));
// Example
var skoda = new SkodaManufacturer();
var honda = new HondaManufacturer();
var car1 = skoda.createCar(Color.Silver);
var car2 = honda.createCar(Color.Blue);
console.log(car1.description());
console.log(car2.description());
