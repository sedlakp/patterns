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
        this.state.selectOption(option);
    };
    FortuneImageMachine.prototype.addTicket = function () {
        this.state.addTicket();
    };
    FortuneImageMachine.prototype.pushButton = function () {
        this.state.pushButton();
        this.getFortuneImage();
    };
    FortuneImageMachine.prototype.getFortuneImage = function () {
        this.state.getFortuneImage();
    };
    FortuneImageMachine.Options = OPTIONS;
    return FortuneImageMachine;
}());
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
        console.log("Option selected: ", option);
    };
    HasTicketState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        console.log("Ticket added");
    };
    HasTicketState.prototype.pushButton = function () {
        console.log("Select one of the options first");
    };
    HasTicketState.prototype.getFortuneImage = function () {
        console.log("You need to use your ticket");
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
        console.log("Option changed: ", option);
    };
    OptionSelectedState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        console.log("Ticket added");
    };
    OptionSelectedState.prototype.pushButton = function () {
        this.machine.tickets -= 1;
        this.machine.state = this.machine.ticketUsedState;
    };
    return OptionSelectedState;
}(FortuneImageMachineState));
var NoTicketState = /** @class */ (function (_super) {
    __extends(NoTicketState, _super);
    function NoTicketState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoTicketState.prototype.selectOption = function (option) {
        console.log("You have to have a ticket to select an option");
    };
    NoTicketState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        this.machine.state = this.machine.hasTicketState;
        console.log("Ticket added");
    };
    NoTicketState.prototype.pushButton = function () {
        console.log("Cannot push button without selected option");
    };
    NoTicketState.prototype.getFortuneImage = function () {
        console.log("You need a ticket to get a fortune image");
    };
    return NoTicketState;
}(FortuneImageMachineState));
var TicketUsedState = /** @class */ (function (_super) {
    __extends(TicketUsedState, _super);
    function TicketUsedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TicketUsedState.prototype.selectOption = function (option) {
        console.log("We are retrieving your fortune image for you at the moment");
    };
    TicketUsedState.prototype.addTicket = function () {
        this.machine.tickets += 1;
        this.machine.state = this.machine.hasTicketState;
        console.log("Ticket added");
    };
    TicketUsedState.prototype.pushButton = function () {
        console.log("You can only get one image for one ticket");
    };
    TicketUsedState.prototype.getFortuneImage = function () {
        // do request with the selected option
        // update page with img element with this src
        // `https://source.unsplash.com/random?${this.machine.selectedOption}`
        var _this = this;
        fetch("https://source.unsplash.com/random?".concat(this.machine.selectedOption))
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
            console.log("Got fortune image: ".concat(body));
            _this.machine.selectedOption = null;
            console.log("Tickets left: ".concat(_this.machine.tickets));
            _this.machine.state =
                _this.machine.tickets > 0
                    ? _this.machine.hasTicketState
                    : _this.machine.noTicketState;
        })
            .catch(function (error) {
            console.log(error);
            // if there was some error handling
            _this.machine.tickets += 1;
            console.log("Getting fortune image failed, giving you your ticket back");
        });
    };
    return TicketUsedState;
}(FortuneImageMachineState));
function run() {
    var machine = new FortuneImageMachine();
    machine.addTicket();
    machine.selectOption("dog");
    machine.pushButton(); // this is async so
}
run();
