//var gMainMenusSceneInst;
var MainMenuScene =SceneBase.extend(
{
	klineScene:null,

    userId:null,
    deviceId:null,
    source:null,

	backgroundLayer:null,
	backgroundSprite:null,
    touxiangSprite:null,
	//praticeButton:null,
	//configButton:null,
	
	userNameLabel:null,				//自己的名字
    selfNameLabel:null, //自己的名字
	selfScoreLabel:null,			//自己的分数
   // "winOfMatchForOne":0,"sumOfMatchForOne":2,"winOfMatchForMore":0,"sumOfMatchForMore":0,"gainCumulation":0.0,"sumOfAllMatch":2}

    winOfMatchForOne:null,
    sumOfMatchForOne:null,
    winOfMatchForMore:null,
    gainCumulation:null,
    sumOfAllMatch:null,
    renjizhanLabel:null,


	firstMode:null,
	secondMode:null,
	thirdMode:null,
	fourthMode:null,
    zhanjiInfoLayer:null,
    loadTime:null,
    onEnteredFunction:null,	//OnEnter调用结束后的Function


    _itemMenu:null,

    ctor: function ()
    {

        this._super();
        this.backgroundLayer=null;
        this.backgroundSprite=null;
        this.selfNameLabel=null;
        this.infoLabel=null;
        this.winOneLabel=null;
        this.sumOneLabel=null;
        this.winAILabel=null;
        this.sumAILabel=null;
        // this.winOneLabel=null;
        // this.sumOneLabel=null;
        // this.winOneLabel=null;
        // this.sumOneLabel=null;
        //this.winOfMatchForMore=null;
        //this.gainCumulation=null;
        //this.sumOfAllMatch=null;
        this.renjizhanLabel=null;

        this.firstMode=null;
        this.secondMode=null;


        this.zhanjiInfoLayer=null;
       // this.klineScene=null;
        this.onEnteredFunction=null;
    },
	onEnter:function () 
	{
        cc.log("MainMenuScene onEnter begin");
		this._super();
        gMainMenuScene=this;
		//gMainMenusSceneInst=this;

        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;
        var pButtonY = 520;
        var pButtonScale = cc.p(30*fXScale,55*fYScale);


		var self=this;
        console.log("fXScale="+fXScale);
		console.log("fYScale="+fYScale);




		//先入队等待
		//"res/mainMenu_bg.png","res/btn_control.png","res/btn_zhanji.png","res/btn_paihang.png","res/btn_help.png"，"res/btn_model1_u.png","res/btn_model1_d.png"，"res/btn_model2_u.png","res/btn_model2_d.png"，"res/btn_model3_u.png","res/btn_model3_d.png"，"res/btn_model4_u.png","res/btn_model4_d.png"
		this.backgroundLayer=new cc.Layer();
		this.addChild(this.backgroundLayer, 1);
		
		this.backgroundSprite=cc.Sprite.create("res/mainMenu_bg.png");
		this.backgroundSprite.setScale(fXScale,fYScale);
		this.backgroundSprite.setPosition(size.width/2,size.height/2);

        this.touxiangSprite = cc.Sprite.create("res/touxiang.png");
        this.touxiangSprite.setScale(fXScale,fYScale);
        this.touxiangSprite.setPosition(cc.p(180*fXScale,500*fYScale));
        this.backgroundLayer.addChild(this.touxiangSprite,2);

        this.selfNameLabel = cc.LabelTTF.create(userInfo.nickName, "Arial", 15);
        // this.selfNameLabel.setScale(0.8);
        this.selfNameLabel.setAnchorPoint(0,0.5);
        this.selfNameLabel.setPosition(cc.p(240*fXScale,520*fYScale));
        this.backgroundLayer.addChild(this.selfNameLabel,2);


        self.infoLabel=cc.LabelTTF.create("练习场:", "Arial",15);
        // self.infoLabel.setScale(0.8);
        //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        self.infoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        self.infoLabel.setAnchorPoint(0,0.5);
        // self.infoLabel.setColor(cc.color(0,0,0,255));
        self.infoLabel.setPosition(cc.p(450*fXScale,pButtonY*fYScale));
        self.backgroundLayer.addChild(self.infoLabel,5);

        self.winOneLabel= cc.LabelTTF.create("", "Arial",15);
        self.winOneLabel.setAnchorPoint(0,0.5);
        self.winOneLabel.setColor(YellowColor);
        self.winOneLabel.setPosition(cc.pAdd(self.infoLabel.getPosition(),cc.p(self.infoLabel.getContentSize().width,0)));
        this.backgroundLayer.addChild(self.winOneLabel,5);
        self.sumOneLabel= cc.LabelTTF.create("", "Arial",15);
        self.sumOneLabel.setAnchorPoint(0,0.5);
        self.sumOneLabel.setColor(WhiteColor);
        self.sumOneLabel.setPosition(cc.pAdd(self.winOneLabel.getPosition(),cc.p(self.winOneLabel.getContentSize().width,0)));
        this.backgroundLayer.addChild(self.sumOneLabel,5);

        self.infoLabelAI=cc.LabelTTF.create("人机战:", "Arial",15);
        // self.infoLabelAI.setScale(0.8);
        //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        self.infoLabelAI.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        self.infoLabelAI.setAnchorPoint(0,0.5);
        self.infoLabelAI.setPosition(cc.p(450*fXScale,(pButtonY-30)*fYScale));
        self.backgroundLayer.addChild(self.infoLabelAI,5);

        self.winAILabel= cc.LabelTTF.create("", "Arial",15);
        self.winAILabel.setAnchorPoint(0,0.5);
        self.winAILabel.setColor(YellowColor);
        self.winAILabel.setPosition(cc.pAdd(self.infoLabelAI.getPosition(),cc.p(self.infoLabelAI.getContentSize().width,0)));
        this.backgroundLayer.addChild(self.winAILabel,5);
        self.sumAILabel= cc.LabelTTF.create("", "Arial",15);
        self.sumAILabel.setAnchorPoint(0,0.5);
        self.sumAILabel.setColor(WhiteColor);
        self.sumAILabel.setPosition(cc.pAdd(self.winAILabel.getPosition(),cc.p(self.winAILabel.getContentSize().width,0)));
        this.backgroundLayer.addChild(self.sumAILabel,5);


        //设置对战信息时数据可能还没取到
        this.setDataforInfo();

        this.setButtonInfo();

        var pModeXdistance = 300;
		var pModeY = 240;

        this.firstMode=new CheckButton("res/btn_mode1_d.png","res/btn_mode1_u.png");
        this.firstMode.setScale(fXScale,fYScale);
        this.firstMode.setPosition(cc.p((190)*fXScale,pModeY*fYScale));
        this.firstMode.setClickEvent(function(){
            self.firstModeChanged();
        });

		this.secondMode=new CheckButton("res/btn_mode2_d.png","res/btn_mode2_u.png");
        this.secondMode.setScale(fXScale,fYScale);
		this.secondMode.setPosition(cc.p((190+pModeXdistance)*fXScale,pModeY*fYScale));
		this.secondMode.setClickEvent(function(){
            self.secondModeChanged();
        });
		
		this.thirdMode=new CheckButton("res/btn_mode3_u.png","res/btn_mode3_d.png");
        this.thirdMode.setScale(fXScale,fYScale);
		this.thirdMode.setPosition(cc.p((190+2*pModeXdistance)*fXScale,pModeY*fYScale));
//		this.thirdMode.setClickEvent(function(){
//			self.thirdModeChanged();
//		});
		
		this.fourthMode=new CheckButton("res/btn_mode4_u.png","res/btn_mode4_d.png");
        this.fourthMode.setScale(fXScale,fYScale);
		this.fourthMode.setPosition(cc.p((190+3*pModeXdistance)*fXScale,pModeY*fYScale));
//		this.fourthMode.setClickEvent(function(){
//			self.fourthModeChanged();
//		});
		
		this.backgroundLayer.addChild(this.backgroundSprite, 1);

		this.backgroundLayer.addChild(this.zhanjiButton, 2);
        this.backgroundLayer.addChild(this.configButton, 2);
        this.backgroundLayer.addChild(this.paimingButton, 2);
        this.backgroundLayer.addChild(this.helpButton, 2);
		this.backgroundLayer.addChild(this.firstMode, 2);
		this.backgroundLayer.addChild(this.secondMode, 2);
		this.backgroundLayer.addChild(this.thirdMode, 2);
		this.backgroundLayer.addChild(this.fourthMode, 2);



        this.btnHome=new Button("res/home.png");
        this.btnHome.setPosition(cc.p(40*fXScale,size.height-35*fYScale));
        this.btnHome.setScale(fXScale*0.8,fYScale*0.8);
        //this.btnHome.setScale(0.8);
        this.btnHome.setClickEvent(function(){self.toHome();});
        this.addChild(this.btnHome,123);
        //this.backgroundLayer.setScale(0.8);
		//this.firstMode.setChecked(true);
        //this.firstMode.setDisabled(true)
        loadTime=new Date().getTime();
        if(this.onEnteredFunction!=null)
        {
            this.onEnteredFunction();
        }


//test


        //
        // this._itemMenu = new cc.Menu();
        //
        //
        // var label = new cc.LabelTTF("setOpacity", "Arial", 25);
        // var menuItem1 = new cc.MenuItemLabel(label,this.setOpacityTest,this);
        // menuItem1.setPosition(cc.p(180*fXScale,500*fYScale));
        // this._itemMenu.addChild(menuItem1,101);
        //
        // // var touxiangSprite = cc.MenuItemImage("res/touxiang.png","res/touxiang.png",this.setOpacityTest,this);
        // // var touxiangSprite = cc.MenuItemImage("res/touxiang.png","res/touxiang.png",this.setOpacityTest,this);
        // //     // cc.Sprite.create("res/touxiang.png");
        // //touxiangSprite.setScale(fXScale,fYScale);
        // //touxiangSprite.setPosition(cc.p(180*fXScale,500*fYScale));
        //
        // // this._itemMenu.addChild(touxiangSprite,101);
        //
        //
        //
        //
        //
        // this._itemMenu.setPosition(0,0);
        // this.addChild(this._itemMenu,1);
        // cc.log("menu.x",this._itemMenu.getPositionX());
        //cc.log("menuItem.x",touxiangSprite.getPositionX());
	},

    onExit:function()
    {
        this._super();
        cc.eventManager.removeAllListeners();
        if(gSocketConn!=null)
            gSocketConn.UnRegisterEvent("onmessage",this.messageCallBack);
        this.removeAllChildrenWithCleanup(true);
        gMainMenuScene=false;

        cc.log("MainMenuScene onExit end");
    },

    setOpacityTest:function(){
        cc.log(".....setOpacityTest Touch Down");

    },
    setTouxiangTest:function(){
        cc.log(".....setTouxiangTest Touch Down");

    },
    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log(".....Touch Down");
                // this._topDisplayLabel.setString("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                cc.log(".....Touch Move");
                //this._topDisplayLabel.setString("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:
                cc.log(".....Touch Up");
                //this._topDisplayLabel.setString("Touch Up");
                break;

            case ccui.Widget.TOUCH_CANCELED:
                cc.log(".....Touch Cancelled");
                // this._topDisplayLabel.setString("Touch Cancelled");
                break;

            default:
                break;
        }
    },
    
    moveTofirstMode:function()
    {

        var self=gMainMenuScene;
        var endTime=new Date().getTime();
        if(endTime-loadTime>5000)
        {
            this.firstModeChanged();
        }
        else
        {
            setTimeout(function(){self.firstModeChanged,5000-(endTime-loadTime);});
        }
    },
    //
    // firstModeChanged:function()
    // {
    //     console.log("Waiting for .firstModeChanged"+this.secondMode.isSelected);
    //     console.log("准备切换到KGameScene下一个场景");
    //     this.stopProgress();
    //     var self =gMainMenuScene;
    //     if(self.klineScene==null)
    //     {
    //         self.klineScene=new KLineScene();
    //     }
    //
    //     //self.klineScene.onEnteredFunction=function(){
    //     //    self.klineScene.showProgress();
    //     //};
    //     gSocketConn.RegisterEvent("onmessage",self.klineScene.messageCallBack);
    //     gSocketConn.BeginMatch(0);
    //     //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
    //     cc.director.runScene(self.klineScene);
    //     console.log("切换KGameScene场景调用完毕");
    //     console.log("Waiting for .firstModeChanged end");
    // },
    firstModeChanged:function()
    {
        if(this.firstMode.isSelected==true)
        {
            console.log("Waiting for firstModeChanged");
            this.showProgress();
            var self =gMainMenuScene;
            // if(gKlineScene==null)
            // {
            //     gKlineScene=new KLineScene();
            // }

            var klineSceneNext=new KLineScene();
            klineSceneNext.onEnteredFunction=function(){

                // klineSceneNext.showProgress();
            };
            gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);

            userInfo.matchMode = 0;
           // gSocketConn.RegisterEvent("onmessage",gKlineScene.messageCallBack);
            gSocketConn.BeginMatch(userInfo.matchMode);
            //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
            cc.director.runScene(klineSceneNext);
            console.log("切换KGameScene场景调用完毕");
        }
    },

	secondModeChanged:function()
	{
		if(this.secondMode.isSelected==true)
		{
			console.log("Waiting for secondModeChanged");
            this.showProgress();
            var self =gMainMenuScene;
            // if(gKlineScene==null)
            // {
            //     gKlineScene=new KLineScene();
            // }

            var klineSceneNext=new KLineScene();
            klineSceneNext.onEnteredFunction=function(){

                // klineSceneNext.showProgress();
            };
            // gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);
            // cc.director.runScene(klineSceneNext);
            //gKlineScene.onEnteredFunction=function(){
            //    gKlineScene.showProgress();
            //};
            userInfo.matchMode = 2;
            //gSocketConn.RegisterEvent("onmessage",gKlineScene.messageCallBack);
            // gSocketConn.BeginMatch("0");
            gSocketConn.BeginMatch("2#DON");
            //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
            cc.director.runScene(klineSceneNext);
            console.log("切换KGameScene场景调用完毕");
		}
	},
	
	thirdModeChanged:function()
	{
		if(this.thirdMode.isSelected==true)
		{
			console.log("Waiting for thirdModeChanged");
		}
	},
	
	fourthModeChanged:function()
	{
		if(this.fourthMode.isSelected==true)
		{
			console.log("Waiting for fourthMode...");
		}
	},

	zhanji:function()
	{
        console.log("Waiting for zhanji...");
        //var userId=GetQueryString("userId");
        //userInfo.userId
        this.showProgress();
        if(userInfo.recordMode!=null)
		gSocketConn.SendZhanjiMessage(userInfo.userId,0,userInfo.recordMode);
        console.log("zhanji...end");
	},

    paiming:function()
    {

    },

	config:function()
	{
		
	},
    help:function()
    {

    },
    setButtonInfo:function()
    {
        var self =this;
        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;
        var pButtonY = 520;
        var pButtonScale = cc.p(28*fXScale,60*fYScale);

        this.zhanjiButton=new Button("res/btn_zhanji.png");
        this.zhanjiButton.setScale(fXScale,fYScale);
        this.zhanjiButton.setPosition(cc.p(780*fXScale,pButtonY*fYScale));

        this.zhanjiButton.setClickEvent(function(){
            console.log("zhanjiButton ClickEvent");
            self.zhanji();
        });
        this.zhanjiLabel=cc.LabelTTF.create("战绩", "fonts/Self.ttf",15);
        //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        this.zhanjiLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.zhanjiLabel.setAnchorPoint(0,0.5);
        this.zhanjiLabel.setPosition(cc.pSub(cc.p(780*fXScale,pButtonY*fYScale),pButtonScale));
        this.backgroundLayer.addChild(this.zhanjiLabel,5);


        this.paimingButton=new Button("res/btn_paihang.png");
        this.paimingButton.setScale(fXScale,fYScale);
        this.paimingButton.setPosition(cc.p(890*fXScale,pButtonY*fYScale));
        this.paimingButton.setClickEvent(function(){
            //self.paiming();
        });
        this.paimingLabel=cc.LabelTTF.create("排名", "fonts/Arial.ttf", 15);
        //this.paimingLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        this.paimingLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.paimingLabel.setAnchorPoint(0,0.5);
        this.paimingLabel.setPosition(cc.pSub(cc.p(890*fXScale,pButtonY*fYScale),pButtonScale));
        this.addChild(this.paimingLabel,5);

        this.helpButton=new Button("res/btn_help.png");
        this.helpButton.setScale(fXScale,fYScale);
        this.helpButton.setPosition(cc.p(1000*fXScale,pButtonY*fYScale));
        this.helpButton.setClickEvent(function(){
            //self.help();
        });
        this.helpLabel=cc.LabelTTF.create("帮助", "fonts/Georgia.ttf", 15);
        //this.helpLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        this.helpLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.helpLabel.setAnchorPoint(0,0.5);
        this.helpLabel.setPosition(cc.pSub(cc.p(1000*fXScale,pButtonY*fYScale),pButtonScale));
        this.backgroundLayer.addChild(this.helpLabel,5);

        this.configButton=new Button("res/btn_control.png");
        this.configButton.setScale(fXScale,fYScale);
        this.configButton.setPosition(cc.p(1110*fXScale,pButtonY*fYScale));
        this.configButton.setClickEvent(function(){
            //self.config();
        });
        this.configLabel=cc.LabelTTF.create("设置", "fonts/Arial.ttf", 15);
        //this.configLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        this.configLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.configLabel.setAnchorPoint(0,0.5);
        this.configLabel.setPosition(cc.pSub(cc.p(1110*fXScale,pButtonY*fYScale),pButtonScale));
        this.backgroundLayer.addChild(this.configLabel,5);

        this.paimingButton.setDisabled(true);
        this.helpButton.setDisabled(true);
        this.configButton.setDisabled(true);
    },
    setDataforInfo:function()
    {

        var self =this;

        if(userInfo.nickName!=null&&self.selfNameLabel!=null)
        {
            self.selfNameLabel.setString(userInfo.nickName);
        }
        if(userInfo.winOfMatchForOne!=null&&self.winOneLabel!=null)
        {
            cc.log("setDataforInfoW="+userInfo.winOfMatchForOne);
            self.winOneLabel.setPosition(cc.pAdd(self.infoLabel.getPosition(),cc.p(self.infoLabel.getContentSize().width,0)));
            self.winOneLabel.setString(userInfo.winOfMatchForOne);

            cc.log("setDataforInfoS="+ userInfo.sumOfMatchForOne);
            self.sumOneLabel.setString("/"+userInfo.sumOfMatchForOne);
            self.sumOneLabel.setPosition(cc.pAdd(self.winOneLabel.getPosition(),cc.p(self.winOneLabel.getContentSize().width,0)));
        }
        if(userInfo.winOfMatchForAI!=null&&self.winAILabel!=null)
        {
            cc.log("setDataforInfoW="+userInfo.winOfMatchForAI);
            self.winAILabel.setPosition(cc.pAdd(self.infoLabelAI.getPosition(),cc.p(self.infoLabelAI.getContentSize().width,0)));
            self.winAILabel.setString(userInfo.winOfMatchForAI);

            cc.log("setDataforInfoS="+ userInfo.sumOfMatchForAI);
            self.sumAILabel.setString("/"+userInfo.sumOfMatchForAI);
            self.sumAILabel.setPosition(cc.pAdd(self.winAILabel.getPosition(),cc.p(self.winAILabel.getContentSize().width,0)));
        }

    },
    setMainMenuScenedata:function(jsonText)
    {
        var data=JSON.parse(jsonText);
        console.log("setMainMenuScenedata jsonText parse over");
        // "winOfMatchForOne":0,"sumOfMatchForOne":3,"winOfMatchForMore":0,"sumOfMatchForMore":0,"winOfMatchForAI":8,"sumOfMatchForAI":11,"gainCumulation":"-6.223","sumOfAllMatch":3}

        userInfo.nickName=data["nickName"];
        userInfo.winOfMatchForOne=data["winOfMatchForOne"];
        userInfo.sumOfMatchForOne=data["sumOfMatchForOne"];
        userInfo.winOfMatchForMore=data["winOfMatchForMore"];
        userInfo.sumOfMatchForMore=data["sumOfMatchForMore"];
        userInfo.winOfMatchForAI=data["winOfMatchForAI"];
        userInfo.sumOfMatchForAI=data["sumOfMatchForAI"];
        userInfo.gainCumulation=data["gainCumulation"];
        userInfo.sumOfAllMatch=data["sumOfAllMatch"];

        this.setDataforInfo();
        //this.onShareklinedata(data);
    },
	messageCallBack:function(message)
	{
		var self=gMainMenuScene;
		var packet=Packet.prototype.Parse(message);
        console.log("messageCallBack mainScene message callback message=###"+message+"###");
		if(packet==null) return;
        switch(packet.msgType)
        {
            case "":
            {
                cc.log("gMainMenuScene packet.msgType =''");
                break;
            }
            case "P"://接收到了大厅数据的消息
            {
                console.log("call get MainMenuScene data");
                self.setMainMenuScenedata(packet.content);
                console.log("get MainMenuScene passed");
                self.stopProgress();
                break;
            }

            case "Z"://接收到战绩的数据
            {
                self.showZhanjiInfo(packet.content);
                self.stopProgress();
                break;
            }

            case "M"://人机对战结束信息
            {
                //收到对方买入的信息
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                if(gKlineScene!=null) {
                    gKlineScene.showMatchEndInfo(packet.content);
                }
                self.stopProgress();
                break;
            }
            // case "":
            // {
            //     cc.log("gMainMenuScene packet.msgType =''");
            //     break;
            // }
            // case "":
            // {
            //     cc.log("gMainMenuScene packet.msgType =''");
            //     break;
            // }
            case "8":
            {
                //收到对方买入的信息
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                if(gKlineScene!=null) {
                    var buyOperationIndex=parseInt(packet.content.split("#")[1]);
                    gKlineScene.opponentOperations.push(buyOperationIndex);
                    gKlineScene.refreshScores();
                }
                //alert("8="+packet.content);


            }

            case "9":
            {
                //收到对方卖出的信息
                //alert("9="+packet.content);
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                if(gKlineScene!=null) {
                    var sellOperationIndex=parseInt(packet.content.split("#")[1]);
                    gKlineScene.opponentOperations.push(-sellOperationIndex);
                    gKlineScene.refreshScores();
                }
                break;
            }

            case "4":
            {
                //
                //cc.director.runScene(cc.TransitionSlideInL.create(0.5,klineScene));
                self.opponentsInfo.push(packet.content);
                self.stopProgress();
                break;
            }
            case "5"://K线数据
            {
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();

                //接收到了K线数据的消息
                // gSocketConn.UnRegisterEvent("onmessage",gKlineScene.messageCallBack);
                if(gKlineScene!=null)
                {
                    console.log("call get kline data");
                    gKlineScene.getklinedata(packet.content);
                    cc.director.runScene(gKlineScene);
                    console.log("get kline passed");
                }
                self.stopProgress();
                break;
            }
            case "S":
            {
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                //接收到了K线数据的分享消息
                gKlineScene.share(packet.content);
                console.log("get kline K线数据的分享消息passed"+packet.content);
                break;
            }
            case "H":
            {
                //成功接收到了K线数据的分享数据
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                //接收到了分享的K线数据的消息
                // gSocketConn.UnRegisterEvent("onmessage",self.messageCallBack);
                if(gKlineScene!=null)
                {
                    console.log("call get kline data");
                    gKlineScene.getShareKlinedata(packet.content);
                    console.log("get kline passed");
                }
                self.stopProgress();
                console.log("成功接收到了K线数据的分享数据");
                break;
            }
            case "O"://观看记录
            {

                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                //接收到了分享的K线数据的消息
                // gSocketConn.UnRegisterEvent("onmessage",self.messageCallBack);
                if(gKlineScene!=null)
                {
                    console.log("begin to parse 观看记录json text");
                    var data=JSON.parse(packet.content);
                    console.log("jsonText parse 观看记录over");
                    gKlineScene.toSetklinedata(data);

                    if(gKlineScene.klineLayerMain!=null && gKlineScene.klineLayerPrev!=null)
                    {
                        gKlineScene.advanceToMainKLine_Record();
                    }
                    cc.director.runScene(gKlineScene);

                }
                self.stopProgress();
                // var klineSceneNext=new KLineScene();
                // klineSceneNext.onEnteredFunction=function(){
                //
                //     // klineSceneNext.showProgress();
                // };
                // //接收到了K线观看记录数据的消息
                // // gSocketConn.UnRegisterEvent("onmessage",gKlineScene.messageCallBack);
                // if(klineSceneNext!=null)
                // {
                //     console.log("call 观看记录 kline data");
                //     //self.getShareKlinedata
                //     klineSceneNext.getShareKlinedata(packet.content);
                //     console.log("get 观看记录 passed");
                // }
                // cc.director.runScene(klineSceneNext);
                break;
            }
            case "F":
            {
                //接收到对局结束
                //接收到对局结束
                //alert("接收到对局结束");
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                gKlineScene.showMatchEndInfo(packet.content);
                break;
            }
            case "G":
            {
                if(gKlineScene==null)
                    gKlineScene=new KLineScene();
                gKlineScene.showPlayerInfo(packet.content);
                break;
            }

            default:
            {
                console.log("KlineScene messageCallBack..."+message);
                break;
            }
        }


	},

    showZhanjiInfo:function(content)
    {
        console.log("showZhanjiInfo  visible = true");
        cc.log(content);
        var self=this;

        //"uid":"3434343770","totalCount":45,"winRate":0.0,"AvgGain":0.14939284434998082,"historyMatchList":[
        var data=JSON.parse(content);
        userInfo.userId = data["uid"];
        userInfo.totalCount=data["totalCount"];
        userInfo.winRate=data["winRate"];
        userInfo.AvgGain=data["AvgGain"];
        var historyMatchListData=data["historyMatchList"];
        console.log("historyMatchListData="+historyMatchListData);
        userInfo.MatchListData=[];
        for(var i=0;i<historyMatchListData.length;i++)
        {
            var matchData=historyMatchListData[i];
            cc.log("MatchListData.matchId="+matchData["matchId"]);
            userInfo.MatchListData.push(matchData);
            //this.klinedataMain.push({o:dailyData[5*i],x:dailyData[5*i+1],i:dailyData[5*i+2],c:dailyData[5*i+3],v:dailyData[5*i+4]});
            //this.MatchListData.push({matchId:matchData["matchId"],matchTime:matchData["matchId"],playerNum:matchData["matchId"],score:matchData["matchId"],uid:matchData["matchId"]});
        }



        if(this.zhanjiInfoLayer==null){
            this.zhanjiInfoLayer=new ZhanjiViewLayer();
            this.zhanjiInfoLayer.setVisible(false);
            this.zhanjiInfoLayer.setPosition(0,0);
            this.otherMessageTipLayer.addChild(this.zhanjiInfoLayer, 1,this.zhanjiInfoLayer.getTag());
            //this.zhanjiInfoLayer.applyParamsFromContent(content);
            //content的内容为:   总用户个数(假设为2)#用户名A#收益率A#得分A#用户名B#收益率B#得分B#品种名字#起始日期#终止日期
            this.zhanjiInfoLayer.closeCallBackFunction=function(){self.zhanjiInfoLayer_Close()};
            this.zhanjiInfoLayer.replayCallBackFunction=function(){self.MatchMoreEndInfoLayer_Replay()};
        }
        else
        {
            this.zhanjiInfoLayer.refreshZhanjiViewLayer();
        }


        this.zhanjiInfoLayer.showLayer();
        this.pauseLowerLayer();

    },
    zhanjiInfoLayer_Close:function()
    {
        //关闭战绩界面
        this.zhanjiInfoLayer.hideLayer();
        this.resumeLowerLayer();
    },
    toHome:function()
    {
        //window.close();
        window.location.href="http://analyse.kiiik.com";
    },
	//moveToNextScene:function()
	//{
	//	cc.director.runScene(this.klineScene);
	//	console.log("run scene called");
	//}

});