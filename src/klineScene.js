var KLineScene = SceneBase.extend(
{
	backgroundLayer:null,		//背景层
	
	matchEndInfoLayer:null,		//对局结束后弹出的对话框
	
	klineLayerMain:null,		//主要的持续跳动的K线图
	klineLayerPrev:null,		//前期的K线，游戏一开始显示一下作为游戏时判断使用
	
	volumnTechLayerMain:null,		//主要的持续跳动的成交量图，也可以作为技术指标的图
	volumnTechLayerPrev:null,		//前期的一副图，游戏一开始显示一下作为游戏时判断使用
	
	klinedataMain:null,			//游戏界面K线图的数据，按照时间从小到大排序。
	prevKlineData:null,			//游戏界面前的K线图的数据，按照时间从小到大排序。

	matchInfoLayer:null,		//显示游戏按钮的层
	playerInfoLayer:null,		//显示对手信息，比赛分数信息的层
	phase2:false,				//主K线阶段
	opponentsInfo:[],			//对手信息
	
	//买入卖出信息格式如下，正数为买入，负数为卖出，绝对值表示买入或卖出的索引
	selfOperations:[],			//自己的交易信息，
	opponentOperations:[],		//对手的交易信息
	
	borderArea:null,			//画K线图和技术图的边框的区域
	middleHorizontalLineCount:11,	//在中间的横线的个数
	
	currentCandleIndex:0,		//当前显示的是第几个蜡烛，从0开始
	CANDAL_DRAW_INTERVAL:100,		//每个K线相隔的时间
	currentCandleDrawInterval:null,	//当前的K线绘画间隔
	drawCandleStoped:false,			//是否绘画停止了
	
	mainLayerNumber:5,		//上方的主图的层号
	volumnTechLayerNumber:4,//下方的技术指标的层号
	
	onEnteredFunction:null,	//OnEnter调用结束后的Function
	
	ctor: function ()
	{
		this._super();
		this.backgroundLayer=null;
		this.matchEndInfoLayer=null;
		this.klineLayerMain=null;
		this.klineLayerPrev=null;
		this.volumnTechLayerMain=null;
		this.klinedataMain=null;
		this.prevKlineData=null;
		this.matchInfoLayer=null;
		this.playerInfoLayer=null;
		this.phase2=false;
		this.opponentsInfo=[];
		this.selfOperations=[];
		this.opponentOperations=[];
		this.borderArea=null;
		this.onEnteredFunction=null;
		this.currentCandleDrawInterval=null;
		
		
	},
	
	onEnter:function () 
	{
		this._super();
		//document.getElementById("mainBody").style
		document.bgColor="#152936";
		gKlineScene=this;
		this.currentCandleDrawInterval=this.CANDAL_DRAW_INTERVAL;
		
		console.log("............klinescene on enter called");
		var size = cc.director.getWinSize();
		this.backgroundLayer=new cc.LayerColor(cc.color(21,41,54, 255));
		this.backgroundLayer.ignoreAnchorPointForPosition(false);  
		this.backgroundLayer.setPosition(size.width / 2, size.height / 2);  
		this.addChild(this.backgroundLayer, 1,this.backgroundLayer.getTag());

 		 //设置K线图的区域
		this.klineLayerMain=new KlineLayer(726,192);
		this.klineLayerMain.setPosition(cc.p(5,184));
		
		this.volumnTechLayerMain=new VolumnTechLayer(726,100-6);
		this.volumnTechLayerMain.setPosition(cc.p(5,83+6));
		
		this.borderArea=new cc.DrawNodeCanvas();
		this.borderArea.setPosition(cc.p(5,83));
		this.borderArea.width=726;
		this.borderArea.height=294;
		this.addChild(this.borderArea, 2);
		  //画边框
		 this.drawAreaBorder();
		 this.drawHorizontalLine();
		
		this.klineLayerPrev=new KlineLayer(this.klineLayerMain.width,this.klineLayerMain.height);
		this.klineLayerPrev.setPosition(this.klineLayerMain.getPosition());
		
		this.volumnTechLayerPrev=new VolumnTechLayer(this.volumnTechLayerMain.width,this.volumnTechLayerMain.height);
		this.volumnTechLayerPrev.setPosition(this.volumnTechLayerMain.getPosition());
		
		var self=this;
		this.volumnTechLayerPrev.setClickEvent(function(){self.changeTechLayer();});
		this.volumnTechLayerMain.setClickEvent(function(){self.changeTechLayer();});
		
		//需要设置指标
		this.klineLayerPrev.addNewTais(new TaisMa([10,20,30],0));
		this.klineLayerMain.addNewTais(new TaisMa([10,20,30],0));
		
		this.volumnTechLayerMain.addNewTais(new TaisMa([5,10],1));
		this.volumnTechLayerPrev.addNewTais(new TaisMa([5,10],1));
		
		var macdTais1=new TaisMacd(12,26,9);
		var macdTais2=new TaisMacd(12,26,9);
		macdTais1.isEnabled=false;
		macdTais2.isEnabled=false;
		this.volumnTechLayerMain.addNewTais(macdTais1);
		this.volumnTechLayerPrev.addNewTais(macdTais2);
		
		//调用下面这个函数的时候，可能数据还未获取到，也可能获取到了
		this.setDataForLlineLayer();
		
		this.matchInfoLayer=new MatchInfoLayer(726,82);
		this.matchInfoLayer.setPosition(cc.p(5,0));
		this.addChild(this.matchInfoLayer, 8,this.matchInfoLayer.getTag());
		
		this.playerInfoLayer=new PlayerInfoLayer(726,36);
		this.playerInfoLayer.setPosition(cc.p(5,377));
		this.addChild(this.playerInfoLayer, 8,this.playerInfoLayer.getTag());
		
		if(gSocketConn!=null && gSocketConn!=undefined)
		{
			gSocketConn.RegisterEvent("onmessage",this.messageCallBack);
		}
		console.log("............klineLayerMain created");

		if(this.matchInfoLayer!=null)
		{
			this.matchInfoLayer.disableAllButtons();
		}		
		
		this.matchEndInfoLayer=new MatchEndInfoLayer();
		this.matchEndInfoLayer.setVisible(false);
		this.matchEndInfoLayer.setPosition((size.width-this.matchEndInfoLayer.width) / 2, (size.height-this.matchEndInfoLayer.height) / 2);  
		this.otherMessageTipLayer.addChild(this.matchEndInfoLayer, 1,this.matchEndInfoLayer.getTag());

		
		if(this.onEnteredFunction!=null)
		{
			this.onEnteredFunction();
		}
	},
	
	//修改副图的显示内容
	changeTechLayer:function()
	{
		console.log("klinescene changeTechLayer instanceid="+this.__instanceid);
		
		if(this.phase2==false)
		{
			if(this.volumnTechLayerPrev.isTaisEnabled("MACD")==true)
			{
				//如果MACD是激活的，则切换到"MA"
				console.log("changeTechLayer to ma");
				this.volumnTechLayerPrev.changeToOtherTais(["MA"]);
				this.volumnTechLayerMain.changeToOtherTais(["MA"]);
			}
			else if(this.volumnTechLayerPrev.isTaisEnabled("MA")==true)
			{
				//如果"MA"是激活的，则切换到MACD
				console.log("changeTechLayer to macd");
				this.volumnTechLayerPrev.changeToOtherTais(["MACD"]);
				this.volumnTechLayerMain.changeToOtherTais(["MACD"]);
			}
			//需要重绘技术图
			this.volumnTechLayerPrev.clearMaxAndMinValue();
			this.volumnTechLayerPrev.clearAllContents();
			this.volumnTechLayerPrev.drawAllCandlesTillIndexOrEnd();
		}
		else
		{
			if(this.volumnTechLayerMain.isTaisEnabled("MACD")==true)
			{
				console.log("====changeTechLayer to ma");
				//如果MACD是激活的，则切换到"MA"
				this.volumnTechLayerMain.changeToOtherTais(["MA"]);
			}
			else if(this.volumnTechLayerMain.isTaisEnabled("MA")==true)
			{
				console.log("====changeTechLayer to macd");
				this.volumnTechLayerMain.changeToOtherTais(["MACD"]);
			}
			
			this.volumnTechLayerMain.clearMaxAndMinValue();
			this.volumnTechLayerMain.clearAllContents();
			if(this.currentCandleIndex>=1)
			{
				this.volumnTechLayerMain.drawAllCandlesTillIndexOrEnd(this.currentCandleIndex-1);
			}
		}
	},
	
	
	drawAreaBorder:function()
	{
		 //给这个矩形区域添加边框
		 var radius=10;
		 this.borderArea.drawSegment(cc.p(0+radius,0),cc.p(this.borderArea.width-radius,0),1,cc.color(38,64,86,255));
		 this.borderArea.drawSegment(cc.p(0,0+radius),cc.p(0,this.borderArea.height-radius),1,cc.color(38,64,86,255));
		 this.borderArea.drawSegment(cc.p(0+radius,this.borderArea.height),cc.p(this.borderArea.width-radius,this.borderArea.height),1,cc.color(38,64,86,255));
		 this.borderArea.drawSegment(cc.p(this.borderArea.width,0+radius),cc.p(this.borderArea.width,this.borderArea.height-radius),1,cc.color(38,64,86,255));
		 
		 this.borderArea.drawQuadBezier(cc.p(0+radius,0),cc.p(0,0),cc.p(0,0+radius),5,2,cc.color(38,64,86,255));
		 this.borderArea.drawQuadBezier(cc.p(0,this.borderArea.height-radius),cc.p(0,this.borderArea.height),cc.p(0+radius,this.borderArea.height),5,2,cc.color(38,64,86,255));
		 this.borderArea.drawQuadBezier(cc.p(this.borderArea.width-radius,0),cc.p(this.borderArea.width,0),cc.p(this.borderArea.width,0+radius),5,2,cc.color(38,64,86,255));
		 this.borderArea.drawQuadBezier(cc.p(this.borderArea.width-radius,this.borderArea.height),cc.p(this.borderArea.width,this.borderArea.height),cc.p(this.borderArea.width,this.borderArea.height-radius),5,2,cc.color(38,64,86,255));
		 
		 //this.borderArea.drawRect(cc.p(0,0),cc.p(this.borderArea.width, this.borderArea.height),cc.color(0,0,0,0),1,cc.color(38,64,86,255));
	},
	
	drawHorizontalLine:function()
	{
		var middleGapHeight=this.borderArea.height/(this.middleHorizontalLineCount+1);
		for(var i=0;i<this.middleHorizontalLineCount;i++)
		{
			var pointBegin=cc.p(5,middleGapHeight*(i+1));
			var pointEnd=cc.p(this.borderArea.width-5,middleGapHeight*(i+1));
			
			this.borderArea.drawSegment(pointBegin,pointEnd,0.5,cc.color(36,62,83,80));
		}
	},

	
	messageCallBack:function(message)
	{
		console.log("KlineScene messageCallBack..." + message);
		var packet=Packet.prototype.Parse(message);
		var self=gKlineScene;
		if(packet==null) return;
		if(packet.msgType=="8")
		{
			//收到对方买入的信息
			//alert("8="+packet.content);
			var buyOperationIndex=parseInt(packet.content.split("#")[1]);
			self.opponentOperations.push(buyOperationIndex);
			self.refreshScores();
		}
		else if(packet.msgType=="9")
		{
			//收到对方卖出的信息
			//alert("9="+packet.content);
			var sellOperationIndex=parseInt(packet.content.split("#")[1]);
			self.opponentOperations.push(-sellOperationIndex);
			self.refreshScores();
		}
		else if(packet.msgType=="F")
		{
			//接收到对局结束
			//alert("接收到对局结束");
			self.showMatchEndInfo(packet.content);
		}
		else if(packet.msgType=="4")
		{
			//接收到了匹配成功的消息
			console.log("New macth founded...");
			//cc.director.runScene(cc.TransitionSlideInL.create(0.5,klineScene));
			self.opponentsInfo.push(packet.content);
			self.stopProgress();
		}
		else if(packet.msgType=="5")
		{
			//接收到了K线数据的消息
			console.log("call get kline data");
			self.getklinedata(packet.content);
			console.log("get kline passed");
		}
	},
	
	showMatchEndInfo:function(content)
	{
		console.log("showMatchEndInfo  visible = true");
		var self=this;
		
		this.matchEndInfoLayer.applyParamsFromContent(content);
		//content的内容为:   总用户个数(假设为2)#用户名A#收益率A#得分A#用户名B#收益率B#得分B#品种名字#起始日期#终止日期
		this.matchEndInfoLayer.againCallBackFunction=function(){self.matchEndInfoLayer_Again()};
		this.matchEndInfoLayer.replayCallBackFunction=function(){self.matchEndInfoLayer_Replay()};
		this.matchEndInfoLayer.shareCallBackFunction=function(){self.matchEndInfoLayer_Share()};
		this.matchEndInfoLayer.showLayer();
		this.pauseLowerLayer();
	},
	
	matchEndInfoLayer_Replay:function()
	{
		//复盘
		this.matchEndInfoLayer.hideLayer();
		this.resumeLowerLayer();
		//gSocketConn.UnRegisterEvent("onmessage",this.messageCallBack);
		//关闭后显示下方的按钮
		this.beginReplayKLineScene();
	},
	
	matchEndInfoLayer_Again:function()
	{
		this.matchEndInfoLayer.hideLayer();
		this.resumeLowerLayer();
		gSocketConn.UnRegisterEvent("onmessage",this.messageCallBack);
		//再开始一盘
		this.beginNextKLineScene();
	},
	
	matchEndInfoLayer_Share:function()
	{
		//分享
		//this.matchEndInfoLayer.hideLayer();
		//this.resumeLowerLayer();
		gSocketConn.UnRegisterEvent("onmessage",this.messageCallBack);
		//分享函数
		this.share();
		
	},
	
	share:function()
	{
		 window.location.href="myapp:myfunction:share";//"javascript:gotoshare()"; 
	},
	
	
	
	beginReplayKLineScene:function()
	{
		console.log("beginReplayKLineScene  visible = true");
		var self=this;
		if(self.matchInfoLayer!=null)
		{
			self.matchInfoLayer.disableAllButtons();
			self.matchInfoLayer.setReplayKLineScene();
		}
		//self.matchEndInfoLayer.applyParamsFromContent(content);
		//content的内容为:   总用户个数(假设为2)#用户名A#收益率A#得分A#用户名B#收益率B#得分B#品种名字#起始日期#终止日期
		self.matchInfoLayer.againCallBackFunction=function(){self.matchEndInfoLayer_Again()};
		self.matchInfoLayer.shareCallBackFunction=function(){self.matchEndInfoLayer_Share()};
		
		
	},
	
	beginNextKLineScene:function()
	{
		var klineSceneNext=new KLineScene();
		var self=this;
		klineSceneNext.onEnteredFunction=function(){
			
			//klineSceneNext.matchEndInfoLayer.btnReplay.setVisible(self.matchEndInfoLayer.btnReplay.isVisible());
			//klineSceneNext.matchEndInfoLayer.btnQuit.setVisible(self.matchEndInfoLayer.btnQuit.isVisible());
			
			klineSceneNext.showProgress();
			};
		gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);
		cc.director.runScene(klineSceneNext);
		gSocketConn.BeginMatch(0);
	},
	
	///获取K线数据
	getklinedata:function(jsonText)
	{
		console.log("begin to parse json text");
		var data=JSON.parse(jsonText);
		console.log("jsonText parse over");
		this.ongotklinedata(data);
	},
	
	ongotklinedata:function(data)
	{
		
		var dailyData=data["data"];
		var mainDataDayCount=data["count"][0];
		var prevDataDayCount=data["count"][1];
		console.log("ongotklinedata mainDataDayCount="+mainDataDayCount+" prevDataDayCount="+prevDataDayCount);
		
		this.klinedataMain=[];
		for(var i=prevDataDayCount;i<prevDataDayCount+mainDataDayCount;i++)
		{
			this.klinedataMain.push({o:dailyData[5*i],x:dailyData[5*i+1],i:dailyData[5*i+2],c:dailyData[5*i+3],v:dailyData[5*i+4]});
		}
		
		this.prevKlineData=[];
		for(var i=0;i<prevDataDayCount;i++)
		{
			this.prevKlineData.push({o:dailyData[5*i],x:dailyData[5*i+1],i:dailyData[5*i+2],c:dailyData[5*i+3],v:dailyData[5*i+4]});
		}
		
		if(this.klineLayerMain!=null && this.klineLayerPrev!=null)
		{
			//TEST
			var TEST_FLAG=TestClass.getConstant('TEST_FLAG');
			if(TEST_FLAG != true)
			{
				this.setDataForLlineLayer();
			}else{
				this.setDataForLlineLayerTEST();
			}
		}
		else
		{
			console.log("this.klineLayerMain==null || this.klineLayerPrev==null");
		}
	},
	
	clearBuySellOperation:function()
	{
		this.selfOperations=[];
		this.opponentOperations=[];
		this.klineLayerMain.clearUpDownArrows();
	},
	
	//清除最上面的玩家信息
	clearPlayerInfo:function()
	{
		this.playerInfoLayer.clear();
	},
	
	//清除K线图的所有数据
	clearDataForLineLayer:function()
	{
		if(this.klinedataMain==null || this.prevKlineData==null) return;
		
		//设置前面的一副蜡烛图
		this.klineLayerPrev.setKLineData(null);
		this.volumnTechLayerPrev.setKLineData(null);
		
	
		
		this.klineLayerMain.setKLineData(null);
		this.volumnTechLayerMain.setKLineData(null);
		
		////////////////////////////////////////////////////////
		
		if(this.matchInfoLayer!=null)
		{
			this.matchInfoLayer.disableAllButtons();
		}
	},
	
	setDataForLlineLayer:function()
	{
		if(this.klinedataMain==null || this.prevKlineData==null) return;
		
		this.phase2=false;
		//设置前面的一副蜡烛图
		this.klineLayerPrev.setKLineData(this.prevKlineData);
		
		this.removeChild(this.klineLayerMain);
		this.removeChild(this.volumnTechLayerMain);
		
		//先显示前面一副蜡烛图
		this.addChild(this.klineLayerPrev,this.mainLayerNumber,this.klineLayerPrev.getTag());

		this.volumnTechLayerPrev.setKLineData(this.prevKlineData);
		this.addChild(this.volumnTechLayerPrev,this.volumnTechLayerNumber,this.volumnTechLayerPrev.getTag());

		
		console.log("drawAllCandlesTillIndexOrEnd");
		this.klineLayerPrev.drawAllCandlesTillIndexOrEnd();
		this.volumnTechLayerPrev.drawAllCandlesTillIndexOrEnd();
		console.log("drawAllCandlesTillIndexOrEnd Over....");
		
		if(this.matchInfoLayer!=null)
		{
			this.matchInfoLayer.disableAllButtons();
		}
		this.setCountDownSprite();
	},
	//TEST
	setDataForLlineLayerTEST:function()
	{
		if(this.klinedataMain==null || this.prevKlineData==null) return;
		
		this.phase2=false;
		this.klineLayerPrev.drawAllCandlesTillIndexOrEnd();
		this.volumnTechLayerPrev.drawAllCandlesTillIndexOrEnd();
		console.log("drawAllCandlesTillIndexOrEnd Over....");
		
		if(this.matchInfoLayer!=null)
		{
			this.matchInfoLayer.disableAllButtons();
		}
		this.advanceToMainKLine_Phase();
	},
	
	countDownSprite:null,
	countDownNumber:null,
	
	setCountDownSprite:function()
	{
		if(this.countDownNumber==0 && this.countDownSprite!=null)
		{
			this.countDownSprite.setVisible(false);
			this.advanceToMainKline();
			return;
		}
		
		if(this.countDownSprite==null)
		{
			this.countDownNumber=5;
			//this.countDownSprite= cc.Sprite.create("res/cd_5.png");
			this.countDownSprite= cc.LabelTTF.create(this.countDownNumber,"Arial",100);
			this.addChild(this.countDownSprite,8);
		}
		this.countDownSprite.setVisible(true);
		var size = cc.director.getWinSize();
		//this.countDownLabel.setScale(1,0.2);
		this.countDownSprite.setPosition(size.width / 2, size.height / 2+25);
		this.countDownSprite.setOpacity(255);
		this.countDownSprite.setString(this.countDownNumber);
	//	this.countDownSprite.runAction(this.createAnimation_Move());
		//this.countDownLabel.runAction(this.createAnimation_Scale());
	//	this.countDownSprite.runAction(this.createAnimation_Fade());
		
		this.countDownNumber-=1;
		var self=this; 
		setTimeout(function(){self.setCountDownSprite();},1000);
	},
	
	phase1Time:0.25,
	phase2Time:0.5,
	phase3Time:0.25,
	
	createAnimation_Move:function()
	{
		var actionMoveIn=new cc.moveBy(this.phase1Time,0,-25);
		var actionBlank=new cc.ActionInterval(this.phase2Time);
		var actionMoveOut=new cc.moveBy(this.phase3Time,0,-25);
		return new cc.Sequence(actionMoveIn,actionBlank,actionMoveOut);
	},
	
	createAnimation_Scale:function()
	{
		var actionScaleIn=new cc.ScaleBy(this.phase1Time,1,5);
		var actionBlank=new cc.ActionInterval(this.phase2Time);
		var actionScaleOut=new cc.ScaleBy(this.phase3Time,1,0.2);
		return new cc.Sequence(actionScaleIn,actionBlank,actionScaleOut);
	},
	
	createAnimation_Fade:function()
	{
		var actionFadeIn=new cc.FadeTo(this.phase1Time,255);
		var actionBlank=new cc.ActionInterval(this.phase2Time);
		var actionFadeOut=new cc.FadeTo(this.phase3Time,0);
		return new cc.Sequence(actionFadeIn,actionBlank,actionFadeOut);
	},
	
	advanceToMainKline:function()
	{
		//var actionMoveOut=new cc.moveBy(0.5,-this.klineLayerMain.width,0);
		//var actionFadeOut=new cc.FadeTo(0.5,0);
		//this.klineLayerPrev.runAction(actionMoveOut);
		//this.klineLayerPrev.klineArea.runAction(actionFadeOut);

		//var self=this; 
		//setTimeout(function(){self.advanceToMainKLine_Phase2();},500);
		
		this.advanceToMainKLine_Phase2();
	},
	
	///得到当前的K线图的层
	getCurrentKLineLayer:function()
	{
		if(this.klineLayerMain.parent==this.lowerLayer)
		{
			return this.klineLayerMain;
		}
		if(this.klineLayerPrev.parent==this.lowerLayer)
		{
			return this.klineLayerPrev;
		}
		return null;
	},
	
	advanceToMainKLine_Phase2:function()
	{
		this.phase2=true;

		this.klineLayerPrev.removeFromParent(false);
		this.volumnTechLayerPrev.removeFromParent(false);
		
		//设置主K线图的数据
		this.klineLayerMain.setKLineData(this.klinedataMain,this.prevKlineData);
		this.addChild(this.klineLayerMain,this.mainLayerNumber,this.klineLayerMain.getTag());
		

		//设置附图的数据
		this.volumnTechLayerMain.setKLineData(this.klinedataMain,this.prevKlineData);
		this.addChild(this.volumnTechLayerMain,this.volumnTechLayerNumber,this.volumnTechLayerMain.getTag());
			
		this.matchInfoLayer.setButtonsToNoPosition();
		
		
		//先画前面的部分
		this.drawHistoryCandlePart();
		//依次画后面的K线
		this.drawCandlesOneByOne();
	},
	
	//TEST
	advanceToMainKLine_Phase:function()
	{
		this.phase2=true;

		this.klineLayerPrev.removeFromParent(false);
		this.volumnTechLayerPrev.removeFromParent(false);
		
		//设置主K线图的数据
		this.klineLayerMain.setKLineData(this.klinedataMain,this.prevKlineData);
		this.addChild(this.klineLayerMain,this.mainLayerNumber,this.klineLayerMain.getTag());
		
		//设置附图的数据
		this.volumnTechLayerMain.setKLineData(this.klinedataMain,this.prevKlineData);
		this.addChild(this.volumnTechLayerMain,this.volumnTechLayerNumber,this.volumnTechLayerMain.getTag());
			
		//一次性画出当前数据图
		this.drawCandlesAll();
	},
	
	drawHistoryCandlePart:function()
	{
		var index=this.klineLayerMain.getHistoryCandleIndexByPageIndex();
		var count=this.klineLayerMain.getHistoryCandleCountByPageIndex();
		for(var i=0;i<count;i++)
		{
			if(index<0)
			{
				this.klineLayerMain.drawSingleCandleLineByCurrentIndex(index+i);
				this.volumnTechLayerMain.drawSingleCandleLineByCurrentIndex(index+i);
			}
		}
	},
	
	drawCandlesOneByOne:function()
	{
		if(this.drawCandleStoped==false)
		{
			var ended=this.klineLayerMain.drawSingleCandleLineByCurrentIndex(this.currentCandleIndex);
			this.volumnTechLayerMain.drawSingleCandleLineByCurrentIndex(this.currentCandleIndex);
			
			if(ended)
			{
				console.log("绘制结束");
				this.sendEndMessage();
				this.matchEnd();
				return;
			}
			this.refreshScores(this.currentCandleIndex+1);
			this.currentCandleIndex+=1;
		}
		var self=this; 
		setTimeout(function(){self.drawCandlesOneByOne();},this.currentCandleDrawInterval);
	},
	
	//TEST 一次性画出用户数据图
	drawCandlesAll:function()
	{	
	
		this.klineLayerMain.drawAllCandlesAll();
		this.volumnTechLayerMain.drawAllCandlesAll();
		this.currentCandleIndex=this.klinedataMain.length;
		
		//画出买卖操作的信息
		this.businessInfo();
		//console.log("drawCandlesAll this.currentCandleIndex = ",this.currentCandleIndex);
	},
	//
	businessInfo:function()
	{
		console.log("businessInfo:function() begin= ");
		if(this.phase2==false)return;
		
		
		
		var businessInfo = TestClass.getConstant('TEST_DATA');
		for (i=0;i<businessInfo.length;i++)
		{
			console.log("businessInfo[" + i + "] = " + businessInfo[i]);
			this.selfOperations.push(businessInfo[i]);
			this.refreshScores(Math.abs(businessInfo[i]));
			if(businessInfo[i]>0)
			{
				this.klineLayerMain.setUpArrowIndex(Math.abs(businessInfo[i]),(this.selfOperations.length%2==1));
			}else{
				this.klineLayerMain.setDownArrowIndex(Math.abs(businessInfo[i]),(this.selfOperations.length%2==1));
			}
		}
		
	},
	
	sendEndMessage:function()
	{
		if(gSocketConn!=null && gSocketConn!=undefined)
		{
			gSocketConn.SendEndMessage();
		}
	},
	
	
	
	buyClick:function()
	{
		if(this.phase2==false)return;
		//注意：此处存入的买入操作的index不是从0开始，而是从1开始的
		var lastCandleIndex=this.currentCandleIndex;
		this.selfOperations.push(lastCandleIndex);
		this.refreshScores(lastCandleIndex);
		
		this.klineLayerMain.setUpArrowIndex(lastCandleIndex,(this.selfOperations.length%2==1));
		
		if(gSocketConn!=null && gSocketConn!=undefined)
		{
			gSocketConn.Buy(lastCandleIndex-1);
		}
	},
	
	sellClick:function()
	{
		if(this.phase2==false)return;
		//注意：此处存入的卖出操作的index不是从0开始，而是从1开始的
		var lastCandleIndex=this.currentCandleIndex;
		this.selfOperations.push(-lastCandleIndex);
		this.refreshScores(lastCandleIndex);
		
		this.klineLayerMain.setDownArrowIndex(lastCandleIndex,(this.selfOperations.length%2==1));
		if(gSocketConn!=null && gSocketConn!=undefined)
		{
			gSocketConn.Sell(lastCandleIndex-1);
		}
	},
	
				
	refreshScores:function(indexEnd)
	{
		if(indexEnd==null)
		{
			indexEnd=this.currentCandleIndex;
		}
		this.playerInfoLayer.refreshScore(indexEnd,this.klinedataMain,this.selfOperations,this.opponentOperations);
	},
	
	matchEnd:function()
	{
		this.matchInfoLayer.disableAllButtons();
	},
});