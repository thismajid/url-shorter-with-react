import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ModalComponent from "./Modal/ModalComponent";

const Users = ({ users, currentUser, getUsers }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>

                    <td>
                      {user._id !== currentUser.userId ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success btn-sm me-2"
                            onClick={() => {
                              handleShow();
                              setUser(user);
                            }}
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                          >
                            <AiFillDelete />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ModalComponent
          handleClose={handleClose}
          show={show}
          user={user}
          getUsers={getUsers}
        />
      </div>
    </>
  );
};

export default Users;
