/**
 * @namespace whosonfirst.flags
 */

/**
 * @namespace whosonfirst.flags.existential
 */

var whosonfirst = whosonfirst || {};
whosonfirst.flags = whosonfirst.flags || {};

whosonfirst.flags.existential = (function(){

    /**
     * @enum {number}
     * @memberof whosonfirst.flags.existential
     * @description An "existential flag" is a number between -1 (unknown), 0 (false) and 1 (true).
     */
    const ExistentialFlag = {
	/** True */
	TRUE:   1,
	/** False */	
	FALSE: 0,
	/** Unknown */	
	UNKNOWN:  -1
    };
    
    var self = {
	
	/**
	 * @function isCurrent
	 * @memberof whosonfirst.flags.existential
	 * @description Determine whether a Who's On First record is considered "current".
	 * @param {Object} feature - The Who's On First record to query.
	 * @returns {ExistentialFlag}.
	 */	
	isCurrent: function(feature){

	    const props = feature.properties;
	    
	    if (typeof props['mz:is_current'] != 'undefined' &&
		(parseInt(props['mz:is_current']) === 1 ||
		 parseInt(props['mz:is_current']) === 0)){
		return parseInt(props['mz:is_current']);
	    }
	    else if (self.is_deprecated(props) === 1 ||
		     self.is_ceased(props) === 1 ||
		     self.is_superseded(props) === 1){
		return 0;
	    }
	    else {
		return -1;
	    }
	},
	      
	/**
	 * @function isDeprecated
	 * @memberof whosonfirst.flags.existential
	 * @description Determine whether a Who's On First record is considered "deprecated".
	 * @param {Object} feature - The Who's On First record to query.
	 * @returns {ExistentialFlag}.
	 */		      
	isDeprecated: function(feature){

	    const props = feature.properties;
	    
	    if (! props['edtf:deprecated']){
		return 0;
	    }
	    
	    else if (props['edtf:deprecated'] === 'u' ||
		     props['edtf:deprecated'] === 'uuuu'){
		return -1;
	    }
	    else {
		return 1;
	    }
	},

	/**
	 * @function isCeased
	 * @memberof whosonfirst.flags.existential
	 * @description Determine whether a Who's On First record is considered "ceased".
	 * @param {Object} feature - The Who's On First record to query.
	 * @returns {ExistentialFlag}.
	 */		      
	isCeased: function(feature){

	    const props = feature.properties;
	    
	    if (typeof props['edtf:cessation'] === 'undefined' ||
		props['edtf:cessation'] === 'u' ||
		props['edtf:cessation'] === 'uuuu'){
		return -1;
	    }
	    else if (! props['edtf:cessation']){
		return 0;
	    }
	    else {
		return 1;
	    }
	},

	/**
	 * @function isSuperseded
	 * @memberof whosonfirst.flags.existential
	 * @description Determine whether a Who's On First record has been superseding.
	 * @param {Object} feature - The Who's On First record to query.
	 * @returns {ExistentialFlag}.
	 */		      	      
	isSuperseded: function(feature){

	    const props = feature.properties;
	    
	    if (props['wof:superseded_by'] &&
		props['wof:superseded_by'].length > 0){
		return 1;
	    }
	    else {
		return 0;
	    }
	},

	/**
	 * @function isSuperseding
	 * @memberof whosonfirst.flags.existential
	 * @description Determine whether a Who's On First record supersedes other records..
	 * @param {Object} feature - The Who's On First record to query.
	 * @returns {ExistentialFlag}.
	 */		      	      	      
	isSuperseding: function(feature){

	    const props = feature.properties;
	    
	    if (props['wof:supersedes'] &&
		props['wof:supersedes'].length > 0){
		return 1;
	    }
	    else {
		return 0;
	    }
	},

        is_current: function(feature){
	    console.warn("is_current is deprecated, use isCurrent instead.");		  
	    return self.isCurrent(feature);
	},

        is_deprecated: function(feature){
	    console.warn("is_deprecated is deprecated, use isDeprecated instead.");		  		  
	    return self.isDeprecated(feature);
	},

 	      'is_ceased': function(feature){
	    console.warn("is_ceased is deprecated, use isCeased instead.");		  		  
	    return self.isCeased(feature);
	},
	
	      is_superseding: function(feature){
	    console.warn("is_superseding is deprecated, use isSuperseding instead.");		  		  
	    return self.isSuperseding(feature);
	},
	
	      'is_superseded': function(feature){
	    console.warn("is_superseded is deprecated, use isSuperseded instead.");		  		  
	    return self.isSuperseded(feature);
	},
	
    };
    
    return self;
    
})();
