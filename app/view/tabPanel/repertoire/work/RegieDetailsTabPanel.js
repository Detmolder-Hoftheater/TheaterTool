/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.RegieDetailsTabPanel', {
	extend: 'Ext.tab.Panel',
	//id: 'cepanel',
	/*requires:[
	'Ext.layout.container.Border'],*/
	//layout: 'border',
	//flex: 2,
	
	//bodyPadding: 3,
	
	//bodyBorder: false,
	
	/*defaults: {
		split: true
	},*/
	
	textTab: null,
	xmlTab: null,
	
	initComponent: function () {
	
	this.textTab = new TheaterTool.view.tabPanel.repertoire.TabText({
			title: 'Text'
		});
		
		this.xmlTab = new TheaterTool.view.tabPanel.repertoire.TabXML({
			title: 'XML'
		});
		
		
	
	this.items =[
		//this.slursItem,
		this.textTab,
		this.xmlTab
		//this.dynamsItems,
		//this.dirsItems
		
		],
		
		this.callParent();
	}
});