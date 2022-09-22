import axios from "axios";
import React, { useState } from "react";
import PaginateRepos from "../components/PaginateRepos";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [repos, setRepos] = useState([]);

  const githubUserUrl = `https://api.github.com/users/${userName}`;
  const githubRepos = `https://api.github.com/users/${userName}/repos?per_page=100`;
  // const githubRepoUrl = `https://api.github.com/users/${userName}/${repoName}`
  // const stackUserUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow`

  const searchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(githubUserUrl);
      setInfo(data);
      setLoading(false);
    } catch (error) {}
  };

  const searchRepos = async () => {
    try {
      const { data } = await axios.get(githubRepos);

      setRepos(data);
    } catch (error) {
      console.log(error);
    }
  };
 
  function handleSubmit(e) {
    e.preventDefault();
    searchUser();
    searchRepos(); 
  }

  return (
    <div className="container-fluid my-3 ">
        <h1 className="text-center " >Github Finder</h1>
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6 col-lg-6">
          <form className="search d-flex p-3">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control"
              value={userName}
              placeholder="GitHub Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button className="ms-3 btn btn-primary" onClick={handleSubmit}>
              Search
            </button>
          </form>
        </div>
      </div>
      {/* // ! Cols */}
      {info ? (
        <div className="row d-flex gap-2 justify-content-center  flex-wrap">
          <div className="col-lg-4 col-md-6 col-sm-6  ">
            <ProfileCard info={info} />
          </div>
          <div className="col-lg-7  ">
            <PaginateRepos pagiData={{ repos, loading, userName }} />
          </div>
        </div>
      ) : (
        <p>Start Searching</p>
      )}
    </div>
  );
};

export default Home;
