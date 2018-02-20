#!/bin/bash

# Switch if you want to Lighthouse with full Chrome instead of headless.
# docker build -f Dockerfile.nonheadless -t lighthouse_ci . --build-arg CACHEBUST=$(date +%d)

docker build -t cmcdev/lighthouse:1.0.0 . --build-arg CACHEBUST=$(date +%d)
