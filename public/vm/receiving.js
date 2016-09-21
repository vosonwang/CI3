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
            users: []
        },
        ready: function () {
            this.show();
        },

        methods: {
            show: function () {
                var _self = this;
                $.ajax({
                    type: 'post',
                    url: 'receiving/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.records = JSON.parse(data);
                        }
                    }
                });
            },

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


            getRecordId: function (index, e, entity) {
                var selector = $(":input[name='" + e.target.name + "']");
                //获取当前input中的值
                var value = selector.val();

                //根据input值，查找datalist中的id,实际是订单的id
                var record_id = selector.siblings("datalist").find("option[value='" + value + "']").attr("name");

                //将订单id存入new_records中
                switch (entity) {
                    case 'order':
                        this.new_records[index].order_id = record_id;
                        break;
                    case 'pattern':
                        this.new_records[index].pattern_id = record_id;
                        break;
                    case 'user':
                        this.new_records[index].user_id = record_id;
                        break;
                }

            },


            insert: function () {
                var _self = this;

                //new_deliveries是一个数组,其中的元素都是对象
                //这步是过滤用户输入的""
                this.new_records = this.new_records.filter(function (item) {
                    for (var obj in item) {
                        if (item[obj] == '') {
                            delete item[obj];
                        }
                    }
                    return item;
                });

                //这步是过滤空的行
                var arr=[];
                $.each(_self.new_records, function (index, value) {
                    if (objLength(value) == 0) {
                        arr.push(index);
                    }
                });

                var i=0;
                $.each(arr,function (index,value) {
                    _self.new_records.$remove(_self.new_records[value-i]);
                    i++;
                });

                if (_self.new_records.length != 0) {
                    json = JSON.stringify(_self.new_records);
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
                var _self = this;
                if (typeof(del_records) != 'undefined') {
                    $.ajax({
                        type: 'POST',
                        url: 'receiving/delete',
                        data: {id: this.del_records},
                        success: function (msg) {
                            _self.show();
                            _self.del_records = [];
                            _self.id = ""
                        }
                    })
                } else {
                    toastr.info('请选择要删除的记录！')
                }
            },

            getId: function (item, e) {
                if (e.shiftKey == 1) {
                    if (this.id != "") {
                        var _new = arrObjIndex(item.id, this.records);
                        var _old = arrObjIndex(this.id, this.records);
                        if (_new > _old) {
                            for (var i = 1; i <= _new - _old; i++) {
                                var selector = "#i" + this.records[i + _old].id;
                                $(selector).addClass("selected");
                                this.del_records.push(this.records[i + _old].id);
                            }
                            this.id = item.id;
                        } else {
                            for (i = 1; i <= _old - _new; i++) {
                                selector = "#i" + this.records[_old - i].id;
                                $(selector).addClass("selected");
                                this.del_records.push(this.records[_old - i].id);
                            }
                            this.id = item.id;
                        }

                    }
                } else {
                    this.id = item.id;    //获取被点击行的id
                    selector = "#i" + item.id;
                    if ($(selector).hasClass("selected")) {      //判断该行,之前是否是已经加上了选中效果
                        $(selector).removeClass("selected");
                        this.del_records.remove(item.id);
                    } else {
                        $(selector).addClass("selected");
                        this.del_records.push(item.id);
                    }
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