import { Modal, Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { Toast, errorToast } from "../../../../../Toast/Toast";
import { changeRole } from "../../../../../../services/requestService";

const ModalComponent = ({ show, handleClose, user, getUsers }) => {
  const updateRoleHandler = async (userId) => {
    try {
      if (userId) {
        await changeRole(userId);
        getUsers();
        handleClose();
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <>
      <Toast />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>"{user && user.username}" Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <>
              <FloatingLabel
                controlId="floatingInput"
                label="Firstname"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={user.firstname}
                  disabled
                  readOnly
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Lastname"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={user.lastname}
                  disabled
                  readOnly
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  value={user.email}
                  disabled
                  readOnly
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={user.username}
                  disabled
                  readOnly
                />
              </FloatingLabel>
              {user && user.role !== "admin" && (
                <FloatingLabel controlId="floatingSelect" label="Role">
                  <Form.Select aria-label="Floating label select example">
                    <option>{user.role}</option>
                    <option value={user.role === "admin" ? "user" : "admin"}>
                      {user.role === "admin" ? "user" : "admin"}
                    </option>
                  </Form.Select>
                </FloatingLabel>
              )}

              <Row className="mt-3">
                <Col>Avatar</Col>
                <Col>
                  <img
                    src={`http://localhost:3001/${user.avatar}`}
                    width="45px"
                    height="45px"
                    alt="useravatar"
                  />
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Reset Password
          </Button>
          {user && user.role !== "admin" && (
            <Button
              variant="success"
              onClick={() => updateRoleHandler(user._id)}
            >
              Update Role
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
