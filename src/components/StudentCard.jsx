import { memo } from "react";
import { Link } from "react-router-dom";

function StudentCard({ student, onEdit, onDelete }) {

  const getAttendanceStatus = (attendance) => {
    if (attendance >= 75) {
      return "Eligible";
    }

    if (attendance >= 60) {
      return "Warning";
    }

    return "Detained";
  };

  const attendanceStatus = getAttendanceStatus(
    student.attendance
  );

  return (
    <div className="student-card">

      <div className="student-card-header">

        <div>
          <h3>{student.name}</h3>

          <p>
            Enrollment: {student.enrollment}
          </p>
        </div>

        <span
          className={`attendance-status ${attendanceStatus.toLowerCase()}`}
        >
          {attendanceStatus}
        </span>

      </div>

      <div className="student-card-body">

        <p>
          <strong>Email:</strong>{" "}
          {student.email}
        </p>

        <p>
          <strong>Course:</strong>{" "}
          {student.course}
        </p>

        <p>
          <strong>Semester:</strong>{" "}
          {student.semester}
        </p>

        <p>
          <strong>Gender:</strong>{" "}
          {student.gender}
        </p>

        <p>
          <strong>Attendance:</strong>{" "}
          {student.attendance}%
        </p>

      </div>

      <div className="student-card-actions">

        <Link
          to={`/students/${student.id}`}
          className="view-btn"
        >
          View Details
        </Link>

        <button
          className="edit-btn"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default memo(StudentCard);