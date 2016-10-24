/**
 * Created by Administrator on 2016-10-17.
 */
var MultiColTableViewTest = cc.Layer.extend({
    m_tableView:null,
    ctor : function (type) {
        this._super();
        this.showTableView();
    },
    showTableView : function( ) {
        if (!this.m_tableView) {
            this.m_tableView = cc.MultiColTableView.create(this,cc.size(300,300), null);
            this.m_tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            this.m_tableView.setMultiTableViewDelegate(this);
            this.m_tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(this.m_tableView);
        }
        this.m_tableView.reloadData();
    },
    scrollViewDidScroll : function( view) {
    },
    gridAtIndex : function(multiTable,  idx) {
        var cell = multiTable.dequeueGrid();
        if(!cell){
            cell = new cc.Layer();
        }
        return cell;
    } ,
    numberOfCellsInTableView : function(multiTable) {
        return 3;
    },
    numberOfGridsInCell : function(multiTable) {
        return 1;
    },
    gridSizeForTable : function(table) {
        cc.size(100,100);
    },
    gridTouched : function( table, grid) {
        cc.log("gridTouched");
    }
}) ;