function StudentForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing
}) {
  return (
    <div className="student-form">

      <h2>
        {isEditing ? "Edit Student" : "Add Student"}
      </h2>

      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label>Student Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label>Enrollment Number</label>

          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            onChange={onChange}
            placeholder="Enter enrollment number"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Course</label>

          <select
            name="course"
            value={formData.course}
            onChange={onChange}
            required
          >
            <option value="">
              Select Course
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

        <div className="form-group">
          <label>Semester</label>

          <select
            name="semester"
            value={formData.semester}
            onChange={onChange}
            required
          >
            <option value="">
              Select Semester
            </option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            required
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Attendance (%)</label>

          <input
            type="number"
            name="attendance"
            value={formData.attendance}
            onChange={onChange}
            min="0"
            max="100"
            placeholder="Enter attendance"
            required
          />
        </div>

        <div className="form-actions">

          <button
            type="submit"
            className="primary-btn"
          >
            {isEditing ? "Update Student" : "Add Student"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="secondary-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}

export default StudentForm;