import ProductDisplay from "./Components/ProductDisplay";
import SideBar from "./Components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen w-screen pl-[25%]">
        <SideBar />
        <div>
          <Routes>
            <Route path="/" element={<ProductDisplay />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
