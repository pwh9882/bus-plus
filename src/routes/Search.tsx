import { useNavigate } from "react-router-dom";
import "css/Search.css";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, List, ListItem, ListItemText, Tab, Tabs, TextField } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React from "react";



import { getStationByName } from "busApi/stationInfo/getStationByNameList";
import { getBusRouteList } from "busApi/busRouteInfo/getBusRouteList";
import SearchedResultList from "components/SearchedResultList";

const Search = () => {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedList, setSearchedList] = useState<Array<Array<any>>>([[],[]]) ;
  const onCencelClicked = () => {
    navigate("/");
  };

  const onSearchClicked = async () => {    
    setSearchedList([await getBusRouteList(searchTerm), await getStationByName(searchTerm)])
  }
  return (
    <>
      <div className="search-bar">
        <Button onClick={onCencelClicked} variant="contained" aria-label="delete" size="small">
          <ArrowBackIcon />
        </Button>
        <TextField 
          value={searchTerm} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
          }}
          
          className="searchText" size="small" id="outlined-basic" label="검색..." variant="outlined" />
        <Button onClick={onSearchClicked} variant="contained" aria-label="delete" size="small">
          <SearchIcon />
        </Button>
      </div>
      {/* <h1>Search</h1> */}
      <Box sx={{ width: '100%'}}>
        <Tabs value={searchOption} 
          onChange={(event: any, newValue: number) =>{
            setSearchOption(newValue)
          }} centered>
          <Tab icon={<DirectionsBusIcon />} iconPosition="start" sx={{ width: '50%' }} label="버스" />
          <Tab icon={<DoNotDisturbOnTotalSilenceIcon />} iconPosition="start" sx={{ width: '50%' }} label="정거장" />
        </Tabs>
      </Box>
      <SearchedResultList searchOption={searchOption} searchedList={searchedList}/>
    </>
  );
};

export default Search;
