import AllUrls from "./AllUrls/AllUrls";
import Back from "./Back/Back";

const Dashboard = () => {
  return (
    <>
      <Back />
      <main className="d-flex">
        <div className="col-6 mx-auto mt-5">
          <AllUrls />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
