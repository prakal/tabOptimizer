// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


chrome.windows.getCurrent({}, function (window){
	// first check
  console.log(window.id);

  var activeTabHash = {};
  chrome.tabs.getAllInWindow(window.id, function(tabArray){
  	console.log('tabarray', tabArray);
  	tabArray.forEach(function(item){
  		activeTabHash[item.id] = {'active':item.active, 'firstMonitor' : new Date().getTime(), 'uptime' : 0};
  	});
  });
  	console.log(activeTabHash);
  	  // interval check
	chrome.tabs.onActivated.addListener(function (activeInfo){
		activeTabHash[activeInfo.tabId] = {'uptime' : 0, 'active' : true, 'firstMonitor':new Date().getTime()};
	  	console.log('activeInfo', activeInfo);
  		// set new calc uptime to *all other tabs* in window
  		chrome.tabs.getAllInWindow(window.id, function(tabArray){
  			var del = 0;
  			console.log('tabsRunning', tabArray.length);
  			tabArray.forEach(function(item, index){
  				if (item.id !== activeInfo.tabId ) {
  					activeTabHash[item.id].uptime = new Date().getTime() - activeTabHash[item.id].firstMonitor;
  					if (activeTabHash[item.id].uptime > 20000 && tabArray.length - del > 3) {		
  						del ++;
  						//remove tab
  						
						// save url in a bookmark so that it is easy to access
						chrome.tabs.remove(item.id, function(){
							chrome.runtime.onConnect.addListener(function(port){
							  port.postMessage({url:item.url});
							});
							console.log(item.url,'was removed');
						});
  					}
  				}
  			});
  		});

  	});




});