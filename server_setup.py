from genericpath import isdir
import subprocess
import os
from pathlib import Path

def install(package):
    subprocess.check_call(['apt-get', 'install', package, '-y'])

def run_command(cmd = []):
    subprocess.check_call(cmd)

print("\n========================")
print("Django Deployment Setup")
print("========================\n")

print("[+] Before Setup Checklist")
print("1). STATIC_ROOT variable present in settings.py")
print("2). Ran the 'manage.py collectstatic' command")
print("3). DEBUG set to False")
print("4). ALLOWED_HOSTS contains the server's IP address or the wildcard (*)\n")
print("Failing to perform these steps may result in your site not functioning properly!\n")


setup_file = input("Please enter the path to the setup file: ")

# reading and parsing file #
file = open(setup_file, "r")

options=file.read().split('\n')
file.close()

django_install=''
gunicorn_install=''
nginx_install=''
default_user=''
project_dir=''
wsgi_dir=''

for o in options:
    try:
        opt_split=o.split('=')

        if opt_split[0].upper() == 'DJANGO_INSTALL':
            django_install=opt_split[1]
        if opt_split[0].upper() == 'GUNICORN_INSTALL':
            gunicorn_install=opt_split[1]
        if opt_split[0].upper() == 'NGINX_INSTALL':
            nginx_install=opt_split[1]
        if opt_split[0].upper() == 'DEFAULT_USER':
            default_user=opt_split[1]
        if opt_split[0].upper() == 'DJANGO_PROJECT_DIR':
            project_dir=opt_split[1]
        if opt_split[0].upper() == 'DJANGO_WSGI_DIR':
            wsgi_dir=opt_split[1]

    except:
        print("\nERROR: There was an error in the setup file, please ensure each option is on its own line and follows the following format: ")
        print("EXAMPLE=Value\n")
        exit()

# print(django_install)
# print(gunicorn_install)
# print(nginx_install)
# print(default_user)
# print(project_dir)
# print(wsgi_dir)

print("[+] Starting deployment process\n")

if django_install == "True":
    # install django
    install('python3-django')
else:
    print("Skipping django installation...")
if gunicorn_install == "True":
    # install gunicorn
    install('gunicorn')
else:
    print("Skipping gunicorn installation...")
if nginx_install == "True":
    # install nginx
    install('nginx')
else:
    print("Skipping nginx installation...\n")

# Setting up Gunicorn #
print("[+] Setting up gunicorn\n")
gunicorn_proceed = input("This script will override any previously made files and/or directories. Do you wish to proceed? [Y/N]: ").upper()

if gunicorn_proceed == 'N':
    print("[+] Stopping deployment")
    exit()

if os.path.isdir('/var/log/gunicorn'):
    run_command(['rm', '-r', '/var/log/gunicorn'])

run_command(['mkdir', '/var/log/gunicorn'])
print("Created gunicorn directory in /var/log")

file=open('/etc/systemd/system/gunicorn.socket', 'w')
file.write('[Unit]\nDescription=gunicorn socket\n\n')
file.write('[Socket]\nListenStream=/run/gunicorn.sock\n\n')
file.write('[Install]\nWantedBy=sockets.target\n')
file.close()

print("Created gunicorn.socket in /etc/systemd/system")

file=open('/etc/systemd/system/gunicorn.service', 'w')
file.write('[Unit]\nDescription=gunicorn daemon\nAfter=network.target\n\n')

wsgi_path=Path(wsgi_dir).parent.absolute().name
file.write('[Service]\nUser=' + default_user + '\nGroup=www-data\n' + 'WorkingDirectory=' + project_dir + '\nExecStart=/usr/bin/gunicorn' + ' --access-logfile - --workers 3 --bind unix:/run/gunicorn.sock ' + wsgi_path + '.wsgi:application\n\n')
file.write('[Install]\nWantedBy=multi-user.target\n')
file.close()

print("Created gunicorn.service in /etc/systemd/system")

run_command(['systemctl', 'start', 'gunicorn.socket'])
run_command(['systemctl', 'enable', 'gunicorn.socket'])
run_command(['systemctl', 'daemon-reload'])

print("Started gunicorn.socket (you may check the status using 'systemctl status gunicorn.sock')\n")

# Setting up NGINX #
print("[+] Setting up NGINX\n")
print('Please make sure that your django project settings.py file has a STATIC_ROOT variable, and that you run the manage.py collectstatic command')
nginx_proceed = input("Proceed? [Y/N]: ")

if nginx_proceed.upper() == 'N':
    exit()

server_ip = input("Enter the IP address for your server (default is 0.0.0.0): ")
server_port = input("Enter the port number for your server (default is 80): ")

if server_ip == "":
    server_ip = "0.0.0.0"

if server_port == "":
    server_port = '80'

if not os.path.isdir('/etc/nginx/sites-available'):
    print("Please make sure NGINX is installed. Aborting\n")
    exit()

file=open('/etc/nginx/sites-available/' + wsgi_path, 'w')
file.write('server {\n')
file.write('\tlisten ' + server_port + ';\n')
file.write('\tserver_name ' + server_ip + ';\n')
file.write('\tlocation = /favicon.ico { access_log off; log_not_found off; }\n')
file.write('\tlocation / {\n')
file.write('\t\tinclude proxy_params;\n')
file.write('\t\tproxy_pass http://unix:/run/gunicorn.sock;\n')
file.write('\t}\n')
file.write('\tlocation /static/ {\n')
file.write('\t\troot ' + project_dir + '/static;\n')
file.write('\t}\n')
file.write('}\n\n')
file.close()

run_command(['systemctl', 'stop', 'nginx'])

if os.path.isfile('/etc/nginx/sites-enabled/' + wsgi_path):
    run_command(['rm', '/etc/nginx/sites-enabled/' + wsgi_path])

run_command(['ln', '-s', '/etc/nginx/sites-available/' + wsgi_path, '/etc/nginx/sites-enabled/' + wsgi_path])

print("Created nginx configuration file.")

run_command(['systemctl', 'restart', 'nginx'])

print("Restarted nginx service.\n")

run_command(['gpawsswd', '-a', 'www-data', default_user])
run_command(['-u', 'www-data', 'stat', project_dir])

print("[+] Setup complete")
print("The setup has been completed, you can find your website at http://" + server_ip + ":" + server_port)