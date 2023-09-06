#!/usr/bin/env sh
set -eu
envsubst '${SERVER_NAME} ${BACKEND_SERVER_HOST} ${BACKEND_SERVER_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec "$@"
