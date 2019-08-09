#!/bin/sh

# Removal of postgres-data used by graph-node to avoid 
# inconsistencies with ganache network

sudo rm -rf postgres-data/
sudo mkdir postgres-data/
docker-compose up 