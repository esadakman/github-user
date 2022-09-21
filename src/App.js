import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import RepoDetails from "./components/RepoDetails";

function App() {
  const [userName, setUserName] = useState("esadakman");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [details, setDetails] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [repoName, setRepoName] = useState("")

  const githubUserUrl = `https://api.github.com/users/${userName}`
  const githubRepos = `https://api.github.com/users/${userName}/repos?per_page=50`
  const githubRepoUrl = `https://api.github.com/users/${userName}/${repoName}`
  // const stackUserUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow`

  function handleSubmit(e) {
    e.preventDefault();
    searchUser();
  }
 
  const searchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        githubRepos
      );
      setInfo(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchUser();
    setDetails()
  }, [userName]);


  // const getDetails = async (repoName) =>{
  //   setDetailsLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       githubRepoUrl
  //     );
  //     setDetails(data);
  //     setDetailsLoading(false);
  //     // console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method:'get',
      url: `https://api.github.com/repos/${userName}/${repoName}`,
    }).then(res=> {
      setDetailsLoading(false);
      setDetails(res.data);
    })
    
  }
  
   
  function renderRepo(repo){
    return(
      <div className="row" key={repo.id} onClick={()=>getDetails(repo.name)} 
      >
        <h2 className="repo-name">
          {repo.name}
        </h2>
      </div>
    )
  }

  return (
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
              <button className="button" onClick={handleSubmit}>
                {loading ? "Searching .." : "Search"}
              </button>
            </form>
            <div className="results-container">
              {info.map(renderRepo) }
            </div>
          </div>
          <RepoDetails details={details} loading={detailsLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;

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
