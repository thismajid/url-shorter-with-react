import { useEffect, useState } from "react";
import moment from "moment";
import { Toast, successToast, errorToast } from "../../Toast/Toast";
import { getAllUserUrls, removeUrl } from "../../../services/requestService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Back from "../Back/Back";

const AllUrls = () => {
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

  const deleteHandler = async (e) => {
    try {
      const id = e.target.id.split("-")[1];
      if (id) {
        await removeUrl(id);
        successToast("URL removed successfully");
        setTimeout(() => {
          getUrls();
        }, 3000);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <>
      <Back />
      <Toast />
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">URL</th>
              <th scope="col">Shortname</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {urls &&
              urls.map((url, index) => {
                return (
                  <tr key={url._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{url.url}</td>
                    <td>{url.shortname}</td>
                    <td>{moment(url.createdAt).format("L")}</td>
                    <td>{moment(url.updatedAt).format("L")}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-2 "
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        id={`url-${url._id}`}
                        onClick={deleteHandler}
                      >
                        <AiFillDelete />
                      </button>
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

export default AllUrls;
