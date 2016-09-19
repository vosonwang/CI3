/**
 * Created by voson on 2016/8/23.
 */


//为数组创建一个函数,根据值返回数组下标
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

//为数组创建一个函数,根据返回值删除数组元素
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//计算对象的长度
function objLength(obj) {
    var count = 0;
    for (var i in obj) {
        count++;
    }
    return count;
}


//根据id计算数组-对象中的其他属性
function arrObjProp(id, property, arrObj) {
    var attr;
    $.each(arrObj, function (index, value) {
        if (value.id == id) {
            attr = value[property];
            return false;
        }
    });
    return attr;
}

//根据id计算数组-对象中的索引
function arrObjIndex(id, arrObj) {
    var key;
    $.each(arrObj, function (index, value) {
        if (value.id == id) {
            key = index;
            return false;
        }
    });
    return key;
}



//计算小数点后面的位数
function getDecimal(D) {    //这里的D是一个小数字符串,比如"2.1"
    if (D % 1 === 0) {
        return 0
    } else {
        return D.split(".")[1].length;  //不加return 会陷在递归里，返回undefined
    }

}

var arr=[];
//用二分法、递归得到插值要用的序号，但是arr无法在内部实现申明
function division(left, right, N) {
    var middle = (left + right) / 2;
    arr.push(middle);
    if (N==1){
        arr=arr.reverse();
        return arr;
    }else{
        --N;
        return division(left, middle, N);
    }
}


