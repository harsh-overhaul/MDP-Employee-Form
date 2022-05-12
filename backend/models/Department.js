const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Department = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: [String]
   },
   phoneNumber: {
      type: Number
   },
   // image:{
   //    data:Buffer,
   //    contentType:String,
   // }
}, {
   collection: 'department'
})

module.exports = mongoose.model('Department', Department)