# USDA Microservices

This is a simple example of building an environment with Docker for micro-services. The services aren't intended to be "pure" examples but rather provide a point of reference for two key aspects: 

1. The use of [micro-locator](https://github.com/jeremylikness/micro-locator) as a means to resolve end points in the app
2. The use of [docker compose](https://docs.docker.com/compose/) to stand up the environment 

The app is designed to use specific, user-friendly paths for endpoints like `/descriptions` or `/groups` and then the locator service maps them to actual domains, ports, and sub-paths as needed. 

After you install the pre-requisites (Docker), you should be able to get up and running in just a few minutes if not seconds using the provided scripts. This demonstrates the power of using containers for development: you can start working with a full project including a populated database, active web service, and functional website in a very short period of time.

## Prerequisites

1. [Docker](https://www.docker.com/)

## Clone 

`git clone https://github.com/jeremylikness/usda-microservices.git `

## Quick Start 

Once you have the prerequisites installed and the project cloned, one command will do everything you need including building and standing up the services and website: 

`docker-compose up`

When you see the console indicate everything has been built and is ready, navigate to [http://localhost](http://localhost). 

Localhost not available on your machine? Under the `web` section in `docker-compose.yml` change the "80:80" to "80:MY_PORT" where MY_PORT is a custom port number. 

## What is happening? 

The Docker compose file defines the environment. The Mongodb instance is not accessible except from the other docker containers (it is aliased as `db` for the `descriptions` service via the `links` directive). The service and website both expose ports because the browser must access them. When the compose file is run, it builds the images and runs them for you. 

### Seed 

This is a lightweight Ubuntu image solely used to stage the USDA files. These are obtained from the [USDA National Nutrient Database for Standard Reference](https://www.ars.usda.gov/northeast-area/beltsville-md/beltsville-human-nutrition-research-center/nutrient-data-laboratory/docs/usda-national-nutrient-database-for-standard-reference/). The container spins up, copies the zipped files, unzips them and exposes a volume for use by another container. This is a "throwaway" container just for setup.

### Db 

This container is solely based on the standard [mongo](https://hub.docker.com/_/mongo/) image. When the image is run, it executes the custom `seed.sh` script. This script waits for the database engine to start, then imports the USDA files into the database. 

### Descriptions 

This is a Node project that uses the [micro](https://github.com/zeit/micro) package to stand up two endpoints. The `/groups` path will serve the list of food groups, and any other path will serve a list of food descriptions. Passing the `groupId` and/or `search` parameters will filter the list. 

This is an interesting container because it uses a special "on build" image from Node. This will automatically leverage the Node project, run npm install for dependencies, and create a container with the bare minimum set of services required to run the Node project, which in this case is our microservice. 

### Nutrients 

This is a Node project that uses the [micro](https://github.com/zeit/micro) package to stand up a single endpoint. The `/id` path will serve the description, weights, and nutrients for a food item with id being the food item id.

Note the use of aggregate to "join" in the solution. The description and weights are fetched separately, but the nutrient data and information is a table join. 

### Ngbuild 

This is another throwaway image. It sets up a Node 6.x environment, installs the Angular 2 CLI, copies the source for the web app, builds it, then exposes the output as a volume for mounting by the `Web` image.

### Web 

The web image is an [Angular 2](https://angular.io) website. Node is used in the `ngbuild` image to build the project with ahead-of-time compilation for a lightweight and fast payload. When the project is built, the `Dockerfile` starts with the base [nginx](https://hub.docker.com/_/nginx/) image, maps the static files generated for the Angular 2 project using [Webpack](https://github.com/webpack/webpack) and exposes the default HTTP port. 

You can type text to filter results and/or restrict it to a group (the text filter requires a minimum of 3 characters if a group is not selected).

## Clean up 

`docker-compose down` 

Optionally: 

`docker system prune` 