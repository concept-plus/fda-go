#!/bin/bash
# My first script

echo "--------------------------------"
echo "Jenkins Selenium Nightwatch Job!"
echo "--------------------------------"
echo $PWD
echo "--------------------------"
echo " Install NPM Applications  "
echo "--------------------------"
npm install
#Start Selenium 
echo "-------------------------"
echo "      Start Selenium     "
echo "-------------------------"
#cd lib
#nohup java -jar sel-serv.jar &
#wait 3 seconds to make before continuing to make sure selenium has started
#sleep 3
#Clear old test output
echo "-------------------------"
echo "  Clear Old Test Output  "
echo "-------------------------"
#cd ../
#cd $WORKSPACE
find examples/reports/screenshots/ -maxdepth 2 -type f -name "*.png" -delete
find examples/reports/ -maxdepth 1 -type f -name "*.xml" -delete
#Fire nightwatch job with specified environment
echo "-------------------------"
echo "     Fire Nightwatch     "
echo "-------------------------"
node $PWD/nightwatch.js --env localmac
# job to configure nightwatch html reports
