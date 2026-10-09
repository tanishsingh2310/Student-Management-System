import { useMemo, useState } from "react";

import StudentCard from "../components/StudentCard";
import StudentForm from "../components/StudentForm";

import { students as initialStudents } from "../data/data";

function Students() {

  const [students, setStudents] = useState(
    initialStudents
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCourse, setSelectedCourse] =
    useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const emptyForm = {
    name: "",
    enrollment: "",
    email: "",
    course: "",
    semester: "",
    gender: "",
    attendance: ""
  };

  const [formData, setFormData] =
    useState(emptyForm);


  // Handle input changes
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };


  // Add or update student
  const handleSubmit = (event) => {

    event.preventDefault();

    if (editingStudent) {

      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...formData,
                semester: Number(formData.semester),
                attendance: Number(formData.attendance)
              }
            : student
        )
      );

      setEditingStudent(null);

    } else {

      const newStudent = {
        id: Date.now(),
        ...formData,
        semester: Number(formData.semester),
        attendance: Number(formData.attendance),
        subjects: []
      };

      setStudents((previousStudents) => [
        ...previousStudents,
        newStudent
      ]);
    }

    setFormData(emptyForm);
    setShowForm(false);
  };


  // Edit student
  const handleEdit = (student) => {

    setEditingStudent(student);

    setFormData({
      name: student.name,
      enrollment: student.enrollment,
      email: student.email,
      course: student.course,
      semester: student.semester,
      gender: student.gender,
      attendance: student.attendance
    });

    setShowForm(true);
  };


  // Delete student
  const handleDelete = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.id !== id
      )
    );
  };


  // Filter students
  const filteredStudents = useMemo(() => {

    return students.filter((student) => {

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.enrollment
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourse === "All" ||
        student.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });

  }, [students, searchTerm, selectedCourse]);


  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Student Management</h1>

          <p>
            Manage student records, search and attendance.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setEditingStudent(null);
            setFormData(emptyForm);
            setShowForm(true);
          }}
        >
          + Add Student
        </button>

      </div>


      {showForm && (
        <StudentForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
            setFormData(emptyForm);
          }}
          isEditing={Boolean(editingStudent)}
        />
      )}


      <div className="student-controls">

        <input
          type="text"
          placeholder="Search by name or enrollment..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />


        <select
          value={selectedCourse}
          onChange={(event) =>
            setSelectedCourse(event.target.value)
          }
        >
          <option value="All">
            All Courses
          </option>

          <option value="B.Tech CSE">
            B.Tech CSE
          </option>

          <option value="B.Tech IT">
            B.Tech IT
          </option>

          <option value="BCA">
            BCA
          </option>
        </select>

      </div>


      <div className="students-list">

        {filteredStudents.length > 0 ? (

          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))

        ) : (

          <div className="no-results">
            <h3>No students found</h3>

            <p>
              Try changing your search or filter.
            </p>
          </div>

        )}

      </div>

    </div>
  );
}

export default Students;