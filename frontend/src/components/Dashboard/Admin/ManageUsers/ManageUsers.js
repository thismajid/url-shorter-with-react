import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../services/requestService";
import Users from "./Users/Users";
import { Toast, errorToast } from "../../../Toast/Toast";
import Back from "../../Back/Back";
import PaginationComponent from "../../Pagination/Pagination";

const ManageUsers = ({ currentUser }) => {
  const [users, setUsers] = useState(null);

  const userPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [allUserCount, setAllUserCount] = useState(null);

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    try {
      const { data } = await getAllUsers();
      if (data) {
        setUsers(data.data.docs);
        setAllUserCount(data.data.totalDocs);
        setCurrentPage(data.data.page);
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
      <PaginationComponent
        itemsCount={allUserCount}
        itemsPerPage={userPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        alwaysShown={false}
      />
    </div>
  );
};

export default ManageUsers;
