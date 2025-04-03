#!/bin/bash

BACKUP_DIR="/backup/mongodb"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
MONGO_URI=${MONGO_URI:-"mongodb://localhost:27017"}
BACKUP_PATH="$BACKUP_DIR/mongo_backup_$TIMESTAMP"

mkdir -p $BACKUP_DIR
mongodump --uri="$MONGO_URI" --out="$BACKUP_PATH"

echo "MongoDB backup saved at $BACKUP_PATH"
