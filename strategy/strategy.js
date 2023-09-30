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
console.log('hey!');
var Fly = /** @class */ (function () {
    function Fly() {
    }
    Fly.prototype.fly = function () {
        console.log("Flapping wings in the air");
    };
    return Fly;
}());
var CantFly = /** @class */ (function () {
    function CantFly() {
    }
    CantFly.prototype.fly = function () {
        console.log("No air time unfortunately");
    };
    return CantFly;
}());
var Quack = /** @class */ (function () {
    function Quack() {
    }
    Quack.prototype.quack = function () {
        console.log("QUACK!");
    };
    return Quack;
}());
var Squeak = /** @class */ (function () {
    function Squeak() {
    }
    Squeak.prototype.quack = function () {
        console.log("SQUEAK!");
    };
    return Squeak;
}());
var Duck = /** @class */ (function () {
    function Duck() {
        this.flyBehavior = new Fly();
        this.quackBehavior = new Quack();
    }
    Duck.prototype.display = function () {
        console.log("A standard duck");
    };
    Duck.prototype.swim = function () {
        console.log("Exceptional buoyancy!");
    };
    Duck.prototype.performQuack = function () {
        this.quackBehavior.quack();
    };
    Duck.prototype.performFly = function () {
        this.flyBehavior.fly();
    };
    Duck.prototype.setQuackBehavior = function (behavior) {
        this.quackBehavior = behavior;
    };
    Duck.prototype.setFlyBehavior = function (behavior) {
        this.flyBehavior = behavior;
    };
    return Duck;
}());
var RubberDuck = /** @class */ (function (_super) {
    __extends(RubberDuck, _super);
    function RubberDuck() {
        var _this = _super.call(this) || this;
        _this.flyBehavior = new CantFly();
        _this.quackBehavior = new Squeak();
        return _this;
    }
    RubberDuck.prototype.display = function () {
        console.log("A yellow duck manufactured in mainland China");
    };
    return RubberDuck;
}(Duck));
var duck1 = new Duck();
var duck2 = new RubberDuck();
duck1.performQuack();
duck2.performQuack();
