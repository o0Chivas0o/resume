var nav = $('#nav')
var content = $('#content')
var target = $(content[0]).children()

nav.on('click','li',function (e) {
    var index = $(e.currentTarget).index()
    $(e.currentTarget).addClass('active')
    $(e.currentTarget).siblings().removeClass('active')
    $(target[index]).addClass('active')
    $(target[index]).siblings().removeClass('active')
})