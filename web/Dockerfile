# Version 1.2.0 

# PHP 7.0.10
# node v6.9.4
# npm 3.10.3
# bower 1.7.9
# libsass 3.3.6
# Sass 3.4.21

FROM phusion/baseimage:latest

MAINTAINER William Lin <ganlanyuan@gmail.com>

# Install Python & PIP 
RUN apt-get update; \
    apt-get install -y -qq python-dev python-pip python-distro-info; \ 
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* 

USER root 

# Install yarn
RUN mkdir -p /opt
# download the latest yarn at https://yarnpkg.com/latest.tar.gz
# rename the package to "latest.tar.gz"
ADD latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

# Install Node
ENV NODE_VERSION 6.9.4 
ENV NODE_DIR /opt/nodejs 
ENV PATH $PATH:${NODE_DIR}/bin 

RUN mkdir ${NODE_DIR} && \
    curl -L https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz | tar xvzf - -C ${NODE_DIR} --strip-components=1

RUN apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

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

# Install ruby-sass & git
RUN apt-get update && apt-get install -y ruby-sass git

# Set colume & working directory
VOLUME ['/www/web']
WORKDIR /www/

# Install gulp & bower globally
RUN yarn global add gulp bower npm-check-updates && \
    echo '{ "allow_root": true }' > /root/.bowerrc

# install packages
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /www && cd /www && ln -s /tmp/node_modules

# commands run on container start
ADD docker-start.sh /www/docker-start.sh

CMD ["node", "php", "-a"]