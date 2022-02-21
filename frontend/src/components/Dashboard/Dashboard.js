import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <main className="d-flex">
      <Sidebar />
      <div className="b-example-divider"></div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Custom jumbotron</h1>
          <p className="col-md-8 fs-4"></p>
          <button className="btn btn-primary btn-lg" type="button">
            Example button
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
