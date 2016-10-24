// JavaScript Document
var MatchEndInfoLayer= cc.Layer.extend({
	
	bgSprtie:null,
	stockInfoLabel:null,
	btnReplay:null,		//复盘
	btnAgain:null,		//再战
	btnShare:null,		//分享
	
	againCallBackFunction:null,
	replayCallBackFunction:null,
	shareCallBackFunction:null,
	
	avatarSprite:null,
	
	ishidden:true,
	scoreLabel:null,
	
	scoreLabel2:null,
	
	ctor:function()
	{
		this._super();
		this.width=476;
		this.height=232;
	},
	
	onEnter:function () 
	{
		this._super();
		var self=this;
		
		this.bgSprtie = cc.Sprite.create("res/matchEnd.png");
		this.bgSprtie.setPosition(this.width / 2, this.height / 2);
		this.bgSprtie.setScale(1);
		this.addChild(this.bgSprtie,1);
		
		this.stockInfoLabel=cc.LabelTTF.create("", "Arial", 19);
		//this.stockInfoLabel.setColor(cc.color(40,184,245,255));
		this.stockInfoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.stockInfoLabel.setAnchorPoint(0.5,0.5);
		this.stockInfoLabel.setPosition(this.width / 2, 90);
		this.addChild(this.stockInfoLabel,2); 
		
		this.scoreLabel=cc.LabelTTF.create("", "黑体", 16);
		//this.stockInfoLabel.setColor(cc.color(40,184,245,255));
		this.scoreLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.scoreLabel.setAnchorPoint(0,0.5);
		this.scoreLabel.setPosition(180, 160);
		this.scoreLabel.setColor(cc.color(33,158,187,255));
		this.scoreLabel.setString("您这局的收益率为：");
		this.addChild(this.scoreLabel,2); 
		
		
		this.scoreLabel2=cc.LabelTTF.create("", "Arial", 25);
		//this.stockInfoLabel.setColor(cc.color(40,184,245,255));
		this.scoreLabel2.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.scoreLabel2.setAnchorPoint(0,0.5);
		this.scoreLabel2.setPosition(320, 160);
		this.scoreLabel2.setColor(cc.color(33,158,187,255));
		this.addChild(this.scoreLabel2,2); 
		
		
		this.btnReplay=new Button("res/meBtnReplay.png");
		this.btnReplay.setPosition(90,39);
		this.btnReplay.setClickEvent(function(){
			self.replay();
		});
		
		this.btnAgain=new Button("res/meBtnAgain.png");
		this.btnAgain.setPosition(237,39);
		this.btnAgain.setClickEvent(function(){
			self.again();
		});
		
		
		this.btnShare=new Button("res/meBtnShare.png");
		this.btnShare.setPosition(384,39);
		this.btnShare.setClickEvent(function(){
			self.share();
		});
		
		this.addChild(this.btnReplay,2);
		this.addChild(this.btnAgain,2);
		this.addChild(this.btnShare,2);
		
		 this.avatarSprite=cc.Sprite.create(gPlayerAvatarSprite.getTexture());
		 this.avatarSprite.setPosition(130,160);
		 this.avatarSprite.setScale(0.4);
		 this.addChild(this.avatarSprite,5); 
	},
	
	replay:function()
	{
		if(this.replayCallBackFunction!=null)
		{
			this.replayCallBackFunction();
		}
	},
	
	again:function()
	{
		if(this.againCallBackFunction!=null)
		{
			this.againCallBackFunction();
		}
	},
	
	share:function()
	{
		if(this.shareCallBackFunction!=null)
		{
			this.shareCallBackFunction();
		}
	},

    start:function()
    {
        if(this.startCallBackFunction!=null)
        {
            this.startCallBackFunction();
        }
    },

	hideLayer:function()
	{
		this.setVisible(false);
		this.scheduler.pauseTarget(this);
		this.actionManager && this.actionManager.pauseTarget(this);
		cc.eventManager.pauseTarget(this,true);
	},
	
	showLayer:function()
	{
		this.setVisible(true);
		this.scheduler.resumeTarget(this);
		this.actionManager && this.actionManager.resumeTarget(this);
		cc.eventManager.resumeTarget(this,true);
	},
	
	
	//根据Content的内容，解析后赋予参数
	applyParamsFromContent:function(content)
	{
		var fields=content.split("#");
		var len=fields.length;
		this.stockInfoLabel.setString("这是"+fields[len-3]+" "+fields[len-2]+"到"+fields[len-1]+"的日线图");
		var ratio=parseFloat(fields[2]);
		if(ratio>0)
		{
			this.scoreLabel2.setColor(cc.color(249,27,27,255));
		}
		else if(ratio<0)
		{
			this.scoreLabel2.setColor(cc.color(6,224,0,255));
		}
		else
		{
			this.scoreLabel2.setColor(cc.color(255,255,255,255));
		}
		this.scoreLabel2.setString(ratio.toFixed(2)+"%");
		console.log(content);
	}
	
});
