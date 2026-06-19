import { useEffect, useState } from "react";

import API from "../api/courseApi";

function Courses() {

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {

    getCourses();

  }, []);

  async function getCourses() {

    try {

      const response =
        await API.get("/courses");

      setCourses(response.data);

    }

    catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="page-container">

      <h1>Available Courses</h1>

      <h3>
        Total Courses :
        {" "}
        {courses.length}
      </h3>

      {
        courses.map((course) => (

          <div
            key={course._id}
            className="course-item"
          >

            📘 {course.title}

            {" "}

            (
            {course.students}
            Students
            )

          </div>

        ))
      }

    </div>

  );
}

export default Courses;
