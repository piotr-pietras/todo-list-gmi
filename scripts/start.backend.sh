source .env

echo Env is set to $ENVIRONMENT

# Start
if [ $ENVIRONMENT = "development" ]; then
    npm run start:dev
elif [ $ENVIRONMENT = "production" ]; then
    npm run build
    cd dist
    node main.js
else
    echo \n ======= \n Envrionment variable is not set correctly
fi
