let log = new Log(document.querySelector('.log'));

let char = new Ultra_Boss()
let monster = new Mega_Boss()

const stage = new Stage(
  char,
  monster,
  document.querySelector('#char'),
  document.querySelector('#monster'),
  log
)

stage.start()