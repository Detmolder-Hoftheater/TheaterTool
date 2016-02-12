/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.PersonDetailsTabPanel', {
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
		
		
		this.gndTab = new TheaterTool.view.tabPanel.repertoire.GNDTab({
			title: 'GND'
		});
		
		
		this.viafTab = new TheaterTool.view.tabPanel.repertoire.VIAFTab({
			title: 'VIAF'
		});
	
	this.items =[
		//this.slursItem,
		this.textTab,
		this.xmlTab,
		this.gndTab,
		this.viafTab
		//this.dynamsItems,
		//this.dirsItems
		
		],
		
		this.callParent();
	}
});