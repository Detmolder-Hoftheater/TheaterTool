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

selection: null,
	
    bodyBorder: false,
   // border: false,
  //  bodyPadding: 5,
border: false,
 style: {
      borderRight: '7px solid white',
      borderLeft: '7px solid white',
      borderTop: '7px solid white',
     borderBottom: '7px solid white'
    },
    
   
   defaults: {
		autoScroll: true,
		split: true
	},
	
	navTree: null,
	/*personSection: null,
	planSection: null,
	detailSection: null,*/
	workPanel: null,
	navTreeStore: null,
	workName: null,
	
	initComponent: function () {
	
	this.navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree();

	var app = TheaterTool.getApplication();
		
	this.navTreeStore = app.handleStoreForWorks(this.selection);

				/*if(this.workName !== null && this.selection === 9){
					
					this.navTree.getView().bindStore(this.navTreeStore);
				}
				else{*/
        		
				this.navTree.getView().bindStore(this.navTreeStore);
				this.navTreeStore.sort('name');
	//}
	
	this.repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
	
	this.navTree.setRepertoirePanel(this.repertoirePanel);
	//this.repDetails = new TheaterTool.view.tabPanel.repertoire.PersonTree();
	
	/*this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection();
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();
	
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection();*/
	
    this.items = [
       this.navTree,
       this.repertoirePanel
    ]
    	this.callParent();
	}
});