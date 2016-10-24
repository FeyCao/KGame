// JavaScript Document
var gSocketConn=null;
var gPlayerName=null;			//用户名
var gPlayerAvatarSprite=null;	//头像

var gLoginManager=null;

//var gDesignResolutionWidth=1280;
//var gDesignResolutionHeight=720;
//http://192.168.16.250:5180/KGameClient/index.html?userId=3434343770&deviceId=2ECF07FA-A717-6292-C64C-64A2AB89AB2C&source=DHJK
//3434343770#2ECF07FA-A717-6292-C64C-64A2AB89AB2C
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
      cc.view.resizeWithBrowserSize(true);//设置随浏览器窗口变化
	  	//load resources
	  cc.LoaderScene.preload(["res/title.png","res/zhanji_bg.png","res/zhanji_close.png","res/line_bg.png","res/selected.png","res/messagebox.png","res/rotate.png","res/rotate_shadow.png","res/avatar1.png","res/avatar2.png","res/avatar3.png","res/avatar4.png","res/avatar5.png","res/btnBuyDisable.png","res/btnBuyEnable.png","res/btnCloseBuy.png","res/btnCloseDisable.png","res/btnCloseSell.png","res/btnSellDisable.png","res/btnSellEnable.png","res/buyOpenTag.png","res/buyCloseTag.png","res/sellOpenTag.png","res/sellCloseTag.png","res/cursor.png","res/selectedBar.png","res/btnStart.png","res/matchEnd.png","res/meBtnQuit.png","res/meBtnReplay.png","res/meBtnAgain.png","res/btnStart.png","res/meBtnShare.png","res/btn_sc_d_normal.png","res/btn_sc_a_normal.png","res/btn_sc_d_double.png","res/btn_sc_a_double.png","res/btn_sc_d_half.png","res/btn_sc_a_half.png","res/btn_sc_play.png","res/btn_sc_bg.png","res/btn_sc_pause.png","res/tabMulti1.png","res/tabMulti2.png","res/tabSingle1.png","res/tabSingle2.png","res/tabFriend1.png","res/tabFriend2.png","res/mainMenu_bg.png","res/btn_control.png","res/btn_zhanji.png","res/btn_paihang.png","res/btn_help.png","res/btn_mode1_u.png","res/btn_mode1_d.png","res/btn_mode2_u.png","res/btn_mode2_d.png","res/btn_mode3_u.png","res/btn_mode3_d.png","res/btn_mode4_u.png","res/btn_mode4_d.png","res/touxiang.png","res/xunzhang.png","res/btnRecord.png","res/btn_mode1.png","res/btn_mode2.png","res/btn_mode3.png","res/btn_mode4.png","res/home.png"], function () {
          //var userId=GetQueryString("userId");
          //var deviceId=GetQueryString("deviceId");
          //console.log("userId="+userId);
          //if(userId==null||userId=="undefine")
          //{
          //    cc.director.runScene(new TempLoadScene());
          //}
          //else
          //{
          //    cc.director.runScene(new MainMenuScene());
          //}
          cc.director.runScene(new TempLoadScene());
		  //cc.director.runScene(new ZhanjiViewLayer());
	  }, this);
  };
  
  cc.game.run("gameCanvas");
 
};

function gotoshare()
{
	//注意：该函数无任何作用，只是为了给APP分享时捕获链接用的
	window.open("shareGame.html");
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

