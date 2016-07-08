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
  cc.game.onStart = function(){
	  	var screenSize=cc.view.getFrameSize();
		cc.view.setDesignResolutionSize(gDesignResolutionWidth, gDesignResolutionHeight, cc.ResolutionPolicy.SHOW_ALL);
	 
	  	//load resources
	  	cc.LoaderScene.preload(["res/avatar1.png","res/avatar2.png","res/avatar3.png","res/avatar4.png","res/avatar5.png","res/buyOpenTag.png","res/buyCloseTag.png","res/sellOpenTag.png","res/sellCloseTag.png"], function () {
		  cc.director.runScene(new KLineScene());
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

