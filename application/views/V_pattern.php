<title>花型</title>
<body style="font-family: 微软雅黑,Arial,宋体">
<div class="container" id="pattern">
    <div class="row">
        &nbsp;
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div style="height: 40px;background-color: rgb(245,245,245);">
                <h4 style="margin-bottom: 0;font-weight: bold;width: 100px;display:inline">花型</h4>

                <div class="pull-right" style="display: inline">
                    <button class="btn btn-default right" @click="delete">删除</button>
                    <button class="btn btn-default right"  data-target="#edit_records" @click="edit">编辑</button>
                    <button class="btn btn-default right" data-toggle="modal" data-target="#Rec_N" >增加</button>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <table
                class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                <thead>
                <tr>
                    <th class="text-center border">No</th>
                    <th class="text-center">花型</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(index,item) in Rec | orderBy 'receipt_date' ">
                    <tr @click="getId(item,$event)" id="i{{item.id}}">
                        <th class="border text-center"> {{index+1}}</th>
                        <td>{{item.pattern}}</td>
                    </tr>
                </template>

                </tbody>
            </table>
        </div>

    </div>

    <div class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel" id="Rec_N">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">增加花型</h4>
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
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="(index,item) in Rec_N ">
                                    <tr>
                                        <td class="border">
                                            <input class="addRow" disabled="disabled" value={{index+1}}>
                                        </td>
                                        <td>
                                            <input class="addRow" type="text"  list="patterns" v-model="item.pattern">
                                            <datalist id="patterns">
                                                <template v-for="item in Rec">
                                                    <option value={{item.pattern}} name={{item.id}}>
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


    <div class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel" id="edit_rec">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">编辑花型</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="form-group">
                                <input type="text" class="form-control" id="edited"  @keyup.enter="update">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


</div>


<script src="public/vm/pattern.js"></script>


</body>
