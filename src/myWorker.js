// JavaScript Document

var tempcount=0;

function timedCount()
{
tempcount=tempcount+1;
postMessage(tempcount);
setTimeout("timedCount()",3000);
}

timedCount();
