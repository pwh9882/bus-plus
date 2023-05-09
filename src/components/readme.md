# components 폴더 설명

## App.tsx

전체적인 App을 그려줄 component입니다.
firebase auth를 이용해서 로그인 여부와 유저 정보를 자식으로 보냅니다.

## NavigationBar.tsx

MUI를 사용하기 전에 임시로 사용했던 NavBar입니다. 지금은 사용하지 않습니다.
현재는 Router.tsx에서 MUI의 BottomNavigation component를 사용합니다.

## Router.tsx

페이지의 이동을 정의해줄 Router입니다.
isLoggedIn Prop을 App으로 부터 받아와 로그인 되어 있지 않은 사용자의 다른 페이지 이동을 차단하고 Auth 페이지로 보냅니다.

## SearchedResultList.tsx

Search 페이지에서 검색을 한 결과를 보여줄 List compnent입니다. MUI List를 사용해서 구현했습니다.

## StationRouteDetailCard.tsx

StationDetail Page에서, (Station, 정거장)에서 (Route, 버스노선) (Detail, 정보)를 보여주기 위한 component입니다. 입력받은 도착 예정시각을 바탕으로 타이머를 설정해 예정시각이 1초마다 줄어들도록 구현했습니다.

## RouteStationDetailCard.tsx

BusRouteDetail Page에서, 버스노선이 지나는 정거장 목록의 정보를 보여주기위한 component입니다. 버스들의 현재 위치를 받아서 정거장 라인 위에 보여줍니다.

## StationBookmarkCard.tsx & RouteBookmarkCard.tsx

Home화면에서 보여줄 즐겨찾기한 정거장과 버스 노선을 보여줄 간단한 component입니다.
