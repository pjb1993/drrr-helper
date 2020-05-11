    console.log('注入成功')
	function getTime()
    {     	//获取时间
        var date=new Date();

        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();

        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        if (hour<10) {
            hour='0'+hour;
        }
        if (minute<10) {
            minute='0'+minute;
        }
        if (second<10) {
            second='0'+second;
        }
        return time=year+'/'+month+'/'+day+'/'+hour+':'+minute+':'+second
    }
    var clock=function(){
        chrome.storage.local.get({type: 'time', me: 'on',txt:"现在时间%t%"}, function(items) {
            var txt='';
           if(items.type=='time'){
                txt=items.txt.replace( '%t%',getTime() );
                if(items.me=='on'){txt='/me'+txt}
                $('#message').find('textarea').val(txt);
                $('#message').find('input[name="post"]').click();
            }else if(items.type=='hitotoko'){
                chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
                    txt=response
                    if(items.me=='on'){txt='/me'+txt}
                    $('#message').find('textarea').val(txt);
                    $('#message').find('input[name="post"]').click();
                });
            }
            
        });
        
    }
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
    {
        console.log('收到消息')
        if(request.cmd == 'run'){
            chrome.storage.local.get({state:false,turn:300}, function(items) {
                if(items.state==false){
                    clearInterval(myVar);
                }else{
                    clock();
                    turn_=items.turn*1000;
                    myVar=setInterval( 'clock()' ,turn_);
                }
            });
        }
        sendResponse('我收到了你的消息！');
    });
