const ShopForm = document.querySelector(".js-shoplist"),
    Input = ShopForm.querySelector("input"),
    ShopList = document.querySelector(".shopping_list"),
    addBtn = document.querySelector(".addBtn");

const SHOP_LS = 'toBuy';
toBuy = [];


function deleteItem(event) {
    const btn = event.target; 
    const li = btn.parentNode;
    ShopList.removeChild(li);
    const cleanItem = toBuy.filter(toBuy => {
        return toBuy.id !== parseInt(li.id);
    });
    toBuy = cleanItem;
    saveItem();
}

function saveItem() {
    localStorage.setItem(SHOP_LS, JSON.stringify(toBuy));
}

let idNum = 1;
function paintItem(text) {
    const li = document.createElement("li"); // <li></li>
    const span = document.createElement("span"); // <span> </span>
    const delBtn = document.createElement("button"); // <button> </button>
    delBtn.setAttribute("class", "delBtn");
    delBtn.addEventListener('click', deleteItem); 
    const newId = idNum;
    idNum +=1;
    delBtn.innerText = "🗑";
    span.innerText = text; // <span> text </span>
    li.appendChild(span); // <li> <span>text</span> </li>
    li.appendChild(delBtn); // <li> <span>text</span> <button>🗑</button> </li>
    li.id = newId;
    ShopList.appendChild(li); // <ul> <li> <span>text</span> <button>🗑</button> </li> </ul>
    const toBuyObj = {
        text: text,
        id : newId
    };
    toBuy.push(toBuyObj);
    saveItem();
}

function handleSubmit (event) {
    event.preventDefault();
    const currentValue = Input.value;
    paintItem(currentValue);
    Input.value = "";
}

function loadItem() {
    const loadedItems = localStorage.getItem(SHOP_LS);
    if(loadedItems !== null) {
        const parsedItem = JSON.parse(loadedItems);
        parsedItem.forEach(item => {
            paintItem(item.text);
        });
    }
    
}

function init() {
    loadItem();
    ShopForm.addEventListener("submit" ,handleSubmit);
    addBtn.addEventListener("click", handleSubmit);
}
init();