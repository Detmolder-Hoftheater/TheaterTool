/**
 * Creates class TheaterTool.view.facsimileView.FacsimileView that extend from Ext.form.Panel.
 * @class
 * @classdesc TheaterTool.view.facsimileView.FacsimileView for show facsimile.
 */
Ext.define('TheaterTool.view.navPanel.HTNavigationPanel', {
	extend: 'Ext.panel.Panel',
	
	//layout: 'vbox'
	//region: 'east',
	region: 'west',
	flex: 0.21,
	id: 'htNavigationPanel',
	//autoScroll: true,
	
	//width: 255,
	
	/*layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},*/
	
	//title: '<b style="color:#A87678;">'+TheaterTool.getApplication().getProjectName()+' 1825-1875</b>',

	//defaultListenerScope: true,
	//border: true,
	autoScroll: true,
	
	//split: true,
	border: false,

//bodyBorder: false,

    style: {
      borderRight: '7px solid #A80016',
     borderLeft: '1px solid #A80016',
     borderTop: '3px solid #A80016',
     borderBottom: '1px solid #A80016'
    },
    

   // split: false,
   // height: '25%',
	collapsible: true,

	//bodyPadding: 0,

	
	treePublic: null,
	treeTheaterLife: null,
	
	searchPanel: null,
	tabPanel: null,
	
	
	//bodyStyle:{"background-color":"white"},
	/**
	 * Set title for view and create leaflet component.
	 * @overrides
	 */
	initComponent: function () {
	
	
	
	this.treePublic = new TheaterTool.view.navPanel.NavigationTreePublic();
	
	
	//this.treeTheaterLife = new TheaterTool.view.navPanel.NavigationTreeTheaterLife();
	
	
	//this.searchPanel = new TheaterTool.view.navPanel.SearchPanel({bodyStyle:{"background-color":"#A80016"}});
	
	this.items =[ 
						this.treePublic
			//	 this.treeTheaterLife
			//this.searchPanel
				]
		
		/*var selectedPage = Ext.getCmp('pages').getText();
		
		var pageMeasuresMap = Ext.getCmp('cetoolbar').pageMeasuresMap;
		var test = pageMeasuresMap[selectedPage];
		var value = test[0];
		var endValue = test[test.length -1];
		
		var pageStaffMap = Ext.getCmp('cetoolbar').staffNr;
		var test = pageStaffMap[selectedPage];
		var staffNr = test[test.length -1];
		
		this.title = selectedPage + ' (measures: ' + value + ' - ' + endValue + '; staffNr: ' + staffNr + ')';
		
		this.items =[ {
			xtype: 'leafletmapview',
			flex: 1,
			width: '100%',
			handler: this.click
		}]*/
		this.callParent()
	},
	

	setHTTabPanel: function(tabPanel){
		this.treePublic.setHTTabPanel(tabPanel);
		//this.treeTheaterLife.setHTTabPanel(tabPanel);
	
	},
	
	
	click: function () {		
		console.log("Click");
	}
});


/*Ext.define('TheaterTool.view.main.FacsimileView', {
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