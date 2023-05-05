# 향상된 버스 도착정보를 제공하는 웹어플리케이션

웹클라이언트 컴퓨팅 과목의 프로젝트를 위해 만들어졌습니다.

bus-plus는 제작자가 평소 원했던 추가적인 버스도착정보 어플의 기능을 포함하는 향상된 어플을 목표로 합니다.

## 구현할 기능

1. 기본적인 버스 도착정보제공 앱의 기능을 [공공데이터 포털](https://www.data.go.kr/index.do) API로 구현.

2. 특정 정거장의 n번째 도착 정보를 API의 2번째 도착예정 정보를 통해 계산해 추가로 제공.

## 구현 순서

1. 기본적 유저 로그인 시스템 구현 - google firebase 이용. ✅

2. api를 이용해 기존 버스도착정보 어플 기능 구현
    2-1. stationDetail
        - 기본적 api data fetch후 화면에 뿌리기 ✅
        - 버스 도착 예정시간 카운터 적용하기 ✅
        - 버스 도착 예정시간 수동 새로고침 버튼 만들기 ← 디테일요소, 우선순위 낮음
        - 버스 종류에 따라 색 설정하기(푸른색, 초록색 등...) ← 디테일요소, 우선순위 낮음
        - 버스 혼잡도 표시 ← 디테일요소, 우선순위 낮음
    2-2. busRouteDetail
        - 기본적 api data fetch 후 화면에 뿌리기 ✅
        - busPos Api를 활용해 Route에 버스 위치 그리기 ✅
        - 버스 혼잡도 표시 ← 디테일요소, 우선순위 낮음
    2-3. 즐겨찾기 기능
        - detail 화면에 즐겨찾기 버튼 추가 ✅
        - 즐겨찾기 버튼을 누르면 FirebaseDB와 연동하여 Home에 보여주기 ✅
        - Home 화면 즐겨찾기 순서 바꾸기, 즐겨찾기 해제 기능 ← 디테일요소, 우선순위 낮음
    2-4. Search
        - 정류장으로 검색하기 ← 현재 목표❗️
        - 버스이름으로 검색하기
        - 위치 기반 검색(아마도 비용 문제로 구현 X)

3. bus-plus만의 기능 구현

4. css 꾸미기

5. 코드 정리
