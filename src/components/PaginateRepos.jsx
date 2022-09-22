import axios from "axios";
import React, { useState } from "react";
import Paginate from "./Paginate";
import RepoDetails from "./RepoDetails";

const PaginateRepos = ({ pagiData }) => {
  const { loading, repos, userName } = pagiData;
  const [reposPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repos.length / reposPerPage);

  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${userName}/${repoName}`,
    }).then((res) => {
      console.log(res.data);
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }

  return (
    <>
      {loading ? (
        <div>
          {/* <img src={loadingGif} alt="loading..." /> */}
          <p>...Loading</p>
        </div>
      ) : (
        <div className="row  d-flex justify-content-center " >
          <div className="col-8" style={{minHeight:"32rem", }} >
            <table className="table table-bordered" >
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Repository Name</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              {currentRepos?.map((repos, index) => (
                <tbody key={repos.id}>
                  <tr>
                    <th scope="row">{currentPage * 8 + index - 7}</th>
                    <td>{repos.name}</td>
                    <td className="text-center " >
                      <p 
                        className="btn btn-primary  m-0"
                        onClick={() => getDetails(repos.name)}
                      >
                        See Details
                      </p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div className="d-flex justify-content-center mt-3 ">
              <Paginate pages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
          </div>
          <div className="col-3">
            <RepoDetails repoInfo={{details, detailsLoading}}  />
          </div>
        </div>
      )}
    </>
  );
};

export default PaginateRepos;
