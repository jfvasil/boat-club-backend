[Unit]
Description=lake-wickaboag-backend
After=multi-user.target

[Service]
ExecStart=/usr/bin/node /home/ec2-user/boatClub-React/Backend/server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=lake-wickaboag-backend
User=ec2-user
EnvironmentFile=/home/ec2-user/boatClub-React/Backend/app.env

[Install]
WantedBy=multi-user.target