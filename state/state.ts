const OPTIONS = ["dog", "cat", "bird", "panda"];

class FortuneImageMachine implements FortuneImageMachineInterface {
  hasTicketState: FortuneImageMachineState;
  noTicketState: FortuneImageMachineState;
  optionSelectedState: FortuneImageMachineState;
  ticketUsedState: FortuneImageMachineState;

  state: FortuneImageMachineState;
  selectedOption: string | null = null;
  static Options: string[] = OPTIONS;

  constructor() {
    this.noTicketState = new NoTicketState(this);
    this.hasTicketState = new HasTicketState(this);
    this.optionSelectedState = new OptionSelectedState(this);
    this.ticketUsedState = new TicketUsedState(this);

    this.state = this.noTicketState;
  }

  tickets: number = 0;

  selectOption(option: string): void {
    this.state.selectOption(option);
  }
  addTicket(): void {
    this.state.addTicket();
  }
  pushButton(): void {
    this.state.pushButton();
    this.getFortuneImage();
  }

  getFortuneImage(): void {
    this.state.getFortuneImage();
  }
}

interface FortuneImageMachineInterface {
  selectOption(option: string): void;
  addTicket(): void;
  pushButton(): void;
  getFortuneImage(): void;
}

class FortuneImageMachineState implements FortuneImageMachineInterface {
  machine: FortuneImageMachine;

  constructor(machine: FortuneImageMachine) {
    this.machine = machine;
  }

  selectOption(option: string): void {
    throw Error("Override in subclass");
  }

  addTicket(): void {
    throw Error("Override in subclass");
  }

  pushButton(): void {
    throw Error("Override in subclass");
  }

  getFortuneImage() {
    throw Error("Override in subclass");
  }
}

class HasTicketState extends FortuneImageMachineState {
  selectOption(option: string): void {
    this.machine.selectedOption = option;
    this.machine.state = this.machine.optionSelectedState;
    console.log("Option selected: ", option);
  }

  addTicket(): void {
    this.machine.tickets += 1;
    console.log("Ticket added");
  }

  pushButton(): void {
    console.log("Select one of the options first");
  }

  getFortuneImage() {
    console.log("You need to use your ticket");
  }
}

class OptionSelectedState extends FortuneImageMachineState {
  selectOption(option: string): void {
    this.machine.selectedOption = option;
    console.log("Option changed: ", option);
  }

  addTicket(): void {
    this.machine.tickets += 1;
    console.log("Ticket added");
  }

  pushButton(): void {
    this.machine.tickets -= 1;

    this.machine.state = this.machine.ticketUsedState;
  }
}

class NoTicketState extends FortuneImageMachineState {
  selectOption(option: string): void {
    console.log("You have to have a ticket to select an option");
  }

  addTicket(): void {
    this.machine.tickets += 1;
    this.machine.state = this.machine.hasTicketState;
    console.log("Ticket added");
  }

  pushButton(): void {
    console.log("Cannot push button without selected option");
  }

  getFortuneImage(): void {
    console.log("You need a ticket to get a fortune image");
  }
}

class TicketUsedState extends FortuneImageMachineState {
  selectOption(option: string): void {
    console.log("We are retrieving your fortune image for you at the moment");
  }
  addTicket(): void {
    this.machine.tickets += 1;
    this.machine.state = this.machine.hasTicketState;
    console.log("Ticket added");
  }

  pushButton(): void {
    console.log("You can only get one image for one ticket");
  }

  getFortuneImage(): void {
    // do request with the selected option
    // update page with img element with this src
    // `https://source.unsplash.com/random?${this.machine.selectedOption}`

    fetch(`https://source.unsplash.com/random?${this.machine.selectedOption}`)
      .then((result) => {
        if (result.ok) {
          // console.log(result.url)
          return result.url;
          // return result.blob()
        } else {
          throw result;
        }
      })
      .then((body) => {
        // console.log(body)
        // if request successfull
        console.log(`Got fortune image: ${body}`);
        this.machine.selectedOption = null;
        console.log(`Tickets left: ${this.machine.tickets}`);
        this.machine.state =
          this.machine.tickets > 0
            ? this.machine.hasTicketState
            : this.machine.noTicketState;
      })
      .catch((error) => {
        console.log(error);
        // if there was some error handling
        this.machine.tickets += 1;
        console.log(
          "Getting fortune image failed, giving you your ticket back"
        );
      });
  }
}

function run() {
  const machine = new FortuneImageMachine();
  machine.addTicket();
  machine.selectOption("dog");
  machine.pushButton(); // this is async so
}

run();
