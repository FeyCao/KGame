/**
 * Created by Administrator on 2016-10-17.
 */
//首先需要定义一个触摸Delegate，该Delegate主要作用是让子类实现触摸机制

cc.MultiColTableViewDelegate = cc.Class.extend({
    gridTouched:function(table,grid){

    }
});
//还需要实现一个DataSource，该DataSource主要作用是为cc.MultiColTableView提供数据。

cc.MultiColTableViewDataSource = cc.Class.extend({
    gridAtIndex:function(table,idx){
        return null;
    },
    numberOfCellsInTableView:function(table){
        return 0;
    },
    numberOfGridsInCell:function(table){
        return 0;
    },
    gridSizeForTable:function(table){
        return cc.size(0,0);
    }
});
//最后实现多行多列控件：
cc.MultiColTableView = cc.TableView.extend({
    m_pMultiTableViewDataSource:null,
    m_pMultiTableViewDelegate:null,
    m_horizontalOrder:cc.TABLEVIEW_FILL_BOTTOMUP,
    m_pGridsFreed:null,
    m_pCurTouch:null,
    ctor:function(dataSource, size, container){
        this.m_pGridsFreed = new cc.ArrayForObjectSorting();
        cc.ScrollView.prototype.ctor.call(this);
        this._oldDirection = cc.SCROLLVIEW_DIRECTION_NONE;
        this._cellsPositions = [];
        this.initWithViewSize(size, container);
        this.setMultiTableViewDataSource(dataSource);
        this.setDataSource(this);
        this.setDelegate(this);
        this.m_isMultiColTableView = true;
    },
    dequeueGrid:function(){
        if (this.m_pGridsFreed.count() == 0) {
            return null;
        } else {
            var cell = this.m_pGridsFreed.objectAtIndex(0);
            this.m_pGridsFreed.removeObjectAtIndex(0);
            return cell;
        }
    },
    tableCellSizeForIndex:function(){
        var size = this.getMultiTableViewDataSource().gridSizeForTable(this);
        if(this.getDirection() === cc.SCROLLVIEW_DIRECTION_HORIZONTAL){
            size.height *= this.getMultiTableViewDataSource().numberOfGridsInCell(this);
        }else{
            size.width *= this.getMultiTableViewDataSource().numberOfGridsInCell(this);
        }
        return size;
    },
    tableCellAtIndex:function(table,idx){
        var numberOfCells = this.getMultiTableViewDataSource().numberOfCellsInTableView(this);
        var numberOfGridsInCell = this.getMultiTableViewDataSource().numberOfGridsInCell(this);
        var cell = table.dequeueCell();
        if(!cell){
            cell = new cc.TableViewCell();
        }else{
            for(var i = 0;i<cell.getChildren().length;i++){
                var grid = cell.getChildren()[i];
                if(grid){
                    this.m_pGridsFreed.addObject(cell);
                }
            }
            cell.removeAllChildrenWithCleanup(true);
        }
        var startIndex = (this.m_horizontalOrder==cc.TABLEVIEW_FILL_BOTTOMUP?idx:(numberOfCells - idx -1 ))*numberOfGridsInCell;
        var gridSize = this.getMultiTableViewDataSource().gridSizeForTable(this);
        var cellSize = this.tableCellSizeForIndex(this);
        cell.setContentSize(cellSize);
        for(var gridIdx = startIndex,colIdx=0;gridIdx<(numberOfGridsInCell+startIndex);gridIdx++,colIdx++){
            var grid = this.getMultiTableViewDataSource().gridAtIndex(this,gridIdx);
            if(grid){
                grid.setIdx(gridIdx);
                grid.setObjectID(gridIdx);
                grid.setAnchorPoint(cc.p(0,0));
                if(this.getDirection() === cc.SCROLLVIEW_DIRECTION_HORIZONTAL){
                    if(this._vOrdering === cc.TABLEVIEW_FILL_TOPDOWN){
                        grid.setPosition(cc.p(0,gridSize.height*(numberOfGridsInCell-colIdx-1)));
                    }else{
                        grid.setPosition(cc.p(0,gridSize.height*colIdx));
                    }
                }else{
                    grid.setPosition(cc.p(gridSize.width*colIdx,0));
                }
                if(!grid.getParent()){
                    cell.addChild(grid);
                }
            }
        }
        return cell;
    },
    isTouchInside: function (owner,touch) {
        if(!owner || !owner.getParent()){
            return false;
        }
        var touchLocation = touch.getLocation(); // Get the touch position
        touchLocation = owner.getParent().convertToNodeSpace(touchLocation);
        return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation);
    },
    numberOfCellsInTableView:function(table){
        return this.getMultiTableViewDataSource().numberOfCellsInTableView(this);
    },
    tableCellTouched:function(table,cell){
        if(!this.getMultiTableViewDelegate()){
            return;
        }
        for(var i = 0;i<cell.getChildren().length;i++){
            var grid = cell.getChildren()[i];
            grid.setContentSize(this.getMultiTableViewDataSource().gridSizeForTable(this));
            if(grid != null && this.isTouchInside(grid,this.m_pCurTouch)){
                this.getMultiTableViewDelegate().gridTouched(this,grid);
            }
        }
    },
    scrollViewDidScroll:function(view){
        this._super();
        if(this.m_pMultiTableViewDelegate){
            this.m_pMultiTableViewDelegate.scrollViewDidScroll(this);
        }
    },
    onTouchBegan:function(touch, event){
        this.m_pCurTouch = touch;
        return this._super(touch,event);
    },
    onTouchEnded:function (touch, event) {
        this._super(touch,event);
    },
    getMultiTableViewDataSource:function(){
        return this.m_pMultiTableViewDataSource;
    },
    setMultiTableViewDataSource:function(dataSource){
        this.m_pMultiTableViewDataSource = dataSource;
    },
    getMultiTableViewDelegate:function(){
        return this.m_pMultiTableViewDelegate;
    },
    setMultiTableViewDelegate:function(delegate){
        this.m_pMultiTableViewDelegate = delegate;
    },
    setHorizontalOrder:function(order){
        this.m_horizontalOrder = order;
    },
    getHorizontalOrder:function(){
        return this.m_horizontalOrder;
    }
});
cc.MultiColTableView.create = function (dataSource, size, container) {
    var view = new cc.MultiColTableView(dataSource,size,container);
    return view;
};