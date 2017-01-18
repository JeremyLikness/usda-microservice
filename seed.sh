set -m

cmd="mongod --httpinterface --rest --master"

$cmd &

RET=1
while [[ RET -ne 0 ]]; do
    echo "=> Waiting for confirmation of Mongo service startup"
    sleep 5
    mongo admin --eval "help" >/dev/null 2>&1
    RET=$?
done

cat /seed/FOOD_DES.txt | mongoimport --db usda --collection fooddescriptions --fields "id,group-id,description,name,alias,manufacturer,survey,refuse,refuse-percentage,scientific-name,nitrogen-factor,protein-factor,fat-factor,carbohydrate-factor" --ignoreBlanks --type csv 

fg