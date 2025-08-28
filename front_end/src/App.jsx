import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rotas from "./pages/Rotas.jsx";
import Login from "./pages/Login";
import {UsuarioProvider} from "./UsuarioContext";

export default function App() {
	return (
		
		<UsuarioProvider>
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/*" element={<Rotas />} />
			</Routes>
		</Router>
		</UsuarioProvider>
	);
}