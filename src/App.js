import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  // const [info, setInfo] = useState("");

  const githubUserUrl = `https://api.github.com/users/${userName}`
  // const stackUserUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow`

  function handleSubmit(e) {
    e.preventDefault();
    searchUser();
  }
 
  const searchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        githubUserUrl
      );
      // setInfo(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchUser();
  }, []);

   

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
          </div>
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
