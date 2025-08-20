var whosonfirst = whosonfirst || {};

whosonfirst.namify = (function(){

    var self = {

	namify: function(){
	    return self.namifyWithClassName("wof-namify");
	},

	namifyWithClassName: function(class_name){	
	    
	    var els = document.getElementsByClassName(class_name);
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
		
		const uri = whosonfirst.uri.id2abspath(str_id);
		whosonfirst.data.fetch(uri).then((rsp) => {
		    
		    const name = rsp.properties["wof:name"];
		    el.innerText = name;
		    
		}).catch((err) => {
		    console.error("Failed to fetch data for ", str_id, err)
		});
	    }
	},
	
    };

    return self;
    
})()
