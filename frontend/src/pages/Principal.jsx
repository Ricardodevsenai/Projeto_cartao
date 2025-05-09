import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Estilos from "../styles/Estilos";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGraduationCap, FaHome, FaDoorOpen } from "react-icons/fa";
import { MdPeopleAlt } from 'react-icons/md';
export default function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "white" }}>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            padding: "5px",
            gap: "40px",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
      
        
        
          <Link to="" className="px-5">
          <FaHome size={32} color={'white'}/>
          </Link>
          <Link to="" className="px-5">
            <MdPeopleAlt size={32} color={'white'}/>
          </Link>
          <Link to="" className="px-5">
            <FaGraduationCap size={32} color={'white'}/>
          </Link>
          <Link to="" className="px-5">
            <FaDoorOpen color={'white'}/>
          </Link>
        </div>
      

      <div>
        <span role="img" aria-label="search">
          🔍
        </span>
      </div>
    </div>
  );
}
