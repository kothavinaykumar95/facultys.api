const filesystem=require("fs");
module.exports={
save:(changes)=> {
    filesystem.writeFileSync('./facultys.json',JSON.stringify(changes));
   },
   getData:()=>{
       
    return new Promise((resolve,reject) =>{
        console.log("stage 1")
const jsondata=filesystem.readFile("./facultys.json",(err,jsondata) =>{
    console.log("stage 2")
    if(err) {
        console.log("error place")
        reject(err);
    } else{
        const facultysdatafromfile=jsondata.toString();
        const facultys=JSON.parse(facultysdatafromfile);
        resolve(facultys);
               
    }
})
 })
}
}