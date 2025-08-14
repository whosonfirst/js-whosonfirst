var whosonfirst = whosonfirst || {};

whosonfirst.data = (function(){
	
    var default_cache_ttl = 30000; // ms
    
    var self = {
	
	fetch: function(url, args){
	    
	    return new Promise((resolve, reject) => {
		
		if (typeof(args) == "undefined") {
		    args = {};
		}
		
		else if (typeof(args) == "number") {
		    args = { "cache_ttl": args };
		}
		
		else {}
		
		if (args["cache_ttl"]){
		    var cache_ttl = args["cache_ttl"];
		}
		
		else {
		    var cache_ttl = default_cache_ttl;
		}
		
		self.cache_get(url, cache_ttl).then ((data) => {
		    resolve(data);
		}).catch((err) => {
		    console.debug("Failed to retrieve cache data", url, err);
		    self.fetch_with_xhr(url, args).then((data) => {
			resolve(data);
		    }).catch((err) => {
			reject(err);
		    });
		});
	    });

	},
			       
	fetch_with_xhr: function(url, args){
	    
	    return new Promise((resolve, reject) => {
		
		console.debug("xhr " + url);
		
		if (! args){
		    args = {};
		}
		
		var req = new XMLHttpRequest();
		
		req.onload = function(){
		    
		    console.debug("fetch " + url + ":" + this.status);
		    
		    if (this.status != 200){
			console.error("failed to fetch " + url + ", because " + this.statusText + " (" + this.status + ")");
			reject(this.statusText);
			return false;
		    }
		    
		    try {
			var data = JSON.parse(this.responseText);
		    } catch (err){
			console.error("failed to parse " + url + ", because " + err);
			reject(err);
			return false;
		    }
		    
		    self.cache_set(url, data).catch((err) => {
			console.error("Failed to cache URL", url, err);
		    });

		    resolve(data);
		};
		
		try {
		    
		    if (args["cache-busting"]){
			
			var cb = Math.floor(Math.random() * 1000000);
			
			var tmp = document.createElement("a");
			tmp.href = url;
			
			if (tmp.search){
			    tmp.search += "&cb=" + cb;
			}
			
			else {
			    tmp.search = "?cb= " + cb;
			}
			
			url = tmp.href;
		    }
		    
		    req.open("get", url, true);
		    req.send();
		    
		} catch(err){
		    console.error("failed to fetch " + url + ", because ", err);
		    reject(err);
		}
	    });
	    
	},
	
	cache_get: function(key, on_hit, on_miss, cache_ttl){
	    
	    return new Promise((resolve, reject) => {
		
		if (typeof(localforage) != 'object'){
		    reject("Missing local forage");
		    return;
		}
		
		var fq_key = self.cache_prep_key(key);
		
		localforage.getItem(fq_key, function (err, rsp){
		    
		    if ((err) || (! rsp)){
			reject(err);
			return;
		    }
		    
		    var data = rsp['data'];
		    
		    if (! data){
			reject();
			return;
		    }
		    
		    var dt = new Date();
		    var ts = dt.getTime();
		    
		    var then = rsp['created'];
		    var diff = ts - then;
		    
		    if (diff > cache_ttl){
			self.cache_unset(key).catch((err) => {
			    console.error("Failed to set cache key", key, err)
			});
			reject();
			return;
		    }
		    
		    resolve(data);
		});
	    });
	    
	},
	
	cache_set: function(key, value){
	    
	    return new Promise((resolve, reject) => {
		
		if (typeof(localforage) != 'object'){
		    reject("Missing localforage");
		    return;
		}
		
		var dt = new Date();
		var ts = dt.getTime();
		
		var wrapper = {
		    'data': value,
		    'created': ts
		};
		
		key = self.cache_prep_key(key);
		
		localforage.setItem(key, wrapper);
		resolve();
	    });
	    
	},
	    
	cache_unset: function(key){
	    
	    return new Promise((resolve, reject) => {
		
		if (typeof(localforage) != 'object'){
		    reject("Missing localforage");
		    return;
		}
		
		key = self.cache_prep_key(key);
		
		localforage.removeItem(key);
		resolve();
	    });
	    
	},
	
	'cache_prep_key': function(key){
	    return key + '#whosonfirst.net';
	},
	
    };
    
    return self;

})();
