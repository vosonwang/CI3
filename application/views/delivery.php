<title>发货记录</title>
<div class="container" id="delivery">
    <div class="row">
        &nbsp;
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div style="height: 40px;background-color: rgb(245,245,245);">
                <h4 style="margin-bottom: 0;font-weight: bold;width: 100px;display:inline">发货记录</h4>
                <div class="pull-right" style="display: inline">

                    <button class="btn btn-default" type="submit" @click="insert">保存</button>
                    <button class="btn btn-default" type="submit" @click="delete">删除</button>
                    <button class="btn btn-default" type="submit" @click="showmodal">增加</button>
                </div>
            </div>
        </div>

        <div class="col-xs-12">
            <table
                class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
                <thead>
                <tr>
                    <th class="text-center border">No</th>
                    <th class="text-center">日期</th>
                    <th class="text-center">花型</th>
                    <th class="text-center">条数</th>
                    <th class="text-center">单价</th>
                    <th class="text-center">金额</th>
                    <th class="text-center">件数</th>
                    <th class="text-center">收货人</th>
                    <th class="text-center">单号</th>
                    <th class="text-center">收货地址</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(index,item) in deliveries | orderBy 'sequence' ">
                    <tr @click="getId(item,$event)" id="i{{item.id}}">
                        <th class="border text-center change_to_add">{{index+1}}</th>
                        <td>{{item.delivery_date | dateFormat}}</td>
                        <td>{{item.pattern}}</td>
                        <td>{{item.pieces}}</td>
                        <td>{{item.price}}</td>
                        <td v-if="item.price!=null&&item.pieces!=null&&item.price!=''&&item.pieces!=''">
                            {{item.price*item.pieces}}
                        </td>
                        <td v-else></td>
                        <td>{{item.packages}}</td>
                        <td>{{item.consignee}}</td>
                        <td>{{item.order_no}}</td>
                        <td>{{item.address}}</td>
                    </tr>
                </template>

                <template v-for="(index,item) in new_deliveries ">
                    <tr>
                        <td class="border">
                            <input class="addRow" disabled="disabled" value="+">
                        </td>
                        <td><input class="addRow" name="delivery_date " v-model="item.delivery_date"></td>
                        <td><input class="addRow" type="text" name="pattern" v-model="item.pattern"></td>
                        <td><input class="addRow" type="number" name="pieces" v-model="item.pieces"></td>
                        <td><input class="addRow" type="number" name="price" v-model="item.price"></td>
                        <td>
                            <input class="addRow" name="amount"
                                   v-if="item.price!=null&&item.pieces!=null&&item.price!=''&&item.pieces!=''"
                                   value="{{item.pieces*item.price}}" disabled="disabled">
                            <input class="addRow" name="amount" v-else disabled="disabled">
                        </td>
                        <td><input class="addRow" type="number" name="packages" v-model="item.packages"></td>
                        <td><input class="addRow" type="text" name="consignee " v-model="item.consignee"></td>
                        <td><input class="addRow" type="text" name="orders" v-model="item.orders"></td>
                        <td><input class="addRow" type="text" name="address" v-model="item.address"></td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>

    </div>


    <!-- 增加行的模态框 -->
    <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
         id="addrow_modal">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="col-xs-offset-11 col-xs-1">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <br>
                <br>
                <div class="col-xs-offset-1 col-xs-6">
                    <input class="insertRows" type="number" v-model="row" placeholder="请输入行数" @keyup.enter="addrow()">
                </div>
                <div class="col-xs-5">
                    <button type="button" class="btn btn-primary" @click="addrow()">确认</button>
                </div>
                <br>
                <br>
                <br>
                <br>
            </div>
        </div>
    </div>


</div>

<script src="public/vm/delivery.js"></script>
