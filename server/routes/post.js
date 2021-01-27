var express = require('express');
var router = express.Router();

var db = require('../fb').firestore();

router.route('/')

.options((req,res)=>{
    res.statusCode = 204;
})
.get((req,res,next)=>{
    let reqDocs = [];
    db.collection('posts').get().then(snapshot=>{

        if(snapshot.docs.length > 0) {

            snapshot.docs.forEach(doc=>{
                //filter based on req.query
                reqDocs.push(doc.data());
                reqDocs[reqDocs.length-1].post_id = doc.id;
            });
        
        res.statusCode = 200;
        res.setHeader('Content-type','Application/json');
        res.send(reqDocs); 

        } else {
            res.statusCode = 201;
            res.setHeader('Content-type','Application/json');
            res.send("No posts yet!");
        }

    }).catch(err=>{
        console.timeLog(new Date());
        console.error(err);
        next(err);
    })
})
.post((req,res,next)=>{
    db.collection('posts').get().then(snapshot=>{
        let bool = true;
        let myDoc = null;
        if(snapshot.docs.length > 0) {
            snapshot.docs.forEach(doc=>{
                if(doc.data().qTitle == req.body.title) {
                    bool = false;
                    myDoc = doc.data();
                    return;
                }
            })
        }
        if(bool) {
            db.collection('posts')
            .add({title:req.body.title, desc:req.body.desc, 
                author:req.body.author, date_posted:req.body.date_posted, date_edited:req.body.date_edited,
                comments:[], contents:[], post_id:""})
            /* req.body.desc should be of type 'any'. 
            It should have image followed by a description for each image. */
            .then((docRef)=>{
                let b = true;
                req.body.contents.forEach(c=>{
                    db.collection('posts/'+docRef.id+'/contents')
                    .add({image:c.image, alt:c.alt});
                });
                res.statusCode = 200;
                res.setHeader('Content-type','Application/json');
                res.send("Question posted successfully");
            })
        } else {
            //same question exists
            res.statusCode = 201;
            res.setHeader('Content-type','Application/json');
            res.send(myDoc);
        }
    })
    .catch(err=>{
        console.error(err);
        next(err);
    })
})


router.route('/:id')

.options((req,res)=>{
    res.statusCode = 204;
})
.get((req,res,next)=>{
    db.collection('posts').doc(req.params.id).get().then(post=>{
        post = post.data();

        db.collection('posts/'+req.params.id+'/contents').get().then(contents=>{
            contents.forEach(content=>{
                console.log(content.data())
                post.contents.push(content.data());
            })
            console.log(post);

            res.statusCode = 200;
            res.setHeader('Content-type','Application/json');
            res.send(post);
        })
    })
    .catch(err=>{
        console.error(err);
        next(err);
    })
})
.put((req,res,next)=>{
    db.collection('posts').doc(req.params.id).update({title:req.body.title, desc:req.body.desc, 
        author:req.body.author, date_posted:req.body.date_posted, date_edited:req.body.date_edited,
        comments:req.body.comments, contents:req.body.contents, post_id:""})
        .then(result=>{
            console.log(result);
            res.statusCode=200;
            res.setHeader('Content-type','Application/json');
            res.send('Successfully updated!');
        })
})

module.exports = router;