// JavaScript Document

var gCursorSpriteForInput=null;
//对于非手机，获得光标图片

var InputEx= ccui.TextField.extend({
	
	cursorSpriteForInput:null,
	blinkAction:null,
	cursorVisible:false,
	
	lostFocusEvent:null,
	
	ctor:function(text, fontName, fontSize)
	{
		this._super(text, fontName, fontSize);
		this._textFieldRenderer.setPlaceHolder("");
		
		if(cc.sys.isMobile==false)
		{
			this.cursorSpriteForInput=cc.Sprite.create("res/cursor.png");
			this.cursorSpriteForInput.setAnchorPoint(0,0);
			this.addChild(this.cursorSpriteForInput,2);
			this.cursorSpriteForInput.setPosition(0,4);
			this.cursorSpriteForInput.setVisible(false);
			
			var showAction=new BlinkActionEx(100,100);
			this.blinkAction=new cc.RepeatForever(new cc.Sequence(showAction));
		}
	},
	
	
	onEnter:function () 
	{
		this._super();
		this.setAnchorPoint(0,0);
		this.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		
		console.log("instanceid="+this.__instanceId);

	},
	
	setTipMessage:function(tipMessage)
	{
		this._textFieldRenderer.setTipMessage(tipMessage);
	},
	
	_attachWithIMEEvent: function () {
		console.log("_attachWithIMEEvent self="+this.__instanceId);
		this.showCursor();
        if(this._textFieldEventSelector){
            if (this._textFieldEventListener)
                this._textFieldEventSelector.call(this._textFieldEventListener, this, ccui.TextField.EVENT_ATTACH_WITH_IME);
            else
                this._textFieldEventSelector(this, ccui.TextField.EVENT_ATTACH_WITH_IME);
        }
        if (this._ccEventCallback){
            this._ccEventCallback(this, ccui.TextField.EVENT_ATTACH_WITH_IME);
        }
		
		
    },
	
	 _detachWithIMEEvent: function () {
		 console.log("_detachWithIMEEvent self="+this.__instanceId);
        if(this._textFieldEventSelector){
            if (this._textFieldEventListener)
                this._textFieldEventSelector.call(this._textFieldEventListener, this, ccui.TextField.EVENT_DETACH_WITH_IME);
            else
                this._textFieldEventSelector(this, ccui.TextField.EVENT_DETACH_WITH_IME);
        }
        if (this._ccEventCallback)
		{
            this._ccEventCallback(this, ccui.TextField.EVENT_DETACH_WITH_IME);
		}
		this.hideCursor();
		if(this.lostFocusEvent!=null)
		{
			this.lostFocusEvent();
		}
    },
	
	onTouchBegan: function (touchPoint, unusedEvent) {
        var self = this;
		console.log("onTouchBegan self="+self.__instanceId);
        var pass = ccui.Widget.prototype.onTouchBegan.call(self, touchPoint, unusedEvent);
        if (self._hit) {
            setTimeout(function(){
                self._textFieldRenderer.attachWithIME();
            }, 0);
			console.log("self._hit=true");
			
        }else{
            setTimeout(function(){
                self._textFieldRenderer.detachWithIME();
            }, 0);
			console.log("self._hit=false");
        }
        return pass;
    },
	
	
	
	showCursor:function()
	{
		console.log("showCursor");
		if(cc.sys.isMobile==true)return;
		var width=this._textFieldRenderer.getContentSize().width;

		console.log("content size width="+width);
		this.cursorSpriteForInput.setPosition(width+2,4);
		
		this.cursorSpriteForInput.setVisible(true);
		this.cursorVisible=true;
		this.cursorSpriteForInput.runAction(this.blinkAction);
	},
	
	hideCursor:function()
	{
		console.log("hide cursor");
		if(cc.sys.isMobile==true)return;
		this.cursorSpriteForInput.stopAction(this.blinkAction);
		this.cursorSpriteForInput.setVisible(false);
		this.cursorVisible=false;
	},
	
	isSelected:function()
	{
		return this.cursorVisible;
	},
	
	 _onSizeChanged: function () {
		 var width=this._textFieldRenderer.getContentSize().width;
		console.log("_onSizeChanged width="+width);
        ccui.Widget.prototype._onSizeChanged.call(this);
        this._textFieldRendererAdaptDirty = true;
		if(this.cursorVisible==true && cc.sys.isMobile==false)
		{
			this.cursorSpriteForInput.setPosition(width+2,4);
		}
    },
});