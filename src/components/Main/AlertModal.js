import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const AlertModal = ({ show, type, message, delay, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay, onClose]);

  const getModalClassName = () => {
    switch (type) {
      case "success":
        return "bg-success text-white";
      case "error":
        return "bg-danger text-white";
      case "notification":
        return "bg-primary text-white";
      default:
        return "";
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className={getModalClassName()} closeButton>
        <Modal.Title>Уведомление</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
