/**
 * Created by voson on 16/8/10.
 */
$(function () {


    var vue = new Vue({
        el: '#delivery',
        data: {
            id: "",               //每条发货记录在数据库中的Id
            row: "",              //用户输入的增加行数
            deliveries: [],       //从数据库中提取的发货记录
            new_deliveries: [],     //新增发货记录的数组
            delete_arr: []         //等待删除的发货记录数组
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
                    url: 'receiving/show',
                    success: function (data) {
                        if (JSON.parse(data)) {
                            _self.deliveries = JSON.parse(data);
                        }
                        /*console.log(data)*/
                    }
                });
            },

            insert: function () {
                var _self = this;

                //new_deliveries是一个数组,其中的元素都是对象
                //这步是过滤用户输入的""
                this.new_deliveries = this.new_deliveries.filter(function (item) {
                    for (var obj in item) {
                        if (item[obj] == '') {
                            delete item[obj];
                        }
                    }
                    return item;
                });

                //这步是过滤空的行
                $.each(_self.new_deliveries, function (index, value) {
                    if (objLength(value) == 0) {
                        _self.new_deliveries.$remove(this);
                    }
                });

                if (_self.new_deliveries.length != 0) {
                    json = JSON.stringify(_self.new_deliveries);
                    $.ajax({
                        type: 'POST',
                        url: '../controller/insert.php',
                        data: {json: json},
                        success: function (msg) {
                            _self.moverow();
                            _self.show();
                            _self.new_deliveries = [];
                        }
                    });
                }


            },


            delete: function () {
                var _self = this;
                if (_self.id != "") {
                    $.ajax({
                        type: 'POST',
                        url: '../controller/delete.php',
                        data: {id: this.delete_arr},
                        success: function (msg) {
                            _self.show();
                            _self.delete_arr = [];
                            _self.id=""
                        }
                    })
                }

            },


            //这个方法有两个作用:1.提取被点击行的id,从而被delete方法调用,删除行。2.切换被点击行的css样式
            getId: function (item,e) {

                if(e.shiftKey==1)
                {
                   if(this.id!=""){
                       var _new=arrObjIndex(item.id,this.deliveries);
                       var _old=arrObjIndex(this.id,this.deliveries);
                       if(_new>_old){
                           for(var i=1;i<=_new-_old;i++){
                               var selector = "#i" + this.deliveries[i+_old].id;
                               $(selector).addClass("table_hover getId");
                               this.delete_arr.push(this.deliveries[i+_old].id);
                           }
                           this.id=item.id;
                       }else {
                           for(i=1;i<=_old-_new;i++){
                               selector = "#i" + this.deliveries[_old-i].id;
                               $(selector).addClass("table_hover getId");
                               this.delete_arr.push(this.deliveries[_old-i].id);
                           }
                           this.id=item.id;
                       }

                   }
                }else {
                    this.id = item.id;    //获取被点击行的id
                    selector = "#i" + item.id;
                    if ($(selector).hasClass("table_hover")) {      //判断该行,之前是否是已经加上了选中效果
                        $(selector).removeClass("table_hover getId");
                        this.delete_arr.remove(item.id);
                    } else {
                        $(selector).addClass("table_hover getId");
                        this.delete_arr.push(item.id);
                    }
                }



            },

            showmodal: function () {
                $('#addrow_modal').modal('show');   //打开增加行数的模态框
                this.delete_arr = [];
            },

            //增加行
            addrow: function () {

                var _self = this;
                var N = this.new_deliveries;

                if (N.length != 0) {
                    this.insert();
                }
                if (_self.row != "") {        //判断输入的行数是否为空
                    for (var i = 0; i < parseInt(_self.row); i++) {
                        this.new_deliveries.$set(i, {});
                    }
                    _self.changeSequence();
                }

                $('#addrow_modal').modal('hide');//打开增加行数的模态框

                _self.id = "";

            },

            moverow: function () {
                /* console.log(this.new_deliveries.length);*/
                var i = 0;
                while (i < this.new_deliveries.length) {
                    this.new_deliveries.$remove(this.new_deliveries[i]);
                }
            },

            changeSequence: function () {
                var _self = this;
                var D = this.deliveries;
                var N = this.new_deliveries;

                if (_self.id != "") {   //判断是否选中了元素
                    var left = parseFloat(arrObjProp(_self.id, "sequence", D));    //获取被选中的行在现有发货记录中的序号
                    if (D.length != 0) {
                        var index = arrObjIndex(_self.id, D);       //获取被选中元素在现有发货记录中的索引
                        if(index==(D.length-1)){
                            var last = D[D.length - 1].sequence;
                            for (var i = 0; i < _self.row; i++) {
                                N[i].sequence = String(parseFloat(last) + i + 1);
                            }
                        }else{
                            var right = parseFloat(D[index + 1].sequence);
                            division(left, right, parseFloat(_self.row));
                            for (var i = 0; i < _self.row; i++) {
                                N[i].sequence = arr[i];
                            }
                        }
                    }else{
                        for (var i = 0; i < _self.row; i++) {
                            N[i].sequence = String(i++);
                        }
                    }

                } else {
                    if (D.length != 0) {    //判断原先是否存在发货记录
                        var last = D[D.length - 1].sequence;
                        for (var i = 0; i < _self.row; i++) {
                            N[i].sequence = String(parseFloat(last) + i + 1);
                        }
                    } else {
                        for (var i = 0; i < _self.row; i++) {
                            N[i].sequence = String(i);

                        }

                    }

                }


            }
        }

    });
    /*Vue EDN*/


});