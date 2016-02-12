/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails', {
	extend: 'Ext.panel.Panel',
    
	
	personSection: null,
	planSection: null,
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
	
	this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection();
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();
	
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection();
	
    this.items = [
       
			this.detailSection,
			this.personSection,
			this.planSection
			
       
     
    ]
    	this.callParent();
	}
});