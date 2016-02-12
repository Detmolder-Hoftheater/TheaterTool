/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel', {
	extend: 'Ext.panel.Panel',
    xtype: 'layout-border',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout: 'border',
  
	flex: 1,
	
    //bodyBorder: true,
    //border: true,
   // bodyPadding: 5,
    
   
   defaults: {
		autoScroll: true,
		split: true
	},
	
	navTree: null,
	/*personSection: null,
	planSection: null,
	detailSection: null,*/
	workPanel: null,
	
	initComponent: function () {
	
	this.navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree();
	
	
	
	this.repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
	
	this.navTree.setRepertoirePanel(this.repertoirePanel);
	//this.repDetails = new TheaterTool.view.tabPanel.repertoire.PersonTree();
	
	/*this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection();
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();
	
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection();*/
	
    this.items = [
       this.navTree,
       this.repertoirePanel
      
      /* {
			id: 'card-01',
			//xtype: 'fieldset',
			region: 'center',
            flex: 4,
            
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
				
            
            
            
			//title: 'Aschenbrödel',
			
			items:[
			this.detailSection,
			this.personSection,
			this.planSection
			]
			}*/
    
       
       
       
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