import { Link, useParams } from "react-router-dom";

import { students } from "../data/data";

function StudentDetails() {

  const { id } = useParams();

  const student = students.find(
    (student) => student.id === Number(id)
  );

  if (!student) {
    return (
      <div className="page-container">

        <h1>Student Not Found</h1>

        <p>
          The student you are looking for does not exist.
        </p>

        <Link to="/students">
          ← Back to Students
        </Link>

      </div>
    );
  }

  const getAttendanceStatus = (attendance) => {

    if (attendance >= 75) {
      return "Eligible";
    }

    if (attendance >= 60) {
      return "Warning";
    }

    return "Detained";
  };

  const attendanceStatus =
    getAttendanceStatus(student.attendance);

  return (
    <div className="page-container">

      <div className="details-header">

        <div>
          <h1>{student.name}</h1>

          <p>
            Student Details
          </p>
        </div>

        <Link
          to="/students"
          className="secondary-btn"
        >
          ← Back to Students
        </Link>

      </div>


      {/* Basic Information */}

      <div className="details-card">

        <h2>Personal Information</h2>

        <div className="details-grid">

          <div>
            <span>Enrollment Number</span>
            <strong>{student.enrollment}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div>
            <span>Course</span>
            <strong>{student.course}</strong>
          </div>

          <div>
            <span>Semester</span>
            <strong>{student.semester}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{student.gender}</strong>
          </div>

          <div>
            <span>Attendance</span>
            <strong>{student.attendance}%</strong>
          </div>

        </div>

      </div>


      {/* Attendance */}

      <div className="details-card">

        <h2>Attendance Status</h2>

        <div className="attendance-detail">

          <div className="attendance-number">
            {student.attendance}%
          </div>

          <div>

            <h3>
              {attendanceStatus}
            </h3>

            <p>
              {attendanceStatus === "Eligible" &&
                "The student meets the minimum attendance requirement."
              }

              {attendanceStatus === "Warning" &&
                "The student's attendance is below 75%. Attendance needs improvement."
              }

              {attendanceStatus === "Detained" &&
                "The student's attendance is below 60% and the student is detained."
              }
            </p>

          </div>

        </div>

      </div>


      {/* Subjects */}

      <div className="details-card">

        <h2>Subjects & Performance</h2>

        {student.subjects.length > 0 ? (

          <div className="subjects-list">

            {student.subjects.map((subject) => (

              <div
                className="subject-row"
                key={subject.name}
              >

                <span>
                  {subject.name}
                </span>

                <strong>
                  {subject.marks}%
                </strong>

              </div>

            ))}

          </div>

        ) : (

          <p>
            No subject information available.
          </p>

        )}

      </div>

    </div>
  );
}

export default StudentDetails;