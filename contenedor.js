let fs = require("fs");
let path = require("path");




class contenedor {
    constructor(url){
        this.url=url;
    }


    async save(prodObj){
        try {
            let prod =  await this.getAll();
            let newId = prod.length + 1;
            let newProd = {
                id : newId,
                ... prodObj
            }
            prod.push(newProd);
            let contenido = JSON.stringify(prod, null,2);
            await fs.promises.writeFile(`${this.url}`,contenido);
            return newId;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id){
        try {
            let respuesta=null;
            let prod = await this.getAll();
            if(prod.length>0){
                prod.forEach(element => {
                    if(element.id==id){
                        respuesta=element;
                    }
                });
            }
            return respuesta;
        } catch (error) {
            console.log(error);
        }

    }
    async getAll(){
        try {
            let prod =  await fs.promises.readFile(`${this.url}`,'utf-8');
            return JSON.parse(prod);
        } catch (error) {
            console.log(error);
        }
    }
    async deleteById(id){
        try {
            let res=[];
            let prod= await this.getAll();
            for (const key in prod) {
                if(prod[key].id==id){
                    prod.splice(key, 1);
                }
            }
            let contenido = JSON.stringify(prod, null,2);
            await fs.promises.writeFile(`${this.url}`,contenido)
            return res;
        } catch (error) {
            
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(`${this.url}`,"");
            return 0;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=contenedor;