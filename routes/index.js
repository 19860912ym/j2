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
          console.log(result)    
          res.redirect('/task7')
  
  })
  })

//   router.get('/b',(req,res)=>{
//   let modSql = 'UPDATE account SET username = ?,password =  WHERE id = ?'
// let modSqlParams = ['a', 'b','c',20]
// connection.query(modSql,modSqlParams,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message)
//          return
//    }
//   console.log('UPDATE affectedRows',result.affectedRows)
// })
// })
  
module.exports = router;
