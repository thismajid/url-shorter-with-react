import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../services/requestService";
import { authorize } from "../../../../services/authorize";
import Users from "./Users/Users";
import { Toast, errorToast } from "../../../Toast/Toast";
import Back from "../../Back/Back";

const ManageUsers = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUsers();
    const { logginUser } = authorize();
    setCurrentUser(logginUser);
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await getAllUsers();
      if (data) {
        setUsers(data.data);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <div className="col-6 mx-auto mt-5">
      <Back />
      <Toast />
      <Users currentUser={currentUser} users={users} getUsers={getUsers} />
    </div>
  );
};

export default ManageUsers;
