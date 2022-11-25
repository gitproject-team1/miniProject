# 📌 Grocery Bud 만들어보기

JS의 기초부터 심화까지 키우기위한 미니프로젝트 - 2

1조 미니프로젝트 뿌수기🦾

## 데모주소

데모를 [여기서](https://grocerybud-jyroh.netlify.app/) 보실수 있습니다.

## 기간

- 2022/11/24 ~ 2022/11/25

## 사용기술 스택

- Programming

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JAVASCRIPT&logoColor=white"> <img src="https://img.shields.io/badge/SORTABLE.JS-E2231A?style=for-the-badge&logo=Sauce Labs&logoColor=white">


## 사용 개념

- DOMContentLoaded
- new Date()
- createAttribute()
- setAttributeNode()
- appendChild()
- filter()
- map()
- localstorage

## 주요 구현 사항

- CRUD를 모두 구현하였습니다.
- 개별 edit, delete기능을 구현하였습니다.
- CRUD가 일어나면, 상단에 창을 뛰워 사용자가 인지할수있게 하였습니다.
- 드래그 앤 드롭 기능을 구현하였습니다(Sortable JS)

## 어려웠던 부분

- `localstorage`는 그 자체로 `Set`의 성질을 가지므로, 순서가 정해져있지 않다는게 굉장한 난관이었음
- 따라서, 생성 시간을 `Date()`를 활용하여 key값으로 설정해주어서 화면 render시, 매번 Sort를 통하여 배치를 해주었음
- 개별 edit과 delete에 전부 `eventListner`를 추가하고 다루는것이 쉽지않았음. 이 `button`들에도 id값을 부여했는데 더 좋은 방법이 있을듯
- `SortableJS` 라이브러리를 사용하여 드래그 앤드롭을 구현했으나, 문제는 화면이 새로 render시 순서가 원래대로 돌아가버리게됨
- 당연히 id값으로 매번 render를 했기에, 드래그 앤드롭으로 순서가 바뀌면, id값도 재배치하는 로직이 필요했음
- 꽤나 어려웠지만, 기술적으로 많이 성장한것 같은 프로젝트였습니다. 코드리뷰를 통하여 동료들의 코드들도 언능 읽고 싶습니다👍

## 요구사항

- [x] 기본적인 CRUD가 가능해야합니다
- [x] 모두 삭제 기능을 넣어보세요
- [x] 드래그 앤드롭으로 순서를 바꿀수 있게 만들어보세요(그렇다면 3차과제가 쉬워질거같아요)
- [ ] 세션스토리지, 쿠키버젼도 만들수있으면 좋겠습니다(필수x)
- [x] 알아서 멋지게 완성시켜보세요!

## 주의사항

- 유튜브 튜토리얼은 보지 않는걸 추천합니다. 결과물만 보고 동작을 유추해봅시다
- README.md를 꼭 작성해봅시다
- Git Flow 전략을 적용해봅시다
- Commit message는 최우영 강사님의 것을 따릅니다
- 별도의 폴더를 만들어서 pull request를 보냅니다
- 서로의 것을 열심히 코드리뷰하고 칭찬합시다!

