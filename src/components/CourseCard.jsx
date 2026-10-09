import { Link } from "react-router-dom";

function CourseCard({ course, onDelete }) {
  return (
    <div className="course-card">

      <div className="course-card-header">
        <div>
          <span className="course-code">{course.code}</span>
          <h3>{course.name}</h3>
        </div>

        <span className="credit-badge">
          {course.credits} Credits
        </span>
      </div>

      <div className="course-card-body">
        <p>
          <strong>Faculty:</strong> {course.faculty}
        </p>

        <p>
          <strong>Description:</strong> {course.description}
        </p>
      </div>

      <div className="course-card-actions">

        <Link
          to={`/courses/${course.id}`}
          className="view-btn"
        >
          View Details
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(course.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default CourseCard;