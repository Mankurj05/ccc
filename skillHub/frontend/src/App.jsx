import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import AddCourse from "./pages/AddCourse";

import { ThemeProvider } from "./components/ThemeContext";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider>

      <BrowserRouter>

        <Navbar />

        <div className="layout">

          <Sidebar />

          <main>

            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/courses"
                element={<Courses />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              <Route
                path="/add-course"
                element={<AddCourse />}
              />

            </Routes>

          </main>

        </div>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
        />

      </BrowserRouter>

    </ThemeProvider>
  );
}
export default App;
