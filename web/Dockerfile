FROM phusion/baseimage:latest

MAINTAINER William Lin <ganlanyuan@gmail.com>

USER root 

# Install Node & git
ADD nodesource/setup_6.x /tmp/setup_6.x
RUN bash /tmp/setup_6.x
RUN apt-get update && \
		apt-get install -y build-essential \
											 nodejs \
											 git \
											 ruby-sass

# Set colume & working directory
VOLUME ['/www/web']
WORKDIR /www/

# Globally install bower, gulp, nodemon
RUN npm install -g bower gulp nodemon && \
    echo '{ "allow_root": true }' > /root/.bowerrc

# install packages
ADD package.json /tmp/package.json
RUN cd /tmp && npm install 
RUN mkdir -p /www && cd /www && ln -s /tmp/node_modules

# commands run on container starts
ADD start.sh /www/start.sh