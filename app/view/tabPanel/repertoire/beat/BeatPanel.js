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
				
				bodyPadding: 5,
				
				defaults: {
					frame: true
					//bodyPadding: 10
				},
				
				border: false,
	
	
	initComponent: function () {
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.BeatXMLSection();
	
    this.items = [
       
			this.detailSection
			
      
    ]
    	this.callParent();
	}
});