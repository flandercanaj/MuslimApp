#!/bin/bash

MONGO_URI=${MONGO_URI:-"mongodb://localhost:27017"}
MONGO_USER="admin"
MONGO_PASS="securepassword"

mongo $MONGO_URI --eval "db.createUser({user: '$MONGO_USER', pwd: '$MONGO_PASS', roles: [{role: 'readWrite', db: 'admin'}]});"

echo "MongoDB user $MONGO_USER created successfully."
