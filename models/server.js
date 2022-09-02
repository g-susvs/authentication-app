const express = require('express');
const fileUpload = require('express-fileupload')
// const fs = require('fs');
// const https = require('https');
const cors = require('cors');
const connectDB = require('../db/connect_db');



class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        connectDB();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true // crea una carpeta si no la encuentra
        }));
    }

    routes(){
        this.app.use('/api/users', require('../routes/user'));
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/upload', require('../routes/upload'));
    }

    listen(){

        // https.createServer({
        //     cert: fs.readFileSync('./certificados/gsus.crt'),
        //     key: fs.readFileSync('./certificados/gsus.key'),
        // }, this.app).listen(this.port,()=>{
        //     console.log(`Server runnig: http://localhost:${this.port}`);
        // });


        this.app.listen(this.port, ()=>{
            console.log(`Server runnig: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;