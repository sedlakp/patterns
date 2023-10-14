"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortuneImageMachine = void 0;
var OPTIONS = ["dog", "cat", "bird", "panda"];
var FortuneImageMachine = /** @class */ (function () {
    function FortuneImageMachine() {
        this.selectedOption = null;
        this.tickets = 0;
        this.noTicketState = new NoTicketState(this);
        this.hasTicketState = new HasTicketState(this);
        this.optionSelectedState = new OptionSelectedState(this);
        this.ticketUsedState = new TicketUsedState(this);
        this.state = this.noTicketState;
    }
    FortuneImageMachine.prototype.selectOption = function (option) {
        return this.state.selectOption(option);
    };
    FortuneImageMachine.prototype.addTicket = function () {
        return this.state.addTicket();
    };
    FortuneImageMachine.prototype.pushButton = function () {
        return this.state.pushButton();
    };
    FortuneImageMachine.prototype.getFortuneImage = function () {
        return this.state.getFortuneImage();
    };
    FortuneImageMachine.Options = OPTIONS;
    return FortuneImageMachine;
}());
exports.FortuneImageMachine = FortuneImageMachine;
var FortuneImageMachineState = /** @class */ (function () {
    function FortuneImageMachineState(machine) {
        this.machine = machine;
    }
    FortuneImageMachineState.prototype.selectOption = function (option) {
        throw Error("Override in subclass");
    };
    FortuneImageMachineState.prototype.addTicket = function () {
        throw Error("Override in subclass");
    };
    FortuneImageMachineState.prototype.pushButton = function () {
        throw Error("Override in subclass");
    };
    FortuneImageMachineState.prototype.getFortuneImage = function () {
        throw Error("Override in subclass");
    };
    return FortuneImageMachineState;
}());
var HasTicketState = /** @class */ (function (_super) {
    __extends(HasTicketState, _super);
    function HasTicketState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HasTicketState.prototype.selectOption = function (option) {
        this.machine.selectedOption = option;
        this.machine.state = this.machine.optionSelectedState;
        return "Option selected: " + option;
    };
    HasTicketState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        return "Ticket added";
    };
    HasTicketState.prototype.pushButton = function () {
        return "Select one of the options first";
    };
    HasTicketState.prototype.getFortuneImage = function () {
        return Promise.resolve("You need to use your ticket");
    };
    return HasTicketState;
}(FortuneImageMachineState));
var OptionSelectedState = /** @class */ (function (_super) {
    __extends(OptionSelectedState, _super);
    function OptionSelectedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OptionSelectedState.prototype.selectOption = function (option) {
        this.machine.selectedOption = option;
        return "Option changed: " + option;
    };
    OptionSelectedState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        return "Ticket added";
    };
    OptionSelectedState.prototype.pushButton = function () {
        this.machine.tickets -= 1;
        this.machine.state = this.machine.ticketUsedState;
        this.machine.getFortuneImage();
        return "Button pushed";
    };
    return OptionSelectedState;
}(FortuneImageMachineState));
var NoTicketState = /** @class */ (function (_super) {
    __extends(NoTicketState, _super);
    function NoTicketState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoTicketState.prototype.selectOption = function (option) {
        return "You have to have a ticket to select an option";
    };
    NoTicketState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        this.machine.state = this.machine.hasTicketState;
        return "Ticket added";
    };
    NoTicketState.prototype.pushButton = function () {
        return "Cannot push button without selected option";
    };
    NoTicketState.prototype.getFortuneImage = function () {
        return Promise.resolve("You need a ticket to get a fortune image");
    };
    return NoTicketState;
}(FortuneImageMachineState));
var TicketUsedState = /** @class */ (function (_super) {
    __extends(TicketUsedState, _super);
    function TicketUsedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TicketUsedState.prototype.selectOption = function (option) {
        return "We are retrieving your fortune image for you at the moment";
    };
    TicketUsedState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        this.machine.state = this.machine.hasTicketState;
        return "Ticket added";
    };
    TicketUsedState.prototype.pushButton = function () {
        return "You can only get one image for one ticket";
    };
    TicketUsedState.prototype.getFortuneImage = function () {
        // do request with the selected option
        // update page with img element with this src
        // `https://source.unsplash.com/random?${this.machine.selectedOption}`
        var _this = this;
        return fetch("https://source.unsplash.com/random?".concat(this.machine.selectedOption))
            .then(function (result) {
            if (result.ok) {
                // console.log(result.url)
                return result.url;
                // return result.blob()
            }
            else {
                throw result;
            }
        })
            .then(function (body) {
            // console.log(body)
            // if request successfull
            _this.machine.selectedOption = null;
            console.log("Tickets left: ".concat(_this.machine.tickets));
            _this.machine.state =
                _this.machine.tickets > 0
                    ? _this.machine.hasTicketState
                    : _this.machine.noTicketState;
            return "Got fortune image: ".concat(body);
        })
            .catch(function (error) {
            console.log(error);
            // if there was some error handling
            _this.machine.tickets += 1;
            return "Getting fortune image failed, giving you your ticket back";
        });
    };
    return TicketUsedState;
}(FortuneImageMachineState));
