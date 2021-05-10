/**************************************************** */
/*           EVA CONFIGURATION REQUEST                     */
/**************************************************** */
export const options = {
  'method': 'POST',
  'url': 'https://api-try.eva.bot/conversations', //cockpit: api-try.eva.bot https://cockpit/conversations
  'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'API-KEY': '', //API-KEY del bot
      'PROJECT': '', //Nombre del bot
      'CHANNEL': 'web',
      'OS': 'Windows',
      "USER-REF": "192.168.1.1",
      "LOCALE": "pt-BR",
      "OS-VERSION": "10",
      "BROWSER": "Chrome",
      "BROWSER-VERSION": "10",
      "BUSINESS-KEY": "123"
  }
};

