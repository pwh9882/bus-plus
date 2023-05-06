import { Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props{
    searchOption: number,
    searchedList: Array<Array<any>>
}

const SearchedResultList = ({searchOption, searchedList}:Props) => {
    const nevigate = useNavigate();
    return (<List
        sx={{
          width: '100%',
          // maxWidth: 360,
          // bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: '65vh',
          '& ul': { padding: 0 },
        }}
      >
        {searchOption === 0 ? <>
          {searchedList[0]?.map((route)=>{
            // console.log(route);
            // console.log("render");
            
            return (<>
              <ListItem key={route.busRouteId[0]}
                onClick={(event: any)=>{
                  // console.log(route);
                  nevigate("/bus-route-detail", {state:{busRouteId: route.busRouteId[0]}})
                }}
                >
                <ListItemText
                  primary={route.busRouteNm[0]}
                />
                
                </ListItem>
                <Divider />
            </>
              )
          }) }
        </> :<>
        {searchedList[1]?.map((station)=>{
            // console.log(station);
            // console.log("render");
            return (<>
              <ListItem key={station.stId[0]}
              onClick={(event: any)=>{
                console.log(station);
                nevigate("/station-detail", {state:{stationUid: station.arsId[0]}})
              }}
              >
              <ListItemText
                primary={station.stNm[0]}
                secondary={station.arsId[0]}
              />
              </ListItem>
              <Divider />
            </>)
          }) }
        </>}     
      </List>)
}

export default React.memo(SearchedResultList)