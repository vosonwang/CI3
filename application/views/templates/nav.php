<style>
    #header {
        clear: both;
        position: relative;
        z-index: 10;
        height: 50px;
        background-color: white;
    }

    #header {
        color: black;
        text-align: center;
        line-height: 3em;
    }
</style>
<link href="public/vendor/font-awesome.min.css" rel="stylesheet">

<body style="background-color:rgb(240,243,244);font-family: '微软雅黑'">

<div style="background-color: white;vertical-align: middle;" id="header">
    <div style="height: 50px;display: inline-block;">
        <a href="receiving" style="text-decoration: none;font-size: 30px;margin-right: 20px;">收货记录</a>
        <a href="delivery" style="text-decoration: none;font-size: 30px;margin-right: 20px;">发货记录</a>
        <a href="order" style="text-decoration: none;font-size: 30px;margin-right: 20px;">订单</a>
        <a href="pattern" style="text-decoration: none;font-size: 30px;margin-right: 20px;">花型</a>
    </div>



    <div class="pull-right">
        <button class="btn btn-default" onclick="logout()">退出</button>
    </div>

    <div class="pull-right" style="display: inline-block;margin-right: 20px;">
        <span style="font-size: 16px;line-height:40px;height: 40px;">
                <?php echo $_SESSION['user_name'] ?>
        </span>
    </div>

    <div class="pull-right" style="font-size:30px;line-height:30px;display: inline-block;padding: 5px;">
        <i class="fa fa-user" style="vertical-align: middle"></i>
    </div>


</div>


</body>