import { FortuneImageMachine } from "./state"

describe("Fortune Image state machine tests", () => {


    test("No ticket from start + Add one ticket",() => {

        const fortuneImageMachine = new FortuneImageMachine()
        
        expect(fortuneImageMachine.tickets).toEqual(0)
        fortuneImageMachine.addTicket()
        expect(fortuneImageMachine.tickets).toEqual(1)
        
    })
    
    test("Cannot select option without ticket", () => {
        const fortuneImageMachine = new FortuneImageMachine()
        expect(fortuneImageMachine.selectOption('dog')).toEqual('You have to have a ticket to select an option')
    })



})