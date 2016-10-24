/**
 * Created by Administrator on 2016-10-17.
 */
//tabelview
var tableView = new cc.TableView(this, cc.size(600, 60));

tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);  //设置table 方向

tableView.x = 20;
tableView.y = size.height / 2 - 150;
tableView.setDelegate(this);
this.addChild(tableView);

tableView.reloadData();  //加载table

this._tabelview = tableView;


scrollViewDidScroll:function (view) {
},
scrollViewDidZoom:function (view) {
},
//每个cell 触摸事件
tableCellTouched:function (table, cell) {
    cc.log("cell touched at index: " + cell.getIdx());
    this._tabelview.removeCellAtIndex(cell.getIdx());
    this._tabelNumber = this._tabelNumber-1;

},

//设置编号为 idx 的cell的大小
tableCellSizeForIndex:function (table, idx) {
    //if (idx == 2) {
    //    return cc.size(100, 100);
    //}
    console.log("tableCellSizeForIndex: "+idx);
    return cc.size(50, 60);

},
// 由于tableview是动态获取数据的，该方法在初始化时会被调用一次，之后在每个隐藏的cell显示出来的时候都会调用
tableCellAtIndex:function (table, idx) {

    console.log("tableCellAtIndex|:  "+idx);

    var strValue = idx.toFixed(0);
    var cell = table.dequeueCell();
    var label;
    if (!cell) {
        cell = new CustomTableViewCell();

        var sprite = new cc.Sprite(res.ccicon);
        sprite.anchorX = 0;
        sprite.anchorY = 0;
        sprite.x = 0;
        sprite.y = 0;
        cell.addChild(sprite);

        label = new cc.LabelTTF(strValue, "Helvetica", 20.0);
        label.x = 0;
        label.y = 0;
        label.anchorX = 0;
        label.anchorY = 0;
        label.tag = 123;
        cell.addChild(label);
    } else {
        label = cell.getChildByTag(123);
        label.setString(strValue);
    }


    return cell;
},

numberOfCellsInTableView:function (table) {    // 设置 tabelview  的cell 个数
    return this._tabelNumber;
}