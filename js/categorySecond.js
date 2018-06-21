$(function () {
    $.ajax({
        type: 'get',
        url: `${APP.baseUrl}/category/querySecondCategoryPaging`,
        data: {
            page: 1,
            pageSize: 10
        },
        success: function (reponse) {
            // console.log(reponse);
            // if (reponse.success) {
                var html = template('categorySecond',{
                    list: reponse,
                    api: APP.baseUrl
                })
                $('#categorySecondBox').html(html);
            // }
        }
    })


    //一级分类
    $.ajax({
        type: 'get',
        url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
        data: {
            page: 1,
            pageSize: 1000000
        },
        success: function (response) {
            // console.log(response);
            var html = template('categoryFirst',response);
            $('#categoryFirstBox').html(html);
        }
    })


    var brandLogo = '';

    //文件上传
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data);
            // 存储图片地址
            brandLogo = data._response.result.picAddr;
            // 拼接图片url
            var imgUrl= APP.baseUrl + data._response.result.picAddr;
            // 将图片渲染到页面中
            $("#imgPreview").attr("src",imgUrl);
        }
    });

    //当保存按钮被点击的时候
    $('#save').on('click',function () {
        var brandName = $('#brandName').val();

        var categoryId = $('#categoryFirstBox').val();

        var hot = 1;
        $.ajax({
            type: 'post',
            url: `${APP.baseUrl}/category/addSecondCategory`,
            data: {
                brandName,
                categoryId,
                brandLogo,
                hot
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
    })
})