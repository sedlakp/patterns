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
var WeatherDataSource = /** @class */ (function () {
    function WeatherDataSource() {
        this.subscribers = [];
        this.samplesTaken = 0;
    }
    // service specific functions
    WeatherDataSource.prototype.measurementsChanged = function (temperature, humidity) {
        this.samplesTaken++;
        this.temperature = temperature;
        this.humidity = humidity;
        this.notifySubscribers();
    };
    // subscriber related functions
    WeatherDataSource.prototype.registerSubscriber = function (s) {
        this.subscribers.push(s);
    };
    WeatherDataSource.prototype.removeSubscriber = function (s) {
        this.subscribers = this.subscribers.filter(function (sub) { return sub !== s; });
    };
    WeatherDataSource.prototype.notifySubscribers = function () {
        var context = {
            temperature: this.temperature,
            humidity: this.humidity,
            samplesTaken: this.samplesTaken
        };
        for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
            var subscriber = _a[_i];
            subscriber.update(context);
        }
    };
    return WeatherDataSource;
}());
var ForecastDisplay = /** @class */ (function () {
    function ForecastDisplay() {
    }
    ForecastDisplay.prototype.update = function (context) {
        this.temperature = context.temperature;
        this.display();
    };
    ForecastDisplay.prototype.display = function () {
        console.log("It is going to be a lovely ".concat(this.temperature, " degrees\n"));
    };
    return ForecastDisplay;
}());
var StatsDisplay = /** @class */ (function () {
    function StatsDisplay() {
    }
    StatsDisplay.prototype.update = function (context) {
        this.samples = context.samplesTaken;
        this.display();
    };
    StatsDisplay.prototype.display = function () {
        console.log("The station generated ".concat(this.samples, " samples\n"));
    };
    return StatsDisplay;
}());
var CurrentWeatherDisplay = /** @class */ (function () {
    function CurrentWeatherDisplay() {
    }
    CurrentWeatherDisplay.prototype.update = function (context) {
        this.temperature = context.temperature;
        this.humidity = context.humidity;
        this.display();
    };
    CurrentWeatherDisplay.prototype.display = function () {
        console.log("Current weather:\nTemperature: ".concat(this.temperature, "\nHumidity: ").concat(this.humidity, "\n"));
    };
    return CurrentWeatherDisplay;
}());
var weatherStation = new WeatherDataSource();
var statsDisplay = new StatsDisplay();
var forecastDisplay = new ForecastDisplay();
var currentWeatherDisplay = new CurrentWeatherDisplay();
weatherStation.registerSubscriber(statsDisplay);
weatherStation.registerSubscriber(forecastDisplay);
weatherStation.registerSubscriber(currentWeatherDisplay);
weatherStation.measurementsChanged(32, 1120);
weatherStation.measurementsChanged(31, 1118);
weatherStation.removeSubscriber(forecastDisplay);
weatherStation.removeSubscriber(currentWeatherDisplay);
weatherStation.measurementsChanged(31, 1118);
weatherStation.measurementsChanged(31, 1118);
weatherStation.measurementsChanged(31, 1118);
weatherStation.measurementsChanged(31, 1118);
