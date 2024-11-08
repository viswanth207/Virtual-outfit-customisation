const mongoose = require("mongoose");

const connectDB = () => {
     
    mongoose.connect(
    "mongodb+srv://viswanthchirumamilla:7HV63Eswef8h1PXF@cluster0.v0rkh.mongodb.net/vocdb?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

};
module.exports = connectDB;
