$.ajax({
    type: 'get',
    async: false ,
    url: `${APP.baseUrl}/employee/checkRootLogin`,
    success: function (response) {
        if (response.error) {
            location.href = 'login.html';
        }
    }
})


$(function () {
    $.ajax({
        type: 'get',
        url: `${APP.baseUrl}/user/queryUser`,
        data: {
            page: 1,
            pageSize: 10
        },
        success: function (response) {
            // console.log(response);
            if (!response.error) {
                var html = template('userInfo',response);
                $('#userInfoBox').html(html);
            }
        }
    })

    $('#userInfoBox').on('click','.statusChange',function () {
        var id = $(this).attr('userId');
        var isDelete = $(this).attr('userIsdel');
        $.ajax({
            type: 'post',
            url: `${APP.baseUrl}/user/updateUser`,
            data: {
                id,
                isDelete: isDelete==1?0:1
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    location.reload();
                } else {
                    alert(response.message);
                }
            }
        })
    });
})