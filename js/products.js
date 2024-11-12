let rowCollection = document.querySelector(".row-collection");
let selectPrice = document.querySelector("#price");
let selectBrand = document.querySelector("#company");
let selectCPU = document.querySelector("#cpu");
let selectRAM = document.querySelector("#ram");

let url = "http://localhost:3000/products";
import * as mixin from "./mixin.js";
import * as utils from "./utils.js";
const dataProductsOfType = await mixin.fetchAPI(url);
const dataType = await utils.getParam("type");

let data = dataProductsOfType.filter((value) => value.type === dataType);

function renderAllProductOfType(data) {
  rowCollection.innerText = "";
  data.map((value) => {
    let col = document.createElement("div");
    col.classList.add("col-3", "col-md-4", "col-sm-6");
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
    rowCollection.appendChild(col);
  });
}

renderAllProductOfType(data);

// hàm lọc sản phẩm theo giá
function filterPrice() {
  if (selectPrice.value === "0") {
    renderAllProductOfType(dataProductsOfType, dataType);
  } else if (selectPrice.value === "1") {
    data = data.toSorted((a, b) => {
      return b.originalPrice - b.sale / 100 - (a.originalPrice - a.sale / 100);
    });
    renderAllProductOfType(data, dataType);
  } else if (selectPrice.value === "2") {
    data = data.toSorted((a, b) => {
      return a.originalPrice - a.sale / 100 - (b.originalPrice - b.sale / 100);
    });
    renderAllProductOfType(data, dataType);
  }
}
window.filterPrice = filterPrice;

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
renderSelect(selectBrand, "brand");
renderSelect(selectCPU, "cpu");
renderSelect(selectRAM, "ram");

// selectBrand.addEventListener("onchange", () => {
//   renderSelectBrand(selectBrand, "brand");
// });
// selectCPU.addEventListener("onchange", () => {
//   renderSelectBrand(selectCPU, "cpu");
// });
// selectRAM.addEventListener("onchange", () => {
//   renderSelectBrand(selectRAM, "ram");
// });

//  if (pointOfAppearance.value === "0") {
//    renderAllProductOfType(data);
//  } else if (pointOfAppearance.value === value) {
//    data = data.filter((item) => (item.kay = value));
//    renderAllProductOfType(data);
//  }

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

selectBrand.addEventListener("change", () => {
  filterOption(selectBrand, "brand");
});
selectCPU.addEventListener("change", () => {
  filterOption(selectCPU, "cpu");
});
selectRAM.addEventListener("change", () => {
  filterOption(selectRAM, "ram");
});
