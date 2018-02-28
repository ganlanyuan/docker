# copy from https://github.com/ebidel/lighthouse-ci
FROM node:8-slim

MAINTAINER William Lin <ganlanyuan@gmail.com>

# Install utilities
RUN apt-get update --fix-missing && apt-get -y upgrade

# Install latest chrome dev package.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

ARG CACHEBUST=1
RUN npm i browser-sync -g

# Install local lighthouse, browsersync, ngrok.
COPY package.json .
RUN npm i --production

# Add a chrome user and setup home dir.
RUN groupadd -r chrome && useradd -r -m -g chrome -G audio,video chrome && \
    mkdir -p /home/chrome/reports && \
    chown -R chrome:chrome /home/chrome

USER chrome

VOLUME /home/chrome/reports
WORKDIR /home/chrome/reports

# Disable Lighthouse error reporting to prevent prompt.
# ENV CI=true

EXPOSE 8080