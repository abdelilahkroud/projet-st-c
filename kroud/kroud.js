const FormateurBox = document.getElementById("formateur");
const AdminBox = document.getElementById("admin");
const CMEBox = document.getElementById("CME")
const ApprenantBox = document.getElementById("apprenant");

const boxes = [FormateurBox, AdminBox, CMEBox, ApprenantBox];

fetch("./kroud.json")
    .then((response) => response.json())
    .then((data) => display(data));

function display(items) {
    const listCards = document.getElementById("list");
    listCards.innerHTML = htmlContent(items);

    const itemElements = document.querySelectorAll(".item");
    itemElements.forEach((item, index) => {
        item.addEventListener("dragstart", (e) => {
            let selected = e.currentTarget;

            boxes.forEach((box) => {
                box.addEventListener("dragover", (e) => {
                    e.preventDefault();
                });

                box.addEventListener("drop", (e) => {
                    const El = item.querySelector(".card")
                     
                        box.appendChild(selected);
                        console.log(box.previousElementSibling.textContent.toLocaleLowerCase(),
                        El, El.children[2].textContent.toLocaleLowerCase())
                    
                    selected = null;
                });
            });
        })
    });
}

function htmlContent(items) {
    let htmlItems = "";

    for (let element in items) {
        items[element].forEach(item => {
            htmlItems += `
            <div class="item" draggable="true" style="background-color:#E6DFAF; display:flex; justify-content: center; margin-top:2vh; border-radius:3vh; width:40vh;">
                    <div class="col-1"></div>
                <div class="col-2" style=margin-top:1.2vh;>
                    <img src="${item.img}" ; width="60vh"/> 
                </div>
                    <div class="col-1"></div>
                <div class="col-10 ">
                    <div class="row" style="margin-top:1vh"><h3>${item.nom} ${item.prenom}</h3></div>
                    <div class="row"><h5>${item.type}</h5></div>
                </div>
            </div>`;
        });
    }

    return htmlItems;
}
