//const express = require('express');
import express from "express";
const app = express();
import morgan from "morgan";
//const morgan = require('morgan');
import mongoose from 'mongoose'
//const mongoose = require('mongoose');
import cors from "cors";
//const cors = require('cors');
//require('dotenv/config');
import dotenv from "dotenv";
import authJwt from "./helpers/jwt.js";
//const authJwt = require('./helpers/jwt');
import errorHandler from "./helpers/error-handler.js";
//const errorHandler = require('./helpers/error-handler');
dotenv.config();

app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
//app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
//const categoriesRoutes = require('./routes/categories');
//const productsRoutes = require('./routes/products');
import productRoutes from './routes/productRoutes.js';
//const usersRoutes = require('./routes/users');
import userRoutes from './routes/userRoutes.js'
//const ordersRoutes = require('./routes/orders');
import orderRoutes from './routes/orderRoutes.js'

const api = process.env.API_URL;

//app.use(`${api}/categories`, categoriesRoutes);
//app.use(`${api}/products`, productsRoutes);
app.use(`${api}/products`, productRoutes);
//app.use(`${api}/users`, usersRoutes);
app.use(`${api}/users`,userRoutes);
app.use(`${api}/orders`,orderRoutes);
//app.use(`${api}/orders`, ordersRoutes);


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop_database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})


//Dev Server uncomment to work while development
/*
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})
*/

//Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port " +port)
})

