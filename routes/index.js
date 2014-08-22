var express = require('express');
var router = express.Router();

//render views
/* GET Homepage. [to be changed]*/
router.get('/', function(req, res) {
	return res.redirect('/tutorial');
});

/* GET lettercreation page. */
router.get('/tutorial/lettercreation', function(req, res) {
	  res.render('lettercreation', { title: 'Tutorial German - English'});
	});

/* GET Flashcards page. */
router.get('/tutorial/cards', function(req, res) {
	  res.render('cards', { title: 'Tutorial German - English'});
});

/* GET Spelling Vocabulary page */
router.get('/tutorial/spellingvoc', function(req, res) {
	  res.render('spellingvoc', { title: 'Tutorial German - English'});
	});

/* GET Tutorial Starting page. */
router.get('/tutorial', function(req, res) {
	  res.render('tutorial', { title: 'Tutorial German - English'});
	});

module.exports = router;
