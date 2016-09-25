/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var vue = new Vue({
        el: '#receiving',
        data: {
            records: [],
            new_records: [{}, {}, {}, {}, {}, {}, {}],
            del_records: [],
            orders: [],
            patterns: [],
            users: [],
            order_id:"",
            op_id:[]
        },
        ready: function () {
            this.show();
        },
        computed:{
            //计算订单总条数
          totalPieces:function () {
              var _self = this;
              var a=[];
              $.each(_self.records,function (index,item) {
                  var b=0;
                  $.each(item.detail,function (key,value) {
                      b=b+parseInt(value.pieces);
                  });
                  a.push(b);
              });
              return a;
          }
        },

        methods: {
            //获取订单信息
            show: function () {
                var _self = this;
                $.ajax({
                    type: 'post',
                    url: 'order_detail/getDetail',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.records = JSON.parse(data);
                        }
                    }
                });
            },

            //
            getRecords: function (entity) {
                var _self = this;
                var entity = entity;
                $.ajax({
                    type: 'post',
                    url: entity + "/show",
                    success: function (data) {
                        if (JSON.parse(data)) {
                            switch (entity) {
                                case "order":
                                    _self.orders = JSON.parse(data);
                                    break;
                                case "pattern":
                                    _self.patterns = JSON.parse(data);
                                    break;
                                case "user":
                                    _self.users = JSON.parse(data);
                                    break;
                            }
                        }
                    }
                });
            },




            insert: function () {
                var _self = this;

                //new_records是一个数组,其中的元素都是对象
                //1.过滤用户输入的""， 2. 过滤空的行
                var temp = this.new_records.filter(function (item) {
                    for (var obj in item) {
                        if (item[obj] == '' || item[obj]==undefined) {
                            delete item[obj];
                        }
                    }
                    if(objLength(item)!=0){
                        return item;
                    }
                });


                if (temp != 0) {
                    json = JSON.stringify(temp);
                    $.ajax({
                        type: 'POST',
                        url: 'receiving/insert',
                        data: {json: json},
                        success: function (msg) {
                            console.log(msg);
                            $('#new_records').modal('hide');
                            _self.show();
                            _self.new_records = [{}, {}, {}, {}, {}, {}, {}];
                        }
                    });
                }
            },


            delete: function () {
                console.log(2);
            },


            getOPId :function(value,item){
                var _self=this;
                var _new="#OP"+value.id;
                if(_self.order_id != ""){
                    if(_self.order_id==item.id){
                        if(value.id!=""){

                        }
                        $(_new).addClass("selected");
                    }else {
                        $(_old).removeClass("selected");
                        _self.order_id=item.id;
                    }
                }else{
                    $(_new).addClass("selected");
                    _self.order_id=item.id;
                }

            },

            //为修改订单提供订单号
            getOrderId: function (item) {
                var _self=this;
                var _new="#O"+item.id;
                var _old="#O"+_self.order_id;
                if(_self.order_id != ""){
                    if(_self.order_id==item.id){
                        $(_new).removeClass("selectedOrder");
                        _self.order_id="";
                    }else {
                        $(_new).addClass("selectedOrder");
                        $(_old).removeClass("selectedOrder");
                        _self.order_id=item.id;
                    }
                }else {
                    $(_new).addClass("selectedOrder");
                    _self.order_id=item.id;
                }
            }
        }
    });


    //日期格式转换
    Vue.filter('dateFormat', function (date) {
        date = date.replace(/-/g, "/");
        date = new Date(date);

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return m + '-' + d + ' ' + h + ':' + minute;
    })

});