export default function(){
  window.View = function(view){
    return document.querySelector(view)
  }
}