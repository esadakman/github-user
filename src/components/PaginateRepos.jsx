import React, { useState } from "react";
import Paginate from "./Paginate";

const PaginateRepos = ({ pagiData }) => {
    const { loading, repos } = pagiData;
  const [reposPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repos.length / reposPerPage);

  return (
    <>
      {loading ? (
        <div>
          {/* <img src={loadingGif} alt="loading..." /> */}
          <p>...Loading</p>
        </div>
      ) : (
      <div>
        <table className="table table-bordered">
          <thead className="table-dark" >
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {currentRepos?.map((repos,index) => (
            <tbody key={repos.id}>
              {/* // <div key={repos.id}> */}
              <tr>
                <th scope="row">{index +1}</th>
                <td>{repos.name}</td>
                <td className="text-center ">
                  <a href={repos.html_url}>Repo Link</a>
                </td>
                <td>{repos.language}</td>
              </tr>
              {/* // </div> */}
            </tbody>
          ))}
        </table>

        <div className="d-flex justify-content-center mt-3 ">
          <Paginate pages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
       )}  
    </>
  );
};

export default PaginateRepos;
