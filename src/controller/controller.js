const validator = require("email-validator");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

//create collegeModel
const createCollege = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data; //using destructing here


        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "bad request" })

        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "name is not in valid format" })

        }
        if (!fullName) {
            return res.status(400).send({ status: false, msg: "please provide a valid fullName" })

        }
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "please provide a valid logoLink" })

        }
        const college = await collegeModel.create(req.body)
        return res.status(201).send({ status: true, msg: college })

    }

    catch (err) {
        console.log("this is the error:", err.message)
        return res.status(500).send({ status: false, msg: "Error", error: err.message })
    }

}

//createInternModels
const createIntern = async function (req, res) {
    try {
      const data = req.body

      if (!data.name) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provide valid name" })
      }
      if (!data.email) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provide valid email" })
      }
      if (!data.mobile) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provide valid mobile" })
      }
      if (!data.collegeId) {
        return res.status(400).send({ status: false, msg: "BAD REQUEST please provide valid collegeId" })
      }
      
      
      
        const internName = await internModel.create(data)
      return res.status(201).send({ status: true, msg: internName })
  
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  }

  //createCollegeDetails

 
const getCollegeDetails= async function(req,res){
  try{
      let data=req.query.collegeName;

      if(!data) return res.status(400).send({status:false, message:"Please Enter your college name"})

      let data1 = data.toLowerCase().trim();

      let college=await collegeModel.findOne({name:data1,isDeleted:false}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})

      if(!college) return res.status(404).send({status:false, message:"No such college in our DB"})

      let internData=await internModel.find({collegeId:college._id,isDeleted:false}).select({_id:1,email:1,mobile:1,name:1})
      
      let college1 = JSON.parse(JSON.stringify(college))

      /*While using spread operator to copy the object in college variable, a lot of garbage values were being printed.
      Also I was not able to directly manipulate the college object which we got by using findOne on mongoDB documents. Therefore,
      I used he syntax for deep copy.*/
      delete college1._id
      
      college1.interns = [...internData];
      return res.status(200).send({status:true, data:college1})
  }catch(error){
      return res.status(500).send({status:false, error:error.message})
  }
  }
module.exports.createCollege = createCollege
module.exports.createIntern =createIntern
module.exports.getCollegeDetails =getCollegeDetails



