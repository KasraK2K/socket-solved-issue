## Nginx Config and Start Proccess
&nbsp;

### Step 1

copy `nginx.conf` into `/etc/nginx/sites-available/nginx.conf`
For this reason you can you can run this command

```bash
cp ./nginx.conf /etc/nginx/sites-available/nginx.conf
```
&nbsp;

### Step 2

Link this config softly into `sites-enables`. You can use this command

```bash
ln -S /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/
```
&nbsp;

### Step 4
Test nginx config with this command
```
nginx -t
```

### Step 5
Use CertBot to add certificate
```
certbot --nginx -d example.com
```

### Step 6
Restart nginx service
```
systemctl restart nginx
```

### Step 7

Run `socket_system_ports.sh` with like this:

```bash
./socket_system_ports.sh
```

It will create `socket_system_ports.conf` into `/etc/nginx/socket_system_ports.conf` path.

<i>to change path modify `CONF_FILE` environment into `socket_system_ports.sh` file and `include` value in `nginx.conf` file</i>

On the other hand this script run the backend using `PM2` and scale it then it will reload the nginx.