/**
 * Creates class pmdCE.view.facsimileView.LeafletFacsimile that extend from Ext.Component.
 * @class
 * @classdesc pmdCE.view.facsimileView.LeafletFacsimile for create leaflet component.
 */
Ext.define('TheaterTool.view.tabPanel.issue.LeafletFacsimile', {
    extend: 'Ext.Component',
    
    alias: 'widget.issueview',
    //id: 'leafletfacsimile',
    config: {
        map: null
    },
    
    //minHeight: 400,
    flex: 1,
    //resizable: true,
    
    //autoScroll: true,
    //reserveScrollbar: true,
    pageNumber: null,
    //border:false,
    
    voiceID: null,
    number: null,
    selectedWork: null,
    pageSpinner: null,
    
    zones: null,
    facsimileTile: null,
    
    imageData: null,
    
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
        } else {
            me.loadFacsimile(me.imageData, 1);
        }
        
        
        // else {
        
        /*Ext.Ajax.request({
        url: 'resources/xql/getZones.xql',
        //url: 'data/getZones.xql',
        async: false,
        method: 'GET',
        params: {
        path: selectedPage
        },
        success: function (result) {
        
        var json = jQuery.parseJSON(result.responseText);
        
        this.zones = json.zones;
        var page = json.page;
        
        facsimileHeight =
        //2992;
        page.height;
        facsimileWidth =
        //3991;
        page.width;
        
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
        
        //var sourceName = Ext.getCmp('source').getText();
        
        //var pageName = Ext.getCmp('pages').getText();
        
        var path = 'http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/edition-HT_Isouard/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586/MUS-N_120_BASS-VIOLONCELLO_001/{z}-{x}-{y}.jpg';
        
        
        // console.log('facsimile path');
        // console.log(json.path);
        
        me.facsimileTile =
        /\*L.tileLayer.facsimileLayer('data/example/{z}-{x}-{y}.jpg', {
        minZoom: 0,
        maxZoom: maxZoomLevel,
        continuousWorld: true
        });*\/
        
        
        L.tileLayer.facsimileLayer(path, {
        minZoom: 0,
        maxZoom: maxZoomLevel,
        continuousWorld : true
        });
        
        me.facsimileTile.setWidth(facsimileWidth);
        
        me.facsimileTile.setHeight(facsimileHeight);
        
        me.facsimileTile.addTo(map);
        
        me.facsimileTile.fitInImage();
        
        
        
        }
        });*/
        
        //}
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
    
    setPageSpinner: function (pageSpinner) {
        this.pageSpinner = pageSpinner;
    },
    
    /*getTest: function(){
    return this.pageNumber;
    },*/
    
    loadFacsimile: function (imageData, selectedPage) {
        var me = this;
        
        me.pageNumber = 1;
        //console.log(imageData);
        
        if(me.pageSpinner !== null){
            //me.pageSpinner.setStore(imageData.length);
            me.pageSpinner.setPage(selectedPage);
            me.pageSpinner.setPageID(selectedPage);
        }
        
        
        var first_elem = imageData[selectedPage-1];
        
        var image_px_h = first_elem[1];
        
        var image_h_split = image_px_h.split("px");
        facsimileHeight = image_h_split[0];
        //2992;
        
        var image_px_w = first_elem[2];
        var image_w_split = image_px_w.split("px");
        facsimileWidth = image_w_split[0];
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
        //console.log("maxZoomLevel :" + maxZoomLevel);
        
        var map = L.map(me.getId());
        
        map.setView([0, 0], Math.round(maxZoomLevel / 2));
        //map.setView([0, 0], 0); 
        
        
        me.setMap(map);
        
        var original_imagepath = first_elem[0];
        /*var image_directory_array = original_imagepath.split(".");
        var image_directory = image_directory_array[0];*/
        
       /* var splitted_array = original_imagepath.split("/");
        var last_elem_array = splitted_array[splitted_array.length -1];
        var image_directory_parent = splitted_array[splitted_array.length -2];
        var image_directory_array = last_elem_array.split(".");
        var image_directory = image_directory_array[0];*/
        
        //leaflet_path = "/exist/rest/db/apps/theater-data/leafletImages/" + image_directory;
        
        var splitted_array = original_imagepath.split("/");
        var last_elem_array = splitted_array[splitted_array.length -1];
        var image_directory_parent = splitted_array[splitted_array.length -2];
        var image_directory_array = last_elem_array.split(".");
        var image_directory = image_directory_array[0];
        var name = image_directory.replace(/\//g, "%2F");
        leaflet_path = 'https://images.hoftheater-detmold.de/Scaler/IIIF/%2FTheaterakten%2F'+name+'%2F{z}-{x}-{y}.jpg/full/full/0/native.jpg';
        
        //leaflet_path = "https://dev.hoftheater-detmold.de/apps/theater-data/leafletImages/Theaterakten/" + image_directory;
        //"/exist/rest/db/apps/theater-data/leafletImages/Theaterakten/" + image_directory;
        
        //leaflet_path = "http://localhost:8080/exist/rest/db/contents/leafletImages/" + name;
        //leaflet_path = "/exist/rest/db/apps/theater-data/leafletImages/TA_30/TA_30_066";
        //leaflet_path = "/exist/rest/db/apps/theater-data/leafletImages/TA_23/TA_23_003";
        /*"http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/" + name;*/
        
        //var path = 'http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/edition-HT_Isouard/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586/MUS-N_120_BASS-VIOLONCELLO_001/{z}-{x}-{y}.jpg';
        me.facsimileTile =
        L.tileLayer.facsimileLayer( leaflet_path, {
            minZoom: 0,
                maxZoom: maxZoomLevel,
                continuousWorld: true
            });
        /*me.facsimileTile =
       
        L.tileLayer.facsimileLayer(leaflet_path + '/{z}-{x}-{y}.jpg', {
            minZoom: 0,
            maxZoom: maxZoomLevel,
            continuousWorld: true
        });*/
        
        me.facsimileTile.setWidth(facsimileWidth);
        
        me.facsimileTile.setHeight(facsimileHeight);
        
        me.facsimileTile.addTo(map);
        
        me.facsimileTile.fitInImage();
        
        map.setZoom(Math.round(maxZoomLevel / 2-1));
    },
    
    getPageNumber: function () {
        return this.pageNumber;
    },
    
    showMeasure: function (selectedObject) {
        //console.log('Show');
        //console.log(selectedObject);
        var staffnr = null;
        if (selectedObject.data.ambiguous) {
            for (var j = 0; j < selectedObject.childNodes.length; j++) {
                if (selectedObject.childNodes[j].data.tag === 'orig') {
                    staffnr = selectedObject.childNodes[j].data.staff;
                    break;
                }
            }
        } else {
            staffnr = selectedObject.data.staff;
        }
        var measureNr = 'measure' + selectedObject.data.measurenr + '_s' + staffnr;
        for (i = 0; i < zones.length; i++) {
            if (zones[i].id.indexOf(measureNr) > -1) {
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
        if (map !== null) {
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
/*Ext.define('TheaterTool.view.tabPanel.issue.LeafletFacsimile', {
	extend: 'Ext.Component',
	
	alias: 'widget.issueview',
	
	config: {
		map: null
	},

   flex:1,
  
pageNumber: null,

imagePath: null,

	zones: null,
	facsimileTile: null,
	
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
/\*"http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/" + name;*\/
					
					 //var path = 'http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/edition-HT_Isouard/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586/MUS-N_120_BASS-VIOLONCELLO_001/{z}-{x}-{y}.jpg';

					me.facsimileTile = 
					/\*L.tileLayer.facsimileLayer('data/example/{z}-{x}-{y}.jpg', {
						minZoom: 0,
						maxZoom: maxZoomLevel,
						continuousWorld: true
					});*\/
					
					
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
	
});*/