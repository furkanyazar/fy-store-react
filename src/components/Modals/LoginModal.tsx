import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { setShowLoginModal } from "../../store/slices/modalSlice";

const LoginModal = () => {
  const { showLoginModal } = useAppSelector((state) => state.modalItems);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setShowLoginModal(false));

  return (
    <Modal show={showLoginModal} onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModal;
