// messenger.compose.onBeforeSend.addListener(async (tab, details) => {
//   let value = messenger.identities.getDefault('account1');
//   console.log(value);
//   if (!details.customHeaders.includes({ "X-Expediteur": "value@email.io" })) {
//     details.customHeaders.push({ "name": "X-Expediteur", "value": "value@email.io" });
//     console.log(details);
//     await messenger.compose.setComposeDetails(tab.id, details);
//     let recheck = await messenger.compose.getComposeDetails(tab.id);
//     console.log(recheck);
//   }

//   // else{
//   //   // details.from = "";
//   //   details.customHeaders.shift({"name":"X-Expediteur", "value": value.email});
//   //   messenger.compose.setComposeDetails(tabId, details);
//   //   console.log(details)
//   // }


// });

// let isOrganiqueEnabled = false;

// function toggleOrganique(details, tabId) {

//   isOrganiqueEnabled = !isOrganiqueEnabled; 
//   if (isOrganiqueEnabled) {

//     console.log(messenger.identities.list());
//     details.replyTo.push("replyto@organique.io");
//     messenger.compose.setComposeDetails(tabId, details);
//   } else {
//     console.log(details);
//     details.replyTo.shift("replyto@organique.io")
//     messenger.compose.setComposeDetails(tabId, details);
//   }
// }

// Init
browser.runtime.onInstalled.addListener(() => {
  messenger.organicapi.organicPrefs();
});
