#!/usr/bin/env bash

systemctl daemon-reload
systemctl restart gunicorn
systemctl restart nginx

printf "Changes applied!\n"
