document.addEventListener('DOMContentLoaded', async function () {


  await renderItemsFromPrefs();
  async function renderItemsFromPrefs() {
    var itemList = await getItemListFromPrefs();
    var listContainer = document.getElementById('itemList');
    listContainer.innerHTML = "";
    console.log(itemList)
    if (itemList.length === 0) {
      var li = document.createElement('h5');
      li.textContent = "Configurer les adresses organiques";
      listContainer.appendChild(li);
    }
    itemList.emails.forEach(function (item) {
      var li = document.createElement('li');
      li.setAttribute('data-item', item.email);
      li.textContent = item.email;
      listContainer.appendChild(li);
    });


  }

  async function getItemListFromPrefs() {
    let emailsOrganic = await messenger.organicapi.getOrganicAccounts();
    return emailsOrganic;
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
    await changeFrom(details, tabs[0].id, item);
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
    let email = await details.from;
    if (!details.customHeaders.includes({ "X-Expediteur": email })) {
      details.customHeaders.push({ "name": "X-Expediteur", "value": email });
      // details.cc.push("test@test.com");
      console.log(details);
    }
    await messenger.compose.setComposeDetails(tabId, details);

    let afterModify = await messenger.compose.getComposeDetails(tabId);
    console.log({ afterModify });
  }
  async function changeFrom(details, tabId, item) {
    let email = "<" + item + ">";
    let el = await getItemListFromPrefs();
    details.from = el.name + email;
    await messenger.compose.setComposeDetails(tabId, details);
  }

});
