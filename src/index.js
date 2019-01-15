const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

  } else {
    toyForm.style.display = 'none'
  }
})

function getToys() {
  fetch("http://localhost:3000/toys/")
    .then(res => res.json())
    .then(data => {
      let toyCollection = document.getElementById("toy-collection");
      data.forEach( e => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.dataset.id = e.id
        div.innerHTML =
        `<h2>${e.name}</h2>
        <img src=${e.image} class="toy-avatar" />
        <p>${e.likes}</p>
        <button class="like-btn">Like ❤️</button>`;
        toyCollection.append(div);
      })
    })
}

document.addEventListener("DOMContentLoaded", () => {

  getToys()

  let submitBtn = document.getElementById("submit")
  submitBtn.addEventListener("click", e => {
    // e.preventDefault();
    let name = document.getElementById("text-value").value
    let image = document.getElementById("image-value").value
    let likes = 0
    console.log(name)
    fetch("http://localhost:3000/toys/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {name: name, image: image, likes: likes}
      )
    })
  })

  let toyBox = document.getElementById("toy-collection")
  toyBox.addEventListener("click", e => {
    if (e.target.classList.contains("like-btn")) {
      let toy_id = e.target.parentNode.dataset.id;
      let likes = e.target.parentNode.children[2].innerHTML
      likes++;
      fetch(`http://localhost:3000/toys/${toy_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          { likes: likes}
        )
      }).then(res => res.json())
        .then(data => {
          // console.log(data);
          e.target.parentNode.children[2].innerHTML = data.likes;
        })
    };
  });

})
