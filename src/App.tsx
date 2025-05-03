import ProductDisplay from "./Components/ProductDisplay";
import SideBar from "./Components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div
        className="flex h-screen w-full pl-60">
        <SideBar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<ProductDisplay />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
