/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
	extend: 'Ext.panel.Panel',
    requires:[
	'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
	
	detailSection: null,
	xmlSection: null,
	navTree: null,	

	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 5,
				
				/*defaults: {
					frame: true
				},*/
				
				border: false,

	selectedWork: null,

	
	initComponent: function () {
		
		//console.log(this.selectedWork);
var selFolder = null;
if(this.selectedWork === 'Aschenbrödel'){
	selFolder = 'aschenbroedel';
}
else if(this.selectedWork === 'Der Bettelstudent'){
	selFolder = 'bettelstudent';
}
var folderForEO = selFolder + '/';

	this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView({selectedWork: this.selectedWork});
//Ext.create('TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile', {flex: 1, width: '100%'});


this.navTree = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree({selectedWork: this.selectedWork});

this.xmlSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSectionXML();

var leafletFacsimile = this.detailSection.getLeafletFacsimile();
var pageSpinner = this.detailSection.getPageSpinner();

this.navTree.setLeafletFacsimile(leafletFacsimile);
this.navTree.setPageSpinner(pageSpinner);
	
    this.items = [

		{				
				layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 10,
				
				defaults: {
					frame: true,
					bodyPadding: 10
				},
				
				border: false,
				items: [
					this.navTree,
					this.detailSection]
				},

{
    xtype: 'component',
    autoEl: {
        tag: 'a',
        href: 'http://hoftheater-detmold.de/'+folderForEO,
        html: 'Vertaktung mit Edirom Online',
		target: "_blank"
    }
},

{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '15 0 -11 0'
			},

			this.xmlSection

		
			
      
    ];

		var app = TheaterTool.getApplication();

		var navTreeStore = app.creteStoreForFacsimileNavigation();
		navTreeStore.getProxy().extraParams.selectedWork = selFolder;					
		navTreeStore.load();

		this.navTree.getView().bindStore(navTreeStore);
		navTreeStore.sort('name');
    	this.callParent();
	}
});