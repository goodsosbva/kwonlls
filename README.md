# kwonlls

기존에 존재하는 문벅스 강의를 바탕으로 다시 만들어보는 권리스카페 메뉴판 사이트
css의 경우 문벅스 주어지는 것을 조금씩 바꾸정도의 작업만 추가함.

step을 참고삼아 내스스로 만들어 보고있슴.
# step 1: 요구사항 구현을 위한 전략
### TODO 메뉴 추가
### - 1. 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴를 추가
### - 2. 에소프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
### - 3. 추가되는 메뉴에 마크업 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.

✨ .(1, 2, 3) - 내가 구현한 방법.
```JavaScript
this.menu = [];  // 데이터를 담을 배열 선언

const espressoMenuName = $("#espresso-menu-name").value;  // 입력값을 가져오고,

// <li> ~ </li> 태그를 통째로 넣는 형식으로 추가한다.
const template = this.menu
      .map((item, index) => {
      return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`
    }).join("");
$("#espresso-menu-list").innerHTML = template  // 추가
$("#espresso-menu-name").value = "";  // 추가가 완료되면 빈값으로 바꾸기
```

### - 4. 총 메뉴 갯수를 count하여 상단에 보여준다.
### - 5. 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
### - 6. 사용자 입력값이 빈 값이라면 추가되지 않는다.

✨ .(4, 5, 6) - 내가 구현한 방법.
```JavaScript

// querySelctorAll을 이용하여 전체 li개수를 구하기(length)
const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
// 값 추가
$(".menu-count").innerText = `총${menuCount}개`;
// 추가하려고 할때 값이 비어있으면 alert를 뛰어주고 리턴을 통하여 진행 종료
if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요!");
      return;
    }
```

// TODO 메뉴 수정
// 이벤트 위임 기능을 사용
// - [ o ] 메뉴이 수정 버튼을 눌러 메큐 이름을 수정할 수 있다
// - [ o ] 메뉴 수정시 브라우저에게 제공하는 `prompt` 인터페이스를 활용한다.

// todo 메뉴 삭제
// - [ o ] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// - [ o ] 메뉴 수정시 브라우저에게 제공하는 `confirm` 인터페이스를 활용한다.
