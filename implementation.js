var organicapi = class extends ExtensionCommon.ExtensionAPI {
    getAPI(context) {
      return {
        organicapi: {
          async organicPrefs() {
            let pref = Services.prefs.getCharPref("mail.compose.other.header");
            if (!pref.split(',').includes('X-Expediteur')) {
                Services.prefs.setCharPref("mail.compose.other.header", pref+",X-Expediteur");
            }

            Services.prefs.setCharPref("mail.extensions.messagerieorganique.", "localhost");
          },
          async getOrganicAccount() {
            
          }
        }
      }
    }
  };