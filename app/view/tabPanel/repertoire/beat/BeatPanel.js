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
	
	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 15,
				
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
	this.detailSection = 
new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView();
//Ext.create('TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile', {flex: 1, width: '100%'});


this.xmlSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSectionXML();
	
    this.items = [

       
			this.detailSection,
{
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

			this.xmlSection

		
			
      
    ]
    	this.callParent();
	}
});