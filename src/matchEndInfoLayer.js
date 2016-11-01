// JavaScript Document
var MatchEndInfoLayer= cc.Layer.extend({
	
	bgSprtie:null,
	stockInfoLabel:null,
	btnReplay:null,		//复盘---退出游戏
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
		this.size = cc.director.getWinSize();
		this.fXScale = this.size.width/1280;
		this.fYScale = this.size.height/720;
		// this.width = 985*this.fXScale;
		// this.height = 483*this.fYScale;

		var self=this;
		

		
		this.stockInfoLabel=cc.LabelTTF.create("", "Arial", 19);
		//this.stockInfoLabel.setColor(cc.color(40,184,245,255));
		this.stockInfoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.stockInfoLabel.setAnchorPoint(0.5,0.5);
		var posBtnY = 39;
		if(userInfo.matchMode>0)
		{
			this.stockInfoLabel.setPosition(this.width / 2, 240);
			this.bgSprtie = cc.Sprite.create("res/matchMoreEnd.png");
			posBtnY = 20

		}
		else
		{
			this.stockInfoLabel.setPosition(this.width / 2, 100);
			this.bgSprtie = cc.Sprite.create("res/matchEnd.png");
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


			this.avatarSprite=cc.Sprite.create(gPlayerAvatarSprite.getTexture());
			this.avatarSprite.setPosition(130,160);
			this.avatarSprite.setScale(0.4);
			this.addChild(this.avatarSprite,5);
			posBtnY =30;
		}



		// this.width = this.bgSprtie.getContentSize().width*this.fXScale;
		// this.height = this.bgSprtie.getContentSize().height*this.fYScale;

		this.bgSprtie.setPosition(this.width / 2, this.height / 2);
		this.bgSprtie.setScale(this.fXScale,this.fYScale);
		this.addChild(this.bgSprtie,1);
		this.addChild(this.stockInfoLabel,2); 
		

		
		
		// this.btnReplay=new Button("res/meBtnReplay.png");
		this.btnReplay=new Button("res/btnEnd.png");

		this.btnReplay.setPosition(90,posBtnY);
		this.btnReplay.setScale(this.fXScale,this.fYScale);
		this.btnReplay.setClickEvent(function(){
			self.replay();
		});
		
		this.btnAgain=new Button("res/meBtnAgain.png");
		this.btnAgain.setPosition(237,posBtnY);
		this.btnAgain.setScale(this.fXScale,this.fYScale);
		this.btnAgain.setClickEvent(function(){
			self.again();
		});
		
		
		this.btnShare=new Button("res/meBtnShare.png");
		this.btnShare.setScale(this.fXScale,this.fYScale);
		this.btnShare.setPosition(384,posBtnY);
		this.btnShare.setClickEvent(function(){
			self.share();
		});
		
		this.addChild(this.btnReplay,2);
		this.addChild(this.btnAgain,2);
		this.addChild(this.btnShare,2);

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
		switch(userInfo.matchMode)
		{
			case 0:
			{
				var fields=content.split("#");
				var len=fields.length;
				this.stockInfoLabel.setString("期货合约:"+fields[len-3]+" ("+fields[len-2]+" - "+fields[len-1]+")");
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
				break;
			}
			case 1:
			{
				this.KlineWidth = 700;
				this.KlinePosX = 60;
				break;
			}
			case 2:
			{

				console.log("MatchEndInfoLayer to parse json text");
				// {"codeInfo":"600970(上证)#2006-07-27#2007-01-23","endInfoOfAllPlayers":[{"nickName":"开心的钱多多","ranking":2,"matchId":6231,"score":-34.99,"level":0,"exp":0},{"nickName":"唐齐安通道","ranking":1,"matchId":6231,"score":-1.76,"level":0,"exp":0}]}
				var ratio=parseFloat(0);
				var data=JSON.parse(content);
				this.stockInfoLabel.setString(data["codeInfo"]);
				var endInfoData = data["endInfoOfAllPlayers"];
				userInfo.endInfoOfAllPlayers=[];
				for(var i=0;endInfoData!=null&&i<endInfoData.length;i++)
				{
					cc.log("showPlayerInfo playerData.userName="+endInfoData[i]["nickName"]);
					if(userInfo.nickName==endInfoData[i]["nickName"])ratio=endInfoData[i]["score"];
					userInfo.endInfoOfAllPlayers.push(endInfoData[i]);
				}
				this.setPlayerEndInfo();

				break;
			}
			case 3:
			{
				break;
			}
			default:
			{
				cc.log("userInfo.matchMode ="+userInfo.matchMode);
				break;
			}
		}

		console.log(content);
	},
	setPlayerEndInfo:function()
	{

		if(userInfo.endInfoOfAllPlayers!=null&&userInfo.endInfoOfAllPlayers.length>0)
		{

			for(var i=0;i<userInfo.endInfoOfAllPlayers.length;i++)
			{

				var rankFlag = parseInt(userInfo.endInfoOfAllPlayers[i]["ranking"]);
				var sprite = new cc.Sprite("res/line_bg.png");
				// sprite.setScale(this.fXScale,this.fYScale);
				sprite.setAnchorPoint(0,0);
				sprite.setPosition(cc.p(15,380-88*rankFlag));
				this.bgSprtie.addChild(sprite);
				//"endInfoOfAllPlayers":[{"nickName":"开心的钱多多","ranking":2,"matchId":6231,"score":-34.99,"level":0,"exp":0},{"nickName":"唐齐安通道","ranking":1,"matchId":6231,"score":-1.76,"level":0,"exp":0}]}
				//设置用户名
				strNameText= userInfo.endInfoOfAllPlayers[i]["nickName"];
				textNameLabel = new cc.LabelTTF(strNameText, "Arial", 35.0);
				textNameLabel.setPosition(cc.p(100,40));
				textNameLabel.setAnchorPoint(0,0.5);
				sprite.addChild(textNameLabel);

				//strText= "名字:"+userInfo.MatchListData[idx]["uid"]+"  收益:"+userInfo.MatchListData[idx]["score"]+"  "+userInfo.MatchListData[idx]["matchTime"];

				//设置收益
				strScoreText= userInfo.endInfoOfAllPlayers[i]["score"]+"%";
				textScoreLabel = new cc.LabelTTF(strScoreText, "Arial", 35.0);
				textScoreLabel.setPosition(cc.p(500,40));
				textScoreLabel.setAnchorPoint(0.5,0.5);
				if(userInfo.endInfoOfAllPlayers[i]["score"]>0)
				{
					textScoreLabel.setColor(RedColor);
				}
				else if(userInfo.endInfoOfAllPlayers[i]["score"]<0)
				{
					textScoreLabel.setColor(GreenColor);
				}
				else
				{
					textScoreLabel.setColor(WhiteColor);
				}
				sprite.addChild(textScoreLabel);

				//设置查看交易记录按钮
				this.recordButton=new Button("res/btnRecord.png");
				this.recordButton.setAnchorPoint(0,0.5);
				this.recordButton.setPosition(cc.p(800,40));
				sprite.addChild(this.recordButton);
				var matchId = userInfo.endInfoOfAllPlayers[i]["score"]["matchId"];
				var userId = userInfo.endInfoOfAllPlayers[i]["nickName"];
				this.recordButton.setClickEvent(function(){
					console.log("recordButton ClickEvent");
					gSocketConn.SendRecordMessage(userId,matchId);

				});

			}
		}




	},



});
