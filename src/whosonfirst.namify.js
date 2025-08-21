/**
 * @namespace whosonfirst.namify
 */

var whosonfirst = whosonfirst || {};

whosonfirst.namify = (function(){

    var self = {

	namify: function(){
	    return self.namifyWithOptions({className: "wof-namify"});
	},

	namifyWithEndpoints: function(endpoints){
	    return self.namifyWithOptions({className: "wof-namify", endpoints: endpoints});
	},
	
	namifyWithOptions: function(opts){	
	    
	    var els = document.getElementsByClassName(opts.className);
	    var count = els.length;

	    for (var i=0; i < count; i++){
		
		const el = els[i];
		
		if (! el.hasAttribute("data-wof-id")){
		    console.warn("Element is missing data-wof-id attribute");
		    continue;
		}
		
		const str_id = el.getAttribute("data-wof-id");
		
		if (el.innerText != str_id){
		    console.debug("Element has different text value than data-wof-id attribute, skipping.");
		    continue;
		}

		const on_success = function(f){
		    const name = f.properties["wof:name"];
		    el.innerText = name;		    
		};
		
		if (opts.endpoints){

		    const rel_path = whosonfirst.uri.id2relpath(str_id);
		    
		    whosonfirst.data.fetchWithEndpoints(opts.endpoints, rel_path).then((rsp) => {
			on_success(rsp.data);
		    }).catch((err) => {
			console.error("Failed to fetch data for ", str_id, err)
		    });
		    
		} else {

		    const uri = whosonfirst.uri.id2abspath(str_id);
		    
		    whosonfirst.data.fetch(uri).then((rsp) => {
			on_success(rsp);
		    }).catch((err) => {
			console.error("Failed to fetch data for ", str_id, err)
		    });
		    
		}
		
	    }
	},
	
    };

    return self;
    
})()
