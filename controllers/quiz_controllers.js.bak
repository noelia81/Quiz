var models = require('../models/models.js');

//Autoload - factoriza el código si la ruta incluye :quizId

exports.load = function (req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz) {
		if (quiz){
			req.quiz = quiz;
			next();
		} else { next(new Error('No existe quizId=' + quizId));}
	}).catch(function(error){next(error);});
};

// GET /quizes
exports.index = function(req,res){
	 
	var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');
		if (req.query.search) {
		  models.Quiz.findAll({
			where: ["pregunta like ?", condicion],
			order: [['pregunta', 'ASC']]}
			).then(function(quizes) {	
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
		  }else{
			models.Quiz.findAll().then(function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}).catch(function(error) {next(error);});
		  }
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
		res.render('quizes/show', { quiz: req.quiz, errors: [] });
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
	var resultado = 'Incorrecto';
	 if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: [] });
};


//GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build ( // crea objeto quiz
	{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz, errors: [] });
};


//POST /quizes/create
exports.create = function(req, res){
var quiz = models.Quiz.build( req.body.quiz );

var errors = quiz.validate();//ya qe el objeto errors no tiene then(
if (errors)
{
var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
for (var prop in errors) errores[i++]={message: errors[prop]};	
res.render('quizes/new', {quiz: quiz, errors: errores});
} else {
quiz // save: guarda en DB campos pregunta y respuesta de quiz
.save({fields: ["pregunta", "respuesta"]})
.then( function(){ res.redirect('/quizes')}) ;
}
};

// GET /quizes/:Id/edit
exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: [] });
};


// PUT /quizes/:Id
exports.update = function(req, res){
		req.quiz.pregunta = req.body.quiz.pregunta;
		req.quiz.respuesta = req.body.quiz.respuesta;
		
		req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  )catch(function(error){next(error)});
};





//Exports.author = function (req, res){

//res.render('author', {autora: 'Noelia Ramirez'});
//};
