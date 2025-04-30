import SideBar from "./Components/SideBar";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />
      </div>
    </Router>
  );
};

export default App;
