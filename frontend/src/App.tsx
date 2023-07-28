import "./App.css";
import Homepage from "./Pages/Homepage";
import Sidebar from "./Components/Sidebar";
import Allroutes from "./Routes/Allroutes";

function App() {
  return (
    <div className="font-poppins">
      {/* <h1 className="text-3xl font-bold ">Tailwind is working</h1> */}
      {/* <Homepage/> */}
      {/* <Sidebar /> */}
      <Allroutes />
    </div>
  );
}

export default App;
