var whosonfirst = whosonfirst || {};
whosonfirst.html = whosonfirst.html || {};

whosonfirst.html.css = (function() {

    var self = {

	'init': function(){

	},

	'append_class': function(el, class_name){

	    if (! el) {
		console.log("append_class called with null element");
		return false;
	    }

	    var classes = el.getAttribute("class");
	    classes = classes.split(" ");

	    var count = classes.length;
	    var append = true;

	    for (var i=0; i < count; i++){

		if (classes[i] == class_name){
		    append = false;
		    break;
		}
	    }

	    if (append){
		classes.push(class_name);
	    }

	    el.setAttribute("class", classes.join(" "));
	},

	'remove_class': function(el, class_name){

	    if (! el) {
		console.log("append_class called with null element");
		return false;
	    }

	    var classes = el.getAttribute("class");
	    classes = classes.split(" ");

	    var count = classes.length;
	    var new_classes = [];

	    for (var i=0; i < count; i++){

		if (classes[i] != class_name){
		    new_classes.push(classes[i]);
		}
	    }

	    el.setAttribute("class", new_classes.join(" "));
	},

    };

    return self;

})();
