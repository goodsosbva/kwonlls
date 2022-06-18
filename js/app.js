// 투두 읽기 & 쓰기
// - [o] 로컬저장소에 데이터를 저장한다.
//  - [o] 메뉴를 추가할 때
//  - [] 메뉴를 수정할 때
//  - [] 메뉴를 삭제할 때
// - [] 새로고침해도 로컬저장소를 읽어온다.

// 투두 각각 종류별로 메뉴판을 관리
// - [o] 에소, 프라, 블랜, 티나, 디저트 각각 종류별로 메뉴판을 관리할 수 있게 만든다.

// 투두 페이지 접근시 최초 데이터 Read & Rendering
// - [o] 페이지에 최초로 접근할 때 로컬저장소에  에소프레소 메뉴르 읽어 온다
// - [o] 에소프레소 메뉴 페이지를 먼저 보이게 한다.

// 투두 품질 상태 관리
// - [o] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class 추가하여 상태를 변경한다.
// - [o] 풀절 버튼을 버튼을 추가한다.
// - [o] 품절 버튼을 클릭하면 로컬저장소에 상태값을 저장된다.
// - [o] 클릭이벤트에서 가장 가까운 li태그의 class속성 값에 sold-out을 추가한다.

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
  this.menu = [];
  
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
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
    $("#espresso-menu-list").innerHTML = template
    updateCount();
  }

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요!");
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName })
    store.setLocalStorage(this.menu);
    render();
    $("#espresso-menu-name").value = "";
  };

  const updateCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총${menuCount}개`;
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const newMenuName = prompt("수정: ", $menuName.innerText);
    this.menu[menuId].name = newMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = newMenuName;
  };

  const deleteMenuName = (e) => {
    const response = confirm("리얼 삭제?");
    if (response) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1)
      store.setLocalStorage(this.menu)
      e.target.closest("li").remove();
    }
  };


  // 메뉴 수정 & 삭제
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
      updateCount();
    }

    if (e.target.classList.contains("menu-remove-button")) {
      deleteMenuName(e);
      updateCount();
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
}

const app = new App();
app.init();