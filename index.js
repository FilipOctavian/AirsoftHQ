const express = require("express");
const fs= require('fs');//se refera la fisier ca OBIECT
const path=require('path');//se refera STRICT la cale, nu poate accesa fisierul
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');

obGlobal ={
    obErori:null

}
app= express();
console.log("Folder proiect", __dirname); //folderul fisierului
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());//folderul de unde rulam comanda

app.set("view engine","ejs");

vect_foldere=["temp","temp1"]
for(let folder of vect_foldere){
    let caleFolder=path.join(__dirname, folder)
    if(!fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder);
    }
}

app.use("/resurse", express.static(__dirname+"/resurse"));


/*
trimiterea unui mesaj fix
trimiterea unui msj dinamic
trimiterea unui msj dinamic in functie de parametri(req.params;req.query)
*/

//Mesaj fix

app.get(["/", "/index", "/home"],function(req,res){
    //res.sendFile(__dirname+"/index.html")
    res.render("pagini/index", {ip: req.ip});
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

aapp.get("favico.ico", function(req,res){
    afisareEroare(res, 400);
});

app.get("/*.ejs", function(req,res){
    res.sendFile(path.join(__dirname,"resurse/favicon/favicon.ico"))
});

app.get(new RegExp("^\/resurse\/[A-Za-zo-0\/]*\/$"), function(req,res){
    afisareEroare(res, 403);
});

app.get("/*.ejs", function(req,res){
    console.log(req.url);
    try{
        res.render("pagini"+req.url, function(err, rezHtml){
       // console.log("Pagina", rezHtml)
       // console.log("Eroare", err)
       // res.send(rezHtml);
       if(err){
          if(err.message.startsWith("Failed to lookup view")){
            afisareEroare(res, 404);
            console.log("Nu a gasit pagina: ", req.url)
          }
       }
       else{
        res.send(rezHtml+"");
       }

    });
}
    catch(err1){

        if(err1.message.startsWith("Cannot find module")){
            afisareEroare(res, 404);
            console.log("Nu a gasit resursa: ", req.url)
        }
        else{
            afisareEroare(res)
        }
    
    }
 })

 function initErori(){
    var constinut= fs.readFileSync(path.join(__dirname,"resurse\json\erori.json")).toString("utf-8");
    //console.log(continut);
    obGlobal.obErori=JSON.parse(continut);
    for (let eroare of obGlobal.obErori.info_erori){
        eroare.imagine=path.join(obGlobal.obErori.cale_baza,eroare.imagine);
    }
    obGlobal.obErori.eroare_default.imagine=path.join(obGlobal.obErori.cale_baza,obGlobal.obErori.
        eroare_default.imagine)
    //console.log(obGlobal.obErori);
 }
 initErori()

 function afisareEroare(res, _identificator, _titlu, _text, _imagine){
    let eroare= obGlobal.obErori.info_erori.find(
        function(elem){
            return elem.identificator==_identificator
        }
    )
    if (!eroare){
        let eroare_default=obGlobal.obErori.eroare_default
        res.render("pagini/eroare",{
            titlu:_titlu || eroare_default.titlu,
            text:_text || eroare_default.text,
            imagine:_imagine || eroare_default.imagine,


        })
    }
    else{
        if(eroare.status)
            res.status(eroare.identificator)
        
        res.render("pagini/eroare",{
             titlu:_titlu || eroare_default.titlu,
             text:_text || eroare_default.text,
             imagine:_imagine || eroare_default.imagine,
            })
    }
 }

app.listen(8080);//primeste cereri de pe portul 8080
console.log("Serverul a pornit");