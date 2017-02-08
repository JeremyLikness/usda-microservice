#!/bin/bash
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

files=("FOOD_DES.txt" \
 "FD_GROUP.txt" \
 "NUT_DATA.txt" \
 "NUTR_DEF.txt" \
 "WEIGHT.txt")
collections=("fooddescriptions" \
 "foodgroups" \
 "nutrientdata" \
 "nutrientdefinitions" \
 "weight")
fields=("id,group-id,description,name,alias,manufacturer,survey,refuse,refuse-percentage,scientific-name,nitrogen-factor,protein-factor,fat-factor,carbohydrate-factor" \
    "id,name" \
    "food-id,nutrient-id,hundred-grams,data-points,std-error,code,derivation-code,ref-id,nutrient-mark,studies,min,max,degrees-freedom,low-error,high-error,comments,add-date,confidence" \
    "id,uom,tag,description,round,order" \
    "food-id,sequence,amount,description,gram-weight,data-points,deviation")

idx=0 

for file in "${files[@]}" 
do 

sed -i 's/\"/''/g' /seed/$file
sed -i 's/\~/\"/g' /seed/$file
sed -i 's/\^/,/g' /seed/$file
collection=${collections[idx]}
field=${fields[idx]}
cat /seed/$file | mongoimport --db usda --collection $collection --fields $field --ignoreBlanks --type csv

idx=$(( $idx + 1 ))

done

fg