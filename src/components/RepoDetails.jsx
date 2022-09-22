import React from "react";

const RepoDetails = ({ repoInfo }) => {
  const { details, detailsLoading } = repoInfo;
  if (detailsLoading) {
    return <h1 className="loader">detailsLoading...</h1>;
  }
  console.log(details);
  return (
    <div>
      <div className="card mt-4" style={{ width: "18rem" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name: {details?.name}</li>
          <li className="list-group-item">Forks: {details?.forks}</li>
          <li className="list-group-item">Stars: {details?.stargazers_count}</li>
          <li className="list-group-item">Language: {details?.language}</li>
          <li className="list-group-item">
            Repo Link:{" "}
            <a href={details?.html_url} target="blank">
              Link
            </a>
          </li>
        </ul>
      </div>
       
       
    </div>
  );
};

export default RepoDetails;
