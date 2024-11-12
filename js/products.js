let rowCollection = document.querySelector(".row-collection");

let url = "http://localhost:3000/products";
import * as mixin from "./mixin.js";
const dataProductsOfType = await mixin.fetchAPI(url);

function renderAllProductOfType(data, type) {
  rowCollection.innerText = "";
  data = data.filter((value) => value.type === type);
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
                  <div class="price-original"> ${value.originalPrice} </div>
                  <div class="price-is-reduced">
                    ${
                      value.originalPrice -
                      value.originalPrice * (value.sale / 100)
                    } <span class="percent-discount">${value.sale}</span>
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

renderAllProductOfType(dataProductsOfType, "pc");
