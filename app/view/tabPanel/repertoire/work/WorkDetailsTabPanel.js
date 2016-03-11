/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel', {
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

//minHeight: 100,


//autoHeight: true,
	
	textTab: null,
	xmlTab: null,
	workID: null,

	
	initComponent: function () {
	
	this.textTab = new TheaterTool.view.tabPanel.repertoire.work.TabTextWork({
			title: 'Text',
			workID: this.workID
		});
		
		this.xmlTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({
			title: 'XML',
			workID: this.workID
		});
	
	this.items =[
		//this.slursItem,
		this.textTab,
		this.xmlTab
		//this.dynamsItems,
		//this.dirsItems
		
		],
		
		this.callParent();
	},

	setTextInfo: function(infoText){
		this.textTab.setTextInfo(infoText);
	}

});