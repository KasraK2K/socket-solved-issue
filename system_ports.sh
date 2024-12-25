#!/usr/bin/env bash

# 1) Figure out how many CPU cores and initial variables
NUM_CPUS=$(nproc)
PM2_PROJECT_NAME=socketApp
START_PORT=3000
CONF_FILE=/etc/nginx/conf.d/system_ports.conf

# 2) Start the PM2 app in fork mode with 1 instance, then scale
pm2 start ecosystem.config.cjs --only $PM2_PROJECT_NAME
pm2 scale $PM2_PROJECT_NAME $NUM_CPUS

# 3) Generate Nginx ports conf
: >$CONF_FILE
for ((i = 0; i < $NUM_CPUS; i++)); do
    PORT=$((START_PORT + i))
    echo "    server 127.0.0.1:$PORT;" >>$CONF_FILE
done

# 4) Reload Nginx
nginx -s reload

echo "Deployment complete!"
