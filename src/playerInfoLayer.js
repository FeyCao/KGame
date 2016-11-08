// JavaScript Document
var PlayerInfoLayer= cc.Layer.extend({
	
	playerInfoArea:null,			//绘图的区域
	selfNameLabel:null,				//自己的名字
	selfScoreLabel:null,			//自己的分数
	avatarSprite:null,				//自己的头像

	// playerInfo_bg1:null,
	// playerInfo_bg2:null,
	// playerInfo_bg3:null,

    playerInfo_bg:null,//信息背景bg
	playerHead_Sprite:null,//头像
	playerNameLabel:null,				//名字
	playerScoreLabel:null,			//分数

	// player1Label:null,				//自己的名字
	// playerScore1Label:null,			//自己的分数

ctor:function(width,height)
	{
		this._super();
		this.width=width;
		this.height=height;
	},
	
	onEnter:function () 
	{
		this._super();
		this.size = cc.director.getWinSize();
		this.fXScale = this.size.width/1280;
		this.fYScale = this.size.height/720;

        this.playerInfo_bg =[];
		this.playerHead_Sprite  =[];
        this.playerNameLabel =[];
        this.playerScoreLabel =[];

		this.playerInfoArea=new cc.DrawNodeCanvas();
		//设置K线图的区域
		this.playerInfoArea.setPosition(cc.p(0,0));
		this.playerInfoArea.width=this.width;
		this.playerInfoArea.height=this.height;
		this.addChild(this.playerInfoArea, 1);

		this.selfNameLabel=cc.LabelTTF.create("", "Arial", 20);
        this.selfNameLabel.setScale(this.fXScale,this.fYScale);
		//this.selfNameLabel=cc.LabelTTF.create(gPlayerName, "Arial", 20);
		this.selfNameLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.selfNameLabel.setAnchorPoint(0,0.5);
		this.selfNameLabel.setPosition(160*this.fXScale, this.height-20);
		this.addChild(this.selfNameLabel,5);

		this.selfScoreLabel=cc.LabelTTF.create("0.00%", "Arial", 24);
		this.selfScoreLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.selfScoreLabel.setAnchorPoint(0,0.5);
		this.selfScoreLabel.setPosition(168, this.height-20);
		this.addChild(this.selfScoreLabel,5);

		if(gPlayerAvatarSprite==null)
		{
			// gPlayerAvatarSprite=cc.Sprite.create("res/avatar"+(1+Math.round(Math.random()*10)%5)+".png");
            gPlayerAvatarSprite=cc.Sprite.create("res/touxiang.png");
		}

		this.avatarSprite=cc.Sprite.create(gPlayerAvatarSprite.getTexture());
		this.avatarSprite.setPosition(120*this.fXScale,this.height-20);
		this.avatarSprite.setScale(0.3);
		this.addChild(this.avatarSprite,5);
		this.setPlayerInfo();
		this.drawAreaBorder();
	},
	setPlayerInfo:function()
	{
        //.setScale(this.fXScale,this.fYScale);
        if(this.selfNameLabel!=null&& userInfo.nickName!=null)
        {
            this.selfNameLabel.setString(userInfo.nickName);
        }

		if(userInfo.matchMode==null)return;
		switch(userInfo.matchMode)
		{
			case 0:
			{
				this.avatarSprite.setVisible(true);
				break;
			}
			case 1:
			{
				break;
			}
			case 2:
			{

				var InfoposX = 60;
				var InfoposY1 = 100;
				var InfoposY2 = 20;
				// this.avatarSprite.setVisible(false);
                for(var i=0;i<2;i++)
                {
                    if(this.playerInfo_bg[i] ==null)
                    {
                        this.playerInfo_bg[i]=cc.Sprite.create("res/playerInfo_bg.png");
                        this.playerInfo_bg[i].setPosition(60*this.fXScale,(500-252*i)*this.fYScale);
                        this.playerInfo_bg[i].setScale(this.fXScale,this.fYScale);
                        this.playerNameLabel[i] = cc.LabelTTF.create(userInfo.nickName, "Arial", 20);
                        this.playerScoreLabel[i] = cc.LabelTTF.create("0.00%", "Arial", 24);
						//"res/touxiang.png","res/touxiangAI.png"
						this.playerHead_Sprite[i] = cc.Sprite.create("res/touxiangAI.png");
						this.playerHead_Sprite[i].setScale(0.8);
						this.playerHead_Sprite[i].setPosition(InfoposX,190);

                        this.playerNameLabel[i].setPosition(InfoposX,InfoposY1);
                        this.playerScoreLabel[i].setPosition(InfoposX,InfoposY2);
						this.playerInfo_bg[i].addChild(this.playerHead_Sprite[i]);
                        this.playerInfo_bg[i].addChild(this.playerNameLabel[i]);
                        this.playerInfo_bg[i].addChild(this.playerScoreLabel[i]);
                        this.addChild(this.playerInfo_bg[i],5);
                    }
                }
                this.refreshScoresByData();
				// if(this.playerInfo_bg ==null)
				// {
				// 	this.playerInfo_bg=cc.Sprite.create("res/playerInfo_bg.png");
				// 	this.playerInfo_bg.setPosition(30,270);
				// 	this.playerInfo_bg.setScale(0.5);
				// 	this.playerLabel = cc.LabelTTF.create(userInfo.nickName, "Arial", 20);
				// 	this.playerScoreLabel = cc.LabelTTF.create("0.00%", "Arial", 24);
				// 	this.playerLabel.setPosition(60,100);
				// 	this.playerScoreLabel.setPosition(60,100);
				// 	this.playerInfo_bg.addChild(this.playerLabel);
				// 	this.playerInfo_bg.addChild(this.playerScoreLabel);
				// 	this.addChild(this.playerInfo_bg,5);
				// }
				// if(this.playerInfo_bg1 ==null)
				// {
				// 	this.playerInfo_bg1=cc.Sprite.create("res/playerInfo_bg.png");
				// 	this.playerInfo_bg1.setPosition(30,140);
				// 	this.playerInfo_bg1.setScale(0.5);
				// 	this.player1Label = cc.LabelTTF.create("机器人", "Arial", 20);
				// 	this.playerScore1Label = cc.LabelTTF.create("0.00%", "Arial", 24);
				// 	this.player1Label.setPosition(InfoposX,InfoposY1);
				// 	this.playerScore1Label.setPosition(InfoposX,InfoposY2);
				// 	this.playerInfo_bg1.addChild(this.player1Label);
				// 	this.playerInfo_bg1.addChild(this.playerScore1Label);
				// 	this.addChild(this.playerInfo_bg1,5);
				// }


				break;
			}
			default:
			{
				cc.log("PlayerInfoLayer setPlayerInfo userInfo.matchMode=",userInfo.matchMode);
			}
		}

	},
	drawAreaBorder:function()
	{
		 //给这个矩形区域添加红色的边框
		 
		 //this.playerInfoArea.drawRect(cc.p(0,0),cc.p(this.playerInfoArea.width, this.playerInfoArea.height),cc.color(0,0,0,0),1,cc.color(0,255,255,255));
		 //this.playerInfoArea.drawRect(cc.p(0,0),cc.p(this.width, this.height),cc.color(0,0,0,0),1,cc.color(255,255,255,255));
	},
	
	refreshScore:function(currentIndex,data,selfOperations,opponentOperations)//计算收益率
	{
		
		this.refreshScoreForPlayer(currentIndex,data,selfOperations,true);
		this.refreshScoreForPlayer(currentIndex,data,opponentOperations,false);
		
	},
	
	refreshScores:function(buyScore)//设置收益率
	{
		var score=0;
		var upColor=cc.color(252,0,1,0);
		var downColor=cc.color(6,226,0,0);
		var scoreLabel=this.selfScoreLabel;
		if(scoreLabel!=null && scoreLabel!=undefined)
		{
			score=buyScore;
			scoreLabel.setString(score.toFixed(2)+"%");
			if(score>0)
			{
				scoreLabel.setColor(upColor);
			}
			else if(score<0)
			{
				scoreLabel.setColor(downColor);
			}
			else
			{
				scoreLabel.setColor(cc.color(255,255,255,0));
			}
		}
		
	},


	refreshScoresByData:function()//从服务器得到数据设置收益率
	{

		var score=0;
		var upColor=cc.color(252,0,1,0);
		var downColor=cc.color(6,226,0,0);
		var scoreLabel=this.selfScoreLabel;
		if(userInfo.playerListData!=null)
		{
            for(var i=0;i<userInfo.playerListData.length&&i<this.playerInfo_bg.length;i++)
            {

				if(this.playerHead_Sprite[i]!=null)
				{
					cc.log("userInfo.nickName=="+userInfo.nickName+"||userInfo.playerListData[i]=="+userInfo.playerListData[i]["userName"]);
					if (i==0)
					{
						this.playerHead_Sprite[i].setTexture("res/touxiang.png");
					}else {
						this.playerHead_Sprite[i].setTexture("res/touxiangAI.png");
					}
					if(userInfo.nickName==userInfo.playerListData[i]["userName"])
					{
						// this.playerHead_Sprite[i].getTexture();
						this.avatarSprite.setTexture(this.playerHead_Sprite[i].getTexture());
						// this.playerHead_Sprite[i].setTexture("res/touxiang.png");
					}
					// else
					// {
					// 	this.playerHead_Sprite[i].setTexture("res/touxiangAI.png");
					// }
				}

                if(this.playerNameLabel[i]!=null && this.playerNameLabel[i]!=undefined)
                {
                    var score=parseFloat(userInfo.playerListData[i]["score"]);

                    this.playerNameLabel[i].setString(userInfo.playerListData[i]["userName"]);
                    this.playerScoreLabel[i].setString(score.toFixed(2)+"%");
                    if(score>0)
                    {
                        this.playerScoreLabel[i].setColor(upColor);
                    }
                    else if(score<0)
                    {
                        this.playerScoreLabel[i].setColor(downColor);
                    }
                    else
                    {
                        this.playerScoreLabel[i].setColor(cc.color(255,255,255,0));
                    }
                }
            }
        }

	},


	refreshScoreForPlayer:function(currentIndex,data,operations,isSelf)
	{
		
		var score=0;
		var upColor=cc.color(252,0,1,0);
		var downColor=cc.color(6,226,0,0);
		
		for(var i=0;i<Math.floor(operations.length/2);i+=1)
		{
			var isBuyO=operations[2*i]>0;
			var OP=data[Math.abs(operations[2*i])-1].c;
			
			var isBuyC=operations[2*i+1]>0;
			var CP=data[Math.abs(operations[2*i+1])-1].c;
			if(isBuyO==true && isBuyC==false)
			{
				score=score+(CP-OP);
			}
			else if(isBuyO==false && isBuyC==true)
			{
				score=score+(OP-CP);
			}
		}
		
		var dir=0;
		if(operations.length%2!=0)
		{
			var index=operations[operations.length-1];
			var lastClose=data[currentIndex-1].c;
			
			var isBuyO=operations[operations.length-1]>0;
			var OP=data[Math.abs(operations[operations.length-1])-1].c;
			
			if(isBuyO==true)
			{
				score=score+(lastClose-OP);
				dir=1;
			}
			else
			{
				score=score+(OP-lastClose);
				dir=-1;
			}
		}
		
		//var dirLabel=this.selfDirLabel;
		var scoreLabel=this.selfScoreLabel;
		if(isSelf==false)
		{
			//dirLabel=this.opponentDirLabel;
			scoreLabel=this.opponentScoreLabel;
		}
		if(dir==1)
		{
			//dirLabel.setString("多");
			//dirLabel.setColor(upColor);
		}
		else if(dir==-1)
		{
			//dirLabel.setString("空");
			//dirLabel.setColor(downColor);
		}
		else
		{
			//dirLabel.setString("");
			//dirLabel.setColor(cc.color(255,255,255,0));
		}
		if(scoreLabel!=null && scoreLabel!=undefined)
		{
			scoreLabel.setString(score.toFixed(2)+"%");
			if(score>0)
			{
				scoreLabel.setColor(upColor);
			}
			else if(score<0)
			{
				scoreLabel.setColor(downColor);
			}
			else
			{
				scoreLabel.setColor(cc.color(255,255,255,0));
			}
		}
	},
	
	clear:function()
	{
		this.selfScoreLabel.setString("0.00%");
		this.selfScoreLabel.setColor(cc.color(255,255,255,0));
	}
	
});