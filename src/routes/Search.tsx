import { useNavigate } from "react-router-dom";
import "css/Search.css";
import { useState } from "react";

const Search = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("bus");
  const [searchTerm, setSearchTerm] = useState("");
  const onCencelClicked = () => {
    navigate("/");
  };
  
  return (
    <>
      <div className="search-bar">
        <button onClick={onCencelClicked}>X</button>
        <input type="text" placeholder="버스 또는 정류장 검색" />
      </div>
      <h1>Search</h1>
      <div className="searchOption">
        <div>버스 검색</div>
        <div>정류장 검색</div>
      </div>
      <ul id="search-options" className="options">   
        <li className="option">
          <button className="search-bus-route" aria-pressed="true" aria-selected>
            버스 이름으로 검색
          </button>
        </li>
        <li className="option">
          <button className="search-station" aria-pressed="false">
            정류장 이름으로 검색
          </button>
        </li>
        </ul>
    </>
  );
};

export default Search;
