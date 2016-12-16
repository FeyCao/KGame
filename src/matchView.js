/**
 * Created by Administrator on 2016-12-13.
 */
var MatchViewLayer = cc.Layer.extend({

    closeCallBackFunction:null,

    backgroundSprite:null,//
    selfNameLabel:null, //自己的名字
    opponentNameLabel:null,//对手的名字
    opponentSprite:null,
    PersonBattleView:null,
    AiBattleView:null,


    onEnter: function () {
        this._super();
        // this.setColor();
        this.setOpacity(160);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },

    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    },
    ctor:function () {
        this._super();
        // this.onEnter();
        this.init();

    },

    init:function () {
        var self=this;
        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;
        var posD = 50;
        var posY = 100;
        var fontSize = 25;


        var matchInfoMessage =userInfo.matchMode+"#"+userInfo.matchAiMode+"#"+userInfo.matchDayCount;
        cc.log(" begin matchInfoMessage="+matchInfoMessage);
        this.refreshMatchViewLayer();

        return true;
    },

    toMainScene:function () {
        cc.log(" toMainScene:function () begin");
        if(this.closeCallBackFunction!=null){
            this.closeCallBackFunction();
        }
    },

    beginMatch:function(){
        var self =this;
        var matchInfoMessage =userInfo.matchMode+"#"+userInfo.matchAiMode+"#"+userInfo.matchDayCount;
        cc.log(" beginMatch:function() begin matchInfoMessage="+matchInfoMessage);

        switch (userInfo.matchMode)
        {

            case 0:
            {

                if(null!=gMainMenuScene)
                {
                    gSocketConn.BeginMatch(matchInfoMessage);
                    cc.log("gMainMenuScene切换KGameScene场景调用完毕");
                }else{
                    var klineSceneNext=new KLineScene();
                    klineSceneNext.onEnteredFunction=function(){

                        // klineSceneNext.showProgress();
                    };
                    gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);
                    gSocketConn.BeginMatch(matchInfoMessage);
                    //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
                    cc.director.runScene(klineSceneNext);
                    cc.log("klineSceneNext切换KGameScene场景调用完毕");
                }

                break;
            }
            case 1:
            {

                self.unmatchButton.setVisible(true);
                self.beginButton.setVisible(false);
                self.textLabel.setVisible(true);
                //
                // var klineSceneNext=new KLineScene();
                // klineSceneNext.onEnteredFunction=function(){
                //
                //     // klineSceneNext.showProgress();
                // };
                // gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);
                // gSocketConn.BeginMatch(matchInfoMessage);
                //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));

                // cc.director.runScene(klineSceneNext);
                if(null!=gMainMenuScene)
                {
                    gSocketConn.BeginMatch("1");
                    this.showHeadChange();
                }

                break;
            }
            case 2:
            {
                if(null!=gMainMenuScene)
                {
                    gSocketConn.BeginMatch(matchInfoMessage);
                    cc.log("gMainMenuScene切换KGameScene场景调用完毕");
                }else{
                    var klineSceneNext=new KLineScene();
                    klineSceneNext.onEnteredFunction=function(){

                        // klineSceneNext.showProgress();
                    };
                    gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);
                    gSocketConn.BeginMatch(matchInfoMessage);
                    //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
                    cc.director.runScene(klineSceneNext);
                    cc.log("klineSceneNext切换KGameScene场景调用完毕");
                }

                break;
            }
            case 3:
            {
                break;
            }
            default:
            {
                cc.log("userInfo.recordMode=="+userInfo.recordMode);
                break;
            }
        }

    },

    unMatch:function(){
        cc.log(" unMatch:function() begin");

        this.unmatchButton.setVisible(false);
        this.textLabel.setVisible(false);
        this.beginButton.setVisible(true);
        gSocketConn.SendInfoMessage("UNMATCH","");
        this.stopHeadChange();
        this.toMainScene();
    },

    showLayer:function()
    {
        this.setVisible(true);
        this.scheduler.resumeTarget(this);
        this.actionManager && this.actionManager.resumeTarget(this);
        cc.eventManager.resumeTarget(this,true);
    },

    hideLayer:function()
    {
        this.setVisible(false);
        this.scheduler.pauseTarget(this);
        this.actionManager && this.actionManager.pauseTarget(this);
        cc.eventManager.pauseTarget(this,true);
    },

    // setPracticeBattleView:function(){
    //
    //     if(this.AiBattleView ==null){
    //
    //     }
    // },

    setAiBattleView:function(){
        var self=this;
        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;
        var posD = 70;
        var posY = 80;
        var fontSize = 25;

        if(this.AiBattleView ==null){



            this.AiBattleView =new cc.LayerColor(cc.color(0,0,0,127),size.width,size.height);
            var bgSprite=cc.Sprite.create("res/bg_control.png");
            bgSize = bgSprite.getContentSize();

            bgSprite.initWithFile("res/bg_select.png");
            cc.log("MatchViewLayer backgroundSprite bgSize="+bgSize.width);



            var mu = new cc.Menu();
            mu.x = 0;
            mu.y = 0;
            bgSprite.addChild(mu,3);
            // closeBtn=new Button("res/close.png");
            var closeBtn = new cc.MenuItemImage("res/close.png", "res/close.png", self.toMainScene, this);
            closeBtn.setPosition(cc.p(bgSize.width-40,bgSize.height-40));
            mu.addChild(closeBtn);
            var beginButton=new cc.MenuItemImage("res/btn_begin.png", "res/btn_begin.png", self.beginMatch, this);//new CheckButton("res/btn_begin.png","res/btn_begin.png");//new Button("res/btn_mode1d.png");
            beginButton.setPosition(cc.p(bgSize.width/2,posY));
            mu.addChild(beginButton);

            var posX0 = 120;
            var spaceX = 110 ;
            var spaceY = 60 ;
            dayCount1Btn =  new cc.MenuItemImage("res/select_60.png", "res/select_60.png", self.setDayCount1, this);
            dayCount1Btn.setPosition(cc.p(posX0+spaceX*1,bgSize.height/2+spaceY));
            dayCount1Btn.setTag(101);
            mu.addChild(dayCount1Btn);

            dayCount2Btn =  new cc.MenuItemImage("res/select_120.png", "res/select_120.png", self.setDayCount2, this);
            dayCount2Btn.setPosition(cc.p(posX0+spaceX*2,bgSize.height/2+spaceY));
            dayCount2Btn.setTag(102);
            mu.addChild(dayCount2Btn);

            dayCount3Btn =  new cc.MenuItemImage("res/select_180.png", "res/select_180.png", self.setDayCount3, this);
            dayCount3Btn.setPosition(cc.p(posX0+spaceX*3,bgSize.height/2+spaceY));
            dayCount3Btn.setTag(103);
            mu.addChild(dayCount3Btn);

            dayCount4Btn =  new cc.MenuItemImage("res/select_240.png", "res/select_240.png", self.setDayCount4, this);
            dayCount4Btn.setPosition(cc.p(posX0+spaceX*4,bgSize.height/2+spaceY));
            dayCount4Btn.setTag(104);
            mu.addChild(dayCount4Btn);


            AiMode1Btn =  new cc.MenuItemImage("res/select_1.png", "res/select_1.png", self.setAiMode1, this);
            AiMode1Btn.setPosition(cc.p(posX0+spaceX*1,bgSize.height/2-posD));
            AiMode1Btn.setTag(101);
            mu.addChild(AiMode1Btn);

            AiMode2Btn =  new cc.MenuItemImage("res/select_2.png", "res/select_2.png", self.setAiMode2, this);
            AiMode2Btn.setPosition(cc.p(posX0+spaceX*2,bgSize.height/2-posD));
            AiMode2Btn.setTag(102);
            mu.addChild(AiMode2Btn);

            AiMode3Btn =  new cc.MenuItemImage("res/select_3.png", "res/select_3.png", self.setAiMode3, this);
            AiMode3Btn.setPosition(cc.p(posX0+spaceX*3,bgSize.height/2-posD));
            AiMode3Btn.setTag(103);
            mu.addChild(AiMode3Btn);

            AiMode4Btn =  new cc.MenuItemImage("res/select_4.png", "res/select_4.png", self.setAiMode4, this);
            AiMode4Btn.setPosition(cc.p(posX0+spaceX*4,bgSize.height/2-posD));
            AiMode4Btn.setTag(104);
            mu.addChild(AiMode4Btn);

            AiMode5Btn =  new cc.MenuItemImage("res/select_5.png", "res/select_5.png", self.setAiMode5, this);
            AiMode5Btn.setPosition(cc.p(posX0+spaceX*5,bgSize.height/2-posD));
            AiMode5Btn.setTag(104);
            mu.addChild(AiMode5Btn);


            dayCountSelect = cc.Sprite.create("res/select_bg.png");
            switch(userInfo.matchDayCount)
            {
                case 60:
                    dayCountSelect.setPosition(dayCount1Btn.getPosition());
                    break;
                case 120:
                    dayCountSelect.setPosition(dayCount2Btn.getPosition());
                    break;
                case 180:
                    dayCountSelect.setPosition(dayCount3Btn.getPosition());
                    break;
                case 240:
                    dayCountSelect.setPosition(dayCount4Btn.getPosition());
                    break;
                default:
                    break;
            }
            bgSprite.addChild(dayCountSelect,3);

            AiModeSelect = cc.Sprite.create("res/select_bg.png");
            // AiModeSelect.setScale(1.05);
            switch(userInfo.matchAiMode)
            {
                case "DON":
                    AiModeSelect.setPosition(AiMode1Btn.getPosition());
                    break;
                case "3MA":
                    AiModeSelect.setPosition(AiMode2Btn.getPosition());
                    break;
                case "1MA":
                    AiModeSelect.setPosition(AiMode3Btn.getPosition());
                    break;
                case "BOOL":
                    AiModeSelect.setPosition(AiMode4Btn.getPosition());
                    break;
                case "3RED":
                    AiModeSelect.setPosition(AiMode5Btn.getPosition());
                    break;
                default:
                    break;
            }
           // AiModeSelect.setPosition(AiMode1Btn.getPosition());
            bgSprite.addChild(AiModeSelect,3);

            bgSprite.setScale(fXScale,fYScale);
            bgSprite.setPosition(size.width/2,size.height/2);
            this.AiBattleView.addChild(bgSprite);
            this.addChild(this.AiBattleView);
            this.AiBattleView.setVisible(true);
        }
        this.AiBattleView.setVisible(true);
        if(this.PersonBattleView !=null){

            this.PersonBattleView.setVisible(false);
        }
    },

    setDayCount1:function()
    {
        userInfo.matchDayCount = 60;
        dayCountSelect.setPosition(dayCount1Btn.getPosition());
    },
    setDayCount2:function()
    {
        userInfo.matchDayCount = 120;
        dayCountSelect.setPosition(dayCount2Btn.getPosition());
    },
    setDayCount3:function()
    {
        userInfo.matchDayCount = 180;
        dayCountSelect.setPosition(dayCount3Btn.getPosition());
    },
    setDayCount4:function()
    {
        userInfo.matchDayCount = 240;
        dayCountSelect.setPosition(dayCount4Btn.getPosition());
    },
    // setDayCount:function(tag, pMenuItem)
    // {
    //     cc.log(" setDayCount tag=="+tag);
    //     switch(tag)
    //     {
    //         case 101:
    //             userInfo.matchDayCount = 60;
    //             break;
    //         case 102:
    //             userInfo.matchDayCount = 120;
    //             break;
    //         case 103:
    //             userInfo.matchDayCount = 180;
    //             break;
    //         default:
    //             break;
    //     }
    // },
    setAiMode1:function(){
        userInfo.matchAiMode = "DON";
        AiModeSelect.setPosition(AiMode1Btn.getPosition());
    },
    setAiMode2:function(){
        userInfo.matchAiMode = "3MA";
        AiModeSelect.setPosition(AiMode2Btn.getPosition());
    },
    setAiMode3:function(){
        userInfo.matchAiMode = "1MA";
        AiModeSelect.setPosition(AiMode3Btn.getPosition());
    },
    setAiMode4:function(){
        userInfo.matchAiMode = "BOOL";
        AiModeSelect.setPosition(AiMode4Btn.getPosition());
    },
    setAiMode5:function(){
        userInfo.matchAiMode = "3RED";
        AiModeSelect.setPosition(AiMode5Btn.getPosition());
    },

    setPersonBattleView:function(){
        var self=this;
        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;
        var posD = 50;
        var posY = 100;
        var fontSize = 25;

        if(this.AiBattleView !=null){
            this.AiBattleView.setVisible(false);
        }
        if(this.PersonBattleView ==null){
            this.PersonBattleView =new cc.LayerColor(cc.color(0,0,0,127),size.width,size.height);

            this.backgroundSprite=cc.Sprite.create("res/bg_control.png");

            this.backgroundSprite.initWithFile("res/bg_match.png");
            bgSize = this.backgroundSprite.getContentSize();
            cc.log("MatchViewLayer backgroundSprite bgSize="+bgSize.width);


            selfSprite = cc.Sprite.create("res/bg_touxiang.png");
            selfSprite.setPosition(bgSize.width/4,bgSize.height/2+posD);
            this.backgroundSprite.addChild(selfSprite,2);

            vsSprite = cc.Sprite.create("res/vs.png");
            vsSprite.setPosition(bgSize.width/2,bgSize.height/2+posD);
            this.backgroundSprite.addChild(vsSprite,2);
            this.textLabel = cc.LabelTTF.create("匹配中...", "Arial", fontSize);
            this.textLabel.setPosition(bgSize.width/2,bgSize.height/2-50);
            this.textLabel.setColor(YellowColor);
            this.textLabel.setVisible(false);
            this.backgroundSprite.addChild(this.textLabel,2);


            opponentBg = cc.Sprite.create("res/bg_touxiang.png");
            opponentBg.setPosition(bgSize.width/4*3,bgSize.height/2+posD);
            this.backgroundSprite.addChild(opponentBg,2);

            this.selfNameLabel = cc.LabelTTF.create(userInfo.nickName, "Arial", fontSize);
            this.selfNameLabel.setPosition(bgSize.width/4,bgSize.height/2-50);
            this.backgroundSprite.addChild(this.selfNameLabel,2);

            this.opponentNameLabel = cc.LabelTTF.create("_ _ _ _ _", "Arial", fontSize);
            this.opponentNameLabel.setPosition(bgSize.width/4*3,bgSize.height/2-50);
            this.backgroundSprite.addChild(this.opponentNameLabel,2);

            var mu = new cc.Menu();
            mu.x = 0;
            mu.y = 0;
            this.backgroundSprite.addChild(mu,3);
            // closeBtn=new Button("res/close.png");
            closeBtn = new cc.MenuItemImage("res/close.png", "res/close.png", self.unMatch, this);
            closeBtn.setPosition(cc.p(bgSize.width-40,bgSize.height-40));
            mu.addChild(closeBtn);

            if(userInfo.headSprite!=null)
            {
                var url = userInfo.headSprite;
                cc.loader.loadImg(url, {isCrossOrigin : false }, function(err,img){
                    if(err){
                        cc.log(err);
                        cc.log("fail loadImg="+userInfo.headSprite); // self.addChild(logo);
                    }
                    if(img)
                    {
                        var headSprite = new cc.Sprite();
                        var texture2d = new cc.Texture2D();
                        texture2d.initWithElement(img);
                        texture2d.handleLoadedTexture();
                        headSprite.initWithTexture(texture2d);

                        var size = headSprite.getContentSize();
                        headSprite.setScale(90/size.width,90/size.height);
                        headSprite.setPosition(bgSize.width/4,bgSize.height/2+posD);
                        self.backgroundSprite.addChild(headSprite,2);
                        cc.log("refreshMatchViewLayer success loadImg="+userInfo.headSprite); // self.addChild(logo);
                    }
                });
            }
            if(userInfo.nickName!=null&&self.selfNameLabel!=null)
            {
                self.selfNameLabel.setString(cutstr(userInfo.nickName,11));
            }


            // this.opponentSprite = new HeadSpriteChange(100,100);
            // this.opponentSprite.setPosition(bgSize.width/4*3,bgSize.height/2+posD);
            // this.opponentSprite.setVisible(false);

            this.beginButton=new cc.MenuItemImage("res/btn_begin.png", "res/btn_begin.png", self.beginMatch, this);//new CheckButton("res/btn_begin.png","res/btn_begin.png");//new Button("res/btn_mode1d.png");
            this.beginButton.setPosition(cc.p(bgSize.width/2,posY));
            mu.addChild(this.beginButton);

            this.unmatchButton=new cc.MenuItemImage("res/btn_unmatch.png", "res/btn_unmatch.png", self.unMatch, this);//new CheckButton("res/btn_unmatch.png","res/btn_unmatch.png");//new Button("res/btn_mode1d.png");
            this.unmatchButton.setPosition(cc.p(bgSize.width/2,posY));
            this.unmatchButton.setVisible(false);
            mu.addChild(this.unmatchButton);
            // soundButton.setScale(0.8);
            // unmatchButton.setClickEvent(function(){
            //
            //     // cc.audioEngine.stopMusic();
            // });
            // unmatchButton.setTextureByStatus(!userInfo.buttonSoundFlag);
            // this.backgroundSprite.addChild(unmatchButton,5);

            this.backgroundSprite.setScale(fXScale,fYScale);
            this.backgroundSprite.setPosition(size.width/2,size.height/2);
            this.PersonBattleView.addChild(this.backgroundSprite);
            this.addChild(this.PersonBattleView);
        }
        this.PersonBattleView.setVisible(true);
    },



    refreshMatchViewLayer:function()
    {
        var self =this;
        cc.log( "refreshMatchViewLayer"+userInfo.headSprite);
        switch (userInfo.matchMode)
        {

            case 0:
            {

                self.setAiBattleView();
                break;
            }
            case 1:
            {
                self.setPersonBattleView();
                break;
                // this.mode3Button.setDisabled(true);winOfMatchForMore"
                break;
            }
            case 2:
            {
                self.setAiBattleView();

                break;
            }
            case 3:
            {
                break;
            }
            default:
            {
                cc.log("userInfo.recordMode=="+userInfo.recordMode);
                break;
            }
        }
    },


    showHeadChange:function()
    {
        // var frameCache = cc.spriteFrameCache;
        // frameCache.addSpriteFrames("res/touxiang.plist","res/touxiang.png");
        var frameName = "res/touxiang_"+Math.round(Math.random()*100)%10+".png";
        cc.log("frameName = " + frameName);

        if(this.opponentSprite!=null)
        {
            this.opponentSprite.setVisible(true);
            this.opponentSprite.initWithFile(frameName);
            var size = this.opponentSprite.getContentSize();
            this.opponentSprite.setScale(90/size.width,90/size.height);
            // this.opponentSprite.setContentSize(size);
        }
        else {
            this.opponentSprite = new cc.Sprite(frameName);
            this.opponentSprite.setPosition(bgSize.width/4*3,bgSize.height/2+50);

            var size = this.opponentSprite.getContentSize();
            this.opponentSprite.setScale(90/size.width,90/size.height);
            this.backgroundSprite.addChild(this.opponentSprite, 1);
            // this.opponentSprite.runAction(cc.repeatForever(action));
        }
        var self =this;
        pageTimer["Change"] = setTimeout(function(){self.showHeadChange();},200);
    },

    stopHeadChange:function()
    {
        cc.log("stopHeadChange= begin");
        if(this.opponentSprite!=null&&null!=pageTimer["Change"] )
        {
            this.opponentSprite.setVisible(false);
            clearTimeout(pageTimer["Change"]);
            cc.log("stopHeadChange= end");
        }
    },
});
