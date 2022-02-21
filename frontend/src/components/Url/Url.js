import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUrl } from "../../services/requestService";
import Counter from "./Counter/Counter";

const Url = () => {
  const { shortname } = useParams();
  const [url, setUrl] = useState(null);
  const [count, setCount] = useState(10);

  useEffect(() => {
    getUrlByShortname();
  }, []);

  useEffect(() => {
    if (count === 0) {
      setTimeout(() => {
        window.location = url.url;
      }, 1500);
    }
  }, [count]);

  setTimeout(() => {
    if (count >= 1) {
      setCount(count - 1);
    }
  }, 1000);

  const getUrlByShortname = async () => {
    try {
      const { data } = await getUrl(shortname);
      setUrl(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {url ? (
        <div className="mt-5 m-auto text-center">
          <Counter />
          <button
            className="btn btn-success mt-5"
            disabled={count >= 1 ? true : false}
          >
            Go to URL
          </button>
        </div>
      ) : (
        "nothing"
      )}
    </div>
  );
};

export default Url;
