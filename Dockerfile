FROM node:15.14.0
#OUR APP LIVES HERE INSIDE THE CONTAINER 
WORKDIR /usr/src/app
#NEED NODEJS DEPENDENCIES + LOCKFILE COPIED TO WORKDIR
COPY  package.json* ./
#INSTALL
RUN npm install
#COPY EVERYTHING TO THE CONTAINER
COPY . /usr/src/app
#EXPOSE PORT 3000
EXPOSE 3000
#Installing nodemon globally inside the docker
RUN npm install -g nodemon

#package.json -> start
CMD [ "npm" ,"start" ]