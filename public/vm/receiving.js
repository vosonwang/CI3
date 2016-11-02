/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var receiving = new Vue({
        el: '#receiving',
        data: {
            Rec: [],
            Rec_N: [{"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}],
            Rec_D: [],
            Rec_U: [],
            order_pattern: [],
            users: [],
            patterns_n: []
        },
        ready: function () {
            this.show();
        },
        computed: {
            //更新的花型信息
            patterns_u: function () {
                for (var i = 0; i < this.order_pattern.length; i++) {
                    if (this.order_pattern[i].order_no == this.Rec_U.order_no) {
                        return this.order_pattern[i].patterns;
                    }
                }
            }
        },
        methods: {
            show: function () {
                var _self = this;

                $.ajax({
                    type: 'get',
                    url: 'Receiving/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.Rec = JSON.parse(data);
                        }
                    }
                });

                //获取订单、花型信息
                $.ajax({
                    type: 'get',
                    url: "Order_detail/show",
                    success: function (data) {
                        var n = {}, r = [], s = JSON.parse(data);

                        //将订单详情页的数据提取组装成需要的对象数组
                        for (var i = 0; i < s.length; i++) {
                            if (!n[s[i].order_no]) {
                                n[s[i].order_no] = true;
                                r.push({"order_no": s[i].order_no, "order_id": s[i].order_id, "patterns": []});
                            }
                        }
                        for (i = 0; i < s.length; i++) {
                            for (var j = 0; j < r.length; j++) {
                                if (r[j].order_id == s[i].order_id) {
                                    r[j].patterns.push({"pattern_id": s[i].pattern_id, "pattern": s[i].pattern})
                                }
                            }
                        }
                        _self.order_pattern = r;
                    }
                });

                //获取用户信息
                $.ajax({
                    type: 'post',
                    url: "User/show",
                    success: function (data) {
                        _self.users = JSON.parse(data);
                    }
                })
            },


            //向新增收货记录装载订单ID
            loadOrder: function (e, item) {
                var _self = this;
                $.each(_self.order_pattern, function (a, b) {
                    if (b.order_no == e.target.value) {
                        item.order_id=b.order_id;
                        return false;
                    }
                })

            },

            //新增-花型
            getPATList: function (e, item) {
                var _self = this;
                if(item.order_id!="" && item.order_id != undefined){
                    $.each(_self.order_pattern, function (a, b) {
                        if (b.order_id == item.order_id) {
                            _self.patterns_n = b.patterns;
                            return false;
                        }
                    })
                }
            },


            //向新增收货记录装载花型ID
            loadPattern:function (e, item) {
                var _self = this;
                $.each(_self.patterns_n, function (a, b) {
                    if (b.pattern == e.target.value) {
                        item.pattern_id = b.pattern_id;
                        return false;
                    }
                })
            },

            loadUser: function (e, item) {
                var _self = this;
                $.each(_self.users, function (a, b) {
                    if (b.user_name == e.target.value) {
                        item.user_id = b.user_id;
                        return false;
                    }
                })
            },


            edit: function () {
                if (this.Rec_D.length != 1) {
                    toastr.info('请选择一条要编辑的记录！')
                } else {
                    $('#modal_edit').modal('show');
                    $('#modal_edit').on('shown.bs.modal', function () {
                        $('#receipt_date').focus().datetimepicker('remove');
                    });
                    var _self = this;
                    var id = _self.Rec_D[0];
                    $.each(_self.Rec, function (a, b) {
                        if (b.id == id) {
                            _self.Rec_U = JSON.parse(JSON.stringify(b));
                            return false;
                        }
                    })
                }
            },
            datepick: function (e) {
                $(e.target).datetimepicker({
                    language: 'zh-CN',
                    weekStart: 1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0,
                    format: 'yyyy-mm-dd'
                }).datetimepicker('show');
            },
            update: function () {
                var _self = this;
                if (this.Rec_U.pattern_id != "" && this.Rec_U.order_id != "" && this.Rec_U.user_id != "") {
                    delete this.Rec_U.order_no;
                    delete this.Rec_U.pattern;
                    delete this.Rec_U.user_name;
                    delete this.Rec_U.role_id;
                    $.ajax({
                        type: 'POST',
                        url: 'Receiving/update',
                        data: {json: JSON.stringify(_self.Rec_U)},
                        success: function (msg) {
                            _self.show();
                            _self.Rec_D = [];
                        }
                    });
                }
                $('#modal_edit').modal('hide');
            },


            showInsertModal: function () {
                var _self = this;
                var today = new Date().toLocaleDateString();
                $.each(_self.Rec_N, function (a, b) {
                    b.receipt_date = today.replace(/\/{1}/g, "-");
                });
                $('#modal_insert').modal('show');

            },

            insert: function () {
                var _self = this;

                //Rec_N是一个数组,其中的元素都是对象
                //1.过滤用户输入的""， 2. 过滤空的行
                var tempArr = this.Rec_N.filter(function (item) {
                    if (objLength(item) != 0) {
                        for (var obj in item) {
                            if (item[obj] == '' || item[obj] == undefined) {
                                delete item[obj];
                            }
                        }
                        if (item.pattern_id != undefined && item.order_id != undefined && item.user_id != undefined) {
                            return item;
                        }
                    }
                });


                if (tempArr.length != 0) {
                    $.ajax({
                        type: 'POST',
                        url: 'Receiving/insert',
                        data: {json: JSON.stringify(tempArr)},
                        success: function (msg) {
                            console.log(msg);
                            _self.show();
                            _self.Rec_N = [{"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}, {"receipt_date": ""}];
                        }
                    });
                }
                $('#modal_insert').modal('hide');
            },

            delete: function () {
                var _self = this;
                if (_self.Rec_D.length != 0) {
                    $.ajax({
                        type: 'POST',
                        url: 'Receiving/remove',
                        data: {json: JSON.stringify(this.Rec_D)},
                        success: function (msg) {
                            _self.show();
                            _self.Rec_D = [];
                            _self.id = ""
                        }
                    })
                } else {
                    toastr.info('请选择要删除的记录！')
                }
            },

            select: function (item, e) {

                //判断是否按住shift键进行多选
                if (e.shiftKey == 1) {

                    //判断是否符合按下shift键之前已选中过一个元素,并且之前选的元素和当前的元素不同
                    if (this.id != "" && this.id != item.id) {
                        var _new = arrObjIndex(item.id, this.Rec);
                        var _old = arrObjIndex(this.id, this.Rec);

                        //比较选中的两个元素的索引
                        if (_new > _old) {
                            var selector;
                            for (var i = 1; i <= _new - _old; i++) {
                                selector = "#i" + this.Rec[i + _old].id;
                                $(selector).addClass("selected");
                                this.Rec_D.push(this.Rec[i + _old].id);
                            }
                            this.id = item.id;
                        } else {
                            for (i = 1; i <= _old - _new; i++) {
                                selector = "#i" + this.Rec[_old - i].id;
                                $(selector).addClass("selected");
                                this.Rec_D.push(this.Rec[_old - i].id);
                            }
                            this.id = item.id;
                        }
                    }
                } else {
                    selector = "#i" + item.id;
                    var bool = false;
                    var _self = this;

                    //判断当前记录是否已被选中
                    $.each(_self.Rec_D, function (a, b) {
                        if (item.id == b) {
                            bool = true;
                            return false;
                        }
                    });
                    if (bool) {
                        $(selector).removeClass("selected");
                        this.Rec_D.remove(item.id);
                        this.id = ""
                    } else {
                        $(selector).addClass("selected");
                        this.Rec_D.push(item.id);
                        this.id = item.id;
                    }
                }
            }

        }
    })
});