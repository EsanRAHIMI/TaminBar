import React from "react";

const Error = ({ message, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.errorBox}>
        <h3 style={styles.title}>An Error Occurred</h3>
        <p style={styles.message}>{message}</p>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  errorBox: {
    textAlign: "center",
    border: "1px solid #ff4d4f",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "90%",
  },
  title: {
    color: "#ff4d4f",
    margin: "0 0 10px",
  },
  message: {
    color: "#333",
    marginBottom: "20px",
  },
  closeButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Error;
