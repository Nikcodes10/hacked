const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');
var axios = require("axios").default;

var router = express.Router();

const s3 = new aws.S3({apiVersion: '2006-03-01'});
//NEEDS AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
// as env variables by running 'export <>=<>'

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'test',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});

router.route('/')

.post(upload.array('fieldname'), (req,res)=>{

    var options = {
        method: 'GET',
        url: 'https://ocrly-image-to-text.p.rapidapi.com/',
        params: {
            imageurl: 'https://i.pinimg.com/originals/42/1b/e6/421be6184e75937bb223c764ecbc2f2e.jpg',
            filename: 'sample.jpg'
        },
        headers: {
            'x-rapidapi-key': '24ee7c2f85mshde48d501c5409e6p1c19c6jsnbc4f7483ac19',
            'x-rapidapi-host': 'ocrly-image-to-text.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    return res.json({status:'OK'});
})