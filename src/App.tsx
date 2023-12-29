import { Route, Routes } from "react-router-dom";
import LandingPage from "./Containers/LandingPage/LandingPage";
import Works from "./Containers/Works/Works";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/work" element={<Works />} />
    </Routes>
  );
}

export default App;
