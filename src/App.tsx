import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentTable from "./components/studentsTable";
import StudentProfile from "./components/studentProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/student/:id" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
