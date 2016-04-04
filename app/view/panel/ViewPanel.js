/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.panel.ViewPanel', {
	extend: 'Ext.panel.Panel',
	id: 'cepanel',
	requires:[
	'Ext.layout.container.Border'],
	layout: 'border',
	flex: 1,
	
	
	bodyBorder: false,
	//border: false,
	
	border: false,
    style: {
      borderRight: '5px solid #A80016',
      borderLeft: '5px solid #A80016',
      borderTop: '3px solid #A80016',
      borderBottom: '5px solid #A80016'
    },

	
    
    
	
	ceTabView: null,
	facsimileView:null,
	
	htTabView: null,
	htNavPanel: null,
	
	initComponent: function () {
		
		//this.ceTabView = new TheaterTool.view.tabPanel.CETabPanel(),
		this.htTabView = new TheaterTool.view.tabPanel.HTTabPanel({bodyStyle:{"background-image":"url(resources/images/curtain-Fotor_1.jpg)", "background-size": "100%;"}});
		this.htTabView.getTabBar().setVisible(false);
		//this.htNavPanel = new TheaterTool.view.navPanel.HTNavigationPanel({bodyStyle:{"background-color":"#A80016"}});

		this.htNavPanel = new TheaterTool.view.navPanel.HTNavigationPanel();

		this.htNavPanel.setHTTabPanel(this.htTabView);
		
		
		this.items =[
		this.htTabView,
		this.htNavPanel],
		
		this.callParent();
	},

getHTTabPanel: function(){
	return this.htTabView;

}
});