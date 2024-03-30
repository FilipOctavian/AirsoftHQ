const express = require("express");
const fs= require('fs');
// const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');


app= express();
console.log("Folder proiect", __dirname); //folderul fisierului
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());//folderul de unde rulam comanda

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));


/*
trimiterea unui mesaj fix
trimiterea unui msj dinamic
trimiterea unui msj dinamic in functie de parametri(req.params;req.query)
*/

//Mesaj fix

app.get(["/", "/index", "/home"],function(req,res){
    //res.sendFile(__dirname+"/index.html")
    res.render("pagini/index");
})


app.get("/cerere", function(req, res){

        res.send("<b>Hello</b> <span style='color:red'>world!</span>");


})

//Mesaj dinamic
app.get("/data", function(req, res, next){

    res.write("Data: ");
    next();

})
app.get("/data", function(req, res){

    res.write(""+new Date());
    res.end();

})

/*trimiterea unui msj dinamic in functie de parametri(req.params;req.query)
*/
app.get("/suma/:a/:b", function(req, res){

    var suma=parseInt(req.params.a)+parseInt(req.params.b);
    res.send(""+suma);//res.send poate primi doar string, folosind + concatenam un string gol cu suma

})

app.get("/*", function(req,res){
    console.log(req.url);
    res.render("pagini"+req.url, function(err, rezHtml){
        console.log("Pagina", rezHtml)
        console.log("Eroare", err)
        res.send(rezHtml);

    });
 })


app.listen(8080);//primeste cereri de pe portul 8080
console.log("Serverul a pornit");