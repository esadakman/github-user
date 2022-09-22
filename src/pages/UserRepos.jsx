import axios from "axios";
import { useEffect, useState } from "react";
import RepoDetails from "../components/RepoDetails";

const UserRepos = () => {
  const [userName, setUserName] = useState("esadakman");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  // const [repoName, setRepoName] = useState("")

  // const githubUserUrl = `https://api.github.com/users/${userName}`
  const githubRepos = `https://api.github.com/users/${userName}/repos?per_page=10`;
  // const githubRepoUrl = `https://api.github.com/users/${userName}/${repoName}`
  // const stackUserUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow`

  function handleSubmit(e) {
    e.preventDefault();
    searchUser();
  }

  const searchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(githubRepos);
      setInfo(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchUser();
    setDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${userName}/${repoName}`,
    }).then((res) => {
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }

  function renderRepo(repo) {
    return (
      <div className="row" key={repo.id} onClick={() => getDetails(repo.name)}>
        <h2 className="repo-name">{repo.name}</h2>
      </div>
    );
  }
//   function renderTable(repo) {
//     return (
//       <tr key={repo.id}>
//         <th scope="row">1</th>
//         <td>{repo.name}</td>
//         <td>Otto</td>
//         <td>@mdo</td>
//       </tr>
//     );
//   }
  return (
    <>
      <div className="App">
        <div className="page">
          <div className="landing-page-container">
            <div className="left-side">
              <form action="" className="form">
                <input
                  type="text"
                  className="input"
                  value={userName}
                  placeholder="GitHub Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button
                  className="button btn btn-success"
                  onClick={handleSubmit}
                >
                  {loading ? "Searching .." : "Search"}
                </button>
              </form>
              <div className="results-container">{info.map(renderRepo)}</div>
            </div>
            <RepoDetails details={details} loading={detailsLoading} />
          </div>
        </div>
        {/* <div className="row">
      <table className="table ms-2" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          
           
              {info.map(renderTable) } 
             
              
             
        </tbody>
      </table>
      </div> */}
      </div>
    </>
  );
};

export default UserRepos;



//     setLoading(true);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const seachUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
// const searchRepos = async () => {
//   setLoading(true);
//   try {
//     const { data } = await axios.get(
//       'https://api.github.com/users/{userName}'
//     );
//     // setRepos(data);
//     setLoading(false);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };