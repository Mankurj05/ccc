const Course =
require("../models/Course");

// GET ALL COURSES

const getCourses =
async (req, res) => {

  try {

    const courses =
      await Course.find();

    res.status(200).json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ADD COURSE

const addCourse =
async (req, res) => {

  try {

    const course =
      await Course.create({
        title: req.body.title,
        students: req.body.students
      });

    res.status(201).json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getCourses,
  addCourse
};
