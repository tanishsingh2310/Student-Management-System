import { Link, useParams } from "react-router-dom";

import { courses, students } from "../data/data";

function CourseDetails() {
  const { id } = useParams();

  const course = courses.find(
    (course) => course.id === Number(id)
  );

  if (!course) {
    return (
      <div className="page-container">
        <h1>Course Not Found</h1>

        <p>
          The course you are looking for does not exist.
        </p>

        <Link to="/courses" className="secondary-btn">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const enrolledStudents = students.filter(
    (student) => {
      if (student.course === "B.Tech CSE") {
        return course.name === "Web Technology" ||
          course.name === "DBMS" ||
          course.name === "Artificial Intelligence";
      }

      return false;
    }
  );

  return (
    <div className="page-container">

      <div className="details-header">

        <div>
          <span className="course-code">
            {course.code}
          </span>

          <h1>{course.name}</h1>

          <p>Course Details</p>
        </div>

        <Link
          to="/courses"
          className="secondary-btn"
        >
          ← Back to Courses
        </Link>

      </div>


      <div className="details-card">

        <h2>Course Information</h2>

        <div className="details-grid">

          <div>
            <span>Course Code</span>
            <strong>{course.code}</strong>
          </div>

          <div>
            <span>Course Name</span>
            <strong>{course.name}</strong>
          </div>

          <div>
            <span>Faculty</span>
            <strong>{course.faculty}</strong>
          </div>

          <div>
            <span>Credits</span>
            <strong>{course.credits}</strong>
          </div>

        </div>

      </div>


      <div className="details-card">

        <h2>Description</h2>

        <p className="course-description">
          {course.description}
        </p>

      </div>


      <div className="details-card">

        <h2>
          Students Enrolled
        </h2>

        {enrolledStudents.length > 0 ? (

          <div className="enrolled-students">

            {enrolledStudents.map((student) => (

              <div
                className="enrolled-student"
                key={student.id}
              >

                <div>
                  <strong>{student.name}</strong>

                  <span>
                    Enrollment: {student.enrollment}
                  </span>
                </div>

                <span>
                  {student.attendance}% Attendance
                </span>

              </div>

            ))}

          </div>

        ) : (

          <p>
            No students are currently enrolled in this course.
          </p>

        )}

      </div>

    </div>
  );
}

export default CourseDetails;