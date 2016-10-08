/**
 * Created by Voson on 2016/8/29.
 */
$(function () {


    Vue.component('my-component', {
        template: "<a href='javascript:void(0)'   style='color:black;'>编辑</a>"
    });


    var vue = new Vue({
        el: '#pattern',
        data: {
            id:"",
            pat:"",
            Rec: [],
            Rec_N: [{}, {}, {}, {}, {}, {}, {}],
            Rec_D: [],
            Rec_U: {}
        },
        ready: function () {
            this.show();
        },

        methods: {
            show: function () {
                var _self = this;
                $.ajax({
                    type: 'post',
                    url: 'C_pattern/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.Rec = JSON.parse(data);
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
                        url: 'C_pattern/insert',
                        data: {json: json},
                        success: function (msg) {
                            $('#Rec_N').modal('hide');
                            _self.show();
                            _self.Rec_N = [{}, {}, {}, {}, {}, {}, {}];
                        }
                    });
                }
            },


            delete: function () {
                var _self = this;

                //判断是否选择了要删除的数据
                if (typeof(_self.Rec_D[0]) != 'undefined') {
                    var json = JSON.stringify(_self.Rec_D);
                    $.ajax({
                        type: 'POST',
                        url: 'C_pattern/delete',
                        data: {json: json},
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
            },



            //更新
            edit:function () {
                if(this.id!=""){
                    $('#edit_rec').modal('show');
                    $('#edit_rec').on('shown.bs.modal',function () {
                        $('#edited').focus();
                    });
                    var _self=this;
                    $.each(_self.Rec,function (key,value) {
                        if(value.id==_self.id){
                            _self.Rec_U.id=value.id;
                            _self.pat=value.pattern;
                            return false;
                        }
                    });
                    $('#edited').val(_self.pat);
                }else {
                    toastr.info('请选择要编辑的记录！')
                }
            },

            update:function () {
                if(this.Rec_U.pattern!=undefined && this.Rec_U.pattern != this.pat){
                    var _self=this;
                    var json = JSON.stringify(this.Rec_U);
                    $.ajax({
                        type: 'post',
                        url: 'C_pattern/update',
                        data: {json: json},
                        success: function (msg) {
                            $('#edit_rec').modal('hide');
                            _self.show();
                            _self.Rec_U = {};
                            _self.id="";
                            _self.pat="";
                        }
                    });
                }else {
                    $('#edit_rec').modal('hide');
                }
            }
            
        }
    })
});




