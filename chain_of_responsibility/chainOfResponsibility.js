/**
 * Chain of responsibility
 *
 * Passing requests along a chain of handlers.
 * Each hanfler decides whether to process the request or
 * pass it to the next handler
 *
 *
 * Use cases:
 * - sequential check (sanitizing+authentication+authorization+...)
 * - if various inputs need to be handled differently(input enters
 * the chain of handlers and only the matching handler handles the
 * input, or passes the input to the next handler in chain)
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
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.setNext = function (h) {
        this.next = h;
    };
    Handler.prototype.handle = function (input) {
        if (this.next) {
            this.next.handle(input);
            return;
        }
    };
    return Handler;
}());
var PineappleHandler = /** @class */ (function (_super) {
    __extends(PineappleHandler, _super);
    function PineappleHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PineappleHandler.prototype.handle = function (input) {
        if (input.hasPinapple) {
            throw Error("Not on my watch!");
        }
        else {
            // this.next.handle(input)
            _super.prototype.handle.call(this, input);
            return;
        }
    };
    return PineappleHandler;
}(Handler));
var ShapeHandler = /** @class */ (function (_super) {
    __extends(ShapeHandler, _super);
    function ShapeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeHandler.prototype.handle = function (input) {
        switch (input.shape) {
            case 'round':
                _super.prototype.handle.call(this, input);
                return;
            case 'square':
                throw Error("We allow only old-fashioned shaped pizzas here.");
            default: throw Error("Unknown shape");
        }
    };
    return ShapeHandler;
}(Handler));
var BurnHandler = /** @class */ (function (_super) {
    __extends(BurnHandler, _super);
    function BurnHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BurnHandler.prototype.handle = function (input) {
        var burnStatus = input.burntStatus;
        switch (burnStatus) {
            case 'low':
            case 'medium':
                _super.prototype.handle.call(this, input);
                return;
            case "none":
                throw Error("I can almost taste the dough");
            case "high":
                throw Error("Whoa whoa whoa! What's this charcoal looking thing?");
        }
    };
    return BurnHandler;
}(Handler));
// I could add stuff to the pizza in the handlers
// I could combine the errors instead of throwing the first one
// I could return the input from the handler
var pinappleCheck = new PineappleHandler();
var shapeCheck = new ShapeHandler();
var burnCheck = new BurnHandler();
pinappleCheck.setNext(shapeCheck);
shapeCheck.setNext(burnCheck);
function pizzaValidator(pizza, chain) {
    try {
        pinappleCheck.handle(pizza);
        console.log("perfect pizza!");
        return pizza;
    }
    catch (e) {
        var error = e;
        console.log(error.message);
        console.log("Needs more work!");
        return null;
    }
}
var pizza = {
    burntStatus: 'none',
    hasMozarella: true,
    hasPinapple: true,
    hasTomatoSauce: true,
    shape: 'round'
};
var pizza2 = {
    burntStatus: 'none',
    hasMozarella: true,
    hasPinapple: false,
    hasTomatoSauce: true,
    shape: 'round'
};
var pizza3 = {
    burntStatus: 'low',
    hasMozarella: true,
    hasPinapple: false,
    hasTomatoSauce: true,
    shape: 'square'
};
var pizza4 = {
    burntStatus: 'low',
    hasMozarella: true,
    hasPinapple: false,
    hasTomatoSauce: true,
    shape: 'round'
};
pizzaValidator(pizza, pinappleCheck);
pizzaValidator(pizza2, pinappleCheck);
pizzaValidator(pizza3, pinappleCheck);
pizzaValidator(pizza4, pinappleCheck);
