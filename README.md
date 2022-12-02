# MY-STORE (Weekend Project)

MY-STORE is a open source full-stack web application project. build using React.js, Redux.js, Express.js and MongoDB.

## Installation
MY-STORE requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.
Installation commands for mac and linux users
```sh
git clone https://github.com/dharmeshphd/my-store
cd my-store
npm install && cd client && npm install && cd ..
```
Make sure you add yout own credentials of mongodb DATABASE. Requires to properly working of this application, after run the development server using below command.
```sh
npm run dev
```
## VS Code extesion (In place of postman)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.
 
## Tech Stack (MERN)
- [React](https://reactjs.org) - A JavaScript library for building user interfaces
- [Express](https://expressjs.com) - Fast and minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com) - MongoDB is a cross-platform document-oriented database.
- [NodeJS](https://nodejs.org/en/) - Node.js® is an open-source, cross-platform JavaScript runtime environment.

## Note
1. I used REST Client extension of VS Code for testing REST APIs (It is far more managable extension then POSTMAN)
2. API requests collection for REST Client extension (postman) is stored in "http_client : postman" directory
3. Some error handling in frontend and backend is still remaining. 
4. Most of routes on backend is protected, but it is possible to some may be still remained.
5. This is demo project and considering that the authantication system is simpler.
6. In real projects the authanication system must be more advaced then this.

## Test users 
| User | Email | Password | Role |
| ------ | ------ |------ | ------ |
| Mr. ADMIN | admin@admin.com | 123456 | Change permission of users, activate and deactivate users |
| Mr. SELLER | seller@seller.com | 123456 | Add new product to database |
| Mr. BUYER | buyer@buyer.com | 123456 | Able to add products to cart |
