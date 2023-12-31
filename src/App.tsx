import { Route, Routes } from "react-router-dom";
import AboutMe from "./Containers/AboutMe/AboutMe";
import LandingPage from "./Containers/LandingPage/LandingPage";
import WorkDetail from "./Containers/WorkDetail/WorkDetail";
import Works from "./Containers/Works/Works";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/work" element={<Works />} />
      <Route path="/work/:workSlug" element={<WorkDetail />} />
      <Route path="/about-me" element={<AboutMe />} />
    </Routes>
  );
}

export default App;
