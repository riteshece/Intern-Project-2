const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema= new mongoose.Schema(
    {
        name: {type:String,require:true,unique:true},
        email: {type:String,require:true,unique:true,validate: {
          validator: function (email) {
              if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
                  return (true)
              }
              alert("You have entered an invalid email address!")
              return (false)
          } }},

         mobile: {
        type: Number,
        unique: true,
        validate: {
            validator: function (mobile) {
                if (/^\d{10}$/.test(mobile)) {
                    return (true)
                } else {
                    alert("Invalid number, must be of ten digits")
                    number.focus()
                    return (false)
                }
            }
        }
    },
             collegeId: {type:ObjectId, ref:'college'},
             isDeleted: { type: Boolean, default: false },


       
    },{timestamps: true}
)

module.exports = mongoose.model('intern',internSchema);
