# TODO-LIST-GMI

Simple todo list

## Set dev env

How to set dev environment

### 1) Config

Firstly your mobile with expo and backend server must be at the same network (wifi)
Then check ip your device (laptop) on which you are going to start backend server

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
npm start
```

## Env

Env file should be enlisted in `.gitignore`
