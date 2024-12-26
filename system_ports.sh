#!/usr/bin/env bash

# 1) Figure out how many CPU cores and initial variables
NUM_CPUS=$(nproc)
PM2_PROJECT_NAME=socketApp
START_PORT=4150
CONF_FILE=/etc/nginx/socket_system_ports.conf

# 2) Generate Nginx ports conf
: >$CONF_FILE
for ((i = 0; i < $NUM_CPUS; i++)); do
    PORT=$((START_PORT + i))
    echo "        server 127.0.0.1:$PORT;" >>$CONF_FILE
done

# 3) Test Nginx config BEFORE reloading
echo "Testing Nginx configuration..."
nginx -t
if [ $? -ne 0 ]; then
    echo "Nginx config test failed. Aborting deployment."
    exit 1
fi
echo "Nginx config is valid."

# 4) Start the PM2 app in fork mode with 1 instance, then scale
echo "Starting and scaling PM2 app..."
pm2 start ecosystem.config.cjs --only $PM2_PROJECT_NAME
pm2 scale $PM2_PROJECT_NAME $NUM_CPUS

# 5) Reload Nginx since config is good
nginx -s reload
echo "Nginx reloaded successfully."

echo "Deployment complete!"
