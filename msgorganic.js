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
    if (itemList.length === 0) {
      var li = document.createElement('h5');
      li.textContent = "Configurer les adresses organiques";
      listContainer.appendChild(li);
    }
    itemList.forEach(function (item, index) {
      var li = document.createElement('li');
      li.setAttribute('data-item', item.name);
      li.textContent = item.name;
      listContainer.appendChild(li);
    });


  }

  function getItemListFromLocalStorage() {
    var storedItems = localStorage.getItem('organicList');
    return storedItems ? JSON.parse(storedItems) : [];
  }



  var listItems = document.querySelectorAll('#itemList li');

  listItems.forEach(function (item) {
    item.addEventListener('click', function () {
      handleItemClick(item.getAttribute('data-item'));

    });
  });

  async function handleItemClick(item) {
    let tabs = await messenger.tabs.query({ currentWindow: true, active: true });
    let details = await messenger.compose.getComposeDetails(tabs[0].id);
    await addReplyTo(details, tabs[0].id, item);
    await addExpediteur(details, tabs[0].id);
    await changeFrom(details, tabs[0].id);
  }




  async function addReplyTo(details, tabId, item) {
    if (!details.replyTo.includes(item)) {
      details.replyTo.push(item);
      await messenger.compose.setComposeDetails(tabId, details);
    }
    else {
      details.replyTo.shift(item)
      await messenger.compose.setComposeDetails(tabId, details);
    }

  }

  async function addExpediteur(details, tabId) {
    let account = await messenger.identities.getDefault('account1');
    if (!details.customHeaders.includes({ "X-Expediteur": account.email })) {
      details.customHeaders.push({ "name": "X-Expediteur", "value": account.email });
      console.log({ modifiedDetails: details });
      let setDetails = await messenger.compose.setComposeDetails(tabId, details);
      console.log({ setDetails });
      let readBackDetails = await messenger.compose.getComposeDetails(tabId);
      console.log({ readBackDetails });
    }
  }
  async function changeFrom(details, tabId) {
    // get accountId of email "Messagerie Organique" 
    let acc = messenger.organicapi.getOrganicAccount();
    let account = await messenger.identities.getDefault('account3');
    let email = "<" + account.email + ">";
    // get Name of email "Messagerie Organique"
    let name = "Messagerie Organique ";
    details.from = name + email;
    await messenger.compose.setComposeDetails(tabId, details);
    var pref = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
    console.log(pref)
  }

});
