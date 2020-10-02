const mongo = require('../mongodb/index');

const getSpeed = () => {    
    return new Promise((resolve,reject)=>{
        mongo.get("Masterbus-IOT","INTI",{"paquete.Velocidad":"35"},{})
        .then((result)=>{
            resolve(result);
        })
        .catch(err=>reject(err));       
    });
}
    
    

module.exports = { getSpeed }