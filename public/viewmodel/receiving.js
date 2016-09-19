/**
 * Created by Voson on 2016/8/29.
 */
$(function () {
    var vue = new Vue({
        el: '#receiving',
        data: {
            records: [],
            new_records:[{}],
            del_records:[]
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
            insert: function () {
                var _self = this;
                if (_self.new_records.length != 0) {
                    json = JSON.stringify(_self.new_records);
                    $.ajax({
                        type: 'POST',
                        url: '../controller/receiving/insert.php',
                        data: {json: json},
                        success: function (msg) {
                            console.log(msg);
                            $('#new_records').modal('hide');
                            _self.show();
                            _self.new_records = [{}];
                        }
                    });
                }
            },


            delete:function () {
                var _self = this;
                if (_self.id != "") {
                    $.ajax({
                        type: 'POST',
                        url: '../controller/receiving/delete.php',
                        data: {id: this.del_records},
                        success: function (msg) {
                            _self.show();
                            _self.del_records = [];
                            _self.id=""
                        }
                    })
                }
            },
            
            getId:function (item,e) {
                if(e.shiftKey==1)
                {
                    if(this.id!=""){
                        var _new=arrObjIndex(item.id,this.records);
                        var _old=arrObjIndex(this.id,this.records);
                        if(_new>_old){
                            for(var i=1;i<=_new-_old;i++){
                                var selector = "#i" + this.records[i+_old].id;
                                $(selector).addClass("selected");
                                this.del_records.push(this.records[i+_old].id);
                            }
                            this.id=item.id;
                        }else {
                            for(i=1;i<=_old-_new;i++){
                                selector = "#i" + this.records[_old-i].id;
                                $(selector).addClass("selected");
                                this.del_records.push(this.records[_old-i].id);
                            }
                            this.id=item.id;
                        }

                    }
                }else {
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