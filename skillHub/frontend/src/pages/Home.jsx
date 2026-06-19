import { useEffect, useState } from "react";

import Hero from "../components/Hero";

import CourseCard from "../components/CourseCard";

import API from "../api/courseApi";

function Home() {

  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    fetchCourses();

  }, []);

  async function fetchCourses() {

    try {

      const response =
        await API.get("/courses");

      setCourses(response.data);

    }

    catch (err) {

      setError(
        "Unable to Load Courses"
      );

    }

    finally {

      setLoading(false);

    }

  }

  if (loading)
    return <h2>Loading Courses...</h2>;

  if (error)
    return <h2>{error}</h2>;

  return (
    <>

      <Hero />

      <input
        className="search"
        type="text"
        placeholder="Search Course"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="courses">

        {
          courses

            .filter((course) =>
              course.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )

            .map((course) => (

              <CourseCard
                key={course._id}
                title={course.title}
                students={course.students}
              />

            ))
        }

      </div>

    </>
  );
}

export default Home;
