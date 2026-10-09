import { useMemo, useState } from "react";

import CourseCard from "../components/CourseCard";
import { courses as initialCourses } from "../data/data";

function Courses() {
  const [courses, setCourses] = useState(initialCourses);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCredits, setSelectedCredits] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    code: "",
    name: "",
    faculty: "",
    credits: "",
    description: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCourse = {
      id: Date.now(),
      ...formData,
      credits: Number(formData.credits)
    };

    setCourses((previousCourses) => [
      ...previousCourses,
      newCourse
    ]);

    setFormData(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    setCourses((previousCourses) =>
      previousCourses.filter((course) => course.id !== id)
    );
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {

      const matchesSearch =
        course.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        course.code
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        course.faculty
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCredits =
        selectedCredits === "All" ||
        course.credits === Number(selectedCredits);

      return matchesSearch && matchesCredits;
    });
  }, [courses, searchTerm, selectedCredits]);

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Course Management</h1>

          <p>
            Manage courses, faculty, credits and course information.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setFormData(emptyForm);
            setShowForm(true);
          }}
        >
          + Add Course
        </button>

      </div>


      {showForm && (
        <div className="course-form">

          <h2>Add Course</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Course Code</label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Example: BCS106"
                required
              />
            </div>


            <div className="form-group">
              <label>Course Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter course name"
                required
              />
            </div>


            <div className="form-group">
              <label>Faculty</label>

              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                placeholder="Enter faculty name"
                required
              />
            </div>


            <div className="form-group">
              <label>Credits</label>

              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                min="1"
                max="10"
                placeholder="Enter credits"
                required
              />
            </div>


            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
                rows="4"
                required
              />
            </div>


            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                Add Course
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  setShowForm(false);
                  setFormData(emptyForm);
                }}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}


      <div className="course-controls">

        <input
          type="text"
          placeholder="Search by course name, code or faculty..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />


        <select
          value={selectedCredits}
          onChange={(event) =>
            setSelectedCredits(event.target.value)
          }
        >
          <option value="All">All Credits</option>
          <option value="3">3 Credits</option>
          <option value="4">4 Credits</option>
          <option value="5">5 Credits</option>
        </select>

      </div>


      <div className="courses-list">

        {filteredCourses.length > 0 ? (

          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDelete}
            />
          ))

        ) : (

          <div className="no-results">

            <h3>No courses found</h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Courses;