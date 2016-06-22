var gMainMenusSceneInst;

var MainMenuScene = SceneBase.extend(
{
	klineScene:null,

	backgroundLayer:null,
	backgroundSprite:null,
	praticeButton:null,
	configButton:null,
	startButton:null,
	
	tabButtonSingle:null,
	tabButtonMulti:null,
	tabButtonFriend:null,
	
	tabBarSelectedSprite:null,
	
	onEnter:function () 
	{
		this._super();
		gMainMenusSceneInst=this;
		//this.waitingLabel= cc.LabelTTF.create("Waiting...","Arial",100);
		//this.addChild(this.waitingLabel, 1,this.waitingLabel.getTag());
		var size = cc.director.getWinSize();
		
		//this.waitingLabel.setPosition(size.width / 2, size.height / 2+25);
		//this.waitingLabel.setOpacity(255);
	
		var self=this;	
		//先入队等待
		//gSocketConn.RegisterEvent("onmessage",function(message){self.messageCallBack(message)});
		//gSocketConn.BeginMatch(0);		//先测试单人模式
		//console.log("Waiting for new macth...");
		
		this.backgroundLayer=new cc.Layer();
		this.addChild(this.backgroundLayer, 1);
		
		this.backgroundSprite=cc.Sprite.create("res/mainMenu.png");
		this.backgroundSprite.setPosition(size.width/2,size.height/2);
		this.backgroundSprite.setScale(1.0);
		
		this.praticeButton=new Button("res/btnPractise.png");
		this.praticeButton.setPosition(cc.p(615,380));
		this.praticeButton.setClickEvent(function(){
			self.practise();
		});
		
		this.configButton=new Button("res/btnConfig.png");
		this.configButton.setPosition(cc.p(693,380));
		this.configButton.setClickEvent(function(){
			self.config();
		});
		
		this.startButton=new Button("res/btnStart.png");
		this.startButton.setPosition(cc.p(603,46));
		this.startButton.setClickEvent(function(){
			self.start();
		});
		
		this.tabButtonSingle=new CheckButton("res/tabSingle1.png","res/tabSingle2.png");
		this.tabButtonSingle.setPosition(cc.p(111,364));
		this.tabButtonSingle.setClickEvent(function(){
			self.singleMatchTabChanged();
		});
		
		this.tabButtonMulti=new CheckButton("res/tabMulti1.png","res/tabMulti2.png");
		this.tabButtonMulti.setPosition(cc.p(232,364));
		this.tabButtonMulti.setClickEvent(function(){
			self.multiMatchTabChanged();
		});
		
		this.tabButtonFriend=new CheckButton("res/tabFriend1.png","res/tabFriend2.png");
		this.tabButtonFriend.setPosition(cc.p(353,364));
		this.tabButtonFriend.setClickEvent(function(){
			self.friendMatchTabChanged();
		});
		
		this.tabBarSelectedSprite=cc.Sprite.create("res/selectedBar.png");
		this.tabBarSelectedSprite.setScale(1.0);
		this.tabBarSelectedSprite.setVisible(false);
		
		this.backgroundLayer.addChild(this.backgroundSprite, 1);		
		this.backgroundLayer.addChild(this.praticeButton, 2);
		this.backgroundLayer.addChild(this.configButton, 2);
		this.backgroundLayer.addChild(this.startButton, 2);
		this.backgroundLayer.addChild(this.tabButtonSingle, 2);
		this.backgroundLayer.addChild(this.tabButtonMulti, 2);
		this.backgroundLayer.addChild(this.tabButtonFriend, 2);
		this.backgroundLayer.addChild(this.tabBarSelectedSprite, 2);
		
		this.tabButtonSingle.setChecked(true);
	},
	
	singleMatchTabChanged:function()
	{
		if(this.tabButtonSingle.isSelected==true)
		{
			this.tabBarSelectedSprite.setVisible(true);
			this.tabBarSelectedSprite.setPosition(111,342.5);
			
			this.tabButtonMulti.setChecked(false);
			this.tabButtonFriend.setChecked(false);
		}
	},
	
	multiMatchTabChanged:function()
	{
		if(this.tabButtonMulti.isSelected==true)
		{
			this.tabBarSelectedSprite.setVisible(true);
			this.tabBarSelectedSprite.setPosition(232,342.5);
			
			this.tabButtonSingle.setChecked(false);
			this.tabButtonFriend.setChecked(false);
		}
	},
	
	friendMatchTabChanged:function()
	{
		if(this.tabButtonFriend.isSelected==true)
		{
			this.tabBarSelectedSprite.setVisible(true);
			this.tabBarSelectedSprite.setPosition(353,342.5);
			
			this.tabButtonSingle.setChecked(false);
			this.tabButtonMulti.setChecked(false);
		}
	},
	
	start:function()
	{
		var self=this;	
		gSocketConn.RegisterEvent("onmessage",self.messageCallBack);
		gSocketConn.BeginMatch(0);		//先测试单人模式
		this.showProgress();
		
		console.log("Waiting for new macth...");
	},
	
	
	practise:function()
	{
		
	},
	
	config:function()
	{
		
	},
	
	
	messageCallBack:function(message)
	{
		var self=gMainMenusSceneInst;
		var packet=Packet.prototype.Parse(message);
		if(packet==null) return;
		if(packet.msgType=="4")
		{
			//接收到了匹配成功的消息
			self.klineScene=new KLineScene();
			console.log("New macth founded...");
			//cc.director.runScene(cc.TransitionSlideInL.create(0.5,klineScene));
			self.klineScene.opponentsInfo.push(packet.content);
			
			self.stopProgress();
			
			var diff=self.getSceneElapsedMilliSeconds();
			console.log("waiting scene diff="+diff);
			if(diff<1000)
			{
				setTimeout(function(){
					self.moveToNextScene();
					},1000);
			}
			else
			{
				self.moveToNextScene();
			}
		}
		else if(packet.msgType=="5")
		{
			//接收到了K线数据的消息
			gSocketConn.UnRegisterEvent("onmessage",self.messageCallBack);
			if(self.klineScene!=null)
			{
				console.log("call get kline data");
				self.klineScene.getklinedata(packet.content);
				console.log("get kline passed");
			}
		}
	},
	
	moveToNextScene:function()
	{
		cc.director.runScene(this.klineScene);
		console.log("run scene called");
	}
});