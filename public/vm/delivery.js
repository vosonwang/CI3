/**
 * Created by voson on 16/8/10.
 */
$(function () {
    var delivery = new Vue({
        el: '#delivery',
        data: {
            id: "",               //每条发货记录在数据库中的Id
            Rec: [],       //从数据库中提取的发货记录
            Rec_N: [],     //新增发货记录的数组
            Rec_D: []         //等待删除的发货记录数组
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
                        /*console.log(data)*/
                    }
                });
            },

            insert: function () {
                var _self = this;

                //Rec_N是一个数组,其中的元素都是对象
                //1.过滤用户输入的""， 2. 过滤空的行
                var temp = this.Rec_N.filter(function (item) {
                    for (var obj in item) {
                        if (item[obj] == '') {
                            delete item[obj];
                        }
                    }
                    if(objLength(item)!=0){
                        return item;
                    }
                });

                if (temp!= 0) {
                    json = JSON.stringify(_self.Rec_N);
                    $.ajax({
                        type: 'POST',
                        url: '../controller/insert.php',
                        data: {json: json},
                        success: function (msg) {
                            _self.moverow();
                            _self.show();
                            _self.Rec_N = [];
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
                        data: {id: this.Rec_D},
                        success: function (msg) {
                            _self.show();
                            _self.Rec_D = [];
                            _self.id=""
                        }
                    })
                }

            },


            //这个方法有两个作用:1.提取被点击行的id,从而被delete方法调用,删除行。2.切换被点击行的css样式
            getId: function (item, e) {

                //判断是否按住shift键进行多选
                if (e.shiftKey == 1) {

                    //判断是否符合按下shift键之前已选中过一个元素,并且之前选的元素和当前的元素不同
                    if (this.id != "" && this.id!=item.id) {
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
                    var bool=false;
                    var _self=this;

                    //判断当前记录是否已被选中
                    $.each(_self.Rec_D,function (a,b) {
                        if(item.id==b){
                            bool=true;
                            return false;
                        }
                    });
                    if(bool){
                        $(selector).removeClass("selected");
                        this.Rec_D.remove(item.id);
                        this.id=""
                    }else{
                        $(selector).addClass("selected");
                        this.Rec_D.push(item.id);
                        if(this.id!=""){
                            $("#i" + this.id).removeClass("selected");
                            this.Rec_D.remove(this.id);
                        }
                        this.id = item.id;
                    }
                }
            },

            showmodal: function () {
                $('#addrow_modal').modal('show');   //打开增加行数的模态框
                this.Rec_D = [];
            },



            moverow: function () {
                /* console.log(this.Rec_N.length);*/
                var i = 0;
                while (i < this.Rec_N.length) {
                    this.Rec_N.$remove(this.Rec_N[i]);
                }
            },

            changeSequence: function () {
                var _self = this;
                var D = this.Rec;
                var N = this.Rec_N;

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