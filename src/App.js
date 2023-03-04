import {useState,useEffect} from "react";
import './App.css';
import axios from "axios";
import RepoDetails from "./RepoDetails";

function App() {
  const [username,setUsername] = useState("");
  const [loading,setLoading] = useState(false);
  const [repos,setRepos] = useState([]);
  const [details,setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    setRepos([]);
    setDetails({});
  }, [username]);
  

  function handleSubmit(e,repoName){
    e.preventDefault();
    searchRepos();
  }

  function searchRepos(repoName) {
    setLoading(true);
    axios({
      method: "get", 
      url: `https://api.github.com/users/${username}/repos`})
      .then(res => {
        setLoading(false);
        setRepos(res.data);
      });
  }

  function renderRepo(repo){
    return(
      <div className="row" key={repo.id} onClick={()=> getDetails(repo.name)}>
        <h2 className="repo-name">{repo.name}</h2>
      </div>
    )
  }

  function getDetails(repoName){
    setDetailsLoading(true)
    axios({
      method:"get",
      url:`https://api.github.com/repos/${username}/${repoName}`,
  }).then(res => {
    setDetailsLoading(false);
    setDetails(res.data);
  })

  }

  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input className="input" value={username} placeholder="Enter Username" onChange={e => setUsername(e.target.value)}/>
            <button className="button" onClick={handleSubmit}>{loading ? "" : "Search"}</button>
          </form>
          <div className="results-container">{repos.map(renderRepo)}</div>
        </div>
      <RepoDetails details={details} loading={detailsLoading}/>
      </div>
    </div>
  );
}

export default App;
