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

```sh
npx -p npm@6 npm i --legacy-peer-deps
 npm i
 npm start
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

- [Node.js](https://nodejs.org/en) - JS runtime environment
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Firebase](https://firebase.google.com/) - Authentication — user login and identity
- [Firebase-admin](https://firebase.google.com/) - lets you interact with Firebase from privileged environments to perform actions
- [Bootstrap](https://getbootstrap.com/) - front-end open source toolkit for responsive site
- [Sash](https://themeforest.net/item/sash-bootstrap-5-admin-dashboard-template/35183671) - Admin template you can customize your dashboard effortlessly within no time.
- [VSCode](https://code.visualstudio.com) - Free source-code editor made by Microsoft
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Postman](https://www.getpostman.com/) - API testing
- [Git](https://git-scm.com) - Open source distributed version control system
- [Cloudinary](https://cloudinary.com) - Effortlessly optimize, transform, upload and manage your cloud's assets.
- [Stripe](hhttps://stripe.com/) - Online Payment Processing API payment gateway
- [MapQuest Dev API](https://developer.mapquest.com) - Free online web mapping service
- [Heroku](https://www.heroku.com/) - Cloud platform
- [Digital Ocean](https://www.digitalocean.com) - Cloud platform

## NPM Packages Frontend Development

- [ant-design](https://github.com/ant-design/ant-design/)
- [swiper](https://github.com/nolimits4web/swiper)
- [slick](https://github.com/kenwheeler/slick)
- [sweetalert2](https://github.com/sweetalert2/sweetalert2)
- [redux](https://github.com/reduxjs/redux)
- [axios](https://github.com/axios/axios)
- [eslint](https://github.com/eslint/eslint)
- [eslint-config-airbnb](https://github.com/airbnb/javascript)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-import](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-prettier](https://github.com/mysticatea/eslint-plugin-node)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [prettier](https://github.com/prettier/prettier)
- [webpack](https://github.com/webpack/webpack)

## NPM Packages Backend Development

- [firebase-admin](github.com/firebase/firebase-admin-node)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [morgan](https://github.com/expressjs/morgan)
- [multer](https://github.com/expressjs/multer)
- [body-parser](https://github.com/expressjs/body-parser#readme)
- [Uniqueid](github.com/adamhalasz/uniqid)
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
  - Pagination
  - Select specific fields in result
  - Limit number of results
  - Filter by fields
- Login
  - email
  - Password
- Register
  - Email registration
- registration complete
  - Redirect link from firebase then you can completly login as a user/admin
- Forgot Password
  - User can reset password using Forgot password menu
  - Validation on update
- Header
  - Home menu
  - Login menu
  - Register menu
  - User and logout menu

### 2) Before We Start

- We have complete a first major section in client side
- However we want to use our node server with mongodb
- That means the firebase client-side implementation pretty much ends here
- we'll use firebase to only log the user and get token (authentication)

- In our backend we will validate thet token using firebase admin so that our App is well secure
- what i mean by secure is that if we dont check the validity of token in the backend then anyone can send anything as a token to get access to protected routes/resource

- Once we implement fire base in backend, when user register or login to our app, we will create or update user in mongodb

- then we will comeback to our login/register page and make some adjustments, so then when user login, the response is from our backend.

### 3) Development Process

- Setup Server and Install Dependencies

```sh
npm i express body-parser mongoose cors morgan express-jwt firebase-admin jsonwebtoken nodemon dotenv
```

- Connect to NoSQL Database
  - Local mongodb server
  - Mongodb Atlas
- Hit Routes Endpoint Testing
- Setup Controllers
  - Auth
  - User
- Create Model
  - User
- Middleware
  - Auth
- API User Response
  - When user login, save user data to database.
- Current User From API
  - When user register, save user data to database.
  - Refactor Create or update user function in react
  - Service folder in client side for calling's API endpoint from server
- Role Base on Redirect
  - If user role = subscriber then redirect to user history page
  - If user role = admin then redirect to admin dashboard page
- Redirect Count Down
  - When user need to go to user history or Checkout (etc) without login then rediret to login page
  - show loading animation countdown when redirect in 5 second
- Sitebar Nav User History
  - creating User navbar component : User history, Password change, wishlist, etc.
- Change Password Feature
  - Current user login can update their own password
  - authentication from firebase service
  - change password form
  - validate all element, set loading, etc
- Admin Role authentication and athorization
  - Protecting routes for admin role (Backend)
  - Implementing middleware for admin role (backend)
  - When Admin login then redirect to admin dashboard (Frontend)
  - Create admin page (Frontend)
- Admin Authorization
  - Create Product
  - Must have Category
  - Must have Sub Category
  - CRUD in Dashboard panel
- Category
  - Category model (Backend)
  - Category controller and routes CRUD
  - Category CRUD Endpoint in frontend service
- Dynamic Dashboard Link
  - when user with role subscriber login then show option to their own history/settings/dashboard
  - when user with role admin login then show option to their own dashboard / Admin dashboard
- Admin Sidebar Navigation
  - List of admin sidebar navigation menu: Dashboard, Product, All Product, Category, Sub-Category, Coupon, and Password.
- Category Create and show of all list the category
  - Category form to create category
- Category Render and delete
  - Delete menu icon in category create admin dashboard
  - Update menu icon in category create admin dashboard
  - Category Delete Functionality
- Category update
  - category update page
  - update category and redirect to admin/category
  - refactor code for category Create and update form
- Search Filter Category (admin dasboard)
  - admin can search category by name of the product category
- Code Refactor search filter
  - Move search category code to local search
- Subcategory CRUD
  - create Subcategory model and populate to category
  - create subcategory Routes and controllers
- Subcategory Service (Frontend)
  - Subcategory page and services
- Subcategory Create
  - Calling API endpoint for subcategory service frontend enhanced
  - showing subcategory and remove
- Update Subcategory in admin dashboard

- Product (backend)

  - Create product model/schema mongoose
  - Product Routes and Controller
  - Product Controller - Get all product from database
  - Cloud Upload endpoints
  - Implementation Cloudinary SDK
  - Product image upload and delete route, controller and utils
  - List all product endpoints
  - Product Delete
  - Product Update Endpoint
  - New Arrival Product with sort, order and limit
  - Get total product count (pagination)
  - Star Ratings / average rating banckend
  - Related Product endpoint
  - Reformat Subcategory
  - Search and Filtering
  - Search redux setup
  - Filtering Product by Price range
  - Filtering product by category
  - Filter by Star Ratings
  - Filtering by Subcategory
  - Filtering Product by Shipping, Color and Brand
  - Cart Model
  - User Cart Controller and routes
  - Get user cart from database
  - Empty/remove user cart in checkout
  - Save User address in checkout
  - Coupon Shcema model
  - Coupon Routes and Controller
  - Apply discount Coupon in user Cart Enpoint
  - Create Payment Intent stripe, routes, and controller
  - Total After Discount backend

- Product (frontend)
  - Create product page, product services and routes (admin autorization)
  - create product form
  - Frist test to create Product from client to send to server
  - Alert and reload page after product was created
  - Error handler when create duplicate value name or title in product
  - Refactor Product code - component and page
  - Create product with category
  - get subcategory base on parent category
  - subcategory props - calling subcategory when choosing category in create product on admin dashboard
  - Multiple select for subcategory form
  - create product with subcategory array
  - file / image resize in react
  - multiple image upload (cloud storage)
  - product image preview when upload in admin dasboard
  - Product create with multiple images
  - Fetch all products in admin dashboard
  - Admin products card
  - All product page admin dashboard
  - Default image, edit-delete icon, and sort the description
  - Delete Product
  - Product slug from router (update product)
  - Product Update Component
  - Prepopulate shipping color and brand (Update component)
  - Prepopulate Caategory in product update
  - Prepopulate Subcategory in product update
  - Category and Subcategory Sync on update product feature
  - Image Upload in Update Product feature
  - Product Update (Final)
  - Fetch product in home page
  - Product Card in Home Page
  - Fetch product in card - Home Page
  - Product loader card skeleton in home page
  - Calling reuseable Product endpoint in home page
  - New Arrival Card component
  - Best Seller Card Component
  - Product Detail page
  - Product detail carausel, title, price and description
  - Handle no product images in product details
  - Product detail specification
  - Tab menu for description and specification in Product detail
  - display Star Rating in product detail (log)
  - star ratings modal
  - Login to leave ratings
  - login to leave ratings and redirect page to home
  - API Request for product star ratings
  - Show user existing ratings in product they vote
  - Show Average rating total in product detail
  - Show Average rating total product in home page
  - Show related product in product detail
  - Category list in home page
  - fetch Single category test
  - Click category then show product only with the same category (ex. apple => product : apple)
  - Category page with product
  - Subcategory page with product showing
  - Shop Page menu
  - search by text title
  - Filter product by price range (slider)
  - Filtering product by category
  - reset filtering when choose one filter/search (ex, search, category, price, etc)
  - Filter product by Star rating
  - Filter product by subcategory
  - Filter product by Brands
  - Filter product by Color
  - Filter product by Shipping
  - Add product to local storage
  - Cart in redux state
  - dispatch add to cart to redux
  - Cart Page Setup {JSON.Stringify}
  - Cart Total
  - if user not login give option to login page then after login redirect to cart for checkout.
  - Cart item in table
  - Product cart Quantity increase and decrease amount stock
  - Remove product from cart (localStorage)
  - Product cart drawer feature
  - Checkout page setup
  - Save cart request
  - Get user cart in checkout page
  - user Checkout order
  - Empty user cart in checkout pages
  - User Address in checkout
  - Save user address in checkout pages
  - Coupon Page in admin dashboard
  - Create Coupon in admin dashboard
  - Coupon List and delete in admin dashboard
  - Apply Coupon in Checkout page (console.log)
  - Coupon Applied and Set total discount price (Checkout page)
  - Coupon Invalid and coupon success applied messages in checkout pages
  - Coupon in redux
  - React Stripe Setup in frontend
  - Stripe Checkout component
  - Successful payment
  - show discount and coupon applied in frontend

## TODO to fix

- All heading in admin dashboard not showing because sticky header.
- Register complete not working
- Pagination/loadmore for product list in admin dashboard
- Update all product with the real image, description, title, etc.
- Add newline when showing description in product detail.
- Fix Price number in product detail.
- show total/Length customer review

## Articles

- [mongodb atlas documentation](https://docs.atlas.mongodb.com/getting-started/)

- [How to use mongodb atlas](https://kaloraat.com/articles/how-to-use-mongodb-atlas)

## Future Updates

- Make User interface more beautiful with react material UI
- Implementing clean code architecture
- Refactoring code for client side (Frontend)
- Refactoring code for server (Backend)
- Improve authentication and authorization
- And More ! There's always room for improvement!

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

- This project is part of the online course I've taken at Udemy. Thanks to Ryan Dhungel for creating this awesome course! Link to the course: [React Redux Ecommerce - Master MERN Stack Web Development](https://www.udemy.com/course/react-redux-ecommerce/)
