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

interface Pizza {
    shape:'round'|'square'
    hasPinapple: boolean
    hasTomatoSauce: boolean
    hasMozarella: boolean
    burntStatus:'none'|'low'|'medium'|"high"
}

interface HandlerI {
    setNext:(h:HandlerI) => void
    handle:(input: Pizza) => void
}

class Handler implements HandlerI {
    next: HandlerI

    constructor() {}

    setNext(h:HandlerI) {
        this.next = h
    }

    handle(input:Pizza) {
        if (this.next) {
            this.next.handle(input)
            return 
        }
    }

}


class PineappleHandler extends Handler {
    handle(input: Pizza): void {
        if (input.hasPinapple) {
            throw Error("Not on my watch!")
        } else {
            // this.next.handle(input)
            super.handle(input)
            return 
        }
   }
}

class ShapeHandler extends Handler {
    handle(input: Pizza) {
        switch (input.shape){
            case 'round':
                super.handle(input)
                return
            case 'square':
                throw Error("We allow only old-fashioned shaped pizzas here.")
            default: throw Error("Unknown shape")

        }
    }
}

class BurnHandler extends Handler {
    handle(input: Pizza): void {
        const burnStatus = input.burntStatus
        switch (burnStatus){
            case 'low':
            case 'medium':
                super.handle(input)
                return
            case "none":
                throw Error("I can almost taste the dough")
            case "high":
                throw Error("Whoa whoa whoa! What's this charcoal looking thing?")
        }
    }
}

// I could add stuff to the pizza in the handlers
// I could combine the errors instead of throwing the first one
// I could return the input from the handler


const pinappleCheck = new PineappleHandler()
const shapeCheck = new ShapeHandler()
const burnCheck = new BurnHandler()

pinappleCheck.setNext(shapeCheck)
shapeCheck.setNext(burnCheck)

function pizzaValidator(pizza:Pizza, chain: HandlerI): Pizza|null {
    try {
        pinappleCheck.handle(pizza)
        console.log("perfect pizza!")
        return pizza
    } catch (e) {
        const error: Error = e
        console.log(error.message)
        console.log("Needs more work!")
        return null
    }
}


const pizza: Pizza = {
    burntStatus: 'none',
    hasMozarella: true,
    hasPinapple: true,
    hasTomatoSauce: true,
    shape: 'round'    
}
const pizza2: Pizza = {
    burntStatus: 'none',
    hasMozarella: true,
    hasPinapple: false,
    hasTomatoSauce: true,
    shape: 'round'    
}

const pizza3: Pizza = {
    burntStatus: 'low',
    hasMozarella: true,
    hasPinapple: false,
    hasTomatoSauce: true,
    shape: 'square'    
}

const pizza4: Pizza = {
    burntStatus: 'low',
    hasMozarella: true,
    hasPinapple: false,
    hasTomatoSauce: true,
    shape: 'round'    
}


pizzaValidator(pizza, pinappleCheck)
pizzaValidator(pizza2, pinappleCheck)
pizzaValidator(pizza3, pinappleCheck)
pizzaValidator(pizza4, pinappleCheck)