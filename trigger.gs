function setTrigger(){
  delTrigger();

  let time0 = new Date();
  time0.setHours(7);
  time0.setMinutes(50);
  ScriptApp.newTrigger('chatGptRequest').timeBased().at(time0).create();
}
function delTrigger(){
  //GASプロジェクトに設定したトリガーをすべて取得
  const triggers = ScriptApp.getProjectTriggers();
  //トリガーの登録数をログ出力
  console.log('トリガー数：' + triggers.length);
  //トリガー登録数のforループを実行
  for(let i=0;i<triggers.length;i++){
    //取得したトリガーの関数がTestAの場合、deleteTriggerで削除
    if(triggers[i].getHandlerFunction()==='chatGptRequest'){
      ScriptApp.deleteTrigger(triggers[i]);
    }
    if(triggers[i].getHandlerFunction()==='chatGptRequestYugata'){
      ScriptApp.deleteTrigger(triggers[i]);
    }
    
  }
}
