const OPTIONS = ["dog", "cat", "bird", "panda"];

export class FortuneImageMachine implements FortuneImageMachineInterface {
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

  selectOption(option: string): string {
    return this.state.selectOption(option);
  }
  addTicket(): string {
    return this.state.addTicket();
  }
  pushButton(): string {
    return this.state.pushButton();
  }

  getFortuneImage(): Promise<string> {
    return this.state.getFortuneImage();
  }
}

interface FortuneImageMachineInterface {
  selectOption(option: string): void;
  addTicket(): void;
  pushButton(): void;
  getFortuneImage(): Promise<string>;
}

class FortuneImageMachineState implements FortuneImageMachineInterface {
  machine: FortuneImageMachine;

  constructor(machine: FortuneImageMachine) {
    this.machine = machine;
  }

  selectOption(option: string): string {
    throw Error("Override in subclass");
  }

  addTicket(): string {
    throw Error("Override in subclass");
  }

  pushButton(): string {
    throw Error("Override in subclass");
  }

  getFortuneImage(): Promise<string> {
    throw Error("Override in subclass");
  }
}

class HasTicketState extends FortuneImageMachineState {
  selectOption(option: string): string {
    this.machine.selectedOption = option;
    this.machine.state = this.machine.optionSelectedState;
    return "Option selected: " + option
  }

  addTicket(): string {
    this.machine.tickets += 1;
    return "Ticket added"
  }

  pushButton(): string {
    return "Select one of the options first"
  }

  getFortuneImage(): Promise<string> {
    return Promise.resolve("You need to use your ticket")
  }
}

class OptionSelectedState extends FortuneImageMachineState {
  selectOption(option: string): string {
    this.machine.selectedOption = option;
    return "Option changed: " + option
  }

  addTicket(): string {
    this.machine.tickets += 1;
    return "Ticket added"
  }

  pushButton(): string {
    this.machine.tickets -= 1;

    this.machine.state = this.machine.ticketUsedState;
    this.machine.getFortuneImage();
    return "Button pushed"
  }
}

class NoTicketState extends FortuneImageMachineState {
  selectOption(option: string): string {
    return "You have to have a ticket to select an option"
  }

  addTicket(): string {
    this.machine.tickets += 1;
    this.machine.state = this.machine.hasTicketState;
    return "Ticket added"
  }

  pushButton(): string {
    return "Cannot push button without selected option"
  }

  getFortuneImage(): Promise<string> {
    return Promise.resolve("You need a ticket to get a fortune image")
  }
}

class TicketUsedState extends FortuneImageMachineState {
  selectOption(option: string): string {
    return "We are retrieving your fortune image for you at the moment"
  }
  addTicket(): string {
    this.machine.tickets += 1;
    this.machine.state = this.machine.hasTicketState;
    return "Ticket added"
  }

  pushButton(): string {
    return "You can only get one image for one ticket"
  }

  getFortuneImage(): Promise<string> {
    // do request with the selected option
    // update page with img element with this src
    // `https://source.unsplash.com/random?${this.machine.selectedOption}`

    return fetch(`https://source.unsplash.com/random?${this.machine.selectedOption}`)
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
        this.machine.selectedOption = null;
        console.log(`Tickets left: ${this.machine.tickets}`);
        this.machine.state =
          this.machine.tickets > 0
            ? this.machine.hasTicketState
            : this.machine.noTicketState;
        return `Got fortune image: ${body}`
      })
      .catch((error) => {
        console.log(error);
        // if there was some error handling
        this.machine.tickets += 1;
        return "Getting fortune image failed, giving you your ticket back"
      });
  }
}
