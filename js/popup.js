function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

//开启关闭 
function change(){
    var state=$('#s3').is(':checked');
    console.log(state)
    chrome.storage.local.set( { state:state }, function() {
        console.log('保存成功1！');
    });
    sendMessageToContentScript({cmd:'run', value:state}, function(response)
    {
        console.log('来自content的回复：'+response);
    });
}

function setInfo(){
    var type=$('input[name="type"]').val()
    var me=$('input[name="me"]').val()
    var txt=$('input[name="txt"]').val()
    var turn=$('input[name="turn"]').val()
    chrome.storage.local.set( { type:type,me:me,txt:txt,turn:turn }, function() {
        console.log('保存成功！');
        location.reload();
    });
}

$(function(){ 
        chrome.storage.local.get({type: 'time', me: 'on',txt:"现在时间%t%",turn:300,state:false }, function(items) {
            $('input[name="type"]').val(items.type)
            $('input[name="me"]').val(items.me)
            $('input[name="txt"]').val(items.txt)
            $('input[name="turn"]').val(items.turn)
            $("input[type='checkbox']").prop("checked",items.state);
        });
　　$("#save").click(function(){
　　　　setInfo();
　　}); 
        $("#s3").click(function(){
            change();
        }); 
}); 


