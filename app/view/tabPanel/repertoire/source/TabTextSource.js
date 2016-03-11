/**
 * Creates class TheaterTool.view.tabPanel.ControlEventsItem that extend from Ext.panel.Panel.
 * @class
 * @classdesc TheaterTool.view.tabPanel.ControlEventsItem for create hairpins-, dirs-, dynams- and slurs- items.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.TabTextSource', {
	extend: 'Ext.panel.Panel',
/*requires:[
	'Ext.layout.container.VBox'],
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	
	closable: true,*/
	
	bodyPadding: 10,

 //height: 100,

//height: 100,

    // Need a minHeight. Neptune resizable framed panels are overflow:visible so as to
    // enable resizing handles to be embedded in the border lines.
  //  minHeight: 50,
   
   // resizable: true,

//autoScroll: true,
//reserveScrollbar: true,


	initComponent: function () {
	
	//this.searchField = this.createTextField('Suche1', 'Suche1');
	//this.searchField.setDisabled(true);
var me = this;


Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/sources/'+this.sourceID+'.xml',
                type: 'source'
            },
            success: function(response){


			//console.log(me.id);
			$('#'+me.id+'-innerCt').html(response.responseText);

			//console.log(response.responseText);


     }
         
        });
		
		this.callParent();
	},

	setTextInfo: function(infoText){

//this.items = [{html: infoText}];

		$('#'+this.id).html(infoText);

	}
});