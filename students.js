const fs = require("fs");

const express= require('express');
const application=express();
application.use(express.json());
 application.use(express.urlencoded({extended:true}));
 
// synchronous way of reading a file 
// const studentsrawdata= fs.readFileSync("./students.json");
// const  studentsstringdata=studentsrawdata.toString();
// const studentsJsondata=JSON.parse(studentsstringdata);
//  console.log(studentsJsondata);
//  console.log("log stage 1")
function readFile(filename){
    return new Promise((resolve,reject)=>{
      fs.readFile(filename,(err,filedata)=>{
        if (err){
            reject("error in reading the  file");
        }else{
            const studentsstringdata=filedata.toString();
            const studentsJsondata=JSON.parse(studentsstringdata);

            resolve(studentsJsondata)
        }

    })
})
    
}
let students=[];
(async ()=>{
 students= await readFile("./students.json")

})();
application.get("/allstudents",(req,res)=>{
    res.send(students);
})
application.listen(8888,()=>{
console.log("application is up and running in the port 8888");
});