import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shopmart-4485b-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

onValue(shoppingList, function(snapshot) {
    console.log(snapshot.val())
    
    clearShoppingList();
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];
            

            displayItemToShoppingList(currentItem);
        }
    } else {
    shoppingListEl.innerHTML ="<li>No items here...</li>"

    }

});

addButtonEl.addEventListener("click", function() {
    let inputValue = inputField.value;
    if (inputValue) {
        push(shoppingList, inputValue);
        clearInputField();
    }
});

function clearShoppingList() {
    shoppingListEl.innerHTML = "";
}

function clearInputField() {
    inputField.value = "";
}

function displayItemToShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    const listItem = document.createElement("li");
    listItem.textContent = itemValue;

    listItem.addEventListener("dblclick" , function(){
        let exactLocationOfItemDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemDB)
        
    })

    shoppingListEl.appendChild(listItem);
}
