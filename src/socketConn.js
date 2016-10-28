// JavaScript Document

var SocketConnLogFlag = false;
function SocketConn()
{
	this.onopenevent=[];
	this.onmessageevent=[];
	this.oncloseevent=[];
	this.onerrorevent=[];
	this.urlToConnect="";
	this.isconnected=false;
}

SocketConn.prototype.Connect=function(url)
{
	this.urlToConnect=url;
	var wsImpl = window.WebSocket || window.MozWebSocket;
	var self=this;
	
	window.ws = new wsImpl(url);
	 // when data is comming from the server, this metod is called
	ws.onmessage = function (evt) {
		for(var i=0;i<self.onmessageevent.length;i++)
		{
			self.onmessageevent[i](evt.data);
		}
		console.log("onmessage");
	};

	// when the connection is established, this method is called
	ws.onopen =function(){
		console.log("self.onopenevent.length="+self.onopenevent.length);
		self.isconnected=true;
		for(var i=0;i<self.onopenevent.length;i++)
		{
			self.onopenevent[i]();
		}
		console.log("open");
	};

	// when the connection is closed, this method is called
	ws.onclose = function () {
		self.isconnected=false;
		for(var i=0;i<self.oncloseevent.length;i++)
		{
			self.oncloseevent[i]();
		}
		console.log("close");
	};
	
	ws.onerror = function(evt){
		for(var i=0;i<self.onerrorevent.length;i++)
		{
			self.onerrorevent[i]();
		}
		console.log("WebSocketError!");
	}; 
}

SocketConn.prototype.GetEventArrayByName=function(eventname)
{
	switch(eventname)
	{
	case "onopen":
		return this.onopenevent;
	case "onmessage":
		return this.onmessageevent;
	case "onclose":
		return this.oncloseevent;
	case "onerror":
		return this.onerrorevent;
	}
	return null;
}

SocketConn.prototype.RegisterEvent=function(eventname,callbackfunction)
{
	if(SocketConnLogFlag!=false)
	console.log("RegisterEvent eventname="+eventname+", callbackfunction="+callbackfunction);
	var eventArray=this.GetEventArrayByName(eventname);
	if(eventArray==null) return;
	for(var i=0;i<eventArray.length;i++)
	{
		if(eventArray[i]==callbackfunction)
		{
			return;
		}
	}
	eventArray.push(callbackfunction);
}

SocketConn.prototype.UnRegisterEvent=function(eventname,callbackfunction)
{
	var eventArray=this.GetEventArrayByName(eventname);
	if(eventArray==null) return;
	for(var i=0;i<eventArray.length;i++)
	{
		if(eventArray[i]==callbackfunction)
		{
			eventArray.splice(i,1);
			return;
		}
	}
}


SocketConn.prototype.Login=function(username,password,source)
{
	var loginMsg="0|"+username+"#"+password+"#"+source+"|";
	if(SocketConnLogFlag!=false)
	console.log("send login msg="+loginMsg);
	ws.send(loginMsg);
}

SocketConn.prototype.QuickLogin=function()
{
	var quickLoginMsg="A||";
	if(SocketConnLogFlag!=false)
	console.log("send QuickLogin msg="+quickLoginMsg);
	ws.send(quickLoginMsg);
}

SocketConn.prototype.SendBeginMessage=function()
{
	if(SocketConnLogFlag!=false)
    console.log("send sBegin msg= BEGIN||");
    ws.send("BEGIN||");
}

SocketConn.prototype.SendRecordMessage=function(matchId,userId)//查看对战记录
{
    var recordMsg = "O|"+matchId+"#"+userId+"|";
	if(SocketConnLogFlag!=false)
    console.log("send Recordmsg=="+recordMsg);
    ws.send(recordMsg);
}

SocketConn.prototype.BeginMatch=function(mode)
{
	ws.send("3|"+mode+"|");
}

SocketConn.prototype.Buy=function(index)
{
	var buyMsg = "6|"+index+"|";
	if(SocketConnLogFlag!=false)
	console.log("send Buymsg=="+buyMsg);
	ws.send(buyMsg);
}

SocketConn.prototype.Sell=function(index)
{
	var sellMsg = "7|"+index+"|";
	if(SocketConnLogFlag!=false)
	console.log("send Sellmsg=="+sellMsg);
	ws.send(sellMsg);
	//ws.send("7|"+index+"|");
}

SocketConn.prototype.Step=function(index)
{
	var stepMsg = "8|"+index+"|";
	if(SocketConnLogFlag!=false)
	console.log("send Stepmsg=="+stepMsg);
	ws.send(stepMsg);
	//ws.send("8|"+index+"|");
}

SocketConn.prototype.SendEndMessage=function()
{
	if(SocketConnLogFlag!=false)
	console.log("send Endmsg==E||");
	ws.send("E||");
}

SocketConn.prototype.SendShareMessage=function()
{
	if(SocketConnLogFlag!=false)
	console.log("send share msg= S||");
	ws.send("S||");
}

SocketConn.prototype.ShareMessage=function(userId,matchId)
{
	var shareMsg="G|"+userId+"#"+matchId+"|";
	//console.log("send share msg="+shareMsg);
	ws.send(shareMsg);
}

SocketConn.prototype.SendEHMessage=function(userId,matchId)
{
    var ehMsg="P|"+userId+"#"+matchId+"|";
    console.log("send H msg="+ehMsg);
    ws.send(ehMsg);
}


SocketConn.prototype.SendZhanjiMessage=function(userId,pageIdx)
{
    var ehMsg="Z|"+userId+"#"+pageIdx+"|";
    console.log("send Z msg="+ehMsg);
    ws.send(ehMsg);
}
//
// SocketConn.prototype.SendRecordMessage=function(userId,matchId)
// {
// 	var ehMsg="O|"+userId+"#"+matchId+"|";
// 	console.log("send Z msg="+ehMsg);
// 	ws.send(ehMsg);
// }
/*SocketConn.prototype.ShareMessage=function(shareMsg)
{
	var shareMsg="G|"+shareMsg+"|";
	console.log("send share msg="+shareMsg);
	ws.send(shareMsg);
}*/