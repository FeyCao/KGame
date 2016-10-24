// JavaScript Document
var TempLoadScene = SceneBase.extend(
{
	backgroundLayer:null,		//背景层
	
	username:null,
	password:null,
	source:null,

	titleSprite:null,
	
	loadTime:null,
	
	ctor: function ()
	{
		this._super();
		this.backgroundLayer=null;
	},
	
	onEnter:function () 
	{
		this._super();
		
		//清除保存的账号信息
		this.removeLocalStorageItems();
		
		var size = cc.director.getWinSize();
		this.backgroundLayer=new cc.LayerColor(cc.color(15,96,148, 255));
		this.backgroundLayer.ignoreAnchorPointForPosition(false);  
		this.backgroundLayer.setPosition(size.width / 2, size.height / 2);  
		this.addChild(this.backgroundLayer, 1,this.backgroundLayer.getTag());
		
		this.titleSprit=new cc.Sprite.create("res/title.png");
		this.titleSprit.setPosition(this.width / 2, this.height / 2);
		this.titleSprit.setScale(1);
		this.addChild(this.titleSprit, 2,this.titleSprit.getTag());




		if(gLoginManager==null)
		{
			gLoginManager=new LoginManager();
		}
		
		var self=this;
        userInfo.userId=getQueryStringByName("userId");
        userInfo.deviceId=getQueryStringByName("deviceId");
        userInfo.source=getQueryStringByName("source");

        console.log("userId="+userInfo.userId+"deviceId="+userInfo.deviceId+"source="+userInfo.source);

        if(userInfo.userId!=null&&userInfo.deviceId!=null)
        {

            this.username=userInfo.userId;
            this.password=userInfo.deviceId;
            this.source=userInfo.source;
            gLoginManager.Login(this.username,this.password,this.source,function(packet){self.messageCallback(packet)},function(){self.connectErrorCallBack()});
            //cc.director.runScene(new MainMenuScene());
        }
        //
		//if(localStorage.lastusername!="" && localStorage.lastusername!=undefined)
		//{
		//	var pwd=this.getPasswordFromLocalStorage(localStorage.lastusername);
		//
		//	this.username=localStorage.lastusername;
		//	this.password=pwd;
		//	console.log("source="+this.source);
		//	gLoginManager.Login(this.username,this.password,"SWEB",function(packet){self.messageCallback(packet)},function(){self.connectErrorCallBack()});
		//}
		else
		{
			gLoginManager.QuickLogin(function(packet){self.messageCallback(packet)},function(){self.connectErrorCallBack()});
		}
		
		this.showProgress();
		loadTime=new Date().getTime();
	},
	
	removeLocalStorageItems:function()
	{
		localStorage.removeItem("remPwd");
		localStorage.removeItem("autologin");
		localStorage.removeItem("lastusername");
		localStorage.removeItem("usrnamepwdDict");
	},
	
	getPasswordFromLocalStorage:function(username)
	{
		var dict=localStorage.usrnamepwdDict;
		if(dict==undefined || dict==null) return null;
		var fields=dict.split("#");
		for(var i=0;i<fields.length;i=i+2)
		{
			if(fields[i]==username)
			{
				if(i+1<fields.length)
				{
					return fields[i+1];
				}
			}
		}
		return null;
	},
	
	
	connectErrorCallBack:function()
	{
		var self=this;
		//setTimeout(function(){
		//	self.stopProgress();
		//	self.showMessageBox("服务器连接失败，请稍候再试！",function(){self.messageBoxClosed();});
		//	},2000);
		this.stopProgress();
		this.showMessageBox("服务器连接失败，请稍候再试！",function(){this.messageBoxClosed();});
	},
	
	messageCallback:function(packet)
	{
		console.log("login scene message callback packet="+packet.msgType+" content="+packet.content);
		var self=this;
		if(packet.msgType=="1")
		{
			gPlayerName=packet.content;
			//登录成功
			this.OnLogined(packet.content);
		}
        //else if(packet.msgType=="WEBL")
        //{
        //    //WEB登录成功
        //    this.stopProgress();
        //    this.showMessageBox("登录失败:"+packet.content,function(){self.messageBoxClosed();});
        //}
        //else if(packet.msgType=="APPL")
        //{
        //    //APP登录成功
        //    this.stopProgress();
        //    cc.director.runScene(new MainMenuScene());
        //    //this.showMessageBox("登录失败:"+packet.content,function(){self.messageBoxClosed();});
        //}
		else if(packet.msgType=="2")
		{
			//登录失败
			this.stopProgress();
			this.showMessageBox("登录失败:"+packet.content,function(){self.messageBoxClosed();});
		}
		else if(packet.msgType=="B")
		{
			//快速登录成功
			gPlayerName=packet.content.split("#")[0];
			
			this.username=gPlayerName;
			this.password=packet.content.split("#")[1];
			this.source=packet.content.split("#")[2];
			this.stopProgress();
			
			gLoginManager.Login(this.username,this.password,this.source,function(packet){self.messageCallback(packet)},function(){self.connectErrorCallBack()});
			
		}
		else if(packet.msgType=="C")
		{
			//注册失败
			this.stopProgress();
			this.showMessageBox("快速登录失败:"+packet.content,function(){self.messageBoxClosed();});
		}
		else if(packet.msgType=="S")
		{
			//分享成功
			this.stopProgress();
			//gLoginManager.Login(this.username,this.password,null,function(packet){self.messageCallback(packet)},function(){self.connectErrorCallBack()});
		}
	},
	
	OnLogined:function(content)
	{


        this.username=content.split("#")[0];
        //this.password=packet.content.split("#")[1];
        this.source=content.split("#")[1];

		//this.saveCheckboxState();
        console.log( "packet.content="+content+"|this.username="+this.username+"|this.source="+this.source);

        this.moveToNextScene();

	},
	
	
	//一般是登录名或者密码错误之类的框关闭以后
	messageBoxClosed:function()
	{
		//this.showOrHideTextBoxUILabel(false);
	},
	
	saveCheckboxState:function()
	{
		localStorage.remPwd="true"
		localStorage.autologin="true"
		localStorage.lastusername=this.username;
		var fields=null;
		if(localStorage.remPwd=="true")
		{
			var dict=localStorage.usrnamepwdDict;
			if(dict==undefined)
			{
				dict="";
			}
			fields=dict.split("#");
			var bFound=false;
			for(var i=0;i<fields.length;i=i+2)
			{
				if(fields[i]==this.username)
				{
					fields[i+1]=this.password;
					bFound=true;
					break;
				}
			}
			if(bFound==false)
			{
				fields.push(this.username);
				fields.push(this.password);
			}
		}
		
		if(fields!=null)
		{
			dict="";
			for(var i=0;i<fields.length;i++)
			{
				if(fields[i]!="")
				{
					dict=dict+fields[i]+"#";
				}
			}
			localStorage.usrnamepwdDict=dict;
		}
	},
	
	moveToNextScene:function()
	{
		
		var self=this;
		var endTime=new Date().getTime();
		if(endTime-loadTime>5000)
		{
			this.moveToNextSceneCallBack();
		}
		else
		{
			setTimeout(function(){self.moveToNextSceneCallBack(),5000-(endTime-loadTime);});
		}
	},
	
	moveToNextSceneCallBack:function()
	{
		console.log("登录成功，准备切换到下一个场景");
		this.stopProgress();


        if(this.source=="SWEB"){
            var klineSceneNext=new KLineScene();
            klineSceneNext.onEnteredFunction=function(){
                klineSceneNext.showProgress();
            };
            gSocketConn.RegisterEvent("onmessage",klineSceneNext.messageCallBack);
            gSocketConn.BeginMatch(0);
            //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
            cc.director.runScene(klineSceneNext);
            console.log("SWEB切换场景调用完毕");
        }else if(this.source=="DHJK"){
            var mainMenuScene=new MainMenuScene();
            //mainMenuScene.onEnteredFunction=function(){
            //    mainMenuScene.showProgress();
            //};

            gSocketConn.RegisterEvent("onmessage",mainMenuScene.messageCallBack);
            gSocketConn.SendEHMessage(this.username,this.password);
            //cc.director.runScene(cc.TransitionFade.create(0.5,klineSceneNext,cc.color(255,255,255,255)));
            cc.director.runScene(mainMenuScene);
            console.log("DHJK切换场景调用完毕");
        }


	}
});