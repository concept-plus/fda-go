![<Concept Plus>](./app/images/cp-full-logo-colored-315x53.png)

# FDA GO

[ 18f introduction here. ]

Project Links  | URLs 
 ------------- | ------------- 
 Production Application    | [fdago.conceptplusllc.net](https://fdago.conceptplusllc.net) 
 Development Environment    | [fdago-dev.conceptplusllc.net](https://fdago-dev.conceptplusllc.net) 
 CI Environment   | [fdago-ci.conceptplusllc.net](https://fdago-ci.conceptplusllc.net)
 Container Advisor  | [fdago-ca.conceptplusllc.net](https://fdago-ca.conceptplusllc.net)

### Powered by

![AngularJS](./app/images/angular.png)
![AWS](./app/images/aws.png)
![cAdvisor](./app/images/cadvisor.png)
![Bootstrap](./app/images/bootstrap.png)
![Bower](./app/images/bower.png)
![Docker](./app/images/docker.png)
![Git](./app/images/git.png)
![Github](./app/images/github.png)
![Grunt](./app/images/grunt.png)
![InVision](./app/images/invision.png)
![Jasmine](./app/images/jasmine.png)
![KarmaJS](./app/images/karma.png)
![NightwatchJS](./app/images/nightwatch.png)
![NodeJS](./app/images/nodejs.png)
![Slack](./app/images/slack.png)
![Yeoman](./app/images/yeoman.png)


## Installation

If you want to develop and run the FDA Go application locally, you will need to make sure that you have [NodeJS](https://nodejs.org/) installed and globally install the [bower](http://bower.io) and [grunt-cli](http://gruntjs.com/getting-started) pacakges:

```
npm install -g bower grunt-cli
```
Install the local node packages:

```
npm install
```
Install the local bower packages:

```
bower install
```

## Build & development

Run `grunt` for building and `grunt serve` to preview the app locally.

## Testing

Running `grunt test` will execute the unit tests with karma.
