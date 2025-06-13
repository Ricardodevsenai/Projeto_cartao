import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Alunos from "./pages/Alunos"
import Turmas from "./pages/Turmas"
import CadAlunos from "./pages/CadAlunos"
import CadTurmas from "./pages/CadTurmas"
import Landing from "./pages/Landing";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/alunos" element={ <Alunos />} />
        <Route path="/alunos/CadAlunos" element={<CadAlunos />} />
        <Route path="/turmas" element={ <Turmas/>} />
        <Route path='/turmas/CadTurmas' element={ <CadTurmas /> } />
      </Routes>
    </Router>
  );
}
