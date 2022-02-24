import { useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import "./back.css";

const Back = () => {
  const history = useHistory();

  return (
    <div className="mt-3">
      {/* <button className="btn btn-danger m-2" onClick={() => history.goBack()}>
        <MdArrowBack style={{ fontSize: "1rem" }} />
      </button> */}

      <div className="backBtn" onClick={() => history.goBack()}>
        <span className="line tLine"></span>
        <span className="line mLine"></span>
        <span className="label">Back</span>
        <span className="line bLine"></span>
      </div>
    </div>
  );
};

export default Back;
