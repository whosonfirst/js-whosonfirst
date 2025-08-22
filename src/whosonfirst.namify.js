/**
 * @namespace whosonfirst.namify
 * @description Methods for applying Who's On First names to DOM elements.   
 */

var whosonfirst = whosonfirst || {};

whosonfirst.namify = (function(){

    var self = {

	/**
	 * @typedef {Object} namifyOptions
	 * @memberof whosonfirst.namify 
	 * @property {string} className - The (CSS) class name of elements to "namify". Default is "wof-namify".
	 * @property {string[]} endpoints – The list of endpoints from which the Who's On First record will be retrieved.
	 */

	/**
	 * @function namify
	 * @memberof whosonfirst.namify
	 * @description Iterate through all the DOM elements with class name "wof-namify" and fetch the body of a Who's On First record
	 * whose ID matches the "data-wof-id" attribute and assign the value of that's record's "wof:name" property as the text value of
	 * the current element.
	 * @returns {Promise}
	 */	
	namify: function(){
	    return self.namifyWithOptions({className: "wof-namify"});
	},

	/**
	 * @function namifyWithEndpoints
	 * @memberof whosonfirst.namify
	 * @description Iterate through all the DOM elements with class name "wof-namify" and fetch the body of a Who's On First record
	 * whose ID matches the "data-wof-id" attribute and assign the value of that's record's "wof:name" property as the text value of
	 * the current element. Who's On First records will be queried from a list of endpoints stopping at the first successful match.
	 * @param {string[]} endpoints – The list of endpoints from which the Who's On First record will be retrieved.	   
	 * @returns {Promise}
	 */		
	namifyWithEndpoints: function(endpoints){
	    return self.namifyWithOptions({className: "wof-namify", endpoints: endpoints});
	},

	/**
	 * @function namifyWithOptions
	 * @memberof whosonfirst.namify
	 * @description Iterate through all the DOM elements with an (optional) user-specified class name and fetch the body of a Who's On First
	 * record whose ID matches the "data-wof-id" attribute and assign the value of that's record's "wof:name" property as the text value of
	 * the current element. Who's On First records will be queried from a list of endpoints stopping at the first successful match.
	 * @param {namifyOptions} opts – The set of options from which the Who's On First record will be retrieved.
	 * @returns {Promise}
	 */			
	namifyWithOptions: function(opts){	

	    return new Promise((resolve, reject) => {
		
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
			    reject(err);
			    return;
			});
			
		    } else {
			
			const uri = whosonfirst.uri.id2abspath(str_id);
			
			whosonfirst.data.fetch(uri).then((rsp) => {
			    on_success(rsp);
			}).catch((err) => {
			    console.error("Failed to fetch data for ", str_id, err)
			    reject(err);
			    return;
			});
			
		    }		    
		}

		resolve();
	    });
	},
	
    };

    return self;
    
})()
