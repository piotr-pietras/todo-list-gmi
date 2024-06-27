source .env

echo Env is set to $ENVIRONMENT

# Start
if [ $ENVIRONMENT = "development" ]; then
    npx prisma migrate dev
    npm run start:dev
elif [ $ENVIRONMENT = "production" ]; then
    npx prisma migrate deploy
    npm run build
    node ./dist/main.js
else
    echo \n ======= \n Envrionment variable is not set correctly
fi
