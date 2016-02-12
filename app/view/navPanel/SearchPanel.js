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
      borderRight: '1px solid #A80016',
      borderLeft: '1px solid #A80016',
      borderTop: '7px solid #A80016',
      borderBottom: '1px solid #A80016'
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