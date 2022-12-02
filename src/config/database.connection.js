const mongoose = require("mongoose");

const mongo_db_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.DATABASE_NAME}`;

const databaseConnection = async () => {
    try {
        await mongoose.connect(mongo_db_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb database connected successfully @ ${process.env.MONGODB_HOST}`);
    } catch (err) {
        console.log(
            "In case of localhost, make sure you started mongodb instance."
        );
        console.log("start =>", "brew services start mongodb-community@6.0");
        console.log("stop =>", "brew services stop mongodb-community@6.0");
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = databaseConnection;
