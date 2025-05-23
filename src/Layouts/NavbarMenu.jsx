import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/Images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "react-bootstrap/Button";
import "../../src/index.css";
import Profile from "../components/Profile";
import useAuth from "../hooks/useAuth";
import { Scrool } from "../components/Scrool";

function NavbarMenu() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
            <Link
              to="/produits"
              smooth={true}
              duration={200}
              className="nav-link ps-0 lh-lg navMenu"
              onClick={(e) => {
                e.preventDefault();
                Scrool("produits");
                handleNavLinkClick();
              }}
            >
              Produits
            </Link>

            {/* Visible seulement si rôle = admin */}
            {isAuthenticated && userRole === "admin" && (
              <Link
                to="/utilisateurs"
                className="nav-link ps-0 lh-lg navMenu"
                onClick={(e) => {
                  e.preventDefault();
                  Scrool("utilisateurs")
                  handleNavLinkClick();
                }}
              >
                Utilisateurs
              </Link>
            )}

            {/* Non connecté */}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="nav-link lh-lg px-4 py-1 navMenu navConnexion"
                  onClick={handleNavLinkClick}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="nav-link lh-lg px-4 py-1 navMenu navInscription"
                  onClick={handleNavLinkClick}
                >
                  Inscription
                </Link>
              </>
            )}

            {/* Connecté */}
            {isAuthenticated && (
              <>
                <Profile />
                <Link
                  className="nav-link lh-lg px-4 py-1 bg-danger text-light border rounded-2 navMenue"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Link>
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
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
}
export default NavbarMenu;
