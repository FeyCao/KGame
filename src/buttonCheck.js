/**
 * Created by Administrator on 2016-10-21.
 */
// JavaScript Document
ButtonCheck=cc.Sprite.extend({
    clickevent:null,		//按钮按下的回调函数
    clickeventparam:null,	//回调函数的参数
    listener:null,
    isPressedDown:false,
    isDisabled:false,		//是否是被禁用的
    ctor: function (fileName, rect, rotated)
    {
        this._super(fileName, rect, rotated);
    },

    setClickEvent:function(clickevent)
    {
        this.clickevent=clickevent;
        var self=this;
        this.listener= cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: false,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                console.log("ButtonCheck onTouchBegan");
                if(self.isVisible()==true&& self.isDisabled==false)
                {
                    //var nextSceneM=new NextScene();
                    var target = event.getCurrentTarget();
                    var touchLocation=touch.getLocation();
                    //Get the position of the current point relative to the ButtonCheck
                    var locationInNode = target.convertToNodeSpace(touchLocation);
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode))
                    {
                        cc.log("begin..x="+ locationInNode.x+",y="+locationInNode.y+",s.width="+s.width+",s.height="+ s.height);
                        self.shrink();
                        this.isPressedDown=true;
                    }
                    else
                    {
                        cc.log("begin..x="+ locationInNode.x+",y="+locationInNode.y+",s.width="+s.width+",s.height="+ s.height);
                        console.log("ButtonCheck onTouchBegan doesn't contain "+self.__instanceId);
                    }
                }
                return true;
            },
            //onTouchMoved: null,
            //onTouchEnded: null,
            //onTouchCancelled: null,
            //
            onTouchEnded: function (touch, event) {
                if(self.isVisible()==true&& self.isDisabled==false)
                {
                    console.log("ButtonCheck onTouchEnded");
                    //var nextSceneM=new NextScene();
                    var target = event.getCurrentTarget();
                    var touchLocation=touch.getLocation();
                    //Get the position of the current point relative to the ButtonCheck
                    var locationInNode = target.convertToNodeSpace(touchLocation);
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    //Check the click area

                    if (this.isPressedDown==true&&cc.rectContainsPoint(rect, locationInNode))
                    {
                        cc.log("begin..x="+ locationInNode.x+",y="+locationInNode.y+",s.width="+s.width+"s.height="+ s.height);
                        //console.log("onTouchEnded");
                        self.unshrink();
                        if(self.clickevent!=null)
                        {
                            self.clickevent();
                        }
                        this.isPressedDown=false;
                    }
                    else
                    {
                        console.log("ButtonCheck onTouchEnded doesn't contain "+self.__instanceId);
                    }
                }

            },
            onTouchCancelled:function (touch, event) {
                if(self.isVisible()==true&& self.isDisabled==false)
                {
                    self.unshrink();

                }

            },

        });

        cc.eventManager.addListener(this.listener, this);
    },
    setDisabled:function(isDisabled)
    {
        this.isDisabled=isDisabled;
    },
    ///当按钮按下去的时候，缩小
    shrink:function()
    {
        var self=this;
        var actionNormal=new cc.ScaleTo(0.032,self.scale*0.8,self.scale*0.8);
        this.runAction(actionNormal);
    },

    ///当按钮弹起来的时候，放大
    unshrink:function()
    {
        var self=this;
        var actionNormal=new cc.ScaleTo(0.032,self.scale*1.25,self.scale*1.25);
        this.runAction(actionNormal);
    },
});