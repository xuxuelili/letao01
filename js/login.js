$(function () {
    $('#loginBtn').click(function () {
        var result = $('#loginForm').serializeToJson();
        if (!$.trim(result.username)) {
            alert('请输入用户名');
        }
        if (!$.trim(result.password)) {
            alert('请输入密码');
        }
        $.ajax({
            type: 'post',
            url: `${APP.baseUrl}/employee/employeeLogin`,
            data: result,
            success: function (response) {
                // console.log(response);
                if (response.success) {
                    location.href = 'user.html';
                } else {
                    alert(response.message);
                }
                
            }
        })
        
    })
})