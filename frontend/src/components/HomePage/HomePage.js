import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { SiNamecheap } from "react-icons/si";
import { Toast, successToast, errorToast } from "../Toast/Toast";
import SocialNetworks from "../SocialNetworks/SocialNetworks";
import { addUrl } from "../../services/requestService";

const HomePage = ({ history }) => {
  let [newUrl, setNewUrl] = useState({
    url: "",
    shortname: "",
  });

  const urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const changeHandler = (e) => {
    setNewUrl({ ...newUrl, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!newUrl.url.match(urlRegex)) {
        errorToast("Invalid URL");
        return;
      }
      if (!newUrl.url.includes("http://") && !newUrl.url.includes("https://")) {
        newUrl.url = `http://${newUrl.url}`;
      }
      const { data } = await addUrl(newUrl);
      if (data) {
        successToast("URL shortened successfully");
        setTimeout(() => {
          history.push(`/${data.data.shortname}`);
        }, 3000);
      }
    } catch (err) {
      errorToast("Something went wrong ...");
    }
  };
  return (
    <div>
      <Toast />
      <form onSubmit={submitHandler}>
        <div className="col-6 m-auto mt-5">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <FaLink />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter URL ..."
              aria-label="url"
              aria-describedby="basic-addon1"
              name="url"
              value={newUrl.url}
              onChange={changeHandler}
            />
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Pickup a name for URL (Optional)
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <SiNamecheap />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter a name ..."
                      aria-label="shortname"
                      aria-describedby="basic-addon1"
                      name="shortname"
                      value={newUrl.shortname}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SocialNetworks />
          </div>
          <div className="col-12 m-auto text-center mt-4">
            <input type="submit" className="btn btn-success" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
