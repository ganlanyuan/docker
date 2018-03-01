FROM phusion/baseimage:0.9.22

MAINTAINER William Lin <ganlanyuan@gmail.com>

USER root 

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && \
    apt-get install -y yarn wget

# Install Node
ADD nodesource/setup_8.x /tmp/
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
# cache bust so we always get the latest version of LH when building the image.
ARG CACHEBUST=1
RUN yarn global add gulp-cli nodemon

# install packages
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn 
RUN mkdir -p /www && cd /www && ln -s /tmp/node_modules
ADD package.json yarn.lock /www/

# commands run on container starts
ADD start.sh /www/start.sh