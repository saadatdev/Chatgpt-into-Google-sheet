function onOpen() {
  createCustomMenu();
}

function createCustomMenu() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu("Generate");
  menu.addItem("Keywords", "OpenAI_Test");
  menu.addItem("Content Idea", "idea");
  menu.addToUi();
}

function OpenAI_Ask(API_KEY, Model, Prompt, Temperature, Tokens) {
  // Set the API endpoint for ChatGPT
  var apiEndpoint = "https://api.openai.com/v1/completions";

  // Set the options for the API call
  var options = {
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + API_KEY
    },
  "payload": JSON.stringify(
    {
    "model": Model,
    "prompt": Prompt,
    "max_tokens": Tokens
    },
  ),
  "method": "POST",
  "temperature": Temperature
  };

  // Make the API call to ChatGPT
  var response = UrlFetchApp.fetch(apiEndpoint, options);

  // Parse the response from ChatGPT
  var responseObject = JSON.parse(response.getContentText());

  // Print the generated text from ChatGPT
  var Choice = responseObject.choices[0].text;
  return Choice;
}

function OpenAI_Test() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("your sheet name");
  var range = sheet.getActiveCell();
  var value = range.getValue();
  console.log(value);
  var API_KEY = 'your key here';
  var PROMPT = 'give me 10 fiver keywords about ' + value;
  Logger.log(PROMPT);
  var MODEL = 'text-davinci-003';
  var TEMPERATURE = 0.5;
  var TOKENS = 200;
  var Answer = OpenAI_Ask(API_KEY, MODEL, PROMPT, TEMPERATURE, TOKENS);
  Logger.log(Answer);
  
  // Get the row and column indices of the original cell
  var row = range.getRow();
  var column = range.getColumn();
  
  // Write the answer to the cell in the same column as the original keyword
  sheet.getRange(row+1, column ).setValue(Answer);
}

function idea() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("your sheet name");
  var range = sheet.getActiveCell();
  var value = range.getValue();
  console.log(value);
  var API_KEY = 'your key here';
  var PROMPT = 'generate me some youtube video ideas about this topic ' + value;
  Logger.log(PROMPT);
  var MODEL = 'text-davinci-003';
  var TEMPERATURE = 0.5;
  var TOKENS = 200;
  var Answer = OpenAI_Ask(API_KEY, MODEL, PROMPT, TEMPERATURE, TOKENS);
  Logger.log(Answer);
  
  // Get the row and column indices of the original cell
  var row = range.getRow();
  var column = range.getColumn();
  
  // Write the answer to the cell in the same column as the original keyword
  sheet.getRange(row+1, column ).setValue(Answer);
}




