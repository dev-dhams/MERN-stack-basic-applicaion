const express = require("express");
process.env.NODE_ENV !== "production" && require("dotenv").config();
const path = require('path')
const databaseConnection = require("./src/config/database.connection");
const createAdminUser = require('./src/config/createAdminUser')



const app = express();
app.use(express.json({ extended: false }));

// Connect Database
databaseConnection();

createAdminUser(process.env.ADMIN_NAME, process.env.ADMIN_EMAIL, process.env.ADMIN_PASS);

// Handel routing
app.use("/api", require("./src/routes/api/auth")); // Auth API Routes
app.use("/api", require("./src/routes/api/product")); // Product API Routes
app.use("/api", require("./src/routes/api/user")); // Product API Routes

// Serve static assets in production
if(process.env.NODE_ENV === "production"){
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res)=>{
        res.json({
            message : `API is running on PORT : ${process.env.PORT || 4000}`,
            description : `Make sure you build the frontend and set process.env.NODE_ENV = production`
        })
    })
}
app.listen(
    process.env.PORT || 4000,
    () => `Server is running at port ${process.env.PORT || 4000}`
); // npm run server
