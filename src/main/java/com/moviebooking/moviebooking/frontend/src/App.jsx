import { useEffect, useState } from "react";

const API = "http://localhost:8080/movies";

function App() {
  const [movies, setMovies] = useState([]);

  const [form, setForm] = useState({
    name: "",
    theatre: "",
    date: "",
    time: "",
  });

  // Load movies
  const loadMovies = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.error("Error loading movies:", err);
      });
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add movie
  const addMovie = (e) => {
    e.preventDefault();

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm({
          name: "",
          theatre: "",
          date: "",
          time: "",
        });

        loadMovies();
      })
      .catch((err) => {
        console.error("Error adding movie:", err);
      });
  };

  // Delete movie
  const deleteMovie = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        loadMovies();
      })
      .catch((err) => {
        console.error("Error deleting movie:", err);
      });
  };

  // Edit movie
  const editMovie = (movie) => {
    const name = prompt("Enter movie name:", movie.name);
    const theatre = prompt("Enter theatre:", movie.theatre);
    const date = prompt("Enter date:", movie.date);
    const time = prompt("Enter time:", movie.time);

    if (!name || !theatre || !date || !time) {
      return;
    }

    fetch(`${API}/${movie.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        theatre: theatre,
        date: date,
        time: time,
      }),
    })
      .then(() => {
        loadMovies();
      })
      .catch((err) => {
        console.error("Error editing movie:", err);
      });
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logo}>
          MB
        </div>

        <div>
          <h1 style={styles.title}>
            MOVIE BOOKING
          </h1>

          <p style={styles.subtitle}>
            Movie schedule and booking management system
          </p>
        </div>
      </div>


      {/* ADD MOVIE */}
      <div style={styles.card}>

        <h2 style={styles.heading}>
          Add New Movie
        </h2>

        <p style={styles.description}>
          Enter movie details to add a new show
        </p>

        <form onSubmit={addMovie} style={styles.form}>

          <div style={styles.field}>
            <label style={styles.label}>
              Movie Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter movie name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>


          <div style={styles.field}>
            <label style={styles.label}>
              Theatre
            </label>

            <input
              type="text"
              name="theatre"
              placeholder="Enter theatre"
              value={form.theatre}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>


          <div style={styles.field}>
            <label style={styles.label}>
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>


          <div style={styles.field}>
            <label style={styles.label}>
              Show Time
            </label>

            <input
              type="text"
              name="time"
              placeholder="Example: 8:15 PM"
              value={form.time}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>


          <button
            type="submit"
            style={styles.addButton}
          >
            + Add Movie
          </button>

        </form>
      </div>


      {/* MOVIE SCHEDULE */}
      <div style={styles.card}>

        <div style={styles.scheduleHeader}>

          <div>
            <h2 style={styles.heading}>
              Movie Schedule
            </h2>

            <p style={styles.description}>
              Currently available movies and show timings
            </p>
          </div>

          <div style={styles.count}>
            {movies.length} Movies
          </div>

        </div>


        {/* TABLE */}
        <div style={styles.tableContainer}>

          <table style={styles.table}>

            <thead>
              <tr>

                <th style={styles.th}>
                  ID
                </th>

                <th style={styles.th}>
                  MOVIE
                </th>

                <th style={styles.th}>
                  THEATRE
                </th>

                <th style={styles.th}>
                  DATE
                </th>

                <th style={styles.th}>
                  TIME
                </th>

                <th style={styles.th}>
                  ACTION
                </th>

              </tr>
            </thead>


            <tbody>

              {movies.map((movie) => (
                <tr key={movie.id}>

                  <td style={styles.td}>
                    <span style={styles.id}>
                      {movie.id}
                    </span>
                  </td>


                  <td style={styles.td}>
                    <span style={styles.movieName}>
                      {movie.name}
                    </span>
                  </td>


                  <td style={styles.td}>
                    {movie.theatre}
                  </td>


                  <td style={styles.td}>
                    {movie.date}
                  </td>


                  <td style={styles.td}>
                    {movie.time}
                  </td>


                  <td style={styles.td}>

                    <button
                      onClick={() => editMovie(movie)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMovie(movie.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>


      {/* FOOTER */}
      <div style={styles.footer}>

        <div style={styles.footerLine}></div>

        <p style={styles.footerTitle}>
          Movie Booking System
        </p>

        <p style={styles.footerText}>
          React.js | Spring Boot | REST API
        </p>

      </div>

    </div>
  );
}


/* =====================================================
   STYLES
   ===================================================== */

const styles = {

  page: {
    minHeight: "100vh",
    padding: "35px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #070b14 0%, #101827 50%, #180b25 100%)",
    color: "#ffffff",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },


  header: {
    maxWidth: "1150px",
    margin: "0 auto 30px",
    padding: "30px",
    boxSizing: "border-box",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background:
      "linear-gradient(135deg, #6d28d9, #2563eb)",
    boxShadow:
      "0 18px 45px rgba(0, 0, 0, 0.45)",
  },


  logo: {
    width: "65px",
    height: "65px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "1px",
    flexShrink: 0,
  },


  title: {
    margin: "0",
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#ffffff",
  },


  subtitle: {
    margin: "8px 0 0",
    fontSize: "15px",
    color: "#dbeafe",
  },


  card: {
    maxWidth: "1150px",
    margin: "0 auto 25px",
    padding: "28px",
    boxSizing: "border-box",
    borderRadius: "18px",
    background: "rgba(15, 23, 42, 0.97)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    boxShadow:
      "0 15px 35px rgba(0, 0, 0, 0.35)",
  },


  heading: {
    margin: "0",
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
  },


  description: {
    margin: "7px 0 20px",
    fontSize: "14px",
    color: "#94a3b8",
  },


  form: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    alignItems: "end",
  },


  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },


  label: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#cbd5e1",
  },


  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "9px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    outline: "none",
  },


  addButton: {
    minHeight: "44px",
    padding: "13px 18px",
    border: "none",
    borderRadius: "9px",
    background:
      "linear-gradient(135deg, #7c3aed, #2563eb)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },


  scheduleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },


  count: {
    padding: "9px 15px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #7c3aed, #2563eb)",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },


  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },


  table: {
    width: "100%",
    minWidth: "800px",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
  },


  th: {
    padding: "14px",
    textAlign: "left",
    color: "#a5b4fc",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },


  td: {
    padding: "15px 14px",
    color: "#cbd5e1",
    fontSize: "14px",
    background: "#111c2e",
    borderTop: "1px solid #1e293b",
    borderBottom: "1px solid #1e293b",
    whiteSpace: "nowrap",
  },


  id: {
    display: "inline-block",
    minWidth: "28px",
    padding: "5px 8px",
    boxSizing: "border-box",
    borderRadius: "7px",
    textAlign: "center",
    background: "#312e81",
    color: "#c7d2fe",
    fontWeight: "bold",
  },


  movieName: {
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "bold",
  },


  editButton: {
    padding: "8px 12px",
    marginRight: "7px",
    border: "none",
    borderRadius: "7px",
    background: "#f59e0b",
    color: "#111827",
    fontSize: "13px",
    fontWeight: "bold",
    cursor: "pointer",
  },


  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "7px",
    background: "#ef4444",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "bold",
    cursor: "pointer",
  },


  footer: {
    maxWidth: "1150px",
    margin: "35px auto 0",
    textAlign: "center",
    color: "#64748b",
    fontSize: "13px",
  },


  footerLine: {
    height: "1px",
    marginBottom: "18px",
    background: "#1e293b",
  },


  footerTitle: {
    margin: "0 0 6px",
    color: "#94a3b8",
    fontWeight: "bold",
  },


  footerText: {
    margin: "0",
    color: "#475569",
    fontSize: "12px",
  },

};

export default App;
