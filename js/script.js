async function fetchData() {
  try {
    const url = 'https://desafio.xlow.com.br/search';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const getTotaloProducts = () => {
      const totalProdcts = data.length;
      const total = document.querySelector('#total-products');
      total.innerHTML = `${totalProdcts} produtos: `;
    };
    getTotaloProducts();

    const showAllProducts = async () => {


      const getIds = data.map(product => product.productId);
      console.log(getIds);


      // Bom peguei o ids de cada produdo e armazenei num  array, a ideia era pegar esse novo array e uma nova chamada a api buscando as urlImage, armazenando cada uma delas em um array de imagens e exibindo  no template abaixo, mas eu n soube como fazer e pesquisando, mesmo com GPT eu n consegui chegar num resultado.

      const productList = document.querySelector('#product-list');
      productList.innerHTML = '';

      data.map(product => {
        const productDiv = `
            <div class="product">
              <div class="product-image">
                <a href="${product.link}">
                  <img src="${product.image}" alt="${product.productName}">
                </a>
                <h3>ID: ${product.productId}</h3>
              </div>
              <div class="product-info">
                <h2 class="product-name">${product.productName}</h2>
                <div class="product-price">
                <span class="current-price">R$ ${(product.bestPrice.toFixed(2) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  ${product.bestPrice < product.listPrice
            ? `<div>
          <p class="discount-price">R$ ${product.listPrice.toFixed(
              2,
            ) / 100}</p></div>`
            : ''
          }
               
              <button class="buy-button">Comprar</button>
              </div>
              `;
        productList.insertAdjacentHTML('beforeend', productDiv);
      });
    };
    await showAllProducts();

    const itensPerLine = document.getElementById('products-per-row');
    const productList = document.getElementById('product-list');

    function updateGrid() {
      let valorSelecionado = itensPerLine.value;
      console.log(valorSelecionado);

      if (window.innerWidth >= 300) {
        productList.style.gridTemplateColumns = `repeat(${valorSelecionado}, 1fr)`;
      } else if (window.innerWidth > 767) {
        productList.style.gridTemplateColumns = `repeat(2, 1fr)`;
      } else {
        productList.style.gridTemplateColumns = `repeat(2, 1fr)`;
      }
    }

    itensPerLine.addEventListener('change', updateGrid);
    window.addEventListener('resize', updateGrid);

    updateGrid();
  } catch (error) {
    console.error(error);
  }
}

fetchData();
