const express = require('express')
const app = express()
const departmentRoute = express.Router()

// Employee model
let Department = require('../models/Department')

// Add Employee
departmentRoute.route('/create1').post((req, res, next) => {
  Department.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Employees
departmentRoute.route('/').get((req, res) => {
  Department.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
departmentRoute.route('/read1/:id').get((req, res) => {
  Department.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
departmentRoute.route('/update1/:id').put((req, res, next) => {
  Department.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete employee
departmentRoute.route('/delete1/:id').delete((req, res, next) => {
  Department.findOneAndRemove({_id:{$eq:req.params.id}}, (error, data) => {
    
    if (error) {
      return next(error)
    } else {
      console.log(req.params.id)
      
      
      console.log(data)
      
      
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = departmentRoute