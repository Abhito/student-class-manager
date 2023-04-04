import './App.scss';
import {Route, Routes} from "react-router-dom"
import Layout from "./components/Layout";
import Students from "./components/Students";
import Classes from "./components/Classes";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route index element={<Students/>}/>
              <Route  path="Classes" element={<Classes/>}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
