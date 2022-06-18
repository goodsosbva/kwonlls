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

### TODO 메뉴 수정
### 이벤트 위임 기능을 사용
### - 7. 메뉴이 수정 버튼을 눌러 메큐 이름을 수정할 수 있다
### - 8. 메뉴 수정시 브라우저에게 제공하는 `prompt` 인터페이스를 활용한다.

✨ .(7, 8) - 내가 구현한 방법.
```JavaScript
// 현재 추가하고 있는대 <li>~</li>는 data매서드를 이용한 data-menu-id 변수를 이용중이다. 이변수에 값으로 우리는 index를 쓰고 있습니다.
// 때문에 해당 인덱스로 li태그를 접근할 수 있습니다.
const menuId = e.target.closest("li").dataset.menuId;  // 위의 원리로 인덱스 접근

// 이벤트가 발생한 부분에서 가장 가까운 태그를 찾을 수 있는 매서드가 존재한다 => closetst
// 가장 가까운 li를 찾은 후 그 li안에서 menu-name클래스를 가지는 것을 찾는 원리
const $menuName = e.target.closest("li").querySelector(".menu-name");
// prompt 인터페이스 이용 + $menuName.innerText을 넣음으로서 수정전 데이터 확인까지
const newMenuName = prompt("수정: ", $menuName.innerText);

// 배열 수정
this.menu[menuId].name = newMenuName;
// 웹 페이지 수정
menuName.innerText = newMenuName;
```


### todo 메뉴 삭제
### - 9. 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
### - 10. 메뉴 수정시 브라우저에게 제공하는 `confirm` 인터페이스를 활용한다.

```js
// confirm을 통해 체크
const response = confirm("리얼 삭제?");
if (response) {
      // 위와 같은 원리
      const menuId = e.target.closest("li").dataset.menuId;
      // splice를 이용하여 해당 id 1개만 배열에서 제외시키는것 => 결론 적으로 제거 효과가 되게 구현
      this.menu.splice(menuId, 1)
      // 웹 페이지에서 해당 태그 제거. remove()매서드를 이용하여 쉽게 
      e.target.closest("li").remove();
    }
```

