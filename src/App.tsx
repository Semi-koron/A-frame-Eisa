import { Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/Result";
import HomePage from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gameplay" element={<GamePage />} />
        <Route path="/Result" element={<ResultPage />} />
      </Routes>
    </>
  );
};

export default App;
