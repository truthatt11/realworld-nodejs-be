#!/bin/bash

scp -i ~/linode.pem -r src prisma package.json .env tsconfig.json tslint.json root@97.107.140.83:~/realworld
