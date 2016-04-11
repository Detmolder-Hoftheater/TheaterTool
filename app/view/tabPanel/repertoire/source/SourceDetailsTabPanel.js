/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel', {
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

	sourceID: null,
	
	initComponent: function () {
	
	this.textTab = new TheaterTool.view.tabPanel.repertoire.source.TabTextSource({
			title: 'Text',
			sourceID: this.sourceID
		});
		
		this.xmlTab = new TheaterTool.view.tabPanel.repertoire.source.TabXMLSource({
			title: 'XML',
			sourceID: this.sourceID
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