### Introduction
This branch is for deployment on heroku.

The DEMO is [here](https://mern-auth-with-username.herokuapp.com/) 👈👈. CLICK AND CHECK IT!!

Technologies used: MERN

### How to deploy on heroku
#### Create accounts
- Create Mongo Atlas account
- Connect our app to mongodb Atlas
- Create Heroku account
- In heroku account, choose “connect to github”. It’s easier. No need any command line.
- run 'npm init' to create outer package.json (this way heroku can detect our app as node.js. Otherwise, you'll get build fail error when deploy)
- modify the outer package.json including: scripts, dependencies (use the file in this branch as reference)

#### Backend side
- Modify server.js file in server folder

#### Client side
- Modify the API call URL (Coz client and backend is served on the same server)
- Then push everything to github

#### Heroku
- add .env stuff into config_var of heroku
- Then just deploy it
