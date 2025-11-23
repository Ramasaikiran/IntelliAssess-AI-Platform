import React, { useState } from "react";

export default function LoginSignup() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    rollNo: "",
    facultyId: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const e = {};

    if (!form.password) e.password = "Password required";

    if (role === "student" && !form.rollNo)
      e.rollNo = "Roll No is required";

    if (role === "faculty" && !form.facultyId)
      e.facultyId = "Faculty ID is required";

    if (mode === "signup") {
      if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match";
    }

    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      alert(`${mode === "login" ? "Logged in" : "Signed up"} as ${role.toUpperCase()}`);
    }
  }

  return (
    <div className="container">
      <h2>{mode === "login" ? "Login" : "Signup"}</h2>

      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "New user? Signup" : "Already have an account? Login"}
      </button>

      <div className="role-switch">
        <button
          type="button"
          onClick={() => setRole("student")}
          style={{ background: role === "student" ? "#4a77ff" : "#ddd" }}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => setRole("faculty")}
          style={{ background: role === "faculty" ? "#4a77ff" : "#ddd" }}
        >
          Faculty
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {role === "student" && (
          <>
            <label>Roll No.</label>
            <input
              name="rollNo"
              value={form.rollNo}
              onChange={handleChange}
            />
            {errors.rollNo && <p className="error">{errors.rollNo}</p>}
          </>
        )}

        {role === "faculty" && (
          <>
            <label>Faculty ID</label>
            <input
              name="facultyId"
              value={form.facultyId}
              onChange={handleChange}
            />
            {errors.facultyId && <p className="error">{errors.facultyId}</p>}
          </>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {mode === "signup" && (
          <>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </>
        )}

        <button type="submit">
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
}
