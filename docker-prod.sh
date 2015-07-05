#Script for running docker and uploading latest container to docker hub
##########################
#This script assumes that the container has been started and is running
#And has the name fdago-dev. If not, the script will fail.
##########################
echo "---------------------"
echo "Building Docker Image"
echo "---------------------"
docker build -t conceptplus/fdago .

echo "----------------------------------"
echo "Pushing Docker Image to Docker Hub"
echo "----------------------------------"
docker push conceptplus/fdago

echo "-----------------------------------------"
echo "Stopping the Current Running Docker Image"
echo "-----------------------------------------"
docker stop fdago
docker rm fdago

echo "----------------------------------------"
echo "Running Docker Image - conceptplus/fdago"
echo "----------------------------------------"
docker run -p 80:80 --name fdago -d conceptplus/fdago