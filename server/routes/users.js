var express = require('express');
var router = express.Router();

var db = require('../fb').firestore();

/* GET users listing. */
router.route('/')
.get((req,res,next)=>{
  db.collection('users').get().then(snapshot=>{
    let users = [];
    if(snapshot.docs.length > 0) {
      snapshot.docs.forEach(doc=>{
        users.push(doc.data());
      });
      res.statusCode = 200;
      res.setHeader('Content-type', 'Application/json');
      res.send(users.json());
    } else {
      res.statusCode = 201;
      res.setHeader('Content-type', 'Application/json');
      res.send('No user in db');
    }
  })
  .catch(err=>{
    console.error(err);
    next(err);
  });
});

router.route('/user') 
.get((req,res,next)=>{
  db.collection('users').get().then(snapshot => {
    let bool = false;
    let my_user;
    snapshot.docs.forEach(doc=>{
      if(doc.data().email == req.body.email) {
        my_user = doc.data();
        console.log(my_user);
        bool = true;
        return;
      }
    });
    if(snapshot.docs.length <=0 || !bool) {
      res.statusCode=201;
      res.setHeader('Content-type', 'Application/json');
      res.send('No such user');
    }
    else {
      res.statusCode=200;
      res.setHeader('Content-type', 'Application/json');
      res.send(my_user.json());
    }
  })
  .catch(err=>{
    console.error(err);
    next(err);
  });
})
.put((req,res,next)=>{

  db.collection('users').doc(req.body.user_id).
  update({username:req.body.username,email:req.body.email,name:req.body.name,
    password:req.body.password, job:req.body.job,starred_qns:req.body.starred_qns,
    user_qns:req.body.user_qns, dp:req.body.dp})
    .then(result=>{
      res.statusCode = 200;
      res.setHeader('Content-type','Application/json');
      console.log(result);
      res.send('Successfully Updated');
    })
    .catch(err=>{
      console.log(err);
      next(err);
    })
});


router.route('/signup')
.options((req, res)=>{
  res.sendStatus(200);
})
.post((req,res,next)=>{
  console.log(req.body);
  db.collection('users').get().then(snapshot => {
    let bool = true;
    if(snapshot.docs.length > 0) {
        snapshot.docs.forEach(doc=>{
            if(doc.data().email == req.body.email) {
                bool = false;
            }
        });
    }
    if(bool) {
        db.collection('users')
        .add({
          user_id:"", username:req.body.username,email:req.body.email,name:req.body.name,
          password:req.body.password, job:req.body.job,starred_qns:[],
          user_qns:[], dp:"", weekly_points:0
        }).then(()=>{
          res.statusCode = 200;
          res.send("Signup Success");
        });
    } else {
        res.statusCode = 201;
        res.send("User already exists");
    }
  })
  .catch(err=>{
    console.log(err);
    next(err)});
})
router.route('/login')
.post((req,res,next)=>{
  db.collection('users').get().then(snapshot => {
    let bool = false; 
    let userbool = false;
    for(let i=0; i<snapshot.docs.length; i++) {
      if(snapshot.docs[i].username == req.body.username) {
        userbool = true;
      }
      if(snapshot.docs[i].username == req.body.username && snapshot.docs[i].password == req.body.password) {
        bool = true;
        break;
      }
    }
    if(bool) {
      res.statusCode = 200;
      res.setHeader('Content-type','Application/json');
      res.send('Login Success');
    }
    else if(snapshot.docs.length <=0 ) {
      res.statusCode = 203;
      res.setHeader('Content-type','Application/json');
      res.send('No user in db');
    }
    else if(!userbool) {
      res.statusCode = 201;
      res.setHeader('Content-type','Application/json');
      res.send('Invalid Credentials... please Signup');
    }
    else {
      res.statusCode = 202;
      res.setHeader('Content-type','Application/json');
      res.send('Incorrect password!');
    }
  })
})

module.exports = router;