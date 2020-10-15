//封装函数发送请求获取用户列表
function  getMsg() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/getData',
        success: function (res) {
            if (res.code !== 0) return alert('获取用户数据失败！')
            // console.log(res);
            var cloudhtml = template('cloud_mode', res);
            $('.cloud').html(cloudhtml);
            getSmallCss();
        }
    });
    
}
getMsg();

var add = document.querySelector('.add');
var mask = document.querySelector('.mask');
var login1 = document.querySelector('.mask .login');
var cloud = document.querySelector('.cloud');
var edit = document.querySelector('.edit');
var login2 = document.querySelector('.edit .login');
var addform = document.querySelector('.mask .login .title span:last-child');

//产生随机数
function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); 
    //四舍五入
   return num;
}
//点击新增用户按钮，弹出弹出框
add.addEventListener('click', function() {
    mask.style.display = 'block';
});
//点击mask，隐藏弹出层
mask.addEventListener('click', function() {
    mask.style.display = 'none';
});
//阻止冒泡，防止点击弹框隐藏弹出层
login1.addEventListener('click', function(e) {
    e.stopPropagation();
});
//封装页面小球添加css样式的函数
function getSmallCss() {
    var smalldiv = document.querySelectorAll('.cloud .small');
    
    //遍历smalldiv，生成小球的样式
    for (let i = 0; i < smalldiv.length; i++) {

        //生成随机数，设置小球的位置
        var h = RandomNumBoth(50, 200);
        var l = RandomNumBoth(60, 850);
        var t = RandomNumBoth(200, 500);
        //添加样式
        smalldiv[i].style.left = l + 'px';
        smalldiv[i].style.top = h + 'px';
        smalldiv[i].querySelector('.line').style.height = h + 'px';
        // //创建小球的html结构
        // var small = `<div class="small" style = 'left:${l}px; top:${t}px'>
        //                 <div class="line" style = 'height: ${h}px '></div>
        //                 <span>${data[i].name}</span>
        //             </div>`
        // //将创建的small添加到cloud里面
        // cloud.insertAdjacentHTML('beforeend', small);
    }
    //给每个小球注册点击事件，点击弹出弹出层
    var spans = document.querySelectorAll('.small span');
    for (var i = 0; i < spans.length; i++) {
        spans[i].addEventListener('click', function () {
            edit.style.display = 'block';
        });
    }
}
// getSmall();
//开启定时器
var timer = setInterval(function() {
    getSmallCss()
},1500);

//鼠标经过停止定时器
cloud.addEventListener('mouseenter',function() {
    clearInterval(timer);
});
//鼠标离开开启定时器
cloud.addEventListener('mouseleave', function() {
    timer = setInterval(function() {
        getSmallCss()
    },1500);
});
//点击edit隐藏遮罩层
edit.addEventListener('click', function() {
    edit.style.display = 'none';
});
//点击弹出框阻止冒泡，防止触发edit点击事件
login2.addEventListener('click', function(e) {
    e.stopPropagation();
});

//点击新增 创建添加表格
addform.addEventListener('click', function() {
    var form = `<div class="form">
                    <div class="user">
                        <span>用户名：</span>
                        <input type="text">
                    </div>
                    <div class="psw">
                        <span>密码：</span>
                        <input type="password">
                    </div>
                    <div class="address">
                        <span>地址：</span>
                        <select>
                            <option selected>不选择</option>
                            <option>北京</option>
                            <option>上海</option>
                        </select>
                        <select>
                            <option selected>不选择</option>
                            <option>北京</option>
                            <option>上海</option>
                        </select>
                        <select>
                            <option selected>不选择</option>
                            <option>北京</option>
                            <option>上海</option>
                        </select>
                    </div>
                    <div><button class="del">删除</button></div>
                </div>`;
    login1.insertAdjacentHTML('beforeend',form)
    //点击删除，删除对应表格
    removeForm();
});


//点击删除按钮，删除对应的表格
function removeForm() {
    var del = document.querySelectorAll('.del')
    for (var i = 0; i < del.length; i++) { 
        del[i].onclick =  function() {
            del = document.querySelectorAll('.del')
            if (del.length <= 1) {
                alert('已经是最后一个，无法删除');
                return false
            } else {
                this.parentNode.parentNode.remove();
                
            }
        };
    }
}

removeForm();



