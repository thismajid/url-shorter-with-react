import { useEffect, useState } from "react";
import { Toast, errorToast } from "../../../Toast/Toast";
import Back from "../../Back/Back";
import AllUrls from "../../AllUrls/AllUrls";
import { getAllUsersUrls } from "../../../../services/requestService";
import PaginationComponent from "../../Pagination/Pagination";

const AdminUrls = () => {
  const [urls, setUrls] = useState();

  const urlPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [allUrlCount, setAllUrlCount] = useState(null);

  useEffect(() => {
    getUrls();
  }, [currentPage]);

  const getUrls = async () => {
    try {
      const { data } = await getAllUsersUrls(currentPage);
      if (data) {
        setUrls(data.data.docs);
        setAllUrlCount(data.data.totalDocs);
        setCurrentPage(data.data.page);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <main className="d-flex">
      <Back />
      <Toast />
      <div className="col-6 mx-auto mt-5">
        <AllUrls urls={urls} />
        <PaginationComponent
          itemsCount={allUrlCount}
          itemsPerPage={urlPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          alwaysShown={false}
        />
      </div>
    </main>
  );
};

export default AdminUrls;
