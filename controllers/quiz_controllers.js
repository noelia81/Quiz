var models = require('../models/models.js');


// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes});
	})
};




//antes de BBDD
//GET /quizes/question
//Exports.question = function (req, res){
//	models.Quiz.findAll().success(function(quiz) {
//		res.render('quizes/question', { pregunta: quiz[0].pregunta})
//	})
// en versión sin BBDD: res.render('quizes/question', {pregunta: 'Capital de Italia'});
//};

//con BBDD
//get /quizes/question
exports.show = function (req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz});
	})
};

//antes de BBDD
//GET /quizes/answer
//Exports.answer = function(req, res){
//	models.Quiz.findAll().success(function(quiz) {
//	 if(req.query.respuesta === quiz[0].respuesta){
//		res.render('quizes/answer', {respuesta:'Correcto'});
//	}else{
//		res.render('quizes/answer', {respuesta:'Incorrecto'});
//	}
//})
	//en verión sin BBDD:
	// if(req.query.respuesta === 'Roma'){
	//	res.render('quizes/answer', {respuesta:'Correcto'});
	//}else{
	//	res.render('quizes/answer', {respuesta:'Incorrecto'});
	//}
//};

//con BBDD
//GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
	 if(req.query.respuesta === quiz.respuesta){
		res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto'});
	}else{
		res.render('quizes/answer', {quiz: quiz, respuesta:'Incorrecto'});
	}
})
};







//Exports.author = function (req, res){

//res.render('author', {autora: 'Noelia Ramirez'});
//};
