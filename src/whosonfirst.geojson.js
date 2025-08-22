/**
 * @namespace whosonfirst.geojson
 * @description Methods for working with GeoJSON Feature records.     
 */

var whosonfirst = whosonfirst || {};

whosonfirst.geojson = (function(){

	var self = {

	    /**
	     * @function deriveBboxAsFeature
	     * @memberof whosonfirst.geojson
	     * @description Derive the bounding box for a Who's On First GeoJSON Feature record and return it encoded as a GeoJSON Feature record (whose geometry is a Polygon).
	     * @param {Object} feature - The Who's On First GeoJSON Feature record to query.
	     * @returns {Object} - Returns a GeoJSON Feature record.
	     */		    
	    deriveBboxAsFeature: function(feature){
	    
		var poly = self.deriveBboxAsPolygon(feature);
		var geom = { 'type': 'Polygon', 'coordinates': poly };
		var props = feature['properties'];

		var feature = { 'type': 'Feature', 'properties': props, 'geometry': geom };
		return feature;
	    },

	    /**
	     * @function deriveBboxAsBounds
	     * @memberof whosonfirst.geojson
	     * @description Derive the bounding box for a Who's On First GeoJSON Feature record and return it encoded as an array of [lat, lon] arrays.
	     * @param {Object} feature - The Who's On First GeoJSON Feature record to query.
	     * @returns {Object} - Returns an array of [lat, lon] arrays.
	     */		    	    
	    deriveBboxAsBounds: function(feature){

		var bbox = self.deriveBbox(feature);
		
		var swlon = bbox[0];
		var swlat = bbox[1];
		var nelon = bbox[2];
		var nelat = bbox[3];

		return [
		    [ swlat, swlon ],
		    [ nelat, nelon ],
		];
	    },

	    /**
	     * @function deriveBboxAsPolygon
	     * @memberof whosonfirst.geojson
	     * @description Derive the bounding box for a Who's On First GeoJSON Feature record and return it as a GeoJSON Polygon geometry.
	     * @param {Object} feature - The Who's On First GeoJSON Feature record to query.
	     * @returns {Object} - Returns a GeoJSON Polygon geometry.
	     */		    	    
	    deriveBboxAsPolygon: function(feature){

		var bbox = self.deriveBbox(feature);
		
		var swlon = bbox[0];
		var swlat = bbox[1];
		var nelon = bbox[2];
		var nelat = bbox[3];
		
		var poly = [[
		    [swlon, swlat],
		    [swlon, nelat],
		    [nelon, nelat],
		    [nelon, swlat],
		    [swlon, swlat],
		]];
		
		return poly;
	    },

	    /**
	     * @function deriveBbox
	     * @memberof whosonfirst.geojson
	     * @description Derive the bounding box for a Who's On First GeoJSON Feature record and return it as an array of minx, miny, maxx, maxy coordinates.
	     * @param {Object} feature - The Who's On First GeoJSON Feature record to query.
	     * @returns {Object} - Returns an array of minx, miny, maxx, maxy coordinates.
	     */		    	    
	    deriveBbox: function(feature){
		
		if (feature['bbox']){
		    return feature['bbox'];
		}
		
		if (feature['type'] == 'FeatureCollection'){
		    
		    var features = feature['features'];
		    var count = features.length;
		    
		    var swlat = undefined;
		    var swlon = undefined;
		    var nelat = undefined;
		    var nelon = undefined;
		    
		    for (var i=0; i < count; i++){
			
			var bbox = self.deriveBbox(features[i]);
			
			var _swlat = bbox[1];
			var _swlon = bbox[0];
			var _nelat = bbox[3];
			var _nelon = bbox[2];
			
			if ((! swlat) || (_swlat < swlat)){
			    swlat = _swlat;
			}
			
			if ((! swlon) || (_swlon < swlon)){
			    swlon = _swlon;
			}
			
			if ((! nelat) || (_nelat > nelat)){
			    nelat = _nelat;
			}
			
			if ((! nelon) || (_nelon > nelon)){
			    nelon = _nelon;
			}
		    }
		    
		    return [ swlon, swlat, nelon, nelat ];
		}
		
		else if (feature['type'] == 'Feature'){
		    
		    // Adapted from http://gis.stackexchange.com/a/172561
		    // See also: https://tools.ietf.org/html/rfc7946#section-3.1
		    
		    var geom = feature['geometry'];
		    var coords = geom.coordinates;
		    
		    var lats = [],
		    lngs = [];
		    
		    if (geom.type == 'Point') {

			return [ coords[0], coords[1], coords[0], coords[1] ];

		    } else if (geom.type == 'MultiPoint' || geom.type == 'LineString') {

			for (var i = 0; i < coords.length; i++) {
			    lats.push(coords[i][1]);
			    lngs.push(coords[i][0]);
			}
			
		    } else if (geom.type == 'MultiLineString') {
			for (var i = 0; i < coords.length; i++) {
			    for (var j = 0; j < coords[i].length; j++) {
				lats.push(coords[i][j][1]);
				lngs.push(coords[i][j][0]);
			    }
			}
		    } else if (geom.type == 'Polygon') {
			for (var i = 0; i < coords[0].length; i++) {
			    lats.push(coords[0][i][1]);
			    lngs.push(coords[0][i][0]);
			}
		    } else if (geom.type == 'MultiPolygon') {
			for (var i = 0; i < coords.length; i++) {
			    for (var j = 0; j < coords[i][0].length; j++) {
				lats.push(coords[i][0][j][1]);
				lngs.push(coords[i][0][j][0]);
			    }
			}
		    }
		    
		    var minlat = Math.min.apply(null, lats),
		    maxlat = Math.max.apply(null, lats);
		    var minlng = Math.min.apply(null, lngs),
		    maxlng = Math.max.apply(null, lngs);
		    
		    return [ minlng, minlat,
			     maxlng, maxlat ];
		}
		
		else {}
	    },

	    derive_bbox_as_feature: function(feature){
		console.warn("derive_bbox_as_feature is deprecated, use deriveBboxAsFeature instead.");
		return self.deriveBboxAsFeature(feature);
	    },

	    derive_bbox_as_bounds: function(feature){
		console.warn("derive_bbox_as_bounds is deprecated, use deriveBboxAsBounds instead.");
		return self.deriveBboxAsFeature(feature);		
	    },

	    derive_bbox_as_polygon: function(feature){
		console.warn("derive_bbox_as_polygon is deprecated, use deriveBboxAsPolygon instead.");
		return self.deriveBboxAsPolygon(feature);		
	    },

	    derive_bbox: function(feature){
		console.warn("derive_bbox is deprecated, use deriveBbox instead.");
		return self.deriveBbox(feature);
	    },
	    	    
	};
	
	return self;

})();
