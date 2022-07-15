#!/bin/bash

scp -i ~/linode.pem -r dist prisma package.json root@97.107.137.62:~/realworld
