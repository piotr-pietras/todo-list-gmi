# TODO-LIST-GMI

Simple todo list

## Set dev env

How to set dev environment

### 1) Config

Firstly your mobile with expo and backend server must be at the same network (wifi)
Then check your device ip (laptop) on which you are going to start backend server

for linux:

```
hostname -I
```

for windows:

```
ipconfig
```

and paste it into `.env` file into `HOST_URL`

### 2) Start backend server

In order to start backend server type

```
docker compose up
```

### 3) Start mobile app

In order to start expo framework firstly inject env variables then start the framework

```
cd mobile
npm run injectEnv
npm install
npm start
```

## Doc

Documentaion is available at `http://localhost:3000/api` if backend container is running

## E2E test

In order to start e2e tests for api type
```
cd backend
npm run test:e2e
```
