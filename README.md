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

**Locally**

_See the [FDA-GO Local Deployment Guide](https://github.com/concept-plus/fda-go/blob/BPA-57-1.0-open/LOCAL_DEPLOYMENT.md)_

**Docker**
The Docker container listens on port locally. To access the container, run the following command substituting an open port on your machine.

docker run -p <localport>:80 -n fdago conceptplus/fdago

# Team

Upon receipt of the RFQ, Yazan Ramahi was appointed and authorized to put a multidisciplinary team together to collaboratively design, develop, and deploy a working protoype.

Team members consisted of:
* **Product Manager:** Yazan Ramahi (yramahi@conceptplusllc.com)
* **Technical Architect:** Rory McLean (rmclean@conceptplusllc.com)
* **Frontend Web Developer:** Ponnamy Kiep (pkiep@conceptplusllc.com)
* **Frontend Web Developer:** Dana Ramahi (dramahi@conceptplusllc.com)
* **Backend Web Developer:** Mike Mathis (mmathis@conceptplusllc.com)
* **DevOps Engineer:** Alex Rangeo (arangeo@conceptplusllc.com)
* **DevOps Engineer:** Hector Villagomez (hvillagomez@conceptplusllc.com)

# Agile Approach

_See our [Attachment E: Approach Criteria Evidence](./APPROACH_CRITERIA_EVIDENCE.md)_
With a team in place, a project kickoff meeting was executed and ideas were presented to the product owner, leading to a decision to create FDA-GO; a site allowing consumers to execute a text search for a drug’s adverse events, labeling, and recall data. Consumers may also view recall information related to drugs, medical devices, and food for the past 12 months.

The team executed a scrum approach for all development activities. Working with the product owner, a product backlog was created identifying various user and technical stories.  Stories were captured in [JIRA](https://www.atlassian.com/software/jira) and then groomed and refined allowing development to begin.

Development was completed in 4 sprints. Each sprint consisted of: 
1. Planning session – development team decomposed and estimated the user and technical stories. 
2. Daily stand ups – decomposed tasks and activities are tracked and impediments are identified.
3. Sprint demo – all completed user and technical stories were presented to stakeholders for acceptance. 
4. Sprint retrospective – lessons learned were captured and documented by the entire team.

Sprint tasks were tracked and managed using JIRA. A [virtual agile board](https://github.com/concept-plus/fda-go/blob/BPA-57-1.0-open/evidence/Sprint_Docs/Sprint%202/Sprint_2_WIP_1.png) allowed the team to work remotely. All artifacts associated to each sprint, along with a schedule, [can be found here.](https://github.com/concept-plus/fda-go/blob/BPA-57-1.0-open/evidence/Sprint_Docs)
Simultaneously, the DevOps engineer and Technical Architect identified tasks that needed to be completed from an infrastructure perspective. All items were captured in JIRA and tracked through a Kanban board. [Click here to see artifacts](https://github.com/concept-plus/fda-go/blob/BPA-57-1.0-open/evidence/Sprint_Docs)

All defects were captured within the sprint during our testing phase. Defects were identified by the testers, created in JIRA and assigned to the developer owning the feature. Upon completion of the bug fix the defect was assigned back to the tester. If all tests passed then the defect would be closed.


# Technologies

The prototype consumes the [OpenFDA APIs](http://open.fda.gov) and works on multiple devices while satisfying all of the criterias for this challenge. This was achieved with using many modern and open source technologies.

![Architecture](./evidence/architecture.png)

## Modern, Open Source Technologies

* **[NodeJS](http://nodejs.org)** - Cross-platform runtime environment
* **[AngularJS](https://angularjs.org/)** - Front-end framework
* **[Bootstrap](http://getbootstrap.com)** - Front-end UI framework
* **[GruntJS](http://gruntjs.com/)** - Javascript task runner
* **[Docker](http://docker.com)** - Container framework
* **[Karma](http://http://karma-runner.github.io/)** - Unit testing framework
* **[Jasmine](http://jasmine.github.io/)** - Unit testing framework

## Other Technologies

* **[Github](http://github.com)** - Code repository
* **[Jenkins](https://jenkins-ci.org/)** - Continuous integration
* **[Selenium](http://www.seleniumhq.org/)** - Browser automation
* **[OpenFDA](http://open.fda.gov)** - REST API
* **[Amazon Web Services](http://aws.amazon.com)** - IaaS 

# Environments

* **[Amazon Web Services](http://aws.amazon.com)** was used as our IaaS provider.
![AWS](./evidence/Continuous Integration/AWS_18f_ec2.png)
* **[Docker](http://docker.com)** containerization of web application.

Our Continuous Integration implementation invloves the following steps:
* Developer checks in code into GitHub
* Jenkins polls GitHub for any check-ins
* Jenkins executes job to build code base and deploys to AWS server
* AWS builds Docker container based on script ran in Jenkins
* AWS starts container
* Container is published to Docker Hub
* Upon successful build of container Jenkins executes job to run automated container
* Test results produce HTML reports
![CI](./evidence/Continuous Integration/CI_Diagram.png)
# Testing

## Unit Testing

Once you have FDA-GO setup on your local system. You can run the following command to execute the unit tests.
```
grunt test
```
The unit tests are created using the open source frameworks [Karma](http://karma-runner.github.io/0.12/index.html), [PhantomJS](http://phantomjs.org/), and [Jasmine](http://jasmine.github.io/).

## Automated Testing

The following tools tied into our CI solution and triggered the execution of automated test scripts. All testing results were captured in the form of html reports.  Click here to view results of our automated tests.

* [Selenium](http://www.seleniumhq.org/) - web browser automation tool.
* [NightwatchJS](http://www.nightwatchjs.org/) - easy to use Node.js E2E testing solution for browser based apps and websites.
* [PhantomJS](http://phantomjs.org/) - headless webkit scriptable with a Javascript API.


# License

FDA-GO is licensed under the MIT license. For full details see the [LICENSE](./LICENSE.md) on github.
