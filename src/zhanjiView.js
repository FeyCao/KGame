/**
 * Created by Administrator on 2016-10-17.
 */
//tabelviewLayer
var ZhanjiTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);

    },

    setCellData:function(idx){
        cc.log("ZhanjiTableViewCell setCellData=="+idx);
        var sprite = new cc.Sprite("res/line_bg.png");
        sprite.setPosition(cc.p(0,0));
        sprite.setAnchorPoint(0,0);
        this.addChild(sprite);
        if(userInfo.MatchListData!=null)
        {

            //{"matchId":6736,"uid":3434343770,"nickName":"红莲奥斯卡","score":"0.00","matchTime":"11-02 16:47","playerNum":1,"matchType":2}
            //设置用户名
            // strNameText= userInfo.MatchListData[idx]["uid"];
            strNameText= userInfo.MatchListData[idx]["nickName"];
            textNameLabel = new cc.LabelTTF(strNameText, "Arial", 35.0);
            textNameLabel.setPosition(cc.p(20,40));
            textNameLabel.setAnchorPoint(0,0.5);
            this.addChild(textNameLabel);

            //strText= "名字:"+userInfo.MatchListData[idx]["uid"]+"  收益:"+userInfo.MatchListData[idx]["score"]+"  "+userInfo.MatchListData[idx]["matchTime"];

            //设置收益
            strScoreText= userInfo.MatchListData[idx]["score"]+"%";
            textScoreLabel = new cc.LabelTTF(strScoreText, "Arial", 35.0);
            textScoreLabel.setPosition(cc.p(300,40));
            textScoreLabel.setAnchorPoint(0,0.5);
            if(userInfo.MatchListData[idx]["score"]>0)
            {
                textScoreLabel.setColor(RedColor);
            }
            else if(userInfo.MatchListData[idx]["score"]<0)
            {
                textScoreLabel.setColor(GreenColor);
            }
            else
            {
                textScoreLabel.setColor(WhiteColor);
            }
            this.addChild(textScoreLabel);


            //设置时间
            strTimeText= userInfo.MatchListData[idx]["matchTime"];
            textTimeLabel = new cc.LabelTTF(strTimeText, "Arial", 35.0);
            textTimeLabel.setPosition(cc.p(500,40));
            textTimeLabel.setAnchorPoint(0,0.5);
            textTimeLabel.setColor(WhiteColor);
            this.addChild(textTimeLabel);


            //设置查看交易记录按钮
            //设置查看交易记录按钮
            recordButton=new Button("res/btnRecord.png");
            recordButton.setAnchorPoint(0,0.5);
            recordButton.setPosition(cc.p(800,40));
            sprite.addChild(recordButton);
            var matchId = userInfo.MatchListData[idx]["matchId"];
            var userId = userInfo.MatchListData[idx]["nickName"];
            console.log("recordButton ClickEvent userId["+i+"] ="+userId+"||matchId="+matchId);
            recordButton.setClickEvent(function(){

                var klineSceneNext=new KLineScene();
                klineSceneNext.onEnteredFunction=function(){

                };
                userInfo.matchMode=userInfo.recordMode;
                gSocketConn.SendRecordMessage(userId,matchId);
                cc.director.runScene(klineSceneNext);

            });
        }
    },

});

