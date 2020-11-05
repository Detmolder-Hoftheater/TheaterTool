Ext.define('TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile', {
    extend: 'Ext.Component',
    
    alias: 'widget.leafletmapview',
    
    config: {
        map: null
    },
    
    flex: 1,
    
    pageNumber: null,
    
    voiceID: null,
    number: null,
    selectedWork: null,
    pageSpinner: null,
    
    zones: null,
    facsimileTile: null,
    sourceID: null,
    
    afterRender: function (t, eOpts) {
        
        var me = this;
        this.callParent(arguments);
        
        var leafletRef = window.L;
        if (leafletRef == null) {
            this.update('No leaflet library loaded');
        } else {
            me.loadFacsimile(me.voiceID, me.number, me.selectedWork);
        }
    },
    
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
    
    loadFacsimile: function (voiceID, number, selectedWork) {
        var me = this;
        Ext.Ajax.request({
            url: 'resources/xql/getZones.xql',
            async: false,
            method: 'GET',
            params: {
                fileName: voiceID,
                pageNr: number,
                selectedWork: selectedWork,
                sourceID: me.sourceID
            },
            success: function (result) {
                
                var json = jQuery.parseJSON(result.responseText);
                
                me.zones = json.zones;
                var page = json.page;
                
                me.pageNumber = page.pageAnzahl;
                
                
                me.pageSpinner.setStore(me.pageNumber);
                me.pageSpinner.setPage(number);
                me.pageSpinner.setPageID(voiceID);
                
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
                
                //var leaflet_prefix = getPreference('leaflet_prefix');
                
                var fields = page.path.split('.');
                var name1 = fields[0];
                var name = name1.replace(/\//g, "%2F");
                
                var leaflet_path = 'https://images.hoftheater-detmold.de/Scaler/IIIF/%2F'+name+'%2F{z}-{x}-{y}.jpg/full/full/0/native.jpg';
                
                //leaflet_path = "http://localhost:8080/exist/rest/db/contents/leafletImages/" + name;
                //leaflet_path = 'https://api.hoftheater-detmold.de/Scaler/IIIF/%2Fedition-HT_Bettelstudent%2Fedirom_source_0351c809-fcfa-4723-9aa2-b5547c06ec90%2FMUS-N_237_VIOLINO_SECONDO_018%2F';
                //"/exist/rest/db/apps/theater-data/leafletImages/" + name;
                /*"http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/" + name;*/                
                //var path = 'http://localhost:8080/exist/rest/db/apps/theater-data/leafletImages/edition-HT_Isouard/edirom_source_0f385ae9-ab62-4188-8795-5c0931cd4586/MUS-N_120_BASS-VIOLONCELLO_001/{z}-{x}-{y}.jpg';
        
        me.facsimileTile = L.tileLayer.facsimileLayer( leaflet_path, {
            minZoom: 0,
                maxZoom: maxZoomLevel,
                continuousWorld: true
            });
               
                 me.facsimileTile.setWidth(facsimileWidth);
                
                 me.facsimileTile.setHeight(facsimileHeight);
                
                me.facsimileTile.addTo(map);
                
                 me.facsimileTile.fitInImage();
                
                map.setZoom(Math.round(maxZoomLevel / 2 -1));
            }
        });
    },
    
    getPageNumber: function () {
        return this.pageNumber;
    },
    
    showMeasure: function (selectedObject) {
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
});