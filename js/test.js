// 이벤트의 대상이 너무 길어짐에 따라 $를 사용하여 변수를 만드는 것으로 함
const $ = (selector) => document.querySelector(selector);
 
// 로컬스토리지에 데이터 저장/불러오기
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};
 
function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것은 무엇인가? => 메뉴명(또한 메뉴명의 갯수를 업데이트하는데 사용)
  // 메뉴가 여러 개이므로 배열로 초기화
  // 초기화의 이유는 어떤 종류의 데이터가 들어오는지에 대해서 명시하는 것
  this.menu = [];
 
  // 페이지 로드 시 초기화하는 메서드 생성
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };
 
  const render = () => {
    // 배열의 map() 메서드를 사용하여 요소를 순회
    // map()은 요소를 순회하면서 반환하는 값을 모아 새로운 배열로 만들어줌
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
      </li>`;
      })
      // array.join(separator) 메서드를 사용하여 배열의 각각의 요소를 연결하여 하나의 문자열로 만듬
      // separator(구분자)를 사용하여 중간마다 결과값에 구분자를 넣을 수 있음, 생략 시 자동적으로 ,로 구분자를 삽입
      // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join
      // map() 메서드 진행까지의 결과값 ["<li>...</li>", "<li>...</li>", "<li>...</li>", ...]
      // join() 메서드 진행까지의 결과값 ["<li>...</li><li>...</li><li>...</li>..."]
      .join("");
 
    $("#espresso-menu-list").innerHTML = template;
 
    updatedMenuCount();
  };
 
  // 🔄 재사용할 함수 (메뉴 갯수 업데이트)
  const updatedMenuCount = () => {
    // 변수를 선언하여 메뉴 아이템의 갯수를 저장하고 대상 태그에 출력함
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    // const menuCount = $("#espresso-menu-list").childElementCount로 사용해도 상관없음
 
    // 업데이트한 값을 출력
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
 
  // 🔄 재사용할 함수 (메뉴 아이템의 템플릿 / 빈 값이면 경고창을 띄우고 정상 입력 시 메뉴 추가)
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴명을 입력해주세요!");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    // this.menu의 배열에 메뉴명을 객체 형태의 요소를 추가
    this.menu.push({ name: espressoMenuName });
 
    store.setLocalStorage(this.menu);
 
    render();
 
    // 메뉴가 성공적으로 추가되면 입력한 input의 value를 빈 값으로 초기화한다.
    $("#espresso-menu-name").value = "";
  };
 
  // 🔄 재사용할 함수 (메뉴명을 수정)
  const updateMenuName = (e) => {
    // 클릭한 메뉴아이템의 인덱스의 데이터를 담은 menuId
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt(
      "변경할 메뉴명을 입력해주세요.",
      $menuName.innerText
    );
  };
 
  // 🔄 재사용할 함수 (메뉴를 삭제)
  const removeMenuName = (e) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      // 인덱스 menuId에서 1개를 삭제하는 메서드 splice()
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updatedMenuCount();
    }
  };
 
  // 생성된 메뉴의 이벤트를 부모인 #espresso-menu-list에 위임
  $("#espresso-menu-list").addEventListener("click", (e) => {
    // 클릭한 대상에 클래스명이 있는지 확인(classList.contain 이용)하여 메뉴명 수정
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }
 
    // 클릭한 대상에 클래스명이 있는지 확인(classList.contain 이용)하여 메뉴 삭제
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });
 
  // form 태그의 자동으로 전송되는 기능을 막기
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
 
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);
 
  // 메뉴 이름을 전달받음
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
 
  $("nav").addEventListener("click", (e) => {
    // 불리언값으로 반환하는 변수
    const isCategoryButton = e.target.classList.contains(".cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      console.log(categoryName);
    }
  });
} // App
 
// new 연산자는 객체를 반환함, 고로 상수 app은 객체 상태
const app = new App();
 
// 객체 app의 생성한 메서드 호출
app.init();