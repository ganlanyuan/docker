# https://github.com/Interlutions/docker-node/blob/master/Dockerfile
FROM node:8

MAINTAINER William Lin <ganlanyuan@gmail.com>

RUN apt-get update && apt-get install -y libnss3 libxss1 libasound2 libpangocairo-1.0-0 libx11-xcb-dev libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libcups2 libxrandr-dev libgconf-2-4 libatk1.0-0 libgtk-3-0

RUN npm install -g yarn

RUN mkdir -p /home/chrome && cd /home && yarn add critical@1.1.0

VOLUME /home
WORKDIR /home/chrome