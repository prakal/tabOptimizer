//This line opens up a long-lived connection to your background page.
var port = chrome.runtime.connect({name:"mycontentscript"});
port.onMessage.addListener(function(message,sender){
    // document.getElementById("x").innerHTML = message.url;
    var oldDiv = document.getElementById("x");
    var newDiv = document.createElement('div');
    newDiv.innerHTML = '<a href="'+message.url+'"">'+message.url+'</a>';
    newDiv.id = message.url;
    newDiv.addEventListener('click', function(){
      // delete record from popup.html
      this.parentNode.removeChild(this);
      chrome.tabs.create({'url':message.url});
    });
    document.body.insertBefore(newDiv, oldDiv); 

});
document.addEventListener('DOMContentLoaded', function() {
  var body = document.body;
}, false);

