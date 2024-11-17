let rowCollection = document.querySelector(".row-collection");
let selectPrice = document.querySelector("#price");
let selectBrand = document.querySelector("#company");
let selectCPU = document.querySelector("#cpu");
let selectRAM = document.querySelector("#ram");
let boxFilterPrice = document.querySelector("#box-filter-price");
let boxFilterCompany = document.querySelector("#box-filter-company");
let boxFilterCPU = document.querySelector("#box-filter-cpu");
let boxFilterRAM = document.querySelector("#box-filter-ram");
let searchInput = document.querySelector("#search-inp");
let btnSearch = document.querySelector("#btn-search");

let url = "http://localhost:3000/products";
import * as mixin from "./mixin.js";
import * as utils from "./utils.js";
const dataProductsOfType = await mixin.fetchAPI(url);
const dataType = await utils.getParam("type");

if (dataType === "computer-mouse") {
  selectCPU.innerHTML = `
       <option value="0"> Mầu </option>
  `;
  selectCPU.classList.add("color-products");
  selectRAM.innerHTML = `
  <option value="0">Kết nối</option>
  `;
  selectRAM.classList.add("connect");
}

let data = dataProductsOfType.filter((value) => value.type === dataType);
// hàm hiển thị ra danh sách sản phẩm
function renderAllProductOfType(data) {
  rowCollection.innerText = "";
  data.map((value) => {
    let col = document.createElement("div");
    col.classList.add("col-3", "col-md-4", "col-sm-6");
    if (value.type === "computer-mouse") {
      col.innerHTML = /*html*/ `
        <div class="item">
            <div class="img-product">
                <a href="/pages/detail-products.html?id=${value.id}">
                    <img
                        src="${value.image}"
                        alt="Ảnh sản phẩm"
                    />
                </a>
            </div>
            <div class="detail-product">
                <h3>
                    <a href="/pages/detail-products.html?id=${value.id}">
                     ${value.title} 
                    </a>
                </h3>
                <div class="information">
              <span title="pin">
               <i class="fa-solid fa-battery-full"></i> có
              </span>
              <span title="lamp">
                <i class="fa-solid fa-lightbulb"></i> không
              </span>
              <span title="wire">
                <i class="fa-solid fa-link"></i> không
              </span>
                  </div>
                  <div class="price-original"> ${value.originalPrice} vnd </div>
                  <div class="price-is-reduced">
                    ${
                      value.originalPrice -
                      value.originalPrice * (value.sale / 100)
                    } VND <span class="percent-discount">${value.sale}%</span>
                  </div>
                  <div class="evaluate">
                    4.8 <i class="fa-solid fa-star"></i>
                    <span class="number-of-reviews">
                        (<span class="quantity">5</span> đánh giá )
                    </span>
                </div>
            </div>
      </div>
    `;
    } else {
      col.innerHTML = /*html*/ `
        <div class="item">
            <div class="img-product">
                <a href="/pages/detail-products.html?id=${value.id}">
                    <img
                        src="${value.image}"
                        alt="Ảnh sản phẩm"
                    />
                </a>
            </div>
            <div class="detail-product">
                <h3>
                    <a href="/pages/detail-products.html?id=${value.id}">
                     ${value.title} 
                    </a>
                </h3>
                <div class="information">
                    <span title="Bộ sử lý">
                        <i class="fa-solid fa-microchip"></i> i7-14700K
                    </span>
                    <span title="card">
                        <i class="fa-solid fa-display"></i> RTX-4070
                    </span>
                    <span title="Chipset intel">
                        <i class="fa-solid fa-chess-board"></i> B762
                    </span>
                    <span title="RAM">
                      <i class="fa-solid fa-memory"></i> 16GB
                    </span>
                    <span title="ROM">
                      <i class="fa-solid fa-chess-board"> </i> 500GB
                    </span>
                  </div>
                  <div class="price-original"> ${value.originalPrice} vnd </div>
                  <div class="price-is-reduced">
                    ${
                      value.originalPrice -
                      value.originalPrice * (value.sale / 100)
                    } VND <span class="percent-discount">${value.sale}%</span>
                  </div>
                  <div class="evaluate">
                    4.8 <i class="fa-solid fa-star"></i>
                    <span class="number-of-reviews">
                        (<span class="quantity">5</span> đánh giá )
                    </span>
                </div>
            </div>
      </div>
    `;
    }
    rowCollection.appendChild(col);
  });
}
renderAllProductOfType(data);

