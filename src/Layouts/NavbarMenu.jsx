import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/Images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "react-bootstrap/Button";
import '../../src/index.css';
import Profile from "../components/Profile";

function NavbarMenu() {
  // const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const [expanded, setExpanded] = useState(false);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavLinkClick = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  // Récupérer les infos utilisateur depuis localStorage
  const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

let user = null;
try {
  user = userData ? JSON.parse(userData) : null;
} catch (e) {
  console.error("Erreur de parsing userData:", e);
}

const isAuthenticated = !!token;
const userRole = user?.role ?? null;


  return (
    <Navbar
      expand="lg"
      className="shadow position-fixed w-100 justify-content-between z-1"
      expanded={expanded}
      onToggle={handleNavToggle}
      style={{ background: "#FEFBFF" }}
    >
      <Container className="pb-2">
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo" className="w-25" />
        </Navbar.Brand>

        <Button
          onClick={handleNavToggle}
          className="hamburger-icon border-0 text-dark d-lg-none"
          style={{ background: "#FEFBFF" }}
        >
          <GiHamburgerMenu className="fs-1" />
        </Button>

        <Navbar.Collapse id="navbarSupportedContent" className="flex-grow-0">
        <Nav className="ms-auto d-flex gap-4 align-items-center justify-content-between navMenu">
  {/* Produits (toujours visible) */}
  <Nav.Link
    as={Link}
    href="#produits"
    className="nav-link ps-0 lh-lg navMenu"
    onClick={handleNavLinkClick}
  >
    Produits
  </Nav.Link>

  {/* Visible seulement si rôle = admin */}
  {isAuthenticated && userRole === "admin" && (
    <Nav.Link
      as={Link}
      href="#utilisateurs"
      className="nav-link ps-0 lh-lg navMenu"
      onClick={handleNavLinkClick}
    >
      Utilisateurs
    </Nav.Link>
  )}

  {/* Non connecté */}
  {!isAuthenticated && (
    <>
      <Nav.Link
        as={Link}
        to="/login"
        className="nav-link lh-lg px-4 py-1 navMenu navConnexion"
        onClick={handleNavLinkClick}
      >
        Connexion
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/register"
        className="nav-link lh-lg px-4 py-1 navMenu navInscription"
        onClick={handleNavLinkClick}
      >
        Inscription
      </Nav.Link>
    </>
  )}

  {/* Connecté */}
  {isAuthenticated && (
    <>
      <Profile/>
      <Nav.Link
        className="nav-link lh-lg px-4 py-1 bg-danger text-light border rounded-2 navMenue"
        onClick={handleLogout}
      >
        Déconnexion
      </Nav.Link>
    </>
  )}
</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function NavLink({ to, children }) {
  const isActive = location.hash === to;

  return (
    <Nav.Link
      as={Link}
      to={to}
      className={`nav-link ${isActive ? "active" : ""}`}
    >
      {children}
    </Nav.Link>
  );
}
export default NavbarMenu;
