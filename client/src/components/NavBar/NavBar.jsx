import React, { useState, useEffect } from "react";
import "./NavBar.css";

// Import components
import { NotAuthenticated } from "../Modals/NotAuthenticated/NotAuthenticated";

// Import bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";

// Import React Icons
import { BsTerminal } from "react-icons/bs";
import { CiLock, CiCircleCheck } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

// Import API
import { fetchAuthStatus } from "../../api/gpt.api";

export const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const links = [
    { title: "Playground", icon: <BsTerminal />, href: "/" },
    { title: "API Keys", icon: <CiLock />, href: "/keys" },
    {
      title: "Documentation",
      icon: <IoDocumentOutline />,
      href: "/documentation",
    },
    { title: "About", icon: <IoMdInformationCircleOutline />, href: "/about" },
  ];
  const title = "WhatsApp GPT Bot";
  const expand = "md";

  // Fetch the current auth status
  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const response = await fetchAuthStatus();
        setIsAuth(response.is_auth);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentAuth();
    const intervalId = setInterval(fetchCurrentAuth, 5e3);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Navbar expand={expand}>
      <Container fluid>
        <Navbar.Brand className="navbar-title">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="custom-nav">
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
              }}
            >
              <h1
                style={{
                  paddingBottom: "20px",
                  borderBottom: "solid var(--border-primary) 2px",
                }}
              >
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    color: "var(--color-link)",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </span>
              </h1>
              {links.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={`/#${link.href}`}
                  title={`Go to ${link.title} page`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: "500",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      bottom: "2px",
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>{link.title}</div>
                </Nav.Link>
              ))}

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                {isAuth ? (
                  <Alert variant="success" style={{ width: "100%" }}>
                    <CiCircleCheck
                      style={{ position: "relative", bottom: "1.5px" }}
                    />{" "}
                    Authenticated
                  </Alert>
                ) : (
                  <NotAuthenticated />
                )}
              </div>
            </section>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
