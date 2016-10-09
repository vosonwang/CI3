<title>收货记录</title>
<body style="font-family: 微软雅黑,Arial,宋体">
<div class="container" id="receiving">
    <div class="row">
        &nbsp;
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div style="height: 40px;background-color: rgb(245,245,245);">
                <h4 style="margin-bottom: 0;font-weight: bold;width: 100px;display:inline">收货记录</h4>

                <div class="pull-right" style="display: inline">

                    <button class="btn btn-default right" @click="delete">删除</button>
                    <button class="btn btn-default right" data-toggle="modal" data-target="#Rec_N">增加</button>
                    <button class="btn btn-default right" data-toggle="modal" @click="edit">编辑</button>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <table
                class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                <thead>
                <tr>
                    <th class="text-center border">No</th>
                    <th class="text-center">收货日期</th>
                    <th class="text-center">单号</th>
                    <th class="text-center">花型</th>
                    <th class="text-center">条数</th>
                    <th class="text-center">匹数</th>
                    <th class="text-center">发货人</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(index,item) in Rec | orderBy 'receipt_date' ">
                    <tr @click="getId(item,$event)" id="i{{item.id}}">
                        <th class="border text-center">{{index+1}}</th>
                        <td>{{item.receipt_date | dateFormat}}</td>
                        <td>{{item.order_no}}</td>
                        <td>{{item.pattern}}</td>
                        <td>{{item.pieces}}</td>
                        <td>{{item.trips}}</td>
                        <td>{{item.user_name}}</td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>

    </div>

    <div class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel" id="Rec_N">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">收货</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <table
                                class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                                <thead>
                                <tr>
                                    <th class="text-center border">No</th>
                                    <th class="text-center">收货日期</th>
                                    <th class="text-center">单号</th>
                                    <th class="text-center">花型</th>
                                    <th class="text-center">条数</th>
                                    <th class="text-center">匹数</th>
                                    <th class="text-center">发货人</th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(index,item) in Rec_N ">
                                    <tr>
                                        <td class="border">
                                            <input class="addRow" disabled="disabled" value={{index+1}}>
                                        </td>
                                        <td><input class="addRow" v-model="item.receipt_date"></td>
                                        <td>
                                            <input class="addRow" type="text"  list="orders"
                                                   @click="getRec('order')"
                                                   @change="getRecordId(index,$event,'order')" name="ord{{index}}">
                                            <datalist id="orders">
                                                <template v-for="item in orders">
                                                    <option value={{item.order_no}} name={{item.id}}>
                                                </template>
                                            </datalist>
                                        </td>
                                        <td>
                                            <input class="addRow" type="text"  list="patterns"
                                                   @click="getRec('pattern')"
                                                   @change="getRecordId(index,$event,'pattern')" name="pat{{index}}">
                                            <datalist id="patterns">
                                                <template v-for="item in patterns">
                                                    <option value={{item.pattern}} name={{item.id}}>
                                                </template>
                                            </datalist>
                                        </td>
                                        <td><input class="addRow" type="number" v-model="item.pieces" ></td>
                                        <td><input class="addRow" type="number" v-model="item.trips" ></td>
                                        <td>
                                            <input class="addRow" type="text"  list="users"
                                                   @click="getRec('user')"
                                                   @change="getRecordId(index,$event,'user')" name="user{{index}}">
                                            <datalist id="users">
                                                <template v-for="item in users">
                                                    <option value={{item.user_name}} name={{item.user_id}}>
                                                </template>
                                            </datalist>
                                        </td>
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


    <div class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel" id="edit_modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">收货</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="receipt_date" class="col-sm-2 control-label">收货日期</label>
                            <div class="col-sm-10">
                                <input type="datetime" class="form-control" id="receipt_date" v-model="Rec_U.receipt_date" @keyup.enter="update">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="order_no" class="col-sm-2 control-label">单号</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="order_no" v-model="Rec_U.order_no" @keyup.enter="update">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pattern" class="col-sm-2 control-label">花型</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="pattern" v-model="Rec_U.pattern" @keyup.enter="update">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pieces" class="col-sm-2 control-label">条数</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="pieces" v-model="Rec_U.pieces" @keyup.enter="update">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="trips" class="col-sm-2 control-label">匹数</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="trips" v-model="Rec_U.trips" @keyup.enter="update">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="users" class="col-sm-2 control-label">发货人</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="users"  v-model="Rec_U.user_name" @keyup.enter="update">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>



</div>


<script src="public/vm/receiving.js"></script>

</body>
