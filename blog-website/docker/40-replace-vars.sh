echo "replacing variables in config.json"
cd /usr/share/nginx/html/assets

filename="config.json"
rm config.json
envsubst < ./config.prod.json > ./config.json
rm config.prod.json