// tạo sự kiện cho nút tìm kiếm
btnSearch.addEventListener("click", () => {
  localStorage.setItem("searching", searchInput.value);
  checkSearching();
});

// hàm lọc sản phẩm theo giá
function filterPrice(select) {
  let data = dataProductsOfType.filter((value) => value.type === dataType);
  if (select.value === "0") {
    renderAllProductOfType(data);
  } else if (select.value === "1") {
    data = data.toSorted((a, b) => {
      return b.originalPrice - b.sale / 100 - (a.originalPrice - a.sale / 100);
    });
    renderAllProductOfType(data);
  } else if (select.value === "2") {
    data = data.toSorted((a, b) => {
      return a.originalPrice - a.sale / 100 - (b.originalPrice - b.sale / 100);
    });
    renderAllProductOfType(data);
  }
}

selectPrice.addEventListener("change", () => {
  filterPrice(selectPrice);
});
boxFilterPrice.addEventListener("change", () => {
  filterPrice(boxFilterPrice);
});

// hiển thị các select
function renderSelect(pointOfAppearance, kay) {
  let arr = data.reduce((acc, value) => {
    if (!acc.includes(value[kay])) {
      acc.push(value[kay]);
    }
    return acc;
  }, []);

  arr.map((value) => {
    let optionEle = document.createElement("option");
    optionEle.innerText = `
    ${value}
    `;
    optionEle.value = `${value}`;
    pointOfAppearance.appendChild(optionEle);
  });
}
if (dataType === "computer-mouse") {
  renderSelect(selectBrand, "brand");
  renderSelect(selectCPU, "color");
  renderSelect(selectRAM, "wire");

  renderSelect(boxFilterCompany, "brand");
  renderSelect(boxFilterCPU, "color");
  renderSelect(boxFilterRAM, "wire");
} else {
  renderSelect(selectBrand, "brand");
  renderSelect(selectCPU, "cpu");
  renderSelect(selectRAM, "ram");

  renderSelect(boxFilterCompany, "brand");
  renderSelect(boxFilterCPU, "cpu");
  renderSelect(boxFilterRAM, "ram");
}

// hàm lựa chọn các option ở mỗi select
function filterOption(pointOfAppearance, kay) {
  let dataCopy = [...data];
  let arr = data.reduce((acc, value) => {
    if (!acc.includes(value[kay])) {
      acc.push(value[kay]);
    }
    return acc;
  }, []);

  arr.forEach((value) => {
    if (pointOfAppearance.value === "0") {
      renderAllProductOfType(dataCopy);
    } else if (pointOfAppearance.value === value) {
      let mobileData = dataCopy.filter((item) => item[kay] === value);
      renderAllProductOfType(mobileData);
    }
  });
}

if (dataType === "computer-mouse") {
  selectBrand.addEventListener("change", () => {
    filterOption(selectBrand, "brand");
  });
  selectCPU.addEventListener("change", () => {
    filterOption(selectCPU, "color");
  });
  selectRAM.addEventListener("change", () => {
    filterOption(selectRAM, "wire");
  });
} else {
  selectBrand.addEventListener("change", () => {
    filterOption(selectBrand, "brand");
  });
  selectCPU.addEventListener("change", () => {
    filterOption(selectCPU, "cpu");
  });
  selectRAM.addEventListener("change", () => {
    filterOption(selectRAM, "ram");
  });
}
// hàm trả về kết quả search
function checkSearching() {
  let dataSearch = localStorage.getItem("searching");
  dataSearch = dataSearch.toLocaleLowerCase();
  console.log(dataSearch);
  if (dataSearch) {
    let filterProducts = dataProductsOfType.filter((value) => {
      return value.title.toLocaleLowerCase().includes(dataSearch);
    });
    // console.log(filterProducts);
    renderAllProductOfType(filterProducts);
    localStorage.removeItem("searching");
  }
}
checkSearching();
