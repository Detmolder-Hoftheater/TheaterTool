/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsTabPanel', {
	extend: 'Ext.panel.Panel',

minHeight: 200,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,

border: false,

	setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}
	
	
	
});