const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: Array
   },
   phoneNumber: {
      type: Number
   },
   // image:{
   //    data:Buffer,
   //    contentType:String,
   // }
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)