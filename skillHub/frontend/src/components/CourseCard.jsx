import { FaUsers } from "react-icons/fa";

function CourseCard({
  title,
  students
}) {

  return (
    <div className="card">

      <h2>
        {title}
      </h2>

      <p>

        <FaUsers />

        {" "}
        Students :

        {" "}

        {students}

      </p>

      <button>
        View Course
      </button>

    </div>
  );
}

export default CourseCard;
