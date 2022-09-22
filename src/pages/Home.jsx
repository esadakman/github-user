import axios from "axios";
import React, { useState } from "react";
import PaginateRepos from "../components/PaginateRepos";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
  const [userName, setUserName] = useState("esadakman");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [repos, setRepos] = useState([]);
  //   const [details, setDetails] = useState({});
  //   const [detailsLoading, setDetailsLoading] = useState(false);
  // const [repoName, setRepoName] = useState("")

  const githubUserUrl = `https://api.github.com/users/${userName}`;
  const githubRepos = `https://api.github.com/users/${userName}/repos?per_page=100`;
  // const githubRepoUrl = `https://api.github.com/users/${userName}/${repoName}`
  // const stackUserUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow`

  const searchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(githubUserUrl);
      setInfo(data);
      //   setRepos(data.repos_url)
      console.log(repos);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchRepos = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(githubRepos);
      //   setInfo(data);
      setRepos(data);
      console.log(repos);
      //   setLoading(false);
      console.log(data);
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
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="search d-flex p-2">
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
          </div>
        </div>
      </div>
      {/* // ! Cols */}
      <div className="row  d-flex gap-2 justify-content-center  flex-wrap">
        <div className="col-lg-3 col-md-6 col-sm-6  "> 
          <ProfileCard info={info} />
        </div>
        <div className="col-lg-8   p-0 ">
          <PaginateRepos pagiData={{ repos, loading, userName }} />
          {/* <PaginateRepos pagiData={repos}/> */}
        </div>
        {/* <div className="col-3 border border-danger">3 of 3</div> */}
      </div>
     
    </div>
  );
};

export default Home;
