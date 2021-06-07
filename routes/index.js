var express = require('express');
var router = express.Router();
let fs = require('fs')
// var mysql =require('./mysql');
var Score =require('./bean/login')
var mysql      = require('mysql');
const Login = require('./bean/login');

/* GET home page. */



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '19860912',
  database : 'myy'
});

router.get("/guanli",(req,res)=>{
    res.render('guanli')
  })
  

router.get("/rightBox",(req,res)=>{
    res.render('insert')
  })
  
  router.get("/login",(req,res)=>{
      res.render('insert')
    })

    router.get("/add",(req,res)=>{
        res.render('add')
      })
      router.get("/choose",(req,res)=>{
          res.render('choose')
        })
        router.get("/jisoo",(req,res)=>{
            res.render('jisoo')
          })
router.get("/mini",(req,res)=>{
   res.render('mini')
})

router.get("/mm",(req,res)=>{
    res.render('mm')
  })
    
// var login = false
//     if (Array.from(result).length == 0){
//       login = true
//     }
//       for( i of result) {
//         if (i.username === body.username){
//         login = false
//         break
//       }else{
//           login = true
//         }
//       }
    
router.get('/', function(req, res, next) {
  connection.query("select * from login",function(err,results,fields){
    console.log(results);
    console.log("fields"+fields);
 
    res.render("bk",{
      data:results
    })
     
 }) ;
 
});
    
router.get('/task7', function(req, res, next) {
  connection.query("select * from login",function(err,results,fields){
    console.log(results);
    console.log("fields"+fields);
 
    res.render("task7",{
      data:results
    })
     
 }) ;
 
});



// router.post('/search',(req,res)=>{
//     connection.query("select * from login where username=? or email=?",[req.body.username,req.body.email],(err,result,fields) => {
    
//     });
//   }) ;

// Login.findOne({
//   username: username
// }).then(function( userInfo ) {
//   if ( userInfo ) {
//       //表示数据库中有该记录
//       responseData.code = 4;
//       responseData.message = '用户名已经被注册了';
//       res.json(responseData);
//       return;
//   }
//   //保存用户注册的信息到数据库中
//   var login = new Login({
//       username: username,
//       password: password
//   });
//   return login.save();
// }).then(function(newUserInfo) {
//   responseData.message = '注册成功';
//   res.json(responseData);
// });

router.post('/rightBox',(req,res)=>{
    let login= new Login(req.body.username,req.body.password,req.body.email,req.body.phone,req.body.sex)
    connection.query("insert into login(username,password,email,phone,sex) value(?,?,?,?,?)",[login.username, login.password,login.email,login.phone,login.sex],(err,result,fields) => {
      console.log(err);
      console.log(result);
      console.log(fields);
      res.redirect("/");
      
    });
  }) ;


//   var login = false
//     if (Array.from(result).length == 0){
//       signup = true
//     }
//       for( i of result) {
//         if (i.username === body.username){
//         signup = false
//         break
//       }else{
//           signup = true
//         }
//       }

  var compar = new Array(10);

  router.post('/login',(req, res) => {
  
          compar[0] = req.body.username;
          compar[1] = req.body.password;

          let sql = 'select * from login where username=? and password=? '
         
          connection.query(sql,compar,function (err, result) {
              if(result.length > 0) {

                  res.redirect("/mm");
              }
              else {
                res.send("失败");
              }
          });
  })

  var compar = new Array(10);

  router.post('/guanli',(req, res) => {
  
          compar[0] = req.body.username;
          compar[1] = req.body.password;

          let sql = 'select * from guanli where name=? and password=? '
         
          connection.query(sql,compar,function (err, result) {
              if(result.length > 0) {

                  res.redirect("/task7");
              }
              else {
                res.send("失败");
              }
          });
  })

 
  router.get('/', function(_req, res, _next){
  
    connection.query("select * from tab_score",function(err,results,fields){
      console.log(results);
      console.log("fields"+fields);
   
      res.render("task7",{
        data:results
      })
       
   }) ;
  });

     
    router.post('/add',(req,res)=>{
       let login= new Login(req.body.username,req.body.password,req.body.email,req.body.phone,req.body.sex)
        connection.query("insert into login(username,password,email,phone,sex) value(?,?,?,?,?)",[login.username, login.password,login.email,login.phone,login.sex],(err,result,fields) => {
          console.log(err);
          console.log(result);
          console.log(fields);
          res.redirect("/task7");
        });
    }) ;
  
    
  router.get('/a',(req,res)=>{
    let delSql = 'delete FROM login where ID=?'
    let data =req.query;
  connection.query(delSql,data.id,function (err, result) {
          if(err){
            console.log(err.message)
            return
          }       
          res.redirect('/task7')
  
  })
  })

  router.get('/new',(req,res)=>{
    connection.query("select * from login where id ="+req.query.id+"",function(err,data){
      if(err){
        throw err
      }
      if(data){
        res.render('new',{data:data[0]})
      }
    })
  })
  router.post('/new',(req,res)=>{
    connection.query("update login set username='"+req.body.username+"',password='"+req.body.password+"',email='"+req.body.email+"',phone='"+req.body.phone+"',sex='"+req.body.sex+"' where id ="+req.body.id+" ",(err)=>{
      if(err){
        throw err
      }else{
        res.redirect('task7')
      }
    })
  })

  router.post('/seek',(req,res)=>{
    connection.query("select * from login where username='"+req.body.searchValue+"'",(err,data)=>{
      if(err){
        throw err
      }
      if(data){
        res.json({user:data})
      }
    })
  })
  
module.exports = router;
