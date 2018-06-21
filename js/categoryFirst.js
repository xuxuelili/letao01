$(function () {
   
    var page = 1;
    var pagesize = 2;
    var fenye = 0;

    getData();

    //下一页
    $('#next').on('click',function () {
        // alert(1);
        page++;
         console.log(page);
         console.log(fenye);
        if (page > fenye) {
            page = fenye;
            alert('没有数据了'); 
           
            return;
        }
        getData();

    })

    //上一页
    $('#prev').on('click',function () {
        // alert(1);
        page--;
        if (page < 1) {
            page = 1;
            alert('第一页');
            return;
        } 
        getData();
    })


    //点击添加按钮
    $('#addCategory').click(function () {
        // alert(1);
        var categoryName = $('#inputName').val();
        // console.log(categoryName);
        $.ajax({
            type: 'post',
            url: `${APP.baseUrl}/category/addTopCategory`,
            data: {
               categoryName
            },
            success: function (response) {
                // console.log(response);
                if (response.success) {
                    location.reload();
                } else {
                    alert(response.message);
                }
            }
        })
    })



    function getData() {
         $.ajax({
            type: 'get',
            url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
            data: {
                page: page,
                pageSize: pagesize
            },
            success: function (response) {
                console.log(response);
                // if (response.error) {
                //     location.href = 'login.html';
                // } else {
                    var html = template('categoryTpl',response);
                    $('#categoryBox').html(html);
                // }
                
                fenye = Math.ceil(response.total / pagesize);
                console.log(fenye);
            }
        })
    }
})



