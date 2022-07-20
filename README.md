# realworld-nodejs-be

# Set up Prisma ORM
1. mysql installed
2. mysql -uroot < database/init_setting.sql
3. /bin/bash database/run_db_update.sh

# Set up environment
1. npm install -g typescript prisma
2. npm install
3. prisma db pull
4. prisma generate

# Run project
1. npm run build
2. npm start
### No automatic refreshing yet, please run step 1 every time you changed code.