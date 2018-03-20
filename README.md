# Dockerfile
Dockerfile for [cmcdev](https://hub.docker.com/u/cmcdev/).

## cmcdev/web
Docker Image `cmcdev/web` is built on a [minimal Ubuntu image](https://github.com/phusion/baseimage-docker).   
With `node`, `bower`, `Sass` and `gulp` pre-installed, this images is suitable for front end development. 

#### Usage
Place `gulpfile.json` (and `docker-compose.yml`) in project folder (refer to the "sample" folder). Change the working directory to project folder. Then run one of the following command.   

- Docker run   
```
docker run -it --name web --rm -p 3000:3000 --mount type=bind,source=\"$(pwd)\",target= -w /www/web cmcdev/web sh
```
- Docker-compose  
```
docker-compose up
```
Continue on to run `bower` and `gulp` commands if needed.


## puppeteer
```
docker run --rm -t -e var=save --name puppeteer -p 2000:2000 --cap-add SYS_ADMIN --mount type=bind,source=\"$(pwd)\",target=/home/chrome puppeteer node test/puppeteer/puppeteer.js
```

## Rebuild
Copy this Repo, replace the `web/package.json` with yours, change the working directory to `web/` folder, and do 
```
docker build -t image_name .
```

## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.  