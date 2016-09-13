#Dockerfile
Dockerfile for [cmcdev](https://hub.docker.com/u/cmcdev/).

## cmcdev/web
Docker Image `cmcdev/web` is built on a [minimal Ubuntu image](https://github.com/phusion/baseimage-docker).   
With `PHP`, `node`+`npm`, `git`, `bower`, `libsass`, `Sass` pre-installed, this images is suitable for front-end development. 

#### Usage
Place `gulpfile.json` (and `docker-compose.yml`) in project folder (refer to sample folder). Change the working directory to project folder. Then run one of the following command.   

- Docker run   
```
docker run -it --name web --rm -p 8000:8000 -p 3000:3000 -p 3001:3001 -v $(pwd):/www/web -w /www/web cmcdev/web sh
```
- Docker-compose  
```
docker-compose up -d
```
Continue on to run `bower` and `gulp` commands.

#### Rebuild
Copy this Repo, replace the `web/package.json` with yours, change the working directory to `web/` folder, and do 
```
docker build -t image_name .
```
#### Version 1.0.2
[Dockerfile](https://github.com/ganlanyuan/dockerfile/blob/0e3154488fa427d6010b854ef8e0925936a198d0/web/Dockerfile), 
[Packages](https://github.com/ganlanyuan/dockerfile/blob/0e3154488fa427d6010b854ef8e0925936a198d0/web/package.json)  

#### Version 1.0.3
[Dockerfile](https://github.com/ganlanyuan/dockerfile/blob/e6ba55c962c9b7863d619015b0e7bb49fd07dcea/web/Dockerfile), 
[Packages](https://github.com/ganlanyuan/dockerfile/blob/e6ba55c962c9b7863d619015b0e7bb49fd07dcea/web/package.json)  

## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.  