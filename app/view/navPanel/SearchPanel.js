/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.navPanel.SearchPanel', {
	extend: 'Ext.panel.Panel',
	//id: 'cepanel',
	/*requires:[
	'Ext.layout.container.Border'],*/
	//layout: 'border',
	//flex: 2,
	//title: ' ',
	//bodyPadding: 7,
	//border: false,
	//bodyBorder: false,
	//margin: '10 0 0 0',
	
	/*defaults: {
		split: true
	},*/
	
	border: false,
    style: {
      borderRight: '3px solid #fff',
      borderLeft: '3px solid #fff',
      borderTop: '3px solid #fff',
      borderBottom: '3px solid #fff'
    },
	
	repertoireTab: null,
	
	initComponent: function () {
	
	this.repertoireTab = new
	TheaterTool.view.navPanel.SearchTabPanel();
	
	this.items =[
		//this.slursItem,
		this.repertoireTab
		//this.dynamsItems,
		//this.dirsItems
		
		],
		
		this.callParent();
	}
});