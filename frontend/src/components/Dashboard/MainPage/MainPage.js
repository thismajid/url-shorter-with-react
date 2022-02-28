import { useEffect, useState } from "react";
import { Toast, errorToast } from "../../Toast/Toast";
import { getAllUserUrls } from "../../../services/requestService";
import Back from "../Back/Back";

import AllUrls from "../AllUrls/AllUrls";

const MainPage = () => {
  const [urls, setUrls] = useState(null);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async () => {
    try {
      const { data } = await getAllUserUrls();
      if (data) {
        setUrls(data.data);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <>
      <main className="d-flex">
        <Back />
        <Toast />
        <div className="col-6 mx-auto mt-5">
          <AllUrls urls={urls} getUrls={getUrls} />
        </div>
      </main>
    </>
  );
};

export default MainPage;
