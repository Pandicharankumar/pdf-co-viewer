const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const productRoutes = require('./routes/productRoutes');

// No need for bodyParser.json if express.json is used
app.use('/products', productRoutes);

const initializeDBAndServer = async () => {
    const username = encodeURIComponent("bhargavcoding");
    const password = encodeURIComponent("bv@9177221342");
    const uri = `mongodb+srv://${username}:${password}@cluster0.ki5m4.mongodb.net/ecs?retryWrites=true&w=majority&tls=true&tlsInsecure=true&appName=Cluster0`;


    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.....");
        app.listen(9000, () => {
            console.log('Server running on port: 5000');
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

initializeDBAndServer()
