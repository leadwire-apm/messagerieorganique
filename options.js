document.addEventListener('DOMContentLoaded', function () {
    loadItems();
    document.getElementById('addItemBtn').addEventListener('click', addItem);
    document.getElementById('deleteSelectedBtn').addEventListener('click', deleteSelectedItems);
  });
  
  function addItem() {
    var itemNameInput = document.getElementById('itemName');
    var itemName = itemNameInput.value.trim();
  
    if (itemName !== "") {
      var itemList = getItemList();
      itemList.push({ name: itemName, checked: false });
  
      saveItems(itemList);
      renderItems();
  
      itemNameInput.value = "";
    }
  }
  
  function deleteSelectedItems() {
    var itemList = getItemList();
    var updatedList = itemList.filter(item => !item.checked);
  
    saveItems(updatedList);
    renderItems();
  }
  
  function toggleItem(index) {
    var itemList = getItemList();
    itemList[index].checked = !itemList[index].checked;
  
    saveItems(itemList);
    renderItems();
  }
  
  function getItemList() {
    var itemList = localStorage.getItem('itemList');
    return itemList ? JSON.parse(itemList) : [];
  }
  
  function saveItems(itemList) {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }
  
  function renderItems() {
    var itemList = getItemList();
    var listContainer = document.getElementById('itemList');
  
    listContainer.innerHTML = "";
  
    itemList.forEach(function (item, index) {
      var li = document.createElement('li');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'item' + index;
      checkbox.checked = item.checked;
      checkbox.addEventListener('change', function() {
        toggleItem(index);
      });
  
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(item.name));
      
      listContainer.appendChild(li);
    });
  }
  
  function loadItems() {
    renderItems();
  }
  