import DashboardCard from "../components/DashboardCard";
import { students, courses } from "../data/data";

function Dashboard() {

  // Total number of students
  const totalStudents = students.length;

  // Total number of courses
  const totalCourses = courses.length;

  // Number of active courses
  const activeCourses = courses.filter(
    (course) => course.credits > 0
  ).length;

  // Calculate average attendance
  const totalAttendance = students.reduce(
    (total, student) => total + student.attendance,
    0
  );

  const averageAttendance = (
    totalAttendance / totalStudents
  ).toFixed(1);

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Dashboard</h1>

        <p>
          College Course & Student Management System
        </p>
      </div>

      <div className="dashboard-grid">

        <DashboardCard
          title="Total Students"
          value={totalStudents}
        />

        <DashboardCard
          title="Total Courses"
          value={totalCourses}
        />

        <DashboardCard
          title="Active Courses"
          value={activeCourses}
        />

        <DashboardCard
          title="Average Attendance"
          value={`${averageAttendance}%`}
        />

      </div>

      <div className="recent-students">

        <h2>Recent Students</h2>

        <div className="student-preview">

          {students.slice(0, 5).map((student) => (
            <div
              className="student-preview-card"
              key={student.id}
            >

              <h3>{student.name}</h3>

              <p>
                Enrollment: {student.enrollment}
              </p>

              <p>
                Course: {student.course}
              </p>

              <p>
                Attendance: {student.attendance}%
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;