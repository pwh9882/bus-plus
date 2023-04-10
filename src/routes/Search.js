import { useNavigate } from "react-router-dom";
import "css/Search.css";

const Search = () => {
  const navigate = useNavigate();
  const onCencelClicked = () => {
    navigate("/");
  };
  return (
    <>
      <div className="search-bar">
        <button onClick={onCencelClicked}>X</button>
        <input type="text" placeholder="버스 또는 정류장 검색" />
      </div>
    </>
  );
};

export default Search;
