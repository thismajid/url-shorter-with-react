import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../services/requestService";
import Users from "./Users/Users";
import { Toast, errorToast } from "../../../Toast/Toast";
import Back from "../../Back/Back";

const ManageUsers = ({ currentUser }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers();
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
