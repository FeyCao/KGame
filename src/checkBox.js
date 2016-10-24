// JavaScript Document
CheckBox=cc.Sprite.extend({
	///只用勾的图片，不用背景
	ischecked:false,
	validWidth:0,
	validHeight:0,
	
	
	ctor: function (fileName, rect, rotated)
	{
		this._super(fileName, rect, rotated);
		
		this.validWidth=this.width;
		this.validHeight=this.height;
		
		var self=this;
		this.listener= cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
			swallowTouches: false,
			//onTouchBegan event callback function						
			onTouchBegan: function (touch, event) {	
				//var nextSceneM=new NextScene();
				var target = event.getCurrentTarget();	
				var touchLocation=touch.getLocation();
				//Get the position of the current point relative to the button
				var locationInNode = target.convertToNodeSpace(touchLocation);	
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, self.validWidth, self.validHeight);
				//Check the click area
				if (cc.rectContainsPoint(rect, locationInNode)) 
				{		
					console.log("onTouchBegan");
				}
				return true;
			},
			
			onTouchEnded: function (touch, event) {	
				//var nextSceneM=new NextScene();
				var target = event.getCurrentTarget();	
				var touchLocation=touch.getLocation();
				//Get the position of the current point relative to the button
				var locationInNode = target.convertToNodeSpace(touchLocation);	
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, self.validWidth,self.validHeight);
				//Check the click area
				if (cc.rectContainsPoint(rect, locationInNode)) 
				{		
					self.clicked();
					console.log("onTouchEnded");
				}
			},
		});
		
		this.setOpacity(0);
		cc.eventManager.addListener(this.listener, this);
	},
	
	setValidSize:function(width,height)
	{
		this.validWidth=width;
		this.validHeight=height;
	},
	
	setChecked:function(isChecked)
	{
		this.ischecked=isChecked;
		if(isChecked==true)
		{
			this.setOpacity(255);
		}
		else
		{
			this.setOpacity(0);
		}
	},
	
	clicked:function()
	{
		if(this.ischecked==false)
		{
			this.setChecked(true);
		}
		else
		{
			this.setChecked(false);
		}
	},

	
	///当按钮按下去的时候，缩小
	shrink:function()
	{
		var actionNormal=new cc.ScaleTo(0.032,this.shrinkRatioWidth,this.shrinkRatioHeight);
		this.runAction(actionNormal);
	},
	
	///当按钮弹起来的时候，放大
	unshrink:function()
	{
		var actionNormal=new cc.ScaleTo(0.032,1,1);
		this.runAction(actionNormal);
	},
});