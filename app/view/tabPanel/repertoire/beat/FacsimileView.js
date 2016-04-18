/**
 * Creates class pmdCE.view.facsimileView.FacsimileView that extend from Ext.form.Panel.
 * @class
 * @classdesc pmdCE.view.facsimileView.FacsimileView for show facsimile.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.beat.FacsimileView', {
	extend: 'Ext.form.Panel',
	requires:[
	'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
	//layout: 'vbox',
	//sregion: 'south',
	flex: 1,
	id: 'facsimileview',
	autoScroll: true,
	
	/**
	 * Set title for view and create leaflet component.
	 * @overrides
	 */
	initComponent: function () {
		
		
		this.items =[ {
			xtype: 'leafletmapview',
			flex: 1,
			width: '100%'
		}]
		this.callParent()
	}
});


/*Ext.define('pmdCE.view.main.FacsimileView', {
extend: 'Ext.form.Panel',
layout:'absolute',
region:'south',
// floatable: false,
//    margin: '5 0 0 0',

flex: 1,

autoScroll: true,

me: null,
id: 'facsimileview',


initComponent: function() {

var selectedPage = Ext.getCmp('pages').getText();

var pageMeasuresMap = Ext.getCmp('cetoolbar').pageMeasuresMap;
var test = pageMeasuresMap[selectedPage];
var value = test[0];
var endValue = test[test.length-1];

var pageStaffMap = Ext.getCmp('cetoolbar').staffNr;
var test = pageStaffMap[selectedPage];
var staffNr = test[test.length-1];

this.title = selectedPage + ' (measures: '+ value + ' - ' + endValue + '; staffNr: ' + staffNr + ')';

me = this;

Ext.Ajax.request({
url: 'resources/xql/pmd_ce_getFacsimilePage.xql',
async: false,
method: 'GET',
params: {
path: selectedPage
},
success: function(response){

me.createImage(response.responseText);

}
});

//Ext.Ajax.request({
//    //url: 'resources/xql/getZones.xql',
//    url: 'data/getZones.xql',
//    async: false,
//    method: 'GET',
//    params: {
//        path: selectedPage
//    },
//    success: function(response){
//       console.log(response)
//
//    }
//});

this.callParent()

},

createImage: function(path){
var image = Ext.create('Ext.Img', {
src: path,
renderTo: Ext.getBody()
});
image.on("load", function() {
console.log("loaded");
});


this.items = [
image
]
}

});*/