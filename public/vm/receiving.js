/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var receiving = new Vue({
        el: '#receiving',
        data: {
            Rec:[],
            Rec_N: [{}, {}, {}, {}, {}, {}, {}],
            Rec_D: [],
            Rec_U:{},
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
                    url: 'Receiving/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.Rec = JSON.parse(data);
                        }
                    }
                });
            },

            getRec: function (entity) {
                var _self = this;
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

                //将订单id存入Rec_N中
                switch (entity) {
                    case 'order':
                        this.Rec_N[index].order_id = record_id;
                        break;
                    case 'pattern':
                        this.Rec_N[index].pattern_id = record_id;
                        break;
                    case 'user':
                        this.Rec_N[index].user_id = record_id;
                        break;
                }

            },

            edit:function () {
                if(this.Rec_D.length!=1){
                    toastr.info('请选择一条要编辑的记录！')
                }else{
                    $('#edit_modal').modal('show');
                    $('#edit_modal').on('shown.bs.modal',function () {
                        $('#receipt_date').focus();
                    });
                    var _self=this;
                    var id=_self.Rec_D[0];
                    $.each(_self.Rec,function (a,b) {
                        if(b.id==id){
                            _self.Rec_U=b;
                            return false;
                        }
                    })
                }

            },


            update:function () {
                var _self=this;
                $('#edit_modal').modal('hide');
            },

            insert: function () {
                var _self = this;

                //Rec_N是一个数组,其中的元素都是对象
                //1.过滤用户输入的""， 2. 过滤空的行
                var temp = this.Rec_N.filter(function (item) {
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
                        url: 'Receiving/insert',
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


            delete: function () {
                var _self = this;
                if (typeof(Rec_D) != 'undefined') {
                    $.ajax({
                        type: 'POST',
                        url: 'Receiving/delete',
                        data: {id: this.Rec_D},
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



            getId: function (item, e) {

                //判断是否按住shift键进行多选
                if (e.shiftKey == 1) {

                    //判断是否符合按下shift键之前已选中过一个元素,并且之前选的元素和当前的元素不同
                    if (this.id != "" && this.id!=item.id) {
                        var _new = arrObjIndex(item.id, this.Rec_N);
                        var _old = arrObjIndex(this.id, this.Rec_N);

                        //比较选中的两个元素的索引
                        if (_new > _old) {
                            var selector;
                            for (var i = 1; i <= _new - _old; i++) {
                                selector = "#i" + this.Rec_N[i + _old].id;
                                $(selector).addClass("selected");
                                this.Rec_D.push(this.Rec_N[i + _old].id);
                            }
                            this.id = item.id;
                        } else {
                            for (i = 1; i <= _old - _new; i++) {
                                selector = "#i" + this.Rec_N[_old - i].id;
                                $(selector).addClass("selected");
                                this.Rec_D.push(this.Rec_N[_old - i].id);
                            }
                            this.id = item.id;
                        }
                    }
                } else {
                    selector = "#i" + item.id;
                    if(this.id != item.id ){
                        $(selector).addClass("selected");
                        this.Rec_D.push(item.id);
                        if(this.id!=""){
                            $("#i" + this.id).removeClass("selected");
                            this.Rec_D.remove(this.id);
                        }
                        this.id = item.id;
                    }else{
                        $(selector).removeClass("selected");
                        this.Rec_D.remove(item.id);
                        this.id=""
                    }
                }
            }
        }
    });


});