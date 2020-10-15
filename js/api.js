$(function() {
    //封装函数发送请求获取用户列表
    function getMsg() {
        $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/getData',
        success: function(res) {
            console.log(res);
        }
    });
    }
});
