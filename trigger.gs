function setTrigger(){
  delTrigger();

  let time0 = new Date();
  time0.setHours(7);
  time0.setMinutes(50);
  ScriptApp.newTrigger('chatGptRequest').timeBased().at(time0).create();
}
