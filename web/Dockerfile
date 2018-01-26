FROM phusion/baseimage:0.9.22

MAINTAINER William Lin <ganlanyuan@gmail.com>

USER root 

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && \
    apt-get install -y yarn wget

# Install Node
ADD nodesource/setup_8.x /tmp/setup_8.x
RUN bash /tmp/setup_8.x
RUN apt-get update && \
    apt-get autoremove && \
    apt-get install -y build-essential \
                       libfontconfig \
                       nodejs

# Install latest chrome dev package.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Set colume & working directory
VOLUME ['/www/web']
WORKDIR /www/

# Globally install gulp-cli, nodemon
# cache bust so we always get the latest version of LH when building the image.
ARG CACHEBUST=1
RUN yarn global add gulp-cli nodemon

# install packages
ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn 
RUN mkdir -p /www && cd /www && ln -s /tmp/node_modules
ADD package.json /www/package.json
ADD yarn.lock /www/yarn.lock

# Add the simple server.
COPY server.js /
RUN chmod +x /server.js

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Add a chrome user and setup home dir.
RUN groupadd -r chrome && useradd -r -m -g chrome -G audio,video chrome && \
    mkdir -p /www/reports && \
    chown -R chrome:chrome /www

USER chrome

# Disable Lighthouse error reporting to prevent prompt.
# ENV CI=true

EXPOSE 36377

# commands run on container starts
ADD start.sh /www/start.sh

ENTRYPOINT ["dumb-init", "--", "/entrypoint.sh"]