![<Concept Plus>](./app/images/cp-full-logo-colored-315x53.png)

# What is FDA-GO?

FDA-GO is Concept Plus' working prototype submission in response to the 18F BPA for Agile Delivery Services. 

Project Links  | URLs 
 ------------- | ------------- 
 Production Application    | [fdago.conceptplusllc.net](https://fdago.conceptplusllc.net) 
 Development Environment    | [fdago-dev.conceptplusllc.net](https://fdago-dev.conceptplusllc.net) 
 CI Environment   | [fdago-ci.conceptplusllc.net](https://fdago-ci.conceptplusllc.net)
 Container Advisor  | [fdago-ca.conceptplusllc.net](https://fdago-ca.conceptplusllc.net)

#### Powered By

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
![Jenkins](./app/images/jenkins.png)
![KarmaJS](./app/images/karma.png)
![NightwatchJS](./app/images/nightwatch.png)
![NodeJS](./app/images/nodejs.png)
![Selenium](./app/images/selenium.png)
![Slack](./app/images/slack.png)
![Yeoman](./app/images/yeoman.png)

# Installation

_See the [FDA-GO Local Deployment Guide](https://github.com/concept-plus/fda-go/blob/BPA-57-1.0-open/LOCAL_DEPLOYMENT.md)_

# Team

Upon receipt of the RFQ, Yazan Ramahi was appointed and authorized to put a multidisciplinary team together to collaboratively design, develop, and deploy a working protoype.

Team members consisted of:
* **Product Owner:** Yazan Ramahi (yramahi@conceptplusllc.com)
* **Technical Architect:** Rory McLean (rmclean@conceptplusllc.com)
* **Program Manager / Scrum Master:** Hector Villagomez (hvillagomez@conceptplusllc.com)
* **Frontend Web Developer:** Ponnamy Kiep (pkiep@conceptplusllc.com)
* **Backend Web Developer:** Mike Mathis (mmathis@conceptplusllc.com)
* **DevOps Engineer:** Alex Rangeo (arangeo@conceptplusllc.com)

# Agile Aproach

_See our [Attachment E: Approach Criteria Evidence](./APPROACH_CRITERIA_EVIDENCE.md)_

Once the team was in place, we immediately held a project kickoff meeting to come up with ideas for the prototype.  Many ideas were presented to the product owner and the decision was made to create FDA-GO - a prototype allowing consumers to execute a drug search for its adverse events, labeling, and recalls. In addition, it also provides a fast way to get recall information for the past 12 months relating to drugs, medical devices, and food. FDA-GO consumes the [OpenFDA APIs](http://open.fda.gov).

[ add content about first day(s) here. ]

[ include pictures of initial whiteboard design ]

[ add jira sprint info and maybe some screenshots ]

[ add info about bug tracking and resolution ]

# Technologies

Keeping in mind the short timeframe, we still wanted to create a prototype that worked on multiple devices while satisfying all of the criterias for this challenge. This was achieved with using many modern and open source technologies.

![Architecture](./evidence/architecture.png)

## Modern, Open Source Technologies

* **NodeJS** - Cross-platform runtime environment
* **AngularJS** - Front-end framework
* **Bootstrap** - Front-end UI framework
* **GruntJS** - Javascript task runner
* **Docker** - Container framework
* **Karma** - Unit testing framework
* **Jasmine** - Unit testing framework

## Other Technologies

* **Github** - Code repository
* **Jenkins** - Continuous integration
* **Selenium** - Browser automation
* **OpenFDA** - REST API
* **Amazon Web Services** - IaaS 

# Environments

[ add content/screenshots here for Amazon, Docker, cAdvisor, etc. ]

[ describe CI process here ]

# Testing

## Unit Testing

Once you have FDA-GO setup on your local system. You can run the following command to execute the unit tests.
```
grunt test
```
The unit tests are created using (the open source frameworks for testing) [Karma](http://karma-runner.github.io/0.12/index.html), [PhantomJS](http://phantomjs.org/), and [Jasmine](http://jasmine.github.io/). Here is a [sample unit test run](./evidence/unittest.png).

## Autmated Testing

[ add more content on other testing ]


# License

FDA-GO is licensed under the MIT license. For full details see the [LICENSE](./LICENSE.md) on github.
