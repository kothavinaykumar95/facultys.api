const express= require('express');

const {getData,save}=require("./helpers");

const application=express();

 application.use(express.json());
 application.use(express.urlencoded({extended:true}));
 
let facultys = [];
const getDatapromise=getData();
getDatapromise.then(result =>{
  facultys=result;
})
.catch(err=>{
  console.log(" unable to load facultys from JSON");
  return;
})
console.log(facultys,'facultys');


// facultys = [];

  // console.log(facultys)

application.get('/',function(req,res){
res.send({message:"welcome to faculty management system"});
})
application.get('/facultys',function(req,res){
   res.send(facultys)
})
application.get('/facultys/search-By-qualification',function(req,res){
// console.log(req.body,'-',req.params,'-',req.query)
const filteredfacultys=facultys.filter(fac=>fac.qualification== req.query.qualification)
  res.send(filteredfacultys)

})
application.get('/facultys/search-By-gender/:gender',function(req,res){
  // console.log(req.body,'-',req.params,'-',req.query)
  const filteredfacultys= facultys.filter(fac=>fac.gender== req.params.gender)
  // console.log(req.params)
    res.send(filteredfacultys)
  
  })
  application.get('/facultys/filter-By-experience/:min/:max',(req,res)=>{
   
  const filteredfacultys= facultys.filter((fac)=>(fac.YOE >=req.params.min) && (fac.YOE <= req.params.max))
     res.send(filteredfacultys)
    // console.log(req.params)
    })
   application.post('/facultys/create',(req,res)=>{
 const newFaculty={id:facultys.length+1,...req.body};
    //  console.log(req.body);
     facultys.push(newFaculty);
     save(facultys);
     res.send(facultys);
   });
   application.put("/facultys/update/:facid",(req,res)=>{
// console.log(req.body)
 const updatedfacultys=facultys.map(faculty=>{
 console.log(`${faculty.id} ${req.params.facid}`,"checking here")

if (faculty.id .toString() === req.params.facid){
  console.log("inside if condition")

  const updatedfaculty = {
    ...faculty,
   ... req.body
  };
 
  return updatedfaculty;

}else{
  return faculty; 
}
})

save(updatedfacultys);
res.send(updatedfacultys);

   })
   application.delete('/facultys/delete/:id',(req,res)=>{
     const remaningfacultys=facultys.filter(fac=>fac.id !=req.params.id);
   save(remaningfacultys);
     res.send(remaningfacultys);
   })
  
 application.listen(8080)

