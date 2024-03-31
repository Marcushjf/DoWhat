import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent form submission

    // Perform validation
    if (!name || !password || !confirmPassword) {
      setError("Please enter both username and password.");
      return;
    }

    //check if password is entered correctly
    if (password !== confirmPassword) {
      setError("Please confirm password again.");
      return;
    }

    //check if username is at least 4 characters long
    if(name.length < 4){
        setError(`Username must be at least 4 characters long`)
        return
    }

    //check if password is at least 6 characters long
    if(password.length < 6){
        setError(`Password must be at least 6 characters long`)
        return
    }

    setLoading(true);

    // Make API call to authenticate user
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Username already exists.");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login
        console.log("Register successful:", data);
        navigate("/");
      })
      .catch((error) => {
        // Handle login error
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="container" id="fadeDown">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your desired username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid mb-3 mt-5">
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Already have an account? <Link to="/">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
