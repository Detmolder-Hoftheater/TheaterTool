/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMPanel', {
	extend: 'Ext.panel.Panel',
    
	
	detailSection: null,
	
	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 3,
				
				/*defaults: {
					frame: true
				},*/
				
	
bodyBorder: false,
	border: false,
	
	initComponent: function () {
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSection();
	
    this.items = [
       
			this.detailSection
			
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