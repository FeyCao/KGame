// JavaScript Document
SceneBase = cc.Scene.extend(
{
	lowerLayer:null,		//替代原来Scene的AddChild函数的Layer，所有调用该scene的addchild函数，都添加内容添加到该layer
	messageBoxLayer:null,
	
	otherMessageTipLayer:null,
	
	confirmBtn:null,
	messageBoxSprite:null,
	messageLabel:null,
	messageLabelShadow:null,
	
	closeCallback:null,
	
	sceneEnterTime:null,	//进入这个Scene的时间
	
	isLowerLayerPaused:false,
	
	progressLayer:null,		//进度条
	isShowingProgress:false,
	
	ctor:function()
	{
		this._super();
	},
	
	
	onEnter:function () 
	{
		this._super();
		this.sceneEnterTime=new Date().getTime();
		
		var self=this;
		var size = cc.director.getWinSize();
		this.messageBoxLayer=new cc.LayerColor(cc.color(0,0,0,127),size.width,size.height);
		
		this.lowerLayer=new cc.Layer();
		
		this.otherMessageTipLayer=new cc.Layer();
		
		this.messageBoxSprite=cc.Sprite.create("res/messagebox.png");
		this.messageBoxSprite.setPosition(size.width / 2, size.height / 2);
		this.messageBoxSprite.setScale(1.0);
		this.messageBoxLayer.addChild(this.messageBoxSprite,2);
		
		this.confirmBtn=new Button("res/messageboxbutton.png");
		this.confirmBtn.setPosition(size.width / 2,150);
		this.confirmBtn.setClickEvent(function(){
			self.closeMessageBox();
		});
		this.messageBoxLayer.addChild(this.confirmBtn,3);
		
		this.messageLabelShadow=new cc.LabelTTF("登录失败", "黑体", 20);
		this.messageLabelShadow.setColor(cc.color(0, 0, 0,100));
		this.messageLabelShadow.setPosition(size.width / 2+2,220-2);
		this.messageBoxLayer.addChild(this.messageLabelShadow,2);
		
		this.messageLabel=new cc.LabelTTF("登录失败", "黑体", 20);
		this.messageLabel.setPosition(size.width / 2,220);
		this.messageBoxLayer.addChild(this.messageLabel,3);
		
		this.progressLayer=new ProgressLayer(70,70);
		this.progressLayer.setPosition(size.width / 2-this.progressLayer.width/2, size.height / 2-this.progressLayer.height/2);
		this.progressLayer.setVisible(false);
		
		this.addChildEx(this.lowerLayer, 1);
		this.addChildEx(this.otherMessageTipLayer,5);
		this.addChildEx(this.messageBoxLayer, 10);
		this.addChildEx(this.progressLayer, 9);
	
		this.messageBoxLayer.setVisible(false);
		cc.log("SceneBase onEnter begin");
	},
	
	showProgress:function()
	{
		if(this.isShowingProgress==false)
		{
			this.progressLayer.rotate();
			this.isShowingProgress=true;
			this.pauseLowerLayer();
		}
	},
	
	stopProgress:function()
	{
		if(this.isShowingProgress==true)
		{
			this.progressLayer.stop();
			this.isShowingProgress=false;
			this.resumeLowerLayer();
		}
	},
	
	closeMessageBox:function()
	{
		this.messageBoxLayer.setVisible(false);
		this.resumeLowerLayer();
		if(this.closeCallback!=null)
		{
			this.closeCallback();
		}
	},
	
	showMessageBox:function(msg,closeCallback)
	{
		this.closeCallback=closeCallback;
		this.messageLabel.setString(msg);
		this.messageLabelShadow.setString(msg);
		
		this.messageBoxLayer.setVisible(true);
		this.pauseLowerLayer();
		//alert(msg);
	},
	
	pauseLowerLayer:function()
	{
		if(this.isLowerLayerPaused==false)
		{
			this.scheduler.pauseTarget(this.lowerLayer);
			this.actionManager && this.actionManager.pauseTarget(this.lowerLayer);
			cc.eventManager.pauseTarget(this.lowerLayer,true);
			this.isLowerLayerPaused=true;
		}
	},
	
	resumeLowerLayer:function()
	{
		if(this.isLowerLayerPaused==true)
		{
			this.scheduler.resumeTarget(this.lowerLayer);
			this.actionManager && this.actionManager.resumeTarget(this.lowerLayer);
			cc.eventManager.resumeTarget(this.lowerLayer,true);
			this.isLowerLayerPaused=false;
		}
	},
	
	getSceneElapsedMilliSeconds:function()
	{
		return new Date().getTime()-this.sceneEnterTime;
	},
	
	 addChildEx: function (child, localZOrder, tag) {
  	    localZOrder = localZOrder === undefined ? child._localZOrder : localZOrder;
        var name, setTag = false;
        if(cc.isUndefined(tag)){
            tag = undefined;
            name = child._name;
        } else if(cc.isString(tag)){
            name = tag;
            tag = undefined;
        } else if(cc.isNumber(tag)){
            setTag = true;
            name = "";
        }
        cc.assert(child, cc._LogInfos.Node_addChild_3);
        cc.assert(child._parent === null, "child already added. It can't be added again");
        this._addChildHelper(child, localZOrder, tag, name, setTag);
	 },
	
	 addChild: function (child, localZOrder, tag) {
		 this.lowerLayer.addChild(child,localZOrder,tag);
    },
	
	removeChild: function (child, cleanup) {
        this.lowerLayer.removeChild(child, cleanup);
    },
});