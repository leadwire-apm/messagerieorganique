var organicapi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      organicapi: {
        async organicPrefs() {
          let pref = Services.prefs.getCharPref("mail.compose.other.header");
          if (!pref.split(',').includes('X-Expediteur')) {
            Services.prefs.setCharPref("mail.compose.other.header", pref + ",X-Expediteur");
          }

        },
        async getOrganicAccounts() {
          let accounts = Services.prefs.getCharPref("mail.accountmanager.accounts").split(',');
          let id = "";
          let hostname = "";
          let hostnameOrganique = ""
          let accountsOrganique = [];
          let organiqueName = "";
          accounts.forEach(accountId => {
            let server = Services.prefs.getCharPref("mail.account." + accountId + ".server");
            try {
              id = Services.prefs.getCharPref("mail.account." + accountId + ".identities");
              hostname = Services.prefs.getCharPref("mail.server." + server + ".hostname");
              hostnameOrganique = Services.prefs.getCharPref("extensions.changetreeviewdisplay.msgOrganique");
              organiqueName = Services.prefs.getCharPref("extensions.changetreeviewdisplay.msgOrganiqueName");
              if (hostname == hostnameOrganique) {  
                accountsOrganique.push({ "email": Services.prefs.getCharPref("mail.identity." + id + ".useremail") });
              }

            } catch {
             }
            
          });

          let result = { "name": organiqueName, "emails": accountsOrganique };
          return result;
        }
      }
    }
  }
};