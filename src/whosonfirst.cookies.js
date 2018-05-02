var whosonfirst = whosonfirst || {};

whosonfirst.cookies = (function(){

    var self = {
			
	'init': function(){
	    
	},
	
	'cookiejar': function(){
	    
	    var jar = {};
	    var cookie = document.cookie;
	    cookie = cookie.split(";");
	    
	    var count = cookie.length;
	    
	    for (var i=0; i < count; i++){
		
		var pair = cookie[i].split("=");
		var k = pair[0];
		var v = pair[1];
		
		k = k.trim();			
		jar[k] = v;
	    }
	    
	    return jar;
	},
	
	'set_cookie': function(k, v){
	    
	    k = k.trim();
	    
	    var cookie = [k,v].join("=");
	    document.cookie = cookie;
	    
	    self.log("info", "set cookie " + cookie);				
	},

	'log': function(level, message){
	    
	    if (typeof(whosonfirst.log) != object){
		console.log(level, message);
		return;
	    }
	    
	    whosonfirst.log.dispatch(message, level);
	}
	
    };		
    
    return self;
    
})();
