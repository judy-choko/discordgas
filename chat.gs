const SCRAPEURL= ""
const BASEURL= ""
var BOTNAME = ""
const WEBHOOK_URL2 = "";
function chatGptRequest() {
  let content = phantomJSCloudScraping2();
  var text = Parser.data(content).from('<li class="module-list-articles__item">').to('</li>').iterate();
  var link = Parser.data(text[0]).from('<a href="').to('"').build();
  var titles = Parser.data(text[0]).from('<span class="module-list-articles__item__heading ">').to('<').build();
  var imgurl = Parser.data(text[0]).from('<img class="ofi-cover js-lazy-image" data-src="').to('"').build();
  console.log(BASEURL+link)
  console.log(titles)
  console.log("https:"+imgurl)
  links =(BASEURL+link)
  imgurls=("https:"+imgurl)

  // OpenAIのAPIキーを取得
  const apiKey = ScriptProperties.getProperty('APIKEY');
  // OpenAIのエンドポイント
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const date = new Date();
  const today=Utilities.formatDate(date, 'JST', 'yyyy-MM-dd');
  const thisDay = date.getDay(); //曜日の番号を取得
  const dayArray = ['日', '月', '火', '水', '木', '金', '土']; //曜日の配列
  let prompt =("あなたはツンデレな性格です。今日は" +today+"("+ dayArray[thisDay] + ")曜日です。日付をお知らせしつつ、可愛い絵文字を使いながら朝の挨拶をしてください。")

  // 送信メッセージを定義
  let messages = [{'role': 'system', 'content': prompt},];
  // パラメータ設定
  const requestBody = {
    'model': 'gpt-3.5-turbo',
    'temperature': 0.7,
    'max_tokens': 2048,
    'messages': messages
  }
  // 送信内容を設定
  const request = {
    method: "POST",
    muteHttpExceptions : true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    payload: JSON.stringify(requestBody),
  }
  try {
    //OpenAIのChatGPTにAPIリクエストを送り、結果を変数に格納
    const response = JSON.parse(UrlFetchApp.fetch(apiUrl, request).getContentText());
    // ChatGPTのAPIレスポンスをセルに記載
    if (response.choices) {
      res=(response.choices[0].message.content);
      console.log(res);
    } else {
      // レスポンスが正常に返ってこなかった場合の処理
      console.log(response);
    }
  } catch(e) {
    // 例外エラー処理
    console.log(e);
  }



  const payload2 = {
    username: BOTNAME,
    content: res,
    embeds:[{
      "title":titles,
      "color": 0xf1c40f,
      "url": links,
      "thumbnail": { "url": imgurls},
      //"image": { "url":imgurls},
              }]
  };

  UrlFetchApp.fetch(WEBHOOK_URL2, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload2),
  });
}

function phantomJSCloudScraping2() {
  //スクリプトプロパティからPhantomJsCloudのAPIキーを取得する
  let key = PropertiesService.getScriptProperties().getProperty('phantomkey');
  //HTTPSレスポンスに設定するペイロードのオプション項目を設定する
  let option =
  {
    url: SCRAPEURL,
    renderType: "HTML",
    outputAsJson: true
  };
  //オプション項目をJSONにしてペイロードとして定義し、エンコードする
  let payload = JSON.stringify(option);
  payload = encodeURIComponent(payload);
  //PhantomJsCloudのAPIリクエストを行うためのURLを設定
  let apiUrl = "https://phantomjscloud.com/api/browser/v2/" + key + "/?request=" + payload;
  //設定したAPIリクエスト用URLにフェッチして、情報を取得する。
  let response = UrlFetchApp.fetch(apiUrl);
  //取得したjsonデータを配列データとして格納
  let json = JSON.parse(response.getContentText());
  //APIから取得したデータからJSから生成されたソースコードを取得
  let source = json["content"]["data"];
  return source;
}
