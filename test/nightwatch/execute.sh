#!/bin/bash
# Script to run the automoated UI testing using Nightwatch

echo "--------------------------------"
echo "Jenkins Selenium Nightwatch Job!"
echo "--------------------------------"
echo $PATH
echo "--------------------------"
echo " Install NPM Applications  "
echo "--------------------------"
npm install
#Start Selenium 
echo "-------------------------"
echo "      Start Selenium     "
echo "-------------------------"
cd lib
nohup java -jar sel-serv.jar &
#wait 3 seconds to make before continuing to make sure selenium has started
sleep 3
#Clear old test output
echo "-------------------------"
echo "  Clear Old Test Output  "
echo "-------------------------"
cd $WORKSPACE
ls examples/reports/*xml
find examples/reports/ -maxdepth 1 -type f -name "*.xml" -delete
ls examples/reports/*xml
# Fire nightwatch job with specified environment
echo "-------------------------"
echo "     Fire Nightwatch     "
echo "-------------------------"
node nightwatch.js --env development
# Job to configure nightwatch html reports
echo "-------------------------"
echo " Configure HTML Reports  "
echo "-------------------------"
# Using the $BUILD_TAG supplied by Jenkins to version the report
nightwatch-html-reporter -d examples/reports -t default -o $BUILD_TAG.html

