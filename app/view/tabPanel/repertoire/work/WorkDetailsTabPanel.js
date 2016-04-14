/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel', {
	extend: 'Ext.panel.Panel',
	
	//bodyPadding: 10,

   minHeight: 200,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,

border: false,


	
	/*initComponent: function () {
	
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
	},*/

	
	/*setTextInfo: function(infoText){
		this.textTab.setTextInfo(infoText);
		this.xmlTab.setTextInfo(infoText);
		
	}*/

setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}

});