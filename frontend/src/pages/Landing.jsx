import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaGraduationCap,
  FaHome,
  FaDoorOpen,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import Estilos from "../styles/Estilos";

export default function Landing() {
  return (
    <div>
      <nav className="container-fluid bg-light text-dark vh-100 d-flex flex-column justify-content-center align-items-center">
        <a href=""><FaHome size={24} color={'white'} /></a>
      </nav>
    </div>
  );
}
