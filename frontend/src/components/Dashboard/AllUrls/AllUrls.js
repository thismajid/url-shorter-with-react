import { useEffect, useState } from "react";
import moment from "moment";
import { getAllUserUrls } from "../../../services/requestService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const AllUrls = () => {
  const [urls, setUrls] = useState(null);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async () => {
    try {
      const { data } = await getAllUserUrls();
      if (data) {
        console.log(data.data);
        setUrls(data.data);
      }
    } catch (err) {}
  };

  return (
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
                    <button type="button" className="btn btn-danger btn-sm ">
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUrls;
