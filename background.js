// messenger.composeAction.onClicked.addListener(async (tab) => {
//   console.log(tab);
//   let details = await messenger.compose.getComposeDetails(tab.id);
//   toggleOrganique(details, tab.id);

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
// browser.runtime.onInstalled.addListener(() => {
//   messenger.organicapi.organicPrefs();
// });