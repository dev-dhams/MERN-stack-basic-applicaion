var User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const createAdminUser = async (adminName, adminEmail, adminPass) => {
    if (!adminName || !adminEmail || !adminPass)
        console.log(
            "Make sure you added ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASS in .env file"
        );
    const user = await User.findOne({ email: adminEmail });
    if (!user) {
        console.log("No admin User Found!");
        console.log("Creating new admin user.....");
        const newAdminUser = new User({ name: adminName, email:adminEmail});
        const salt = await bcrypt.genSalt(10);
        newAdminUser.password = await bcrypt.hash(adminPass, salt);
        newAdminUser.permissions.admin  = true;
        try {
            await newAdminUser.save();
            console.log("Admin user created successfully");
        } catch (error) {
            console.log("Admin user does not created")
        }
    }
};

module.exports = createAdminUser;
