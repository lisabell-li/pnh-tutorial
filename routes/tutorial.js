var express = require('express');
var router = express.Router();

/* GET vocs
 * HTTP GET to tutorial/vocGreet, the server will return JSON each voc in the collection vocGreet
 * */
router.get('/lettercreation/vocGreet', function(req, res) {
   var db = req.db;
   db.collection('vocGreet').find().toArray(function (err, items) {
       res.json(items);
   });
});

router.get('/lettercreation/:id', function(req, res) {
	   var db = req.db;
	   var cat = req.params.id;
	   db.collection(cat).find().toArray(function (err, items) {
	       res.json(items);
	   });
	});

router.get('/lettercreation/getLetter', function(req, res) {
	   var db = req.db;
	   db.collection('letter').find().toArray(function (err, items) {
	       res.json(items);
	   });
	});

router.get('/cards/getvocs/:id', function(req, res) {
	   var db = req.db;
	   var cat = req.params.id;
	   db.collection(cat).find().toArray(function (err, items) {
	       res.json(items);
	   });
	});

/*
 * POST to addLetter
 * Post the data (req.body) and insert it into collection letter in db. if well, then string empty if not than db-message
 */
router.post('/lettercreation/addLetter', function(req, res) {
    var db = req.db;
    db.collection('letter').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});





module.exports = router;
