<h1 align="center">
  <br>
  RNT Computer App - Fullstack web development Specifications
  <br>
</h1>

<h4 align="center">Fullstack web development (MERN) for RNT Computer Application, which is an Aplication directory website built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>

 <p align="center">
 <a href="#deployed-version">Demo</a> •
  <a href="#api-usage">API Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#installation">Installation</a> •
  <a href="#build-with">Build With</a> •
  <a href="#npm-packages">NPM Packages</a> •
  <a href="#demonstration">Demonstration</a> •
  <a href="#future-updates">Future Updates</a> • 
  <a href="#known-bugs">Known Bugs</a> • 
  <a href="#acknowledgement">Acknowledgement</a>
</p>

## Deployed Version
Live demo (Feel free to visit) 👉 : https://rian-bootcamp.herokuapp.com/

## API Usage

Check: 

[Bootcamp Booking API Documentation Postman](https://documenter.getpostman.com/view/16994323/UVkiSJNz)

[Bootcamp Booking API Documentation Swagger](https://app.swaggerhub.com/apis-docs/rnt-development-one/bootcamp-booking_api/1.0) 

for more info.

## Deployment
The website is deployed with git into heroku. Below are the steps taken:
```
git init
git add -A
git commit -m "Commit message"
heroku login
heroku create
heroku config:set CONFIG_KEY=CONFIG_VALUE
git push heroku master
heroku open
```

## Installation
You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the dependencies by running
```
$ npm i
$ npm start
```

## Run App in Development for client / React
```sh
 npm start
```

## Run App in Development for Server / Node
```sh
 npm run dev
```

## Import Data to Database
```sh
 node seeder -import
```

## Import Data to Database
```sh
 node seeder -destroy
```

## Build With

* [Node.js](https://nodejs.org/en) - JS runtime environment
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Firebase](https://firebase.google.com/) - Authentication — user login and identity
* [Firebase-admin](https://firebase.google.com/) - lets you interact with Firebase from privileged environments to perform actions
* [VSCode](https://code.visualstudio.com) - Free source-code editor made by Microsoft
* [Express](http://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Postman](https://www.getpostman.com/) - API testing
* [Git](https://git-scm.com) - Open source distributed version control system
* [Cloudinary](https://cloudinary.com
) - Effortlessly optimize, transform, upload and manage your cloud's assets.
* [Stripe](hhttps://stripe.com/) - Online Payment Processing API payment gateway
* [MapQuest Dev API](https://developer.mapquest.com) - Free online web mapping service
* [Heroku](https://www.heroku.com/) - Cloud platform
* [Digital Ocean](https://www.digitalocean.com) - Cloud platform

## NPM Packages

- [dotenv](https://github.com/motdotla/dotenv#readme)
- [ant-design](https://github.com/ant-design/ant-design/)
- [redux](https://github.com/reduxjs/redux)
- [axios](https://github.com/axios/axios)
- [firebase-admin](github.com/firebase/firebase-admin-node)
- [morgan](https://github.com/expressjs/morgan)
- [multer](https://github.com/expressjs/multer)
- [body-parser](https://github.com/expressjs/body-parser#readme)
- [Uniqueid](github.com/adamhalasz/uniqid)
- [eslint](https://github.com/eslint/eslint)
- [eslint-config-airbnb](https://github.com/airbnb/javascript)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-import](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-prettier](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [ndb](https://github.com/GoogleChromeLabs/ndb)
- [prettier](https://github.com/prettier/prettier)
- [nodemon](https://github.com/remy/nodemon)
- [slugify](https://github.com/simov/slugify)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize#readme)
- [xss-clean](https://github.com/jsonmaur/xss-clean)
- [helmet](https://github.com/helmetjs/helmet)
- [hpp](https://github.com/analog-nico/hpp)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- [express-jwt](github.com/auth0/express-jwt)
- [cors](https://github.com/expressjs/cors)
- [validator](https://www.npmjs.com/package/validator)
- [compression](https://www.npmjs.com/package/compression)

## Demonstration
### 1) User Authentication client side using firebase
- Home 
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Login
  * email
  * Password
- Register
  * Email registration
- registration complete
  * Redirect link from firebase then you can completly login as a user/admin
- Forgot Password
  * User can reset password using Forgot password menu
  * Validation on update
- Header
  * Home menu
  * Login menu
  * Register menu
  * User and logout menu

### 2) Before We Start
- We have complete a first major section in client side
- However we want to use our node server with mongodb
- That means the firebase client-side implementation pretty much ends here
- we'll use firebase to only log the user and get token (authentication)

- In our backend we will validate thet token using firebase admin so that our App is well secure
- what i mean by secure is that if we dont check the validity of token in  the backend then anyone can send anything as a token to get access to protected routes/resource

- Once we implement fire base in backend, when user register or login to our app, we will create or update user in mongodb

- then we will comeback to our login/register page and make some adjustments, so then when user login, the response is from our backend.

### 3) Development Process
- Setup Server and Install Dependencies
```sh
npm i express body-parser mongoose cors morgan express-jwt firebase-admin jsonwebtoken nodemon dotenv
```
- Connect to NoSQL Database
  * Local mongodb server
  * Mongodb Atlas
- Hit Routes Endpoint Testing
- Setup Controllers
  * Auth
  * User
- Create Model
  * User
- Middleware
  * Auth
- API User Response
  * When user login, save user data to database.
- Current User From API
  * When user register, save user data to database.
  * Refactor Create or update user function in react
  * Service folder in client side for calling's API endpoint from server
- Role Base on Redirect
  * If user role = subscriber then redirect to user history page
  * If user role = admin then redirect to admin dashboard page
- Redirect Count Down
  * When user need to go to user history or Checkout (etc) without login then rediret to login page
  * show loading animation countdown when redirect in 5 second
- Sitebar Nav User History
  * creating User navbar component : User history, Password change, wishlist, etc.
- Change Password Feature
  * Current user login can update their own password
  * authentication from firebase service
  * change password form
  * validate all element, set loading, etc
- Admin Role authentication and athorization
  * Protecting routes for admin role (Backend)
  * Implementing middleware for admin role (backend)
  * When Admin login then redirect to admin dashboard (Frontend)
  * Create admin page (Frontend)
- Admin Authorization
  * Create Product
  * Must have Category
  * Must have Sub Category
  * CRUD in Dashboard panel
- Category 
  * Category model (Backend)
  * Category controller and routes CRUD
  * Category CRUD Endpoint in frontend service


## Articles
[mongodb atlas documentation](https://docs.atlas.mongodb.com/getting-started/)

[How to use mongodb atlas](https://kaloraat.com/articles/how-to-use-mongodb-atlas)

## Future Updates

* Make User interface more beautiful with react material UI
* Implementing clean code architecture
* Refactoring code for client side (Frontend)
* Refactoring code for server (Backend)
* Improve authentication and authorization
* And More ! There's always room for improvement!

## Known Bugs
Feel free to email me at rianto.rnt@gmail.com if you run into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂


## Route Structure Client

> /Home

> /login

> /register

> /forgotpassword

> /complete/registration

## Route Structure Server

> /Home

> /login

> /register

> /forgotpassword

> /complete/registration

# Acknowledgement

* This project is part of the online course I've taken at Udemy. Thanks to Ryan Dhungel for creating this awesome course! Link to the course: [React Redux Ecommerce - Master MERN Stack Web Development](https://www.udemy.com/course/react-redux-ecommerce/)