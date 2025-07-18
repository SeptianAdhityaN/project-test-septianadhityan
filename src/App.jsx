// App.jsx
import { Routes, Route } from "react-router-dom";
import IdeasPage from "./pages/Ideas";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<IdeasPage />} />
      </Routes>
  );
};

export default App;
