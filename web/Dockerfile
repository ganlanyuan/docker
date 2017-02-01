# Version 2.0.0 

# node 6.x
# bower 1.8.0
# libsass 3.3.6

FROM phusion/baseimage:latest

MAINTAINER William Lin <ganlanyuan@gmail.com>

USER root 

# Install Node & git
ADD nodesource/setup_6.x /tmp/setup_6.x
RUN bash /tmp/setup_6.x
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y nodejs
RUN apt-get install -y git

# Install yarn
RUN mkdir -p /opt
# download the latest yarn at https://yarnpkg.com/latest.tar.gz
# rename the package to "latest.tar.gz"
ADD latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

# Set colume & working directory
VOLUME ['/www/web']
WORKDIR /www/

# Globally install gulp & bower
RUN yarn global add gulp bower && \
    echo '{ "allow_root": true }' > /root/.bowerrc

# install packages
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
# RUN mkdir -p /www && cd /www && ln -s /tmp/node_modules
RUN mkdir -p /www/web && cp -a /tmp/node_modules /www/web/

# commands run on container start
ADD start.sh /www/start.sh
ADD package.json /www/web/package.json

CMD ["node"]