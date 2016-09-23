/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var vue = new Vue({
        el: '#pattern',
        data: {
            id:"",
            records: [],
            new_records: [{}, {}, {}, {}, {}, {}, {}],
            del_records: []
        },
        ready: function () {
            this.show();
        },

        methods: {
            show: function () {
                var _self = this;
                $.ajax({
                    type: 'post',
                    url: 'pattern/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.records = JSON.parse(data);
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
                    var json = JSON.stringify(temp);
                    $.ajax({
                        type: 'POST',
                        url: 'pattern/insert',
                        data: {json: json},
                        success: function (msg) {
                            $('#new_records').modal('hide');
                            _self.show();
                            _self.new_records = [{}, {}, {}, {}, {}, {}, {}];
                        }
                    });
                }
            },


            delete: function () {
                var _self = this;

                //判断是否选择了要删除的数据
                if (typeof(_self.del_records[0]) != 'undefined') {
                    var json = JSON.stringify(_self.del_records);
                    $.ajax({
                        type: 'POST',
                        url: 'pattern/delete',
                        data: {json: json},
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


});