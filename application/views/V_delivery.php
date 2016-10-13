<title>发货记录</title>
<div class="container" id="delivery">
    <div class="row">
        &nbsp;
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div style="height: 40px;background-color: rgb(245,245,245);">
                <h4 style="margin-bottom: 0;font-weight: bold;width: 100px;display:inline">收货记录</h4>

                <div class="pull-right" style="display: inline">
                    <button class="btn btn-default right" @click="save">保存</button>
                </div>
            </div>
        </div>

        <div class="col-xs-12">
            <table class="table table-striped table-bordered table-hover table-bordersed table-condensed text-center unselectable">
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
                <template v-for="(index,item) in Rec">
                    <tr id="i{{item.id}}">
                        <th class="border text-center change_to_add">{{index+1}}</th>
                        <td>{{item.delivery_date | dateFormat}}</td>
                        <td>{{item.pattern}}</td>
                        <td>{{item.pieces}}</td>
                        <td><input class="addRow" name="delivery_date " v-model="item.price"></td>
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
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="public/vm/delivery.js"></script>
