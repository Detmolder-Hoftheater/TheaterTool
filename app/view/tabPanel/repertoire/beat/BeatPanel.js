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
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 5,
				
				/*defaults: {
					frame: true
				},*/
				
				border: false,

	
	initComponent: function () {



		
/*	this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile();

this.items =[ {
			xtype: 'leafletmapview',
			flex: 1,
			width: '100%'
		}]
*/
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView();
//Ext.create('TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile', {flex: 1, width: '100%'});


this.navTree = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree();

this.xmlSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSectionXML();

var leafletFacsimile = this.detailSection.getLeafletFacsimile();
var pageSpinner = this.detailSection.getPageSpinner();

this.navTree.setLeafletFacsimile(leafletFacsimile);
this.navTree.setPageSpinner(pageSpinner);
	
    this.items = [

       
			this.detailSection,
this.navTree
/*{
    xtype: 'component',
    autoEl: {
        tag: 'a',
       // href: 'http://www.example.com/',
        html: '<u style="color:blue;">Vertaktung mit Edirom Online</u>'


    }
},

{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '15 0 -11 0'
			},

			this.xmlSection*/

		
			
      
    ];

var app = TheaterTool.getApplication();
		
								var navTreeStore = app.creteStoreForFacsimileNavigation();
								this.navTree.getView().bindStore(navTreeStore);
navTreeStore.sort('name');
    	this.callParent();
	}
});