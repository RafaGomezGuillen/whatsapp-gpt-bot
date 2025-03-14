import React, { useState, useEffect } from "react";

// Import boostrap components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

// Import Icons
import { CiWarning } from "react-icons/ci";

// Import QR code
import QRCode from "react-qr-code";

// Import API
import { fetchAuthStatus } from "../../../api/auth.api";

function NotAuthenticatedModal(props) {
  const [qrCode, setQrCode] = useState("");

  // Fetch the current auth status
  useEffect(() => {
    const fetchCurrentAuth = async () => {
      try {
        const response = await fetchAuthStatus();
        setQrCode(response.qr_code);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchCurrentAuth();
    const intervalId = setInterval(fetchCurrentAuth, 5e3);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="not-authenticated-modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Scan the QR code</h4>
        <QRCode
          value={qrCode}
          title="Scan me with your phone"
          style={{
            width: "100%",
            border: "solid var(--border-primary)",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        />

        <Card>
          <Card.Body>
            <Card.Title>Instructions</Card.Title>
            <Card.Text>
              <strong>1. Authenticate your WhatsApp Number:</strong>{" "}
              Open WhatsApp on your phone, navigate to Settings {"->"} Linked
              Devices, and scan the QR code displayed here to connect your
              WhatsApp account.
            </Card.Text>

            <Card.Text>
              <strong>2. Configure Your Settings:</strong>{" "}
              Adjust the configuration settings to your preference, then click
              on Save Configuration to apply the changes.
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export const NotAuthenticated = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="outline-warning"
        onClick={() => setModalShow(true)}
        style={{ width: "100%" }}
      >
        <CiWarning /> Not
        Authentified
      </Button>

      <NotAuthenticatedModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
