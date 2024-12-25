# How to Use
<br />

## Step 1
copy `nginx.conf` into `/etc/nginx/sites-available/nginx.conf`
For this reason you can you can run this command
```bash
cp ./nginx.conf /etc/nginx/sites-available/nginx.conf
```
<br />

## Step 2
Link this config softly into `sites-enables`. You can use this command
```bash
ln -S /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/
```
<br />

## Step 3
Run `system_ports.sh` with like this:
```bash
./system_ports.sh
```

It will create `system_ports.conf` into `/etc/nginx/conf.d/system_ports.conf` path.

<i>to change path modify `CONF_FILE` environment into `system_ports.sh` file and `include` value in `nginx.conf` file</i>

On the other hand this script run the backend using `PM2` and scale it then it will reload the nginx.