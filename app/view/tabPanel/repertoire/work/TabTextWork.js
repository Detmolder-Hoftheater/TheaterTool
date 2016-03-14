/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.TabTextWork', {
	extend: 'Ext.panel.Panel',

	bodyPadding: 10,

   minHeight: 200,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,


/*	initComponent: function () {
var me = this;


Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+this.workID+'.xml',
                type: 'work'
            },
            success: function(response){
			$('#'+me.id+'-innerCt').html(response.responseText);

     }
         
        });
		
		this.callParent();
	},*/

	setTextInfo: function(infoText){
		$('#'+this.id+'-body').html(infoText);

	}
});