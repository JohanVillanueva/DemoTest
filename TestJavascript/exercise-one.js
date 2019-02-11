window.onload = () => {
    renderItems(6666);
}

//Render List Items
function renderItems(numberOfItems){
    let  localTime = (new Date()).toLocaleTimeString();

    if (!isNaN(numberOfItems) && typeof numberOfItems == 'number' && numberOfItems>0) {
        for (let index = 0; index < numberOfItems; index++) {
            document.getElementById('list-container').appendChild(createItem(`item ${index+1}`));
        }
    }
    else alert('Formato de número de items no válido.');
}

// Return HTML Element: <li></li>
function createItem(textToAppend){
    let listItem =  document.createElement('li');
    listItem.className = 'item';
    listItem.appendChild(document.createTextNode(textToAppend));
    listItem.addEventListener("click",refreshList);
    return listItem;
}

// Update List with the local time.
function refreshList(){
    let  newLocalTime = (new Date()).toLocaleTimeString();
    let listItemsToUpdate = Array.from(document.getElementsByClassName('item'));

    if (listItemsToUpdate && listItemsToUpdate.length>0) {
        listItemsToUpdate.map((item)=> ( item.innerHTML = newLocalTime));
    }
}