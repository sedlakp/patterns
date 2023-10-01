/**
 * THE OBSERVER PATTERN
 * 
 * defines one-to-many dependency between objects so that when
 * one object changes state, all of its dependencies are notified
 * and updated automatically
 * 
 * Publisher/Subscriber
 * Subject/Observer
 * 
 * Design principles:
 * Loosely coupled designs
 */


interface Publisher {

    registerSubscriber:(s:Subscriber) => void
    removeSubscriber:(s:Subscriber) => void
    notifySubscribers: () => void

}

interface Subscriber {
    update: (context:WeatherSourceContext) => void
}

interface Display {
    display: () => void
}

interface WeatherSourceContext {
    temperature: number
    humidity: number
    samplesTaken: number
}

class WeatherDataSource implements Publisher, WeatherSourceContext {

    subscribers: Subscriber[] = []
    temperature: number
    humidity: number
    samplesTaken: number = 0

    constructor() {}

    // service specific functions

    measurementsChanged(temperature: number, humidity: number) {
        this.samplesTaken++
        this.temperature = temperature
        this.humidity = humidity
        this.notifySubscribers()
    }
    
    // subscriber related functions
    registerSubscriber(s: Subscriber) {
        this.subscribers.push(s)
    }

    removeSubscriber(s: Subscriber) {
        this.subscribers = this.subscribers.filter((sub) => sub !== s)
    }

    notifySubscribers() {

        const context: WeatherSourceContext = {
            temperature: this.temperature,
            humidity: this.humidity,
            samplesTaken: this.samplesTaken
        }

        for(const subscriber of this.subscribers) {
            subscriber.update(context)
        }

    }
}


class ForecastDisplay implements Subscriber, Display {
    temperature: number

    update(context: WeatherSourceContext) {
        this.temperature = context.temperature
        this.display()
    }

    display() {
        console.log(`It is going to be a lovely ${this.temperature} degrees\n`)
    }
}

class StatsDisplay implements Subscriber, Display {

    samples: number

    update(context: WeatherSourceContext) {
        this.samples = context.samplesTaken
        this.display()
    }

    display() {
        console.log(`The station generated ${this.samples} samples\n`)
    }
}

class CurrentWeatherDisplay implements Subscriber, Display {

    temperature: number
    humidity: number

    update(context: WeatherSourceContext) {
        this.temperature = context.temperature
        this.humidity = context.humidity
        this.display()
    }

    display() {
        console.log(`Current weather:\nTemperature: ${this.temperature}\nHumidity: ${this.humidity}\n`)
    }
}


const weatherStation = new WeatherDataSource()

const statsDisplay = new StatsDisplay()
const forecastDisplay = new ForecastDisplay()
const currentWeatherDisplay = new CurrentWeatherDisplay()

weatherStation.registerSubscriber(statsDisplay)
weatherStation.registerSubscriber(forecastDisplay)
weatherStation.registerSubscriber(currentWeatherDisplay)

weatherStation.measurementsChanged(32,1120)
weatherStation.measurementsChanged(31,1118)

weatherStation.removeSubscriber(forecastDisplay)
weatherStation.removeSubscriber(currentWeatherDisplay)
weatherStation.measurementsChanged(31,1118)
weatherStation.measurementsChanged(31,1118)
weatherStation.measurementsChanged(31,1118)
weatherStation.measurementsChanged(31,1118)


