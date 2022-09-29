import React, { useContext } from "react";
import { UidContext } from "../components/Appcontext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Posts/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
