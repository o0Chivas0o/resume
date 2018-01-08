// 给loading一个函数 让别人看得到
setTimeout(function () {
  siteWelcome.classList.remove('active')
  // stickyNavBar
  window.onscroll = function (e) {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
  }
},1500)

let aTags = document.getElementsByClassName('menuTrigger')
for(let i = 0;i<aTags.length;i++){
  aTags[i].onmouseenter = function(e){
    let li = e.currentTarget
    let brother = li.getElementsByTagName('ul')[0]
    brother.classList.add('active')
  }
  aTags[i].onmouseleave = function(e){
    let li = e.currentTarget
    let brother = li.getElementsByTagName('ul')[0]
    brother.classList.remove('active')
  }
}



portfolio1.onclick= function(){
  portfolioBar.className = 'bar state-1'
}
portfolio2.onclick= function(){
  portfolioBar.className = 'bar state-2'
}
portfolio3.onclick= function(){
    portfolioBar.className = 'bar state-3'
  }
