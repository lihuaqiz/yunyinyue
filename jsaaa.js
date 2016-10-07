(function(){
    var oDiv=document.getElementById('return')
    window.onscroll=abc;
    function abc() {
        if(utils.win("scrollTop")>0){
            oDiv.style.display="block";
        }
        else{
            oDiv.style.display="none";
        }
    }
    oDiv.onclick= function () {
        this.style.display="none";
        var scroll=utils.win("scrollTop");
        utils.win("scrollTop",0);
        if(scroll<=0){
            window.onscroll=abc;
        }
    };
    var oBox=document.getElementById('back');
    var oBoxM=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxM.getElementsByTagName('div');
    var aImg=oBoxM.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('span')[0];
    var oBtnRight=oBox.getElementsByTagName('span')[1];
    var step=0;
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoMove,3000);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aDiv.length; i++){
            if(i===step){
                utils.css(aDiv[i],'zIndex',1);
                animate(aDiv[i],{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        animate(siblings[i],{opacity:0});
                    }
                });
                continue;
            }
            utils.css(aDiv[i],'zIndex',0)
        }
        bannerTip();
    }
    function bannerTip(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i===step?'on':null;
        }
    }
    oBox.onmouseover=function(){
        clearInterval(timer);
        oBtnLeft.style.display='block';
        oBtnRight.style.display='block';
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,1000);
        oBtnLeft.style.display='none';
        oBtnRight.style.display='none';
    };
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                setBanner();
            }
        }
    }
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aLi.length;
        }
        step--;
        setBanner();
    }
})()