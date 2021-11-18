let Contenedor = require("./contenedor");
let contenedor = new Contenedor("productos.txt");
const { application, json } = require("express");
let express = require("express");
let app = express();

const PORT= 8080;

app.get("/productos", async(req,res, next)=>{
        let productos = await contenedor.getAll();
        res.send(JSON.stringify(productos,null,'\n'));
})

app.get("/productoRandom", async(req,res,next)=>{
    let array = await contenedor.getAll();
    let random = (Math.floor(Math.random()* array.length+1))
        res.json(await contenedor.getById(random));
})

app.listen(PORT,()=>{
    console.log(`http://localhost${PORT}`)
});

