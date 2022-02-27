import { useState } from "react";
import moment from "moment";
import { successToast, errorToast } from "../../Toast/Toast";
import { removeUrl } from "../../../services/requestService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ModalComponent from "./Modal/ModalComponent";
import { Link } from "react-router-dom";

const AllUrls = ({ urls }) => {
  const [show, setShow] = useState(false);
  const [urlShortname, setUrlShortname] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = async (e) => {
    try {
      const id = e.target.id.split("-")[1];
      if (id) {
        await removeUrl(id);
        successToast("URL removed successfully");
        setTimeout(() => {
          // getUrls();
        }, 3000);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">URL</th>
              <th scope="col">Shortname</th>
              <th scope="col">Link</th>
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
                    <td>
                      <Link to={`/${url.shortname}`}>Go To</Link>
                    </td>
                    <td>{moment(url.createdAt).format("L")}</td>
                    <td>{moment(url.updatedAt).format("L")}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-2"
                        onClick={() => {
                          handleShow();
                          setUrlShortname(url.shortname);
                        }}
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
        <ModalComponent
          handleClose={handleClose}
          show={show}
          urlShortname={urlShortname}
        />
      </div>
    </>
  );
};

export default AllUrls;
