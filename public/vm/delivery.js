/**
 * Created by voson on 16/8/10.
 */
$(function () {
    var delivery = new Vue({
        el: '#delivery',
        data: {
            id: "",               //每条发货记录在数据库中的Id
            Rec: []             //从数据库中提取的发货记录
        },
        ready: function () {
            this.show();
        },
        methods: {

            //获取数据库中的发货记录
            show: function () {
                var _self = this;
                $.ajax({
                    type: 'GET',
                    url: 'Delivery/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.Rec = JSON.parse(data);
                        }
                    }
                });
            },

            save:function () {
                var _self = this;
                var prices=[];
                $.each(_self.Rec,function (a,b) {
                    if(b.price!="" && b.price!=undefined){
                        prices.push({"id":b.id,"price":b.price});
                    }
                });
                if(prices.length!=0){
                    $.ajax({
                        type: 'POST',
                        url: 'Delivery/save',
                        data:{json:JSON.stringify(prices)},
                        success: function (data) {
                            /*console.log(data);*/
                            toastr.info('保存'+data);
                        }
                    });
                }
            }

        }

    });
    /*Vue EDN*/


});