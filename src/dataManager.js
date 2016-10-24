/**
 * Created by Administrator on 2016-10-18.
 */
var Singleton = (function () {
    var instantiated;
    function init() {
        /*这里定义单例代码*/
        return {
            publicMethod: function () {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();


var gSocketConn=null;
var gPlayerName=null;			//用户名
var gPlayerAvatarSprite=null;	//头像

var gLoginManager=null;

var gDesignResolutionWidth=736;
var gDesignResolutionHeight=414;

var gKlineScene=null;//K 线界面
var gMainMenuScene=null;// 大厅界面



/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();

//var wsURL = 'ws://222.66.97.203:5003/';//公网测试
var wsURL = 'ws://222.66.97.203:5003/Kgamefeng/websocket';//晓峰环境
//var wsURL = 'ws://180.169.108.231:5003/';//生产环境
//var wsURL = 'ws://192.168.16.250:8484/';//测试
//var wsURL = 'ws://192.168.16.250:8384/';//调试
//var wsURL = 'ws://192.168.16.250:5180/Kgamefeng/websocket';//晓峰环境
//var wsURL = 'ws://192.168.16.145:8080/Kgamefeng/websocket';//晓峰环境
SOURCE_DHJK = "DHJK";     //东航金控APP
SOURCE_ZSQQ = "ZSQQ";     //掌上全球APP
SOURCE_ZZFW = "ZZFW";     //增值服务中心网站
SOURCE_TEST = "TEST";     //东航金控APP
SOURCE_WEB = "SWEB";      //通过web访问

var RedColor=cc.color(255,27,27,255);//红色
var YellowColor=cc.color(255,217,0,255);//黄色
var GreenColor=cc.color(6,224,0,255);//绿色
var WhiteColor=cc.color(189,240,255,255);//白色


var userInfo ={
    //主界面数据
    userId:null,//
    deviceId:null,//设备号
    source:null,

    //
    userName:null,
    userPassword:null,

    winOfMatchForOne:0,//练习场胜利次数
    sumOfMatchForOne:0,//练习场总次数
    winOfMatchForMore:0,//
    gainCumulation:0,//收益率
    sumOfAllMatch:0,//比赛总场数

    //战绩数据
    totalCount:null,//总战斗场数
    winRate:null,//胜率
    AvgGain:null,//平局收益率
    MatchListData:null,//比赛记录


}

