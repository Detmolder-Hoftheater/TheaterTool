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
	navTreeStore: null,
	
	initComponent: function () {
	
	this.navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree();

	//if(this.navTreeStore === null && (this.oldSelection !== this.selection || this.oldSelection === null)){
				var app = TheaterTool.getApplication();
        		this.navTreeStore = app.createStore();

				if(this.selection === 1){
					this.navTreeStore.getProxy().extraParams.selection1 = 'A';
					this.navTreeStore.getProxy().extraParams.selection2 = 'B';
					this.navTreeStore.getProxy().extraParams.selection3 = 'C';
					
				}
				else if(this.selection === 2){
					this.navTreeStore.getProxy().extraParams.selection1 = 'D';
					this.navTreeStore.getProxy().extraParams.selection2 = 'E';
					this.navTreeStore.getProxy().extraParams.selection3 = 'F';
					
				}
				else if(this.selection === 3){
					this.navTreeStore.getProxy().extraParams.selection1 = 'G';
					this.navTreeStore.getProxy().extraParams.selection2 = 'H';
					this.navTreeStore.getProxy().extraParams.selection3 = 'I';
					
				}
				else if(this.selection === 4){
					this.navTreeStore.getProxy().extraParams.selection1 = 'J';
					this.navTreeStore.getProxy().extraParams.selection2 = 'K';
					this.navTreeStore.getProxy().extraParams.selection3 = 'L';
					
				}
				else if(this.selection === 5){
					this.navTreeStore.getProxy().extraParams.selection1 = 'M';
					this.navTreeStore.getProxy().extraParams.selection2 = 'N';
					this.navTreeStore.getProxy().extraParams.selection3 = 'O';
					
				}
				else if(this.selection === 6){
					this.navTreeStore.getProxy().extraParams.selection1 = 'P';
					this.navTreeStore.getProxy().extraParams.selection2 = 'Q';
					this.navTreeStore.getProxy().extraParams.selection3 = 'R';
					
				}
				else if(this.selection === 7){
					this.navTreeStore.getProxy().extraParams.selection1 = 'S';
					this.navTreeStore.getProxy().extraParams.selection2 = 'T';
					this.navTreeStore.getProxy().extraParams.selection3 = 'U';
					
				}
				else if(this.selection === 8){
					this.navTreeStore.getProxy().extraParams.selection1 = 'V';
					this.navTreeStore.getProxy().extraParams.selection2 = 'W';
					this.navTreeStore.getProxy().extraParams.selection3 = 'X';
					this.navTreeStore.getProxy().extraParams.selection3 = 'Y';
					this.navTreeStore.getProxy().extraParams.selection3 = 'Z';
					
				}
				
				this.navTreeStore.load();
				this.navTree.getView().bindStore(this.navTreeStore);
	
	
	
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