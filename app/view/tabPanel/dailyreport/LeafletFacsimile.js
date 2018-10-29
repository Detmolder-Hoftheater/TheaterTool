/**
 * Creates class pmdCE.view.facsimileView.LeafletFacsimile that extend from Ext.Component.
 * @class
 * @classdesc pmdCE.view.facsimileView.LeafletFacsimile for create leaflet component.
 */
Ext.define('TheaterTool.view.tabPanel.dailyreport.LeafletFacsimile', {
	extend: 'Ext.Component',
	
	alias: 'widget.issueview',
	//id: 'leafletfacsimile',
	config: {
		map: null
	},

 //minHeight: 400,
   flex:1,
  //  resizable: true,

//autoScroll: true,
//reserveScrollbar: true,
pageNumber: null,
//border:false,

imagePath: null,

	zones: null,
	facsimileTile: null,
	
	/**
	 * Get data for initialize a map, data for show measures and ftaffs numbers, 
	 * create leaflet
	 * @overrides
	 */
	afterRender: function (t, eOpts) {

		var me = this;
		this.callParent(arguments);
		
		var leafletRef = window.L;
		if (leafletRef == null) {
			this.update('No leaflet library loaded');
		}


		 else {

			me.loadFacsimile();
		
		}
		
	},
	
	/**
	 * Get called anytime the size is changed in the layout
	 * and call the ‘invalidateSize’ method on the map.
	 * @overrides
	 */
	onResize: function (w, h, oW, oH) {
		this.callParent(arguments);
		var map = this.getMap();
		if (map) {
			map.invalidateSize();
		}
	},

	loadFacsimile: function(){
            var me = this;

					me.pageNumber = 1;
					
					facsimileHeight = 4764;
					//2992;
					
					facsimileWidth = 3398;
					//3991;
					
					
					var originalMaxSize = null;
					
					if (facsimileHeight > facsimileWidth) {
						originalMaxSize = facsimileHeight;
					} else {
						originalMaxSize = facsimileWidth;
					}
					
					var maxZoomLevel = 0;
					while (originalMaxSize > 256) {
						originalMaxSize = originalMaxSize / 2;
						maxZoomLevel++;
					}
					console.log("maxZoomLevel :" + maxZoomLevel);
					
					var map = L.map(me.getId());
					
					map.setView([0, 0], Math.round(maxZoomLevel / 2));
					
					me.setMap(map);
					
					//leaflet_path = "http://localhost:8080/exist/rest/db/contents/leafletImages/" + name;
					leaflet_path = "/exist/rest/db/apps/theater-data/leafletImages/TA_30/TA_30_066";
					//leaflet_path = "/exist/rest/db/apps/theater-data/leafletImages/TA_23/TA_23_003";
/*"http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/" + name;*/
					
					 //var path = 'http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/edition-HT_Isouard/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586/MUS-N_120_BASS-VIOLONCELLO_001/{z}-{x}-{y}.jpg';

					me.facsimileTile = 
					/*L.tileLayer.facsimileLayer('data/example/{z}-{x}-{y}.jpg', {
						minZoom: 0,
						maxZoom: maxZoomLevel,
						continuousWorld: true
					});*/
					
					
					 L.tileLayer.facsimileLayer(leaflet_path+'/{z}-{x}-{y}.jpg', {
					minZoom: 0,
					maxZoom: maxZoomLevel,
					continuousWorld : true
					});
					
					me.facsimileTile.setWidth(facsimileWidth);
					
					me.facsimileTile.setHeight(facsimileHeight);
					
					me.facsimileTile.addTo(map);

					me.facsimileTile.fitInImage();
					map.setZoom(2);
	
				
		
	},

getPageNumber: function(){
	return this.pageNumber;
},
	
	showMeasure: function(selectedObject){
		//console.log('Show');
		//console.log(selectedObject);
		var staffnr = null;
		if(selectedObject.data.ambiguous){
			for (var j = 0; j < selectedObject.childNodes.length; j++) {
				if (selectedObject.childNodes[j].data.tag === 'orig') {
					staffnr = selectedObject.childNodes[j].data.staff;
					break;
				}				
			}			
		}
		else{
			staffnr = selectedObject.data.staff;
		}
		var measureNr = 'measure'+selectedObject.data.measurenr+'_s'+staffnr;
		for (i = 0; i < zones.length; i++) {
			if(zones[i].id.indexOf(measureNr) > -1){
			//console.log('Show');
			//console.log(zones[i]);
				var lrx = zones[i].lrx;
				var lry = zones[i].lry;
				var ulx = zones[i].ulx;
				var uly = zones[i].uly;
				this.facsimileTile.disableRectangle();
				this.facsimileTile.enableRectangle(ulx, uly, lrx, lry);
				break;
			}
		}
	
	},

	clear: function () {
		
			var map = this.getMap();
if(map !== null){
	map.remove();
}
			
			
		
	}
	
	/* listeners: {
	click : {
	fn: function() {
	
	var app = pmdCE.getApplication();
	var store = app.getFacsimileStore();
	console.log(store);
	console.log(document);
	
	facsimileHeight = store.data.items[0].data.page.height;
	facsimileWidth = store.data.items[0].data.page.width;
	
	},
	element: 'el'
	
	}
	}*/
});