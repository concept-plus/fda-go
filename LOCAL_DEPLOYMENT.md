# FDA-GO Local Deployment Guide
To develop and run the FDA Go application locally, you will need to make sure that you have [NodeJS](https://nodejs.org/) installed and that you can run NPM. Running the command below will verify that you can run NPM.

```
$ npm install -g bower grunt-cli
```

## Installation

Install the [bower](http://bower.io) package manager and [grunt-cli](http://gruntjs.com/getting-started) task runner.

```
$ npm install -g bower grunt-cli
```
Clone this repository.
```
$ git clone https://github.com/concept-plus/fda-go.git
$ cd fda-go
```
Install the dependencies.

```
npm install
```

## Build & local deployment.

Run `grunt` for building and `grunt serve` to preview the app locally.

## Testing

Running `grunt test` will execute the unit tests with karma.
