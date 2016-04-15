/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel', {
	extend: 'Ext.panel.Panel',
	
 minHeight: 200,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,

border: false,

	setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}
	/*initComponent: function () {
	
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
	}*/
});