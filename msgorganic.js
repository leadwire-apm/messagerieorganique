document.addEventListener('DOMContentLoaded', function () {


  renderItemsFromLocalStorage();

  document.getElementById('itemList').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      handleItemClick(event.target.getAttribute('data-item'));
    }
  });

  function renderItemsFromLocalStorage() {
    var itemList = getItemListFromLocalStorage();
    var listContainer = document.getElementById('itemList');

    listContainer.innerHTML = "";

    itemList.forEach(function (item, index) {
      var li = document.createElement('li');
      li.setAttribute('data-item', item.name);
      li.textContent = item.name;
      listContainer.appendChild(li);
    });
  }

  function getItemListFromLocalStorage() {
    var storedItems = localStorage.getItem('itemList');
    return storedItems ? JSON.parse(storedItems) : [];
  }



  var listItems = document.querySelectorAll('#itemList li');

  listItems.forEach(function (item) {
    item.addEventListener('click', function () {
      handleItemClick(item.getAttribute('data-item'));

    });
  });

  function handleItemClick(item) {
    messenger.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
      let details = await messenger.compose.getComposeDetails(tabs[0].id);
      toggleOrganique(details, tabs[0].id, item);
    });
  }


  function toggleOrganique(details, tabId, item) {
    if (!details.replyTo.includes(item)) {

      details.replyTo.push(item);
      messenger.compose.setComposeDetails(tabId, details);
    }
    else {
      details.replyTo.shift(item)
      messenger.compose.setComposeDetails(tabId, details);
    }

  }

});
