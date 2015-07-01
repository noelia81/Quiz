var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


//Antes de la BBDD
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

//con BBDD
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


//router.get('/author', quizController.author);

module.exports = router;
