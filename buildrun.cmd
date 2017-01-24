docker rmi usdamicroservice_db
docker rmi usdamicroservice_seed
docker rmi usdamicroservice_web
docker rmi usdamicroservice_descriptions
cd usdaweb 
cmd /c npm install 
cmd /c ng build --prod --aot 
cd ..
docker-compose up