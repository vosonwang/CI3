/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var order = new Vue({
        el: '#order',
        data: {
            Rec:[],
            Rec_N: [{}, {}, {}, {}, {}, {}, {}],
            Rec_D: [],
            orders: [],
            patterns: [],
            users: [],
            order_id: "",
            new_pat:[{},{},{},{},{},{},{}],  //不能放{{}}
            order_no:""
        },
        ready: function () {
            this.show();
        },
        computed: {
            //计算订单总条数
            totalPieces: function () {
                var _self = this;
                var a = [];
                $.each(_self.Rec, function (index, item) {
                    var b = 0;
                    $.each(item.detail, function (key, value) {
                        b = b + parseInt(value.pieces);
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
                    url: 'Order_detail/getDetail',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.Rec = JSON.parse(data);
                        }
                    }
                });
            },

            //
            getRec_N: function (entity) {
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

                //Rec_N是一个数组,其中的元素都是对象
                //1.过滤用户输入的""， 2. 过滤空的行
                var temp = this.Rec_N.filter(function (item) {
                    for (var obj in item) {
                        if (item[obj] == '' || item[obj] == undefined) {
                            delete item[obj];
                        }
                    }
                    if (objLength(item) != 0) {
                        return item;
                    }
                });


                if (temp != 0) {
                    json = JSON.stringify(temp);
                    $.ajax({
                        type: 'POST',
                        url: 'Order/insert',
                        data: {json: json},
                        success: function (msg) {
                            console.log(msg);
                            $('#Rec_N').modal('hide');
                            _self.show();
                            _self.Rec_N = [{}, {}, {}, {}, {}, {}, {}];
                        }
                    });
                }
            },

            add:function (item) {
                var _self=this;
                _self.new_pat[0].order_id=item.id;
                _self.order_no=item.order_no;     //换成new_pat.order_no就无法在页面上输出
                $("#modal_addpat").modal("show");

            },

            insertPat:function () {
                var _self=this;

                var temp = this.new_pat.filter(function (item) {
                    for (var obj in item) {
                        if (item[obj] == '' || item[obj] == undefined) {
                            delete item[obj];
                        }
                    }
                    if (objLength(item) != 0) {
                        return item;
                    }
                });

                var i=0;
                while (i<temp.length){
                    temp[i].order_id=temp[0].order_id;
                    i++;
                }

                if (temp.length != 0) {
                    json = JSON.stringify(temp);
                    $.ajax({
                        type: 'POST',
                        url: 'Order_detail/insert',
                        data: {json: json},
                        success: function (msg) {
                            console.log(msg);
                            $('#modal_addpat').modal('hide');
                            _self.show();
                            _self.new_pat = [{}, {}, {}, {}, {}, {}, {}];
                        }
                    });
                }


            },

            //获取订单、花型、用户表中的数据
            getList: function (entity) {
                var _self = this;
                $.ajax({
                    type: 'post',
                    url: entity + "/show",
                    success: function (data) {
                        //判断订单、花型、用户表是否无记录
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


            getPatId:function(item,e){
                var _self=this;
                $.each(_self.patterns,function (a,b) {
                    if(b.pattern==e.target.value){
                        item.pattern_id=b.id;
                        return false;
                    }
                })
            },

            remove:function (item) {
                var _self = this;
                $.ajax({
                    type: 'POST',
                    url: 'Order/delete',
                    data: {id:item.id},
                    success: function (msg) {
                        _self.show();
                        _self.Rec_D = [];
                        _self.order_id = ""
                    }
                })
            },

            deletePattern: function () {
                var _self = this;
                if (_self.Rec_D.length!= 0) {
                    var _json = JSON.stringify(_self.Rec_D);
                    $.ajax({
                        type: 'POST',
                        url: 'Order_detail/delete',
                        data: {json: _json},
                        success: function (msg) {
                            _self.show();
                            _self.Rec_D = [];
                            _self.order_id = ""
                        }
                    })
                } else {
                    toastr.info('请选择要删除的记录！')
                }
            },


            getOPId: function (value, item) {
                var _self = this;
                var selector = $("#OP" + value.id);

                //判断是否已有订单被选中
                if (_self.order_id != "") {
                    //判断是否选中的订单之前已被选中
                    if (_self.order_id == item.id) {

                        var index = _self.Rec_D.indexOf(value.id);

                        //判断被选中的项目是否之前已被选中
                        if (index > -1) {
                            selector.removeClass("selected");
                            _self.Rec_D.splice(index, 1);
                        } else {
                            selector.addClass("selected");
                            _self.Rec_D.push(value.id);
                        }
                    } else {
                        $.each(_self.Rec_D, function (i, n) {
                            $("#OP" + n).removeClass("selected");
                        });
                        _self.Rec_D = [];
                        _self.order_id = item.id;
                        _self.Rec_D.push(value.id);
                        selector.addClass("selected");
                    }
                } else {
                    selector.addClass("selected");
                    _self.order_id = item.id;
                    _self.Rec_D.push(value.id);
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