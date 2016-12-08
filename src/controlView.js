/**
 * Created by Administrator on 2016-11-30.
 */

var ControlViewLayer = cc.Layer.extend({

    closeCallBackFunction:null,

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
        var winSize = cc.director.getWinSize();
        var self=this;

        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;


        this.backgroundSprite=cc.Sprite.create("res/control_bg.png");
        this.backgroundSprite.setScale(fXScale,fYScale);
        this.backgroundSprite.setPosition(size.width/2,size.height/2);
        this.addChild(this.backgroundSprite);

        var bgSize = this.backgroundSprite.getContentSize();



        this.closeButton=new Button("res/close.png");
        // this.closeButton.setScale(fXScale,fYScale);
        //this.closeButton.setPosition(cc.p(size.width,size.height));
        this.closeButton.setPosition(cc.p(bgSize.width-40,bgSize.height-40));
        this.closeButton.setClickEvent(function(){
            cc.log("closeButton ClickEvent");
            self.toMainScene();
        });
        this.backgroundSprite.addChild(this.closeButton);



        var fontSize = 40;
        // var posY = bgSize.height/2-20;
        // var posX = 100;
        var posX = 100;
        var posY = bgSize.height/2-50;
        var posX1 =50;
        // var posY1 =20;
        text1Label = new cc.LabelTTF( "音乐", "Arial", fontSize);
        text1Label.setPosition(cc.p(posX+posX1,posY+120));
        text1Label.setAnchorPoint(0,0.5);
        text1Label.setColor(WhiteColor);
        this.backgroundSprite.addChild(text1Label);

        text2Label = new cc.LabelTTF( "音效", "Arial", fontSize);
        text2Label.setPosition(cc.p(posX+posX1,posY));
        text2Label.setAnchorPoint(0,0.5);
        text2Label.setColor(WhiteColor);
        this.backgroundSprite.addChild(text2Label);

        text3Label = new cc.LabelTTF( "清晰度", "Arial", fontSize);
        text3Label.setPosition(cc.p(posX,posY-100));
        text3Label.setAnchorPoint(0,0.5);
        text3Label.setColor(WhiteColor);


        soundBgButton=new CheckButton("res/btn_open.png","res/btn_close.png");//new Button("res/btn_mode1d.png");
        soundBgButton.setPosition(cc.p(bgSize.width/2+posX1,posY+120));
        // soundBgButton.setScale(0.8);
        soundBgButton.setClickEvent(function(){
            cc.log("soundBgButton ClickEvent");
            if(soundBgButton.isSelected==false)
            {
                cc.log("soundBgButton.isSelected()==true");
                userInfo.bgSoundFlag=true;
            }
            else
            {
                userInfo.bgSoundFlag=false;
            }

            if(userInfo.bgSoundFlag==true){

                if(cc.audioEngine.isMusicPlaying()==false)
                {
                    var musicFile = "res/sound/home_bg.mp3";
                    cc.audioEngine.playMusic(musicFile,true);
                }
            }else
            {
                if(cc.audioEngine.isMusicPlaying()==true)
                {
                    cc.audioEngine.stopMusic();
                }
            }
            // cc.audioEngine.stopMusic();

        });
        soundBgButton.setTextureByStatus(!userInfo.bgSoundFlag);
        this.backgroundSprite.addChild(soundBgButton,5);

        soundButton=new CheckButton("res/btn_open.png","res/btn_close.png");//new Button("res/btn_mode1d.png");
        soundButton.setPosition(cc.p(bgSize.width/2+posX1,posY));
        // soundButton.setScale(0.8);
        soundButton.setClickEvent(function(){
            cc.log("soundBgButton ClickEvent");
            if(soundButton.isSelected==false)
            {
                cc.log("soundButton.isSelected()==true");
                userInfo.buttonSoundFlag =true;
                // var musicFile = "res/sound/home_bg.mp3";
                // cc.audioEngine.playMusic(musicFile,true);
            }
            else
            {
                cc.log("soundButton.isSelected()==false");
                userInfo.buttonSoundFlag =false;// cc.audioEngine.stopMusic();
            }
            // cc.audioEngine.stopMusic();

        });
        soundButton.setTextureByStatus(!userInfo.buttonSoundFlag);
        this.backgroundSprite.addChild(soundButton,5);

        bdButton=new CheckButton("res/btn_general.png","res/btn_general1.png");
        bdButton.setPosition(cc.p(bgSize.width/2-20,posY-100));
        // bdButton.setScale(0.8);
//"res/btn_general.png","res/btn_hd.png","res/btn_hd1.png","res/btn_general1.png",
        hdButton=new CheckButton("res/btn_hd.png","res/btn_hd1.png");
        hdButton.setPosition(cc.p(bgSize.width/2+200,posY-100));
        // hdButton.setScale(0.8);

        bdButton.setTextureByStatus(!userInfo.viewFlag);
        hdButton.setTextureByStatus(userInfo.viewFlag);

        bdButton.setClickEvent(function(){

            userInfo.viewFlag=!bdButton.isSelected;
            cc.view.enableRetina(userInfo.viewFlag);
            hdButton.setTextureByStatus(!bdButton.isSelected);
            cc.log("userInfo.viewFlag"+userInfo.viewFlag);
        });

        hdButton.setClickEvent(function(){
            userInfo.viewFlag=hdButton.isSelected;
            cc.view.enableRetina(userInfo.viewFlag);
            // cc.view.enableRetina(true);
            bdButton.setTextureByStatus(!hdButton.isSelected);
            cc.log("userInfo.viewFlag"+userInfo.viewFlag);
        });

        // this.backgroundSprite.addChild(text3Label);
        // this.backgroundSprite.addChild(bdButton,5);
        // this.backgroundSprite.addChild(hdButton,5);

        this.refreshControlViewLayer();

        return true;
    },

    toMainScene:function () {
        if(this.closeCallBackFunction!=null){
            this.closeCallBackFunction();
        }
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
    refreshControlViewLayer:function()
    {


    }
});


