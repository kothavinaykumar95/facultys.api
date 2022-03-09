const filesystem=require("fs")
const getDatapromise=getData();
getDatapromise.then(result =>{
  facultys=result;
  console.log(facultys,"final result")
})
.catch(err=>{
  console.log(" unable to load facultys from JSON");
  return;
})

       function getData() {
    return new Promise((resolve,reject) =>{
       filesystem.readFile("./facultys.json",(err,jsondata) =>{
   if(err) {
       reject(err);
    } else{
        const facultysdatafromfile=jsondata.toString();
        const facultys=JSON.parse(facultysdatafromfile);
        resolve(facultys);
    }
})
    })
    
  }