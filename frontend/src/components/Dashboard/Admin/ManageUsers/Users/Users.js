import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Users = ({ users, currentUser }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">firstname</th>
              <th scope="col">lastname</th>
              <th scope="col">email</th>
              <th scope="col">username</th>
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

                    <td>
                      {user._id !== currentUser.userId ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success btn-sm me-2"
                          >
                            Reset Password
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
      </div>
    </>
  );
};

export default Users;
