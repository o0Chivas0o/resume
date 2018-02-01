!function(){
  window.addEventListener('scroll',()=>{
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
  })
}.call()
