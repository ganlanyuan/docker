#Dockerfile
Dockerfile for [cmcdev](https://hub.docker.com/u/cmcdev/).

## cmcdev/web
Docker Image `cmcdev/web` is built on a [minimal Ubuntu image](https://github.com/phusion/baseimage-docker).   
With `PHP`, `node`+`npm`, `git`, `bower`, `libsass`, `Sass` pre-installed, this images is suitable for front-end development. 

#### Usage
Place `gulpfile.json` (and `docker-compose.yml`) in project folder (refer to sample folder). Change the working directory to project folder. Then run one of the following command.   

- Docker run   
```
docker run -it --name web --rm -p 3000:3000 -p 3001:3001 -v $(pwd):/www/web -w /www/web cmcdev/web sh
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

## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.  