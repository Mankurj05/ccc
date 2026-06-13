// ====================================
// MONGODB PRACTICE QUERIES
// ====================================

// 1. Switch to Database
use Students

// 2. Create Collection
db.createCollection("employees")

// 3. Insert Multiple Documents
db.employees.insertMany([
  {
    empId: 101,
    name: "Dinesh Kumar",
    department: "IT",
    salary: 65000,
    city: "Chennai"
  },
  {
    empId: 102,
    name: "Priya Sharma",
    department: "HR",
    salary: 75000,
    city: "Mumbai"
  },
  {
    empId: 103,
    name: "Rahul Verma",
    department: "Finance",
    salary: 55000,
    city: "Bangalore"
  },
  {
    empId: 104,
    name: "Sneha Reddy",
    department: "IT",
    salary: 70000,
    city: "Hyderabad"
  },
  {
    empId: 105,
    name: "Arjun Patel",
    department: "Marketing",
    salary: 90000,
    city: "Pune"
  }
])

// ====================================
// FIND QUERIES
// ====================================

// View All Documents
db.employees.find()

// View All Documents (Pretty Format)
db.employees.find().pretty()

// Find One Document
db.employees.findOne({ empId: 101 })

// Find Employees in IT Department
db.employees.find({ department: "IT" })

// ====================================
// $gt OPERATOR
// ====================================

// Salary Greater Than 70000
db.employees.find({
  salary: { $gt: 70000 }
})

// ====================================
// UPDATE QUERIES
// ====================================

// Update One Employee
db.employees.updateOne(
  { empId: 101 },
  {
    $set: {
      salary: 68000
    }
  }
)

// Update Many Employees
db.employees.updateMany(
  { department: "IT" },
  {
    $set: {
      city: "Chennai"
    }
  }
)

// ====================================
// DELETE QUERIES
// ====================================

// Delete One Employee
db.employees.deleteOne({
  empId: 103
})

// Delete Many Employees
db.employees.deleteMany({
  department: "IT"
})

// ====================================
// SORT QUERIES
// ====================================

// Sort Salary Ascending
db.employees.find().sort({
  salary: 1
})

// Sort Salary Descending
db.employees.find().sort({
  salary: -1
})

// Sort By Name
db.employees.find().sort({
  name: 1
})

// ====================================
// COUNT DOCUMENTS
// ====================================

// Count Total Employees
db.employees.countDocuments()

// Count Employees in IT Department
db.employees.countDocuments({
  department: "IT"
})

// ====================================
// COLLECTION COMMANDS
// ====================================

// Show All Collections
show collections

// Show Current Database
db

// Show All Databases
show dbs
