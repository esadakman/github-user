import React, { useState } from "react";
import Paginate from "./Paginate"; 

const PaginateRepos = ({ pagiData }) => {
//   const { loading, repos } = pagiData;
  const [reposPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = pagiData.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(pagiData.length / reposPerPage);

  return (
    <div>
      {/* {loading ? (
        <div>
          <img src={loadingGif} alt="loading..." />
          <p>...Loading</p>
        </div>
      ) : ( */}
        <div>
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
              {currentRepos?.map((repos) => (
                // <div key={repos.id}>
                  <tr key={repos.id}>
                    <th scope="row">1</th>
                    <td>repos.name</td>
                    <td>repos.html_url</td>
                    <td>repos.language</td>
                  </tr>
                // </div>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center mt-3 ">
            <Paginate pages={totalPages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default PaginateRepos;
