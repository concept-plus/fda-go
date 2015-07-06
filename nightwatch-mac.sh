#!/bin/bash
# Script to run Nightwatch tests locally on a Mac

echo "---------------"
echo "  Nightwatch!  "
echo "---------------"
echo "Running Nightwatch Automated UI Testing!"
echo "-------------------------"
echo " Install NPM Application "
echo "-------------------------"
cd test/nightwatch
npm install

# UNCOMMENT THIS OUT IF YOU WANT TO FIRE SELENIUM FROM THIS SCRIPT
# Download the Selenium Standalone Server Jar from <URL>
# Place it in the root of Nightwatch inside the project
#echo "-------------------------"
#echo "      Start Selenium     "
#echo "-------------------------"
#nohup java -jar sel-serv.jar &

#Clear old test output
echo "-----------------------"
echo " Clear Old Test Output "
echo "-----------------------"
find examples/reports/screenshots/ -maxdepth 2 -type f -name "*.png" -delete
find examples/reports/ -maxdepth 1 -type f -name "*.xml" -delete

#Fire nightwatch job with specified environment
echo "-------------------------"
echo "     Fire Nightwatch     "
echo "-------------------------"
node nightwatch.js
#node nightwatch-html-reporter -d examples/reports/ --theme 'default' --output 'generatedReport.html'
echo "*********************************************************"
echo "****************************************************"
echo "*********************************************"
echo "*************************************"
echo "*****************************"
echo "********************"
echo "************"
echo "******"
echo "*"
echo "Nightwatch has finished, please scroll up to view results"