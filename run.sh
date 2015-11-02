#!/bin/sh
gulp watch &
HTTP_PORT=8081 node app &

