var APP_ID = 'JLMh9Uyk8yngdHl7RjiKtBvJ-gzGzoHsz';
var APP_KEY = 'eFTOCJrbFsKTdigcxbv3jRog';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


let myFrom = document.querySelector('#postMessage')

myFrom.addEventListener('submit',function(e){  // 监听表单防止 监听submit落空
  e.preventDefault()
  let content = document.querySelector('input[name=content]').value
  let Message = AV.Object.extend('Message');
  let message = new Message();
  message.save({
    content
  }).then(function(object) {
    console.log(object)
  })
})

