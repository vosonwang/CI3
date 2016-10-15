/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var receiving = new Vue({
        el: '#receiving',
        data: {
            Rec: [],
            Rec_N: [{}, {}, {}, {}, {}, {}, {}],
            Rec_D: [],
            Rec_U: {},
            order_detail: [],
            patterns: [],
            users: []
        },
        ready: function () {
            this.show();
        },
        computed: {
            order_no: function () {
                //数组去重
                var n = {}, r = [];
                for (var i = 0; i < this.order_detail.length; i++) //遍历当前数组
                {
                    if (!n[this.order_detail[i].order_no]) //如果hash表中没有当前项
                    {
                        n[this.order_detail[i].order_no] = true; //存入hash表
                        r.push({"order_no": this.order_detail[i].order_no, "order_id": this.order_detail[i].order_id}); //把当前数组的当前项push到临时数组里面
                    }
                }
                return r;
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


                $.ajax({
                    type: 'get',
                    url: "Order_detail/show",
                    success: function (data) {
                        _self.order_detail = JSON.parse(data);
                    }
                });

                $.ajax({
                    type: 'post',
                    url: "User/show",
                    success: function (data) {
                        _self.users = JSON.parse(data);
                    }
                })
            },


            selectOrder: function (e, item) {
                var _self = this;
                _self.patterns = [];
                $.each(_self.order_detail, function (a, b) {
                    if (b.order_no == e.target.value) {
                        item.order_id = b.order_id;
                        _self.patterns.push({"pattern_id": b.pattern_id, "pattern": b.pattern});
                    }
                })
            },

            selectPattern: function (e, item) {
                var _self = this;
                $.each(_self.order_detail, function (a, b) {
                    if (b.pattern == e.target.value) {
                        item.pattern_id = b.pattern_id;
                    }
                })
            },

            selectUser: function (e, item) {
                var _self = this;
                $.each(_self.users, function (a, b) {
                    if (b.user_name == e.target.value) {
                        item.user_id = b.user_id;
                    }
                })
            },


            edit: function () {
                if (this.Rec_D.length != 1) {
                    toastr.info('请选择一条要编辑的记录！')
                } else {
                    $('#modal_edit').modal('show');
                    $('#modal_edit').on('shown.bs.modal', function () {
                        $('#receipt_date').focus();
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

            update: function () {
                var _self = this;
                $('#modal_edit').modal('hide');
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
                    $.ajax({
                        type: 'POST',
                        url: 'Receiving/insert',
                        data: {json: JSON.stringify(temp)},
                        success: function (msg) {
                            console.log(msg);
                            $('#modal_insert').modal('hide');
                            _self.show();
                            _self.Rec_N = [{}, {}, {}, {}, {}, {}, {}];
                        }
                    });
                }
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
})