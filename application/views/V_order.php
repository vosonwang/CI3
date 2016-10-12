<title>订单</title>
<body style="font-family: 微软雅黑,Arial,宋体">
<div class="container" id="order">
    <div class="row">
        &nbsp;
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div style="height: 40px;background-color: white;">
                <h4 style="margin-bottom: 0;font-weight: bold;width: 100px;display:inline">订单</h4>

                <div class="pull-right" style="display: inline">

                    <button class="btn btn-default right" data-toggle="modal" data-target="#modal_add">增加订单</button>
                </div>
            </div>
        </div>

        <template v-for="(index,item) in Rec">
                <div style="display: block;margin-top: 20px;" class="col-xs-12" >
                    <div style="background-color: white;font-size:16px;line-height: 30px;height: 32px;">
                        <span
                            style="width: 33%;display: inline-block">订单号：{{item.order_no}}</span>
                        <span class="" style="width: 33%;display: inline-block">总条数：{{totalPieces[index]}}</span>
                        <span class="pull-right" style="width: 2%;display: inline-block">
                    <a href="javascript:void(0)"  style="color:black" @click="remove(item)">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </a></span>
                        <span class="pull-right" style="width: 2%;display: inline-block">
                            <a href="javascript:void(0)"  style="color:black">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                            </span>
                        <span class="pull-right" style="width: 2%;display: inline-block">
                    <a href="javascript:void(0)" @click="deletePattern" style="color:black">
                        <i class="fa fa-minus" aria-hidden="true"></i>
                    </a></span>
                        <span class="pull-right" style="width: 2%;display: inline-block">
                    <a href="javascript:void(0)" style="color:black" @click="add(item)">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </a></span>
                        <span class="pull-right"
                              style="display: inline-block;margin-right: 4%">交货日期：{{item.expiration_date}}</span>
                    </div>
                </div>

            <div class="col-xs-12" >
                <table
                    class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                    <thead>
                    <tr>
                        <th class="text-center border">No</th>
                        <th class="text-center">花型</th>
                        <th class="text-center">条数</th>
                        <th class="text-center">已发</th>
                        <th class="text-center">剩余</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(key,value) in item.detail">
                        <tr id="OP{{item.id}}{{value.pattern_id}}" @click="select(value,item)">
                            <th>{{key+1}}</th>
                            <td>{{value.pattern}}</td>
                            <td>{{value.pieces}}</td>
                            <td>{{value.totaldelivery}}</td>
                            <td>{{value.pieces-value.totaldelivery}}</td>
                        </tr>
                    </template>

                    </tbody>
                </table>
            </div>

        </template>
    </div>

    <div class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel" id="modal_add">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">增加订单</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <table
                                class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                                <thead>
                                <tr>
                                    <th class="text-center border">No</th>
                                    <th class="text-center">单号</th>
                                    <th class="text-center">预计交货日期</th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(index,item) in Rec_N ">
                                    <tr>
                                        <td class="border">
                                            <input class="addRow" disabled="disabled" value={{index+1}}>
                                        </td>
                                        <td><input class="addRow" type="text" v-model="item.order_no"></td>
                                        <td><input class="addRow" type="date" v-model="item.expiration_date"></td>

                                    </tr>
                                </template>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="insert">确认</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <div class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel" id="modal_addpat">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel"><span v-text="order_no"></span>添加花型</h4>

                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <table
                                class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                                <thead>
                                <tr>
                                    <th class="text-center border">No</th>
                                    <th class="text-center">花型</th>
                                    <th class="text-center">数量</th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(index,item) in new_pat ">
                                    <tr>
                                        <td class="border">
                                            {{index+1}}
                                        </td>
                                        <td>
                                            <input class="addRow" type="text"  list="patterns" @click="getList('pattern')" @change="getPatId(item,$event)">
                                            <datalist id="patterns">
                                                <template v-for="item2 in patterns">
                                                    <option value={{item2.pattern}} >
                                                </template>
                                            </datalist>
                                        </td>
                                        <td><input class="addRow" type="number" v-model="item.pieces"> </td>

                                    </tr>
                                </template>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="insertPat">确认</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

</div>


<script src="public/vm/order.js"></script>

</body>
