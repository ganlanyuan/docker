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

# Install php
RUN apt-get update -q && apt-get install -yq --force-yes --no-install-recommends software-properties-common curl \ 
  && apt-add-repository ppa:ondrej/php -y \ 
  && apt-get update \ 
  && apt-get install -yq --force-yes --no-install-recommends \ 
    php7.0-cli \ 
    php7.0-dev \ 
    php-sqlite3 \ 
    php-gd \ 
    php-apcu \ 
    php-json \ 
    php-curl \ 
    php-gmp \ 
    php-imap \ 
    php-mbstring \ 
    php-mysql \ 
    php-memcached \ 
    php-readline \ 
    php-xml \ 
    php-zip \ 
    php-intl \ 
  && apt-get autoremove -qq \ 
  && apt-get clean -qq \ 
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* >/dev/null 2>&1

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
ADD package.json /www/package.json

# commands run on container start
ADD docker-start.sh /www/docker-start.sh