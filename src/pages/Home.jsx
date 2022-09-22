import axios from "axios";
import React, { useState } from "react";
import PaginateRepos from "../components/PaginateRepos";

const Home = () => {
  const [userName, setUserName] = useState("esadakman");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [repos, setRepos] = useState([])
  //   const [details, setDetails] = useState({});
  //   const [detailsLoading, setDetailsLoading] = useState(false);
  // const [repoName, setRepoName] = useState("")

  const githubUserUrl = `https://api.github.com/users/${userName}`;
  //   const githubRepos = `https://api.github.com/users/${userName}/repos?per_page=10`;
  // const githubRepoUrl = `https://api.github.com/users/${userName}/${repoName}`
  // const stackUserUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow`

  const searchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(githubUserUrl);
      setInfo(data);
      setRepos(data.repos_url)
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    searchUser();
  }

  return (
    <div className="container-fluid my-3">
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

      {/* ! Cols */}
      <div className="row border border-danger ">
        <div className="col-3 border border-danger">
          <div className="text-center card-box">
            <div className="member-card pt-2 pb-2">
              <div className="thumb-lg member-thumb mx-auto">
                <img
                  src={info?.avatar_url}
                  className="rounded-circle img-thumbnail w-50"
                  alt="pp"
                />
              </div>
              <div className="">
                <h4>{info?.login}</h4>
                <p className="text-muted">
                  <a href={info?.html_url} className="text-pink" target="blank">
                    GitHub Page
                  </a>
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
              >
                Message Now
              </button>
              <div className="mt-4">
                <div className="row">
                  <div className="col-4">
                    <div className="mt-3">
                      <h4>{info?.followers}</h4>
                      <p className="mb-0 text-muted">Followers</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mt-3">
                      <h4>{info?.following}</h4>
                      <p className="mb-0 text-muted">Following</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="mt-3">
                      <h4>{info?.public_repos}</h4>
                      <p className="mb-0 text-muted">Repos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5 border border-danger">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {/* <PaginateRepos pagiData={{repos, loading}}/> */}
              <PaginateRepos pagiData={repos}/>
            </tbody>
          </table>
        </div>
        <div className="col-4 border border-danger">3 of 3</div>
      </div>
      {/* <div className="row">
        <div className="col">1 of 3</div>
        <div className="col-5">2 of 3 (wider)</div>
        <div className="col">3 of 3</div>
      </div> */}
    </div>
  );
};

export default Home;
