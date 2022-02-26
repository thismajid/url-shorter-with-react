import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Toast, successToast, errorToast } from "../../../Toast/Toast";
import { getUrl, updateUrlReq } from "../../../../services/requestService";

const ModalComponent = ({ show, handleClose, urlShortname }) => {
  const [updateUrl, setUpdateUrl] = useState({
    id: "",
    url: "",
    shortname: "",
  });

  useEffect(() => {
    getUrlByShortname();
  }, [show]);

  const getUrlByShortname = async () => {
    try {
      if (urlShortname) {
        const { data } = await getUrl(urlShortname);
        setUpdateUrl({
          id: data.data._id,
          url: data.data.url,
          shortname: data.data.shortname,
        });
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };

  const changeHandler = (e) => {
    setUpdateUrl({ ...updateUrl, [e.target.name]: e.target.value });
  };

  const updateHandler = async () => {
    try {
      if (updateUrl) {
        const response = await updateUrlReq(updateUrl);
        if (response.status === 200) {
          successToast("URL updated successfully");
          setTimeout(() => {
            handleClose();
            window.location.reload();
          }, 3000);
        }
      }
    } catch (err) {}
  };

  return (
    <>
      <Toast />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateUrl && (
            <>
              <div className="mb-3">
                <label htmlFor="url" className="col-form-label">
                  URL:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  name="url"
                  value={updateUrl.url}
                  onChange={changeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shortname" className="col-form-label">
                  Shortname:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortname"
                  name="shortname"
                  value={updateUrl.shortname}
                  onChange={changeHandler}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
