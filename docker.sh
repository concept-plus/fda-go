#Script for running docker and uploading latest container to docker hub
echo "---------------------"
echo "Building Docker Image"
echo "---------------------"
docker build -t conceptplus/fdago-dev .

echo "----------------------------------"
echo "Pushing Docker Image to Docker Hub"
echo "----------------------------------"
docker push conceptplus/fdago-dev

echo "--------------------------------------------"
echo "Running Docker Image - conceptplus/fdago-dev"
echo "--------------------------------------------"
docker run -p 80:80 conceptplus/fdago-dev