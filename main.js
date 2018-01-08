// 给loading一个函数 让别人看得到
setTimeout(function () {
  siteWelcome.classList.remove('active')
  // stickyNavBar
  window.onscroll = function (e) {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
  }
},1500)
let liTags = document.querySelectorAll('nav.menu > ul > li')
for(let i = 0;i<liTags.length;i++) {
  liTags[i].onmouseenter = function (e) {
    e.currentTarget.classList.add('active')
  }
  liTags[i].onmouseleave = function (e) {
    e.currentTarget.classList.remove('active')
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
