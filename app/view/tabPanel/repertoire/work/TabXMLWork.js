/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.TabXMLWork', {
	extend: 'Ext.panel.Panel',
/*requires:[
	'Ext.layout.container.VBox'],
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},*/
	
	//closable: true,
	
	/*defaults: {
		frame: true,
		autoScroll: true
	},*/
	
	
	bodyPadding: 10,

	
	//autoScroll: true,
	
	
	searchField: null,

	workID: null,
	
	initComponent: function () {

var me = this;
	
	//this.searchField = this.createTextField('Suche1', 'Suche1');
	//this.searchField.setDisabled(true);


/*Ext.Ajax.request({
            //url: 'data/Output_Exist.xql',
 			url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+this.workID+'.xml',
                type: 'work'
            },
            success: function(response){

			$('#'+me.id+'-innerCt').html(response.responseText);

     },
          scope: me
        });*/
	
		this.callParent();
	}
});