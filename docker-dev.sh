#Script for running docker and uploading latest container to docker hub
##########################
#This script assumes that the container has been started and is running
#And has the name fdago-dev. If not, the script will fail.
##########################
echo "---------------------"
echo "Building Docker Image"
echo "---------------------"
docker build -t conceptplus/fdago-dev .

echo "----------------------------------"
echo "Pushing Docker Image to Docker Hub"
echo "----------------------------------"
docker push conceptplus/fdago-dev

echo "-----------------------------------------"
echo "Stopping the Current Running Docker Image"
echo "-----------------------------------------"
docker stop fdago-dev
docker rm fdago-dev

echo "--------------------------------------------"
echo "Running Docker Image - conceptplus/fdago-dev"
echo "--------------------------------------------"
docker run -p 8000:80 --name fdago-dev -d conceptplus/fdago-dev