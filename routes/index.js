var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//CONECTING DB// APP CONFI
mongoose.connect('mongodb+srv://minh1213:minh1213@cluster0.u6oqnnp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});
//SCHEMA
let lopSchema = mongoose.Schema({
  phone: {
    type: Number,
  },
  password:{
    type:String,
  },
  typeRegister:{
    type:String,
  },
  tokenLogin: {
    type: String,
  },
  deviceID : {
    type: String,
  },
  fcmTokens:{
    type: String,
  }

});

//MODEL
let Lop = mongoose.model('Lop', lopSchema);
// // load file
router.get('/',function(req,res,next){
Lop.find({},(error,data)=>{
   console.log('danh sach Giao vien', data);
 res.render('index',{lops:data});
 });
 });

// form_add
  router.get('/form_add',function(req,res,next){
 res.render('form_add',{});
 });


// add
router.post('/add',function(req,res,next){
Lop.create(req.body);
res.redirect('/');
});


// load file cu
router.get('/form_update/:id',function(req,res,next){
Lop.findById(req.params.id,(error,data)=>{
res.render('form_update',{Lop:data});
});


// update
router.post('/update',function(req,res,next){
Lop.findByIdAndUpdate(req.body.id,req.body,(error,data)=>{
res.redirect('/');
});
});
});




// delete
router.get('/form_delete/:id',function(req,res,next){
Lop.findByIdAndDelete(req.params.id,(error,data)=>{
res.redirect('/');
});
});
module.exports = router;  
