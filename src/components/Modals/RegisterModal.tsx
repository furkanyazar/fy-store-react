import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { setShowRegisterModal } from "../../store/slices/modalSlice";

const RegisterModal = () => {
  const { showRegisterModal } = useAppSelector((state) => state.modalItems);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setShowRegisterModal(false));

  return (
    <Modal show={showRegisterModal} onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RegisterModal;
