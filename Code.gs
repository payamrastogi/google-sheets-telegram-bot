//---------To be provided by the user
let token = "[YOUR_TOKEN]";
let webAppUrl = "[YOUR_WEB_APP_URL]"

//---------Run the below functions to test the connectivity and setting up the webhook
function getMe() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/getMe");
  console.log(response.getContentText());
}

function setWebhook() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebhook?url="+webAppUrl);
  console.log(response.getContentText());
}
/*
Writing data to a cell
function doPost(e){
  let contents = JSON.parse(e.postData.contents);
  let chat_id = contents.message.chat.id;
  let text = contents.message.text;
  sendText(chat_id, text);
  SpreadsheetApp.getActive().getActiveSheet().getRange(1,1).setValue(JSON.stringify(contents, null, 5));
}
*/

function doPost(e){
  let contents = JSON.parse(e.postData.contents);
  let chat_id = contents.message.chat.id;
  let text = contents.message.text;
  sendText(chat_id, text);
  console.log(SpreadsheetApp.getActive().getActiveSheet().getName())
  SpreadsheetApp.getActive().getActiveSheet().appendRow([chat_id, text]);
}

function sendText(chat_id, text){
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML"
    }
  };

  UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
}

function send() {
  let chat_id = 1476317815
  let text  = "Hi! How are you?"
  sendText(chat_id, text);
}

function broadcast(){
  var sh = SpreadsheetApp.getActive();
  var ss = sh.getSheetByName('Messages');
  var length = ss.getLastRow()
  var data = ss.getRange(1,1,length,1).getValues();
  var a = [];
  var b = 0;

  for (var n = 0; n<length; n++) {

    if (a.indexOf(data[n].join()) == -1) {
      sendText(data[n].join(), "Sahil");
      a.push(data[n].join());
      b++;

    }
  }

  Logger.log(a);
  Logger.log(b);
}
//---send message
function sendMessageWithInlineActions(text, keyboard) {
   let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: String(text),
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
  logActivity("sent", JSON.stringify(data));
}

function sendMessage(text){
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: String(text),
      parse_mode: "HTML"
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
  logActivity("sent", JSON.stringify(data));
}

//----Log Activity
function logActivity(text, action){
  SpreadsheetApp.getActive().getSheetByName("ActivityLog").appendRow([new Date(), chatId, action, text]);
}