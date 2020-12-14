sudo docker exec production_server sh /root/download-prepare.sh
sudo rm -rf ./download-files/*
mkdir ./download-files/
sudo docker cp production_server:/root/download-prepare-files/* ./download-files/
echo "Transfered files to ./download-files/";