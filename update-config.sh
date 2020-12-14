sudo docker exec production_server sh /root/update-prepare.sh
sudo docker cp ./update-files/* production_server:/var/www/html/
sudo docker exec production_server sh /root/update-complete.sh

rm -r ./update-files/*