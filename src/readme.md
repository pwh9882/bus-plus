# SRC/ 폴더 설명

## setupProxy.tsx

fly.io backend server를 사용하기 이전에 어플리케이션 자체에서 사용한 proxy설정파일입니다.
github-pages에서 이러한 proxy서버를 허용하지 않아서 부득이 하게 fly.io에 해당 코드를 올려서 백엔드를 구축하게 됬으므로 deploy 이후 주석처리 됬습니다.

## xmlParser.tsx

[공공데이터 포털](https://www.data.go.kr/index.do)에서 제공하는 데이터가 xml형식이라 js에서는 사용이 어려워서 xmlParser 라이브러리를 이용해 json형식으로 바꾸기 위해 사용했습니다.

## FirebaseApp.tsx

Google Firebase의 설정과 객체들을 초기화 하고 export해서 사용할 수 있도록 하는 파일입니다.
API_KEY를 가리기 위해 .env파일을 사용했습니다.

## busApi 폴더 설명

[공공데이터 포털](https://www.data.go.kr/index.do)에서 데이터를 가져오는 함수들을 정의했습니다.

[서울특별시_정류소정보조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15000303)
[서울특별시_버스위치정보조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15000332)
[서울특별시_노선정보조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15000193)
[서울특별시_버스도착정보조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15000314)

위 4가지의 서비스에 활용신청을 하여 사용했습니다.

## routes 폴더 설명

페이지 이동 후 그려지는 route component들을 작성했습니다.
기획에서 그렸던 페이지 flowchat에 맞게 구현했습니다.
[src/routes](/src/routes)

## components 폴더 설명

route가 아닌 compoent들을 작성한 폴더입니다.

[[/src/components/readme.md]](/src/components/readme.md)
