let token = "[YOUR_TOKEN]";

function getMe() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/getMe");
  console.log(response.getContentText());
}

function setWebhook() {
  let webAppUrl = "[YOUR_WEB_APP_URL]"
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
