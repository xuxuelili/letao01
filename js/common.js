$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});


    //退出功能
    $('#loginout').on('click',function () {
        $.ajax({
            type: 'get',
            url: `${APP.baseUrl}/employee/employeeLogout`,
            success: function (response) {
                // console.log(response);
                alert('退出成功!');
                location.href = 'login.html';
            }
        })
    })

});

//配置cookie
$.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});

//配置全局地址
var APP = {
    baseUrl: 'http://fullstack.net.cn:3000'
    // baseUrl: 'http://localhost:3000'
}


$.fn.serializeToJson = function () {
    var formAry = this.serializeArray();
    var result = {};
    formAry.forEach(function (item) {
        result[item.name] = item.value;
    })
    return result;
}


//获取地址栏中的id
function getUrlParams(name) {

    var search = location.search.slice(1);

    var ary1 = search.split('&');
    for (var i = 0; i< ary1.length; i++) {
        var ary2 = ary1[i].split('=');
        if (ary2[0] == name) {
            return ary2[1];
        }
    }
    return -1;
}