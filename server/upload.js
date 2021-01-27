const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
var axios = require("axios").default;

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const {originalname} = file;
        cb(null, `${uuid()}-${originalname}`);
    }
})

const upload = multer({storage: storage});

var router = express.Router();

router.route('/')
.post(upload.array('fieldname'), (req,res,next)=>{
    
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

    res.send("ok");
});

module.exports = router;