var ZhanjiViewLayer = cc.Layer.extend({

    closeCallBackFunction:null,
    recordCallBackFunction:null,
  //  userId:null,
  ////  deviceId:null,
  //
  //  backgroundSprite:null,
  //
  //
  // // userNameLabel:null,				//自己的名字
  //  //selfScoreLabel:null,			//自己的分数
  //  // "winOfMatchForOne":0,"sumOfMatchForOne":2,"winOfMatchForMore":0,"sumOfMatchForMore":0,"gainCumulation":0.0,"sumOfAllMatch":2}
  //
  //  winOfMatchForOne:null,
  //  sumOfMatchForOne:null,
  //  winOfMatchForMore:null,
  //  gainCumulation:null,
  //  sumOfAllMatch:null,

    // m_touchListener:null,
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
        this.init();
        //this.MatchListData=null;
        //
        //this.userId=null;
        //this.totalCount=null;
        //this.winRate=null;
        //this.AvgGain=null;
        // this.infoLabel=null;
        // this.tableView=null;

    },




    init:function () {
        var winSize = cc.director.getWinSize();
        var self=this;

        var size = cc.director.getWinSize();
        var fXScale = size.width/1280;
        var fYScale = size.height/720;


        this.backgroundSprite=cc.Sprite.create("res/zhanji_bg.png");
        //this.backgroundSprite.setScale(fXScale,fYScale);
        this.backgroundSprite.setPosition(size.width/2,size.height/2);


        this.addChild(this.backgroundSprite);
        this.closeButton=new Button("res/zhanji_close.png");
        this.closeButton.setScale(fXScale,fYScale);
        //this.closeButton.setPosition(cc.p(size.width,size.height));
        this.closeButton.setPosition(cc.p(830,460));
        this.addChild(this.closeButton);


        this.setButtonList();

        text1Label = new cc.LabelTTF( "平均收益率:", "Arial", 25.0);
        text1Label.setPosition(cc.p(10,280));
        text1Label.setAnchorPoint(0,0);
        text1Label.setColor(WhiteColor);
        this.addChild(text1Label);

        text2Label = new cc.LabelTTF( "总局数:", "Arial", 25.0);
        text2Label.setPosition(cc.p(300,280));
        text2Label.setAnchorPoint(0,0);
        text2Label.setColor(WhiteColor);
        this.addChild(text2Label);

        text3Label = new cc.LabelTTF( "胜率:", "Arial", 25.0);
        text3Label.setPosition(cc.p(500,280));
        text3Label.setAnchorPoint(0,0);
        text3Label.setColor(WhiteColor);
        this.addChild(text3Label);

        if(userInfo!=null)
        {
            //var strValue = "平均收益率:"+userInfo.AvgGain+"       总局数:"+userInfo.totalCount+"     胜率:"+userInfo.winRate;
            //cc.log(strValue);
            this.avgGainLabel = new cc.LabelTTF( userInfo.AvgGain+"%", "Arial", 25.0);
            this.avgGainLabel.setPosition(cc.p(150,280));
            this.avgGainLabel.setAnchorPoint(0,0);
            this.avgGainLabel.setColor(RedColor);
            this.addChild(this.avgGainLabel);

            this.totalCountLabel = new cc.LabelTTF( userInfo.totalCount, "Arial", 25.0);
            this.totalCountLabel.setPosition(cc.p(400,280));
            this.totalCountLabel.setAnchorPoint(0,0);
            this.totalCountLabel.setColor(YellowColor);
            this.addChild(this.totalCountLabel);

            this.winRateLabel = new cc.LabelTTF( userInfo.winRate+"%", "Arial", 25.0);
            this.winRateLabel.setPosition(cc.p(580,280));
            this.winRateLabel.setAnchorPoint(0,0);
            this.winRateLabel.setColor(YellowColor);
            this.addChild(this.winRateLabel);
        }



        //if(this.infoLabel==null)
        //{
        //    this.infoLabel=cc.LabelTTF.create(strValue, "Arial",25);
        //    //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
        //    this.infoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        //    this.infoLabel.setAnchorPoint(0,0);
        //    this.infoLabel.setPosition(cc.p(50,280));
        //    this.addChild(this.infoLabel,5);
        //}

        this.closeButton.setClickEvent(function(){
            console.log("closeButton ClickEvent");
            self.toMainScene();
        });

        this.tableView = new cc.TableView(this, cc.size(1000, 360));
        this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        //tableView.setAnchorPoint(0,1);
        //cc.log(-winSize.width/2,-40);this
        this.tableView.setPosition(-128,-100);
        //tableView.setPosition(0,0);
        //tableView.x = winSize.width/2;
        //tableView.y = winSize.height / 2 - 150;
        //this.tableView.setScale(fXScale,fYScale);
        this.tableView.setDelegate(this);
        this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.tableView);
        this.tableView.reloadData();

        // Back Menu
        //var itemBack = new cc.MenuItemFont("Close", this.toMainLayer, this);
        //itemBack.x = winSize.width - 50;
        //itemBack.y = 25;
        //var menuBack = new cc.Menu(itemBack);
        //menuBack.x = 0;
        //menuBack.y = 0;
        //this.addChild(menuBack);

        this.setScale(fXScale,fYScale);
        return true;
    },

    setButtonList:function(){

        if(this.mode1Button==null)
        {
            //this.mode1Button=new CheckButton("res/btn_mode1d.png","res/btn_mode1u.png");//new Button("res/btn_mode1d.png");
            this.mode1Button=new Button("res/btn_mode1u.png");//new Button("res/btn_mode1d.png");
            this.mode1Button.setPosition(cc.p(300,520));
            this.mode1Button.setClickEvent(function(){
                console.log("mode1Button ClickEvent");
                userInfo.recordMode=0;
                if(gMainMenuScene!=null)
                {
                    gMainMenuScene.zhanji();
                }
            });
            this.backgroundSprite.addChild(this.mode1Button,5);
            this.mode1DisAbleSprite=cc.Sprite.create("res/btn_mode1d.png");
            this.mode1DisAbleSprite.setPosition(cc.p(300,520));
            this.backgroundSprite.addChild(this.mode1DisAbleSprite,5);

        }
        if(this.mode2Button==null)
        {
            // this.mode2Button=new CheckButton("res/btn_mode2d.png","res/btn_mode2u.png");
            this.mode2Button=new Button("res/btn_mode2u.png");
            this.mode2Button.setPosition(cc.p(525,520));
            this.mode2Button.setClickEvent(function(){
                console.log("mode2Button ClickEvent");
                userInfo.recordMode=2;
                if(gMainMenuScene!=null)
                {
                    gMainMenuScene.zhanji();
                }

                //self.zhanji();
            });
            this.backgroundSprite.addChild(this.mode2Button,5);
            this.mode2DisAbleSprite=cc.Sprite.create("res/btn_mode2d.png");
            this.mode2DisAbleSprite.setPosition(cc.p(525,520));
            this.backgroundSprite.addChild(this.mode2DisAbleSprite,5);
        }
        if(this.mode3Button==null)
        {
            this.mode3Button=new CheckButton("res/btn_mode3d.png","res/btn_mode3u.png");
            this.mode3Button.setPosition(cc.p(750,520));
            this.mode3Button.setClickEvent(function(){
                console.log("mode3Button ClickEvent");
                userInfo.recordMode=1;
                // if(gMainMenuScene!=null)gMainMenuScene.zhanji();
            });
            this.backgroundSprite.addChild(this.mode3Button,5);
        }
        if(this.mode4Button==null)
        {
            this.mode4Button=new CheckButton("res/btn_mode4d.png","res/btn_mode4u.png");
            this.mode4Button.setPosition(cc.p(975,520));
            this.mode4Button.setClickEvent(function(){
                console.log("mode4Button ClickEvent");
                userInfo.recordMode=3;
                // if(gMainMenuScene!=null)gMainMenuScene.zhanji();
            });

            this.backgroundSprite.addChild(this.mode4Button,5);
        }

        this.setDisableAllmodeButton();
        this.setAbleAllmodeButton();
        switch (userInfo.recordMode)
        {

            case 0:
            {
                this.mode1Button.setDisabled(true);
                this.mode1DisAbleSprite.setVisible(true);
                break;
            }
            case 1:
            {
                // this.mode3Button.setDisabled(true);
                break;
            }
            case 2:
            {
                this.mode2Button.setDisabled(true);
                this.mode2DisAbleSprite.setVisible(true);
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
        // this.mode1Button.setDisabled(true);
        // this.mode1Button.setChecked(true);
        // this.mode2Button.setDisabled(false);
        // this.mode1Button.setDisabled(true);
        // this.mode2Button.setDisabled(true);
        // this.mode3Button.setDisabled(true);
        // this.mode4Button.setDisabled(true);



    },
    setDisableAllmodeButton:function()
    {
        this.mode1Button.setDisabled(true);
        this.mode2Button.setDisabled(true);
        this.mode3Button.setDisabled(true);
        this.mode4Button.setDisabled(true);
    },
    setAbleAllmodeButton:function()
    {
        this.mode1Button.setDisabled(false);
        this.mode1DisAbleSprite.setVisible(false);
        this.mode2Button.setDisabled(false);
        this.mode2DisAbleSprite.setVisible(false);
        // this.mode3Button.setDisabled(false);
        // this.mode4Button.setDisabled(false);
    },

    toMainScene:function () {
        if(this.closeCallBackFunction!=null){
            this.closeCallBackFunction();
        }
    },

    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
        // var matchId = userInfo.MatchListData[cell.getIdx()]["matchId"];
        // var userId = userInfo.MatchListData[cell.getIdx()]["uid"];
        // gSocketConn.SendRecordMessage(userId,matchId);
    },
    tableCellTouched2:function () {
        cc.log("cell touched at index: ");
    },

    tableCellSizeForIndex:function (table, idx) {
        //if (idx == 2) {
        //    return cc.size(1000, 100);
        //}
        return cc.size(1000, 90);
    },

    tableCellAtIndex:function (table, idx) {
        cc.log("cell tableCellAtIndex index: "+idx);
        var self = this;
        var strValue = idx.toFixed(0);
        var strText;
        var cell = table.dequeueCell();
        var label;
        var textLabel;
        if (!cell) {
            cell = new ZhanjiTableViewCell();

            //label = new cc.LabelTTF(strValue, "Arial", 30.0);
            //label.setPosition(cc.p(0,20));
            //label.setAnchorPoint(0,0);
            //label.tag = 123;
            //cell.addChild(label);
            if(userInfo.MatchListData!=null)
            {
                cell.setCellData(idx);
            }

        } else {
            //label = cell.getChildByTag(123);
            //label.setString(strValue);
            if(userInfo.MatchListData!=null)
            {
                cell.setCellData(idx);
            }
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        if(userInfo.MatchListData!=null)
        {
            if(userInfo.MatchListData.length>20)
                return 20;
            else
            return userInfo.MatchListData.length;
        }
        else return 5;
    },


    showLayer:function()
    {
        this.setVisible(true);
        this.scheduler.resumeTarget(this);
        this.actionManager && this.actionManager.resumeTarget(this);
        cc.eventManager.resumeTarget(this,true);
    },
    applyParamsFromContent:function(content)
    {
        //"uid":"3434343770","totalCount":45,"winRate":0.0,"AvgGain":0.14939284434998082,"historyMatchList":[
        cc.log(content);
        var self =this;
        var data=JSON.parse(content);
        self.userId=data["uid"];
        self.totalCount=data["totalCount"];
        self.winRate=data["winRate"];
        self.AvgGain=data["AvgGain"];
        var historyMatchListData=data["historyMatchList"];
        console.log("historyMatchListData="+historyMatchListData);
        self.MatchListData=[];
        for(var i=0;i<historyMatchListData.length;i++)
        {
            var matchData=historyMatchListData[i];
            cc.log("MatchListData.matchId="+matchData["matchId"]);
            self.MatchListData.push(matchData);
            //this.klinedataMain.push({o:dailyData[5*i],x:dailyData[5*i+1],i:dailyData[5*i+2],c:dailyData[5*i+3],v:dailyData[5*i+4]});
            //this.MatchListData.push({matchId:matchData["matchId"],matchTime:matchData["matchId"],playerNum:matchData["matchId"],score:matchData["matchId"],uid:matchData["matchId"]});
        }

        cc.log(this.MatchListData.length);
        var strValue = "平均收益率:"+this.AvgGain+"       总局数:"+this.totalCount+"     胜率:"+this.winRate;
        if(self.infoLabel==null)
        {
            self.infoLabel=cc.LabelTTF.create(strValue, "Arial",25);
            //this.zhanjiLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
            self.infoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            self.infoLabel.setAnchorPoint(0,0.5);
            self.infoLabel.setPosition(cc.p(50,400));
            self.addChild(self.infoLabel,5);
        }
        else
        {
            self.infoLabel.setString(strValue);
        }
        if(self.tableView!=null)
        {
            self.tableView.reloadData();
        }

        console.log(content);
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
    refreshZhanjiViewLayer:function()
    {
        if(this.tableView!=null)
        {
            this.tableView.reloadData();
        }
        // this.tableView.reloadData();
        if(userInfo!=null)
        {
            //var strValue = "平均收益率:"+userInfo.AvgGain+"       总局数:"+userInfo.totalCount+"     胜率:"+userInfo.winRate;
            //cc.log(strValue);
            if(this.avgGainLabel!=null)
                this.avgGainLabel.setString(userInfo.AvgGain+"%");

            if(this.totalCountLabel!=null)
                this.totalCountLabel.setString(userInfo.totalCount);
            if(this.winRateLabel!=null)
                this.winRateLabel.setString(userInfo.winRate+"%");
            this.setDisableAllmodeButton();
            this.setAbleAllmodeButton();
            switch (userInfo.recordMode)
            {

                case 0:
                {
                    this.mode1Button.setDisabled(true);
                    this.mode1DisAbleSprite.setVisible(true);
                    break;
                }
                case 1:
                {
                    // this.mode3Button.setDisabled(true);
                    break;
                }
                case 2:
                {
                    this.mode2Button.setDisabled(true);
                    this.mode2DisAbleSprite.setVisible(true);
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
        }



    }
});


