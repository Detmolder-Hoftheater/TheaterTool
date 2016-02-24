/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
	extend: 'Ext.panel.Panel',
    
	personSection: null,
	detailSection: null,
	overviewSection: null,
	
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
	
	this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({margin: '5 0 5 0'});
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection();
	
	this.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection();
	
    this.items = [
       
			this.detailSection,
			this.overviewSection,
			this.personSection
			
       
       // {
           // title: 'Navigation',
            //region:'west',
            //flex: 1,
            //floatable: false,
           // margin: '5 0 0 0',
           // width: 125,
           // minWidth: 100,
           // maxWidth: 250,
           // html: '<p>Navigation</p>'
         // bodyStyle:{"background-color":"white"}
       // },
        //{
           // title: 'Main Content',
            //collapsible: false,
            
           // margin: '5 0 0 0',
         //   html: '<p>Main Content</p>'
         //   bodyStyle:{"background-color":"white"}
       // }
    ]
    	this.callParent();
	}
});