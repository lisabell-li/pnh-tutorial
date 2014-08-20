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

router.get('/lettercreation/vocFeeling', function(req, res) {
	   var db = req.db;
	   db.collection('vocFeeling').find().toArray(function (err, items) {
	       res.json(items);
	   });
	});

router.get('/lettercreation/getLetter', function(req, res) {
	   var db = req.db;
	   db.collection('letter').find().toArray(function (err, items) {
	       res.json(items);
	   });
	});

router.get('/cards/getvocs', function(req, res) {
	   var db = req.db;
	   db.collection('vocList1').find().toArray(function (err, items) {
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


/*
 * DELETE to deleteuser.
 */
router.delete('/lettercreation/deleteSentence/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('letter').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
