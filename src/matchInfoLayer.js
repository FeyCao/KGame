// JavaScript Document
//用来显示对局的信息和按钮等控件
var MatchInfoLayer= cc.Layer.extend({

	matchInfoArea:null,			//绘图的区域

	buyDisableSprite:null,		//买入按钮关闭图片
	buyCloseDisableSprite:null,	//买入平仓按钮关闭图片
	
	sellDisableSprite:null,		//卖出按钮关闭图片
	sellCloseDisableSprite:null,//卖出平仓按钮关闭图片
	
	
	buyButton:null,				//买入按钮
	sellButton:null,			//卖出按钮
	buyCloseButton:null,		//买平按钮
	sellCloseButton:null,		//卖平按钮
	
	selfNameLabel:null,			//玩家的名字
	opponentNameLabel:null,		//对手的名字
	
	selfDirLabel:null,			//玩家的方向
	opponentDirLabel:null,		//对手的方向
	
	selfScoreLabel:null,			//玩家的分数
	opponentScoreLabel:null,		//对手的分数
	
	
	//变速区域
	speedControlLayer:null,			//放变速按钮的层

	scBackgroundSprite:null,		//按钮的背景层
	scPlayCheckButton:null,			//播放和暂停切换的按钮
	scHalfCheckButton:null,			//半速
	scNormalCheckButton:null,		//普通速度
	scDoubleCheckButton:null,		//2倍速度
	
	btnReplay:null,		//复盘
	btnShare:null,		//分享
    meBtnStart:null,        //我也要玩
	againCallBackFunction:null,
	shareCallBackFunction:null,
    startCallBackFunction:null,
	

	ctor:function(width,height)
	{
		this._super();
		this.width=width;
		this.height=height;
		
	},
	
	onEnter:function () 
	{
		this._super();
		var self=this;
		
		this.buyDisableSprite=cc.Sprite.create("res/btnBuyDisable.png");
		this.buyCloseDisableSprite=cc.Sprite.create("res/btnCloseDisable.png");
		this.sellDisableSprite=cc.Sprite.create("res/btnSellDisable.png");
		this.sellCloseDisableSprite=cc.Sprite.create("res/btnCloseDisable.png");
		
		this.buyDisableSprite.setScale(0.7);
		this.buyCloseDisableSprite.setScale(0.7);
		this.sellDisableSprite.setScale(0.7);
		this.sellCloseDisableSprite.setScale(0.7);
		
		this.addChild(this.buyDisableSprite, 2);
		this.addChild(this.buyCloseDisableSprite, 2);
		this.addChild(this.sellDisableSprite, 2);
		this.addChild(this.sellCloseDisableSprite, 2);		
		
		//////////////////////////////////////////////////////////////
		this.buyButton=new Button("res/btnBuyEnable.png");
		//this.buyButton.setPosition(cc.p(77,44));
		this.buyButton.setPosition(cc.p(106,44));
		this.buyButton.setClickEvent(function(){
			self.buyClick();
		});
		this.addChild(this.buyButton, 3);
		
		//this.sellCloseButton=new Button("res/btnCloseSell.png");
		//this.sellCloseButton.setPosition(cc.p(136,44));
		
		this.sellCloseButton=new Button("res/btnSellEnable.png");
		this.sellCloseButton.setPosition(cc.p(630,44));
		
		this.sellCloseButton.setClickEvent(function(){
			self.sellCloseClick();
		});
		this.addChild(this.sellCloseButton, 3);
		
		this.sellButton=new Button("res/btnSellEnable.png");
		//this.sellButton.setPosition(cc.p(600,44));
		this.sellButton.setPosition(cc.p(630,44));
		this.sellButton.setClickEvent(function(){
			self.sellClick();
		});
		this.addChild(this.sellButton, 3);
		
		//this.buyCloseButton=new Button("res/btnCloseBuy.png");
		//this.buyCloseButton.setPosition(cc.p(659,44));
		
		this.buyCloseButton=new Button("res/btnBuyEnable.png");
		this.buyCloseButton.setPosition(cc.p(106,44));
		
		
		this.buyCloseButton.setClickEvent(function(){
			self.buyCloseClick();
		});
		this.addChild(this.buyCloseButton, 3);
		
		this.btnAgain=new Button("res/meBtnAgain.png");
		this.btnAgain.setPosition(cc.p(276,44));
		this.btnAgain.setClickEvent(function(){
			self.again();
		});
		
		
		this.btnShare=new Button("res/meBtnShare.png");
		this.btnShare.setPosition(cc.p(460,44));
		this.btnShare.setClickEvent(function(){
			self.share();
		});

        this.meBtnStart=new Button("res/meBtnStart.png");
        this.meBtnStart.setPosition(cc.p(363,46));
        this.meBtnStart.setClickEvent(function(){
            self.meStart();
        });
		
		this.btnStart=new Button("res/btnStart.png");
        this.btnStart.setPosition(cc.p(363,46));
        this.btnStart.setClickEvent(function(){
            self.start();
        });

        this.btnHome=new Button("res/home.png");
        this.btnHome.setPosition(cc.p(363,46));
        this.btnHome.setClickEvent(function(){
            self.meStart();
        });

		this.addChild(this.btnAgain,3);
		this.addChild(this.btnShare,3);
        this.addChild(this.meBtnStart,3);
		this.addChild(this.btnStart,3);
		
		/*
		 this.buyButtonImage=new cc.MenuItemImage("res/buy.png","res/buy_p.png",this.buyButtonCallBack);
		 this.buyMenu=new cc.Menu(this.buyButtonImage);
		 this.buyMenu.setPosition(cc.p(96/2,96/2));
	 	 this.addChild(this.buyMenu, 5);		
		 
		 this.sellButtonImage=new cc.MenuItemImage("res/sell.png","res/sell_p.png",this.sellButtonCallBack);
		 this.sellMenu=new cc.Menu(this.sellButtonImage);
		 this.sellMenu.setPosition(cc.p(this.width-96/2,96/2));
	 	 this.addChild(this.sellMenu, 5);		
		 
		 this.selfNameLabel = cc.LabelTTF.create(gPlayerName, "微软雅黑", 24);
		 this.selfNameLabel.setPosition(300, 80);
		 this.addChild(this.selfNameLabel,5);
		 
		  this.opponentNameLabel = cc.LabelTTF.create(this.parent.opponentsInfo[0], "微软雅黑", 24);
		 this.opponentNameLabel.setPosition(300, 30);
		 this.addChild(this.opponentNameLabel,5);
		 
		  this.selfDirLabel = cc.LabelTTF.create("", "微软雅黑", 24);
		 this.selfDirLabel.setPosition(400, 80);
		 this.addChild(this.selfDirLabel,5);
		 
		  this.opponentDirLabel = cc.LabelTTF.create("", "微软雅黑", 24);
		 this.opponentDirLabel.setPosition(400, 30);
		 this.addChild(this.opponentDirLabel,5);
		 
		  this.selfScoreLabel = cc.LabelTTF.create("", "微软雅黑", 24);
		 this.selfScoreLabel.setPosition(500, 80);
		 this.addChild(this.selfScoreLabel,5);
		 
		  this.opponentScoreLabel = cc.LabelTTF.create("", "微软雅黑", 24);
		 this.opponentScoreLabel.setPosition(500, 30);
		 this.addChild(this.opponentScoreLabel,5);
		 */
		 
		 this.matchInfoArea=new cc.DrawNodeCanvas();
 		 //设置K线图的区域
		 this.matchInfoArea.setPosition(cc.p(0,0));
		 this.matchInfoArea.width=this.width;
		 this.matchInfoArea.height=this.height;
		 this.addChild(this.matchInfoArea, 1);
		 
		//设置变速信息的区域
		 this.initSpeedControlArea();
		 
		 this.setButtonsToNoPosition();
		 this.drawDisableButtons();
		 this.drawAreaBorder();
	},
	
	initSpeedControlArea:function()
	{
		 //设置变速信息的信息
		 var self=this;
		 
		 this.speedControlLayer=new cc.Layer();
		 this.addChild(this.speedControlLayer,3);
		 
		 this.scBackgroundSprite=cc.Sprite.create("res/btn_sc_bg.png");
		 this.scPlayCheckButton=new CheckButton("res/btn_sc_pause.png","res/btn_sc_play.png");
		 this.scHalfCheckButton=new CheckButton("res/btn_sc_a_half.png","res/btn_sc_d_half.png");
		 this.scNormalCheckButton=new CheckButton("res/btn_sc_a_normal.png","res/btn_sc_d_normal.png");
		 this.scDoubleCheckButton=new CheckButton("res/btn_sc_a_double.png","res/btn_sc_d_double.png");
		 
		  this.scBackgroundSprite.setPosition(cc.p(406,42));
	   	  this.scPlayCheckButton.setPosition(cc.p(302,42));
		  this.scHalfCheckButton.setPosition(cc.p(359,42));
		  this.scNormalCheckButton.setPosition(cc.p(406,42));
		  this.scDoubleCheckButton.setPosition(cc.p(453,42));
		  
		  this.scPlayCheckButton.setClickEvent(function(){
			self.playCheckChanged();
		   });
		   
		    this.scHalfCheckButton.setClickEvent(function(){
			self.halfSpeedCheckClicked();
		   });
		   
		    this.scNormalCheckButton.setClickEvent(function(){
			self.normalSpeedCheckClicked();
		   });
		   
		    this.scDoubleCheckButton.setClickEvent(function(){
			self.doubleSpeedCheckClicked();
		   });
		   
		    this.scNormalCheckButton.setChecked(true);
			this.scPlayCheckButton.setChecked(true);
		  
		 
		 this.speedControlLayer.addChild(this.scBackgroundSprite,1);
		 this.speedControlLayer.addChild(this.scPlayCheckButton,1);
		 this.speedControlLayer.addChild(this.scHalfCheckButton,1);
		 this.speedControlLayer.addChild(this.scNormalCheckButton,1);
		 this.speedControlLayer.addChild(this.scDoubleCheckButton,1);
	},
	
	playCheckChanged:function()
	{
		gKlineScene.drawCandleStoped=!this.scPlayCheckButton.isSelected;
	},
	
	halfSpeedCheckClicked:function()
	{
		if(this.scHalfCheckButton.isSelected==true)
		{
			 this.scHalfCheckButton.setDisabled(true);
			
			 this.scNormalCheckButton.setChecked(false);
			 this.scNormalCheckButton.setDisabled(false);
			 
			 this.scDoubleCheckButton.setChecked(false);
			 this.scDoubleCheckButton.setDisabled(false);
			 
			 gKlineScene.currentCandleDrawInterval=gKlineScene.CANDAL_DRAW_INTERVAL*2;
			 if(gKlineScene.drawCandleStoped==true)
			 {
				 gKlineScene.drawCandleStoped=false;
				 this.scPlayCheckButton.setChecked(true);
			 }
		}
	},
	
	normalSpeedCheckClicked:function()
	{
		if(this.scNormalCheckButton.isSelected==true)
		{
			 this.scNormalCheckButton.setDisabled(true);
			
			 this.scHalfCheckButton.setChecked(false);
			 this.scHalfCheckButton.setDisabled(false);
			 
			 this.scDoubleCheckButton.setChecked(false);
			 this.scDoubleCheckButton.setDisabled(false);
			 
			 gKlineScene.currentCandleDrawInterval=gKlineScene.CANDAL_DRAW_INTERVAL;
			 if(gKlineScene.drawCandleStoped==true)
			 {
				 gKlineScene.drawCandleStoped=false;
				 this.scPlayCheckButton.setChecked(true);
			 }
		}
	},
	
	doubleSpeedCheckClicked:function()
	{
		if(this.scDoubleCheckButton.isSelected==true)
		{
			 this.scDoubleCheckButton.setDisabled(true);
			
			 this.scNormalCheckButton.setChecked(false);
			 this.scNormalCheckButton.setDisabled(false);
			 
			 this.scHalfCheckButton.setChecked(false);
			 this.scHalfCheckButton.setDisabled(false);
			 
			 gKlineScene.currentCandleDrawInterval=gKlineScene.CANDAL_DRAW_INTERVAL/2;
			 if(gKlineScene.drawCandleStoped==true)
			 {
				 gKlineScene.drawCandleStoped=false;
				 this.scPlayCheckButton.setChecked(true);
			 }
		}
	},
	
	disableAllButtons:function()
	{
		this.buyButton.setVisible(false);
		this.buyCloseButton.setVisible(false);
		this.sellButton.setVisible(false);
		this.sellCloseButton.setVisible(false);
		this.btnAgain.setVisible(false);
		this.btnShare.setVisible(false);
        this.meBtnStart.setVisible(false);
		this.btnStart.setVisible(false);
		this.speedControlLayer.setVisible(false);
	},
	ableSpeedButtons:function()
	{
		this.speedControlLayer.setVisible(true);
	},
	
	//将按钮设置为空仓的状态
	setButtonsToNoPosition:function()
	{
		this.buyButton.setVisible(true);
		this.buyCloseButton.setVisible(false);
		this.sellButton.setVisible(true);
		this.sellCloseButton.setVisible(false);
	},
	
	//将按钮设置为多仓的状态
	setButtonsToBuyPosition:function()
	{
		this.buyButton.setVisible(false);
		this.buyCloseButton.setVisible(false);
		this.sellButton.setVisible(false);
		this.sellCloseButton.setVisible(true);
	},
	
	//将按钮设置为多仓的状态
	setButtonsToSellPosition:function()
	{
		this.buyButton.setVisible(false);
		this.buyCloseButton.setVisible(true);
		this.sellButton.setVisible(false);
		this.sellCloseButton.setVisible(false);
	},
	
	buyClick:function()
	{
		var klineScene=this.parent.parent;
		var i=klineScene.selfOperations.length;
		if(i>0&&Math.abs(klineScene.selfOperations[i-1])>=klineScene.currentCandleIndex)
		{
			console.log("selfOperations[" + i + "] = " + klineScene.selfOperations[i-1]);
			console.log("drawCandlesAll this.currentCandleIndex = ",klineScene.currentCandleIndex);
			return;
		}	
		else
		{
			klineScene.buyClick();
			this.setButtonsToBuyPosition();
		}
		
		
		
	},
	
	buyCloseClick:function()
	{
		var klineScene=this.parent.parent;
		klineScene.buyClick();
		
		this.setButtonsToNoPosition();
	},
	
	sellClick:function()
	{
		var klineScene=this.parent.parent;
		var i=klineScene.selfOperations.length;
		if(i>0&&Math.abs(klineScene.selfOperations[i-1])>=klineScene.currentCandleIndex)
		{
			console.log("selfOperations[" + i + "] = " + klineScene.selfOperations[i-1]);
			console.log("drawCandlesAll this.currentCandleIndex = ",klineScene.currentCandleIndex);
			return;
		}	
		else
		{
			klineScene.sellClick();
			this.setButtonsToSellPosition();
		}
		
	},
	
	sellCloseClick:function()
	{
		var klineScene=this.parent.parent;
		klineScene.sellClick();
		
		this.setButtonsToNoPosition();
	},
	
	//画买卖开平等按钮
	drawDisableButtons:function()
	{
		this.buyDisableSprite.setVisible(false);
		this.buyCloseDisableSprite.setVisible(false);
		this.sellDisableSprite.setVisible(false);
		this.sellCloseDisableSprite.setVisible(false);
		
		
		/*
		var start=cc.p(77,44);
		var end=cc.p(136,44);
		this.matchInfoArea.drawSegment(start,end,4,cc.color(62,62,62,255));
		
		start=cc.p(600,44);
		end=cc.p(659,44);
		this.matchInfoArea.drawSegment(start,end,4,cc.color(62,62,62,255));
		
		this.buyDisableSprite.setPosition(cc.p(77,44));
		this.buyCloseDisableSprite.setPosition(cc.p(136,44));
		this.sellDisableSprite.setPosition(cc.p(600,44));
		this.sellCloseDisableSprite.setPosition(cc.p(659,44));
		*/
	},
	
	drawAreaBorder:function()
	{
		 //给这个矩形区域添加红色的边框
		 /*
		 this.matchInfoArea.drawRect(cc.p(0,0),cc.p(this.matchInfoArea.width, this.matchInfoArea.height),cc.color(0,0,0,0),1,cc.color(0,255,255,255));
		 this.matchInfoArea.drawRect(cc.p(0,0),cc.p(this.width, this.height),cc.color(0,0,0,0),1,cc.color(255,255,255,255));
		 */
	},
	
	buyButtonCallBack:function()
	{
		var klineScene=arguments[0].parent.parent.parent.parent;
		klineScene.buyClick();
	},
	
	sellButtonCallBack:function()
	{
		var klineScene=arguments[0].parent.parent.parent.parent;
		klineScene.sellClick();
	},
	
	setReplayKLineScene:function()
	{
		//this.speedControlLayer.setVisible(false);
		this.btnAgain.setVisible(true);
		this.btnShare.setVisible(true);
	},

    setShareKLineScene:function()
    {
        this.meBtnStart.setVisible(true);
    },
	
	setStart:function()
    {
        this.btnStart.setVisible(true);
    },
	
	start:function()
	{
		var klineScene=this.parent.parent;
        gSocketConn.SendBeginMessage();
		klineScene.setCountDownSprite();
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
    meStart:function()
    {
        if(this.startCallBackFunction!=null)
        {
            this.startCallBackFunction();
        }
    },
});// JavaScript Document