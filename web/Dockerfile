FROM phusion/baseimage:0.9.22

MAINTAINER William Lin <ganlanyuan@gmail.com>

USER root 

# Install Node
ADD nodesource/setup_8.x /tmp/setup_8.x
RUN bash /tmp/setup_8.x
RUN apt-get update && \
    apt-get autoremove && \
    apt-get install -y build-essential \
                       libfontconfig \
                       nodejs

# Set colume & working directory
VOLUME ['/www/web']
WORKDIR /www/

# Globally install gulp-cli, nodemon
RUN npm install -g gulp-cli nodemon

# install packages
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install 
RUN mkdir -p /www && cd /www && ln -s /tmp/node_modules
ADD package.json /www/package.json
ADD package-lock.json /www/package-lock.json

# commands run on container starts
ADD start.sh /www/start.sh