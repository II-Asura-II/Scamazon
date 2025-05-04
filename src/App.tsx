import ProductDisplay from "./Components/ProductDisplay";
import ProductPage from "./Components/ProductPage";
import SideBar from "./Components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="w-full pl-65 h-screen">
        <SideBar />
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<ProductDisplay />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
