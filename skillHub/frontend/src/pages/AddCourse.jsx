import { useState } from "react";

import API from "../api/courseApi";

import { toast } from "react-toastify";

function AddCourse() {

  const [course, setCourse] =
    useState({
      title: "",
      students: ""
    });

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !course.title ||
      !course.students
    ) {

      toast.error(
        "All Fields Required"
      );

      return;
    }

    try {

      await API.post(
        "/courses",
        course
      );

      toast.success(
        "Course Added Successfully"
      );

      setCourse({
        title: "",
        students: ""
      });

    }

    catch (error) {

      toast.error(
        "Failed To Add Course"
      );

    }

  }

  return (

    <div className="page-container">

      <h1>Add Course</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Course Title"
          value={course.title}
          onChange={(e) =>
            setCourse({
              ...course,
              title: e.target.value
            })
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Students Count"
          value={course.students}
          onChange={(e) =>
            setCourse({
              ...course,
              students: e.target.value
            })
          }
        />

        <br /><br />

        <button type="submit">
          Add Course
        </button>

      </form>

    </div>

  );
}

export default AddCourse;
