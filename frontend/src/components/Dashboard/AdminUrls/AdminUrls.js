import { useEffect, useState } from "react";
import { Toast } from "../../Toast/Toast";
import Back from "../Back/Back";
import AllUrls from "../AllUrls/AllUrls";
import { getAllUsersUrls } from "../../../services/requestService";

const AdminUrls = () => {
  const [urls, setUrls] = useState();

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async () => {
    try {
      const { data } = await getAllUsersUrls();
      if (data) {
        setUrls(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="d-flex">
      <Back />
      <Toast />
      <div className="col-6 mx-auto mt-5">
        <AllUrls urls={urls} />
      </div>
    </main>
  );
};

export default AdminUrls;
