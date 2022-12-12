const router = require("express").Router();
const studentArray = require("../InitialData.js");
console.log(studentArray)
let id=8;
router.get("/", (req,res)=>{

    res.json(studentArray)
})
router.get("/:id", (req,res)=>{
    // console.log(req.params.id)
    let result = studentArray.find(e => e.id==req.params.id )
    if(result){
        res.json({...result})
    }else{
        res.status(404).json("Get Failed!!! id not found or invalid")
    }
})
router.post("/", (req,res)=>{
    console.log(req.body)
    if(req.body.name&&req.body.currentClass&&req.body.division){
        studentArray.push({id: id,...req.body})
        res.json({id:id})
        id++;
    }else{
        res.status(400).json("Post Failed!!! Incomplete details to post")
    }
})

router.put("/:id", (req,res)=>{
    // console.log(req.body)
    console.log(req.params.id)
    let targetObject = studentArray.find(e=>e.id==req.params.id)
    console.log(targetObject,req.body)
    if(req.body.name||req.body.currentClass||req.body.division&&targetObject){
        let targetIndex = studentArray.findIndex(e=>e.id==req.params.id)
        studentArray[targetIndex] = {...targetObject,...req.body}
        res.json(studentArray[targetIndex])
    }else{
        res.status(400).json("Update Failed!!! Incomplete details/invalid id")
    }
})

router.delete("/:id", (req,res)=>{
    // console.log(req.body)
    let targetIndex = studentArray.findIndex(e=>e.id==req.params.id)
    if(targetIndex){
        studentArray.splice(targetIndex,1)
        res.json("Successfully deleted!!!")
    }else{
        res.status(404).json("Delete Failed!!! Invalid id")
    }
})

module.exports = router