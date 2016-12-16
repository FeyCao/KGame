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

var gKlineScene;
var gMainMenuScene;

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

	  // var paths = [
		//   'res',
		//   'fonts',
		//   'res/sound'
	  // ];
	  // var searchPaths = jsp.fileUtils.getSearchPaths();
		  //load resources
	  cc.LoaderScene.preload(g_resources, function () {
          //var userId=GetQueryString("userId");
          //var deviceId=GetQueryString("deviceId");
          //cc.log("userId="+userId);
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
	  cc.view.enableRetina(true);
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

