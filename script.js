document.getElementById("error-message").style.display = "none";
const searchBook = () => {
  const searchFiled = document.getElementById("search-filed");
  const searchBookName = searchFiled.value;
  //   searchFiled.value = " ";
  const url = `https://openlibrary.org/search.json?q=${searchBookName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => searchBookList(data.docs))
    .catch((error) => errorMessage(error));
};
const errorMessage = () => {
  document.getElementById("error-message").style.display = "block";
};
const searchBookList = (booksName) => {
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = " ";
  // search result are
  const searchCount = document.getElementById("search-count");
  searchCount.innerHTML = " ";
  const p = document.createElement("p");
  p.innerHTML = `
            <p class= "fs-6 fw-light text-muted">About: ${booksName.length} results </p>
    `;
  searchCount.appendChild(p);

  // no result found
  const blankSearch = document.getElementById("blank-search");
  blankSearch.innerHTML = " ";
  if (booksName.length === 0) {
    const h2 = document.createElement("h2");
    h2.innerHTML = `
        <h2 class="text-center">No result Found</h2>
        `;
    blankSearch.appendChild(h2);
  }

  // search result are
  booksName.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    div.innerHTML = `
            <div class="card">
                    <img src="${imgUrl}" class="card-img-top w-100" alt="...">
                <div class="card-body mt-3">
                    <h2 class="card-title">${book.title.slice(0, 50)}</h2>
                     <p>
                     Author name: ${book.author_name}
                     </p>
                     <h6>
                     Publisher: ${book.publisher}
                     </h6>
                     <h6 class= "fs-6 fw-light text-muted">
                     First publish date: ${book.first_publish_year}
                     </h6>
                </div>
            </div>
        `;
    searchResult.appendChild(div);
  });
};
