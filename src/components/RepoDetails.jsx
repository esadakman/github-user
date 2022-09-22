import React from "react";

const RepoDetails = ({ repoInfo }) => {
  const { details, detailsLoading } = repoInfo;
  if (detailsLoading) {
    return <h6 className="loader">detailsLoading...</h6>;
  }
  //   console.log(details);
  return (
    <div>
      {details ? (
        <div className="card mt-4" style={{ minWidth: "13rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Name: {details?.name}</li>
            <li className="list-group-item">Forks: {details?.forks}</li>
            <li className="list-group-item">
              Stars: {details?.stargazers_count}
            </li>
            <li className="list-group-item">Language: {details?.language}</li>
            <li className="list-group-item">
              Repo Link:{" "}
              <a href={details?.html_url} target="blank">
                GitHub Link
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default RepoDetails;
