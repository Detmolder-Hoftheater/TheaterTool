/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
	extend: 'Ext.panel.Panel',
    
	
	detailSection: null,
	
	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				/*bodyPadding: 5,
				
				defaults: {
					frame: true
					
				},*/
				
				border: false,
	
	
	initComponent: function () {
		
	//this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.BeatXMLSection();

	this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView();
	
    this.items = [
       
			this.detailSection

		/*{
			xtype: 'leafletmapview',
			flex: 1,
			width: '100%',
			handler: this.click
		}*/
			
      
    ]
    	this.callParent();
	}
});