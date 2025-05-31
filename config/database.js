const mongooose = require('mongoose');

const connectDB = async () => {
    await mongooose.connect("mongodb+srv://khowalvikash:vikash123@clusternode.j6vvp.mongodb.net/Practice");
}

module.exports = { connectDB }