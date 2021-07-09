const init = () => {
  function fetchurl(url) {
    let bookList = document.getElementById("list");

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((item) => {
          let book = document.createElement("li");
          book.innerText = item.title;
          bookList.appendChild(book);
          book.addEventListener("click", () => {
            let showPanel = document.getElementById("show-panel");
            showPanel.innerHTML = "";
            let bookimage = document.createElement("img");
            bookimage.src = item.img_url;
            let bookTitle = document.createElement("h2");
            bookTitle.innerText = item.title;
            let bookSub = document.createElement("h2");
            bookSub.innerText = item.subtitle;
            let bookAuthor = document.createElement("h4");
            bookAuthor.innerText = item.author;
            let bookDesc = document.createElement("p");
            let likesList = document.createElement("ul");
            let likesArr = item.users;
            bookDesc.innerText = item.description;
            showPanel.appendChild(bookimage);
            showPanel.appendChild(bookTitle);
            showPanel.appendChild(bookSub);
            showPanel.appendChild(bookAuthor);
            showPanel.appendChild(bookDesc);
            showPanel.appendChild(likesList);
            likesArr.forEach((person) => {
              let likePerson = document.createElement("li");
              likePerson.innerText = person.username;
              likesList.appendChild(likePerson);
            });
            let likesBtn = document.createElement("button");
            likesBtn.innerText = "Like";
            likesBtn.type = "button";
            likesList.appendChild(likesBtn);
            let clicked = false;
            likesBtn.addEventListener("click", (e) => {
              // e.preventDefault();
              clicked = true;
              let myAddedLike = { id: 1, username: "pouros" };
              if (clicked) {
                likesBtn.innerText = "unlike";
                likesBtn.disabled = true;
                fetch(`http://localhost:3000/books/${item.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({ users: [...item.users, myAddedLike] }),
                })
                  .then((resp) => resp.json())
                  .then((data) => {
                    let newLike = document.createElement("li");
                    newLike.innerHTML = "pouros";
                    likesList.appendChild(newLike);
                    //bookList.innerHTML = "";
                    //fetchurl("http://localhost:3000/books");
                  });
              }
            });
          });
        });
      });
  }
  fetchurl("http://localhost:3000/books");
};

window.addEventListener("DOMContentLoaded", init);

//
