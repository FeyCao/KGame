// JavaScript Document
var gSocketConn=null;
var gPlayerName=null;			//用户名
var gPlayerAvatarSprite=null;	//头像

var gLoginManager=null;

var gDesignResolutionWidth=736;
var gDesignResolutionHeight=414;

var gKlineScene=null;
var gMainMenuScene=null;

window.onload = function()
{
	/*
	if(typeof(Worker)!=="undefined")
 	{
  		// Yes! Web worker support!
  		// Some code.....
  		w=new Worker("src/myWorker.js");
		w.onmessage=function(event){
		alert(event.data);
		};
  	}
	else
  	{
  		alert("Sorry! No Web Worker support..");
  	}	
  	*/
	
  cc.game.onStart = function(){
	  	var screenSize=cc.view.getFrameSize();
		cc.view.setDesignResolutionSize(gDesignResolutionWidth, gDesignResolutionHeight, cc.ResolutionPolicy.SHOW_ALL);
	 
	  	//load resources
	  	cc.LoaderScene.preload(["res/title.png","res/login.png","res/loginbutton.png","res/quicklogin.png","res/selected.png","res/messagebox.png","res/rotate.png","res/rotate_shadow.png","res/cd_1.png","res/cd_2.png","res/cd_3.png","res/cd_4.png","res/cd_5.png","res/avatar1.png","res/avatar2.png","res/avatar3.png","res/avatar4.png","res/avatar5.png","res/btnBuyDisable.png","res/btnBuyEnable.png","res/btnCloseBuy.png","res/btnCloseDisable.png","res/btnCloseSell.png","res/btnSellDisable.png","res/btnSellEnable.png","res/buyOpenTag.png","res/buyCloseTag.png","res/sellOpenTag.png","res/sellCloseTag.png","res/cursor.png","res/mainMenu.png","res/selectedBar.png","res/tabSingle1.png","res/tabSingle2.png","res/tabMulti1.png","res/tabMulti2.png","res/tabFriend1.png","res/tabFriend2.png","res/btnStart.png","res/btnPractise.png","res/btnConfig.png","res/matchEnd.png","res/meBtnQuit.png","res/meBtnReplay.png","res/meBtnAgain.png","res/meBtnShare.png","res/btn_sc_d_normal.png","res/btn_sc_a_normal.png","res/btn_sc_d_double.png","res/btn_sc_a_double.png","res/btn_sc_d_half.png","res/btn_sc_a_half.png","res/btn_sc_play.png","res/btn_sc_bg.png","res/btn_sc_pause.png"], function () {
		  //cc.director.runScene(new TestScene());
		  cc.director.runScene(new TempLoadScene());
		  //cc.director.runScene(new KLineScene());
	  }, this);
  };
  
  cc.game.run("gameCanvas");
  
  
  
 
};

function gotoshare()
{
	//注意：该函数无任何作用，只是为了给APP分享时捕获链接用的
}

function getQueryString()
{
	var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
	for(var i = 0; i < result.length; i++)
	{
		result[i] = result[i].substring(1);
	}
	return result;
}

//根据QueryString参数名称获取值
function getQueryStringByName(name)
{
	var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
	if(result == null || result.length < 1)
	{
		return "";
	}
	return result[1];
}

//根据QueryString参数索引获取值
function getQueryStringByIndex(index)
{
	if(index == null)
	{
		return "";
	}

	var queryStringList = getQueryString();
	if (index >= queryStringList.length)
	{
		return "";
	}

	var result = queryStringList[index];
	var startIndex = result.indexOf("=") + 1;
	result = result.substring(startIndex);
	return result;
}

