### Introduction
This is project shows how authentication (username/email, password) and user role works. And how account verification and forget password is implemented.

Technologies used: MERN

### Project Setup
- Go to each folder
- Open terminal
- Run: npm i
- change .env.example to .env and input data accordingly
- For server to start development server, run: npm run dev
- For client to start development server, run: npm start

### Nodemailer Setup for sending email verification
I use Google OAuth to authenticate my sender's email account
- Go to: https://console.developers.google.com/
- Create a new project 
- Go to Credentials and click on CREATE CREDENTIALS and choose OAuth Client
- Then go to configure CONSENT SCREEN as told by Google
- Then we get CLIENT ID and CLIENT SECRET. Paste them in .env file
- Then go to: https://developers.google.com/oauthplayground/ to get refresh_token
- When get refresh token, paste it in .env file too