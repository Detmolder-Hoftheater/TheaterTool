/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel', {
	extend: 'Ext.panel.Panel',

extend: 'Ext.panel.Panel',
border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,
	
	/*bodyPadding: 10,

   minHeight: 300,
   
    resizable: true,

autoScroll: true,
reserveScrollbar: true,

border: true,*/


	
	initComponent: function () {
	
	var me = this;


Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/test_Exist.xql',
			url: 'resources/xql/getWorkText.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },
            success: function(response){
 				me.setTextInfo(response.responseText);				
     		}        
        });
		
		this.callParent();
	},

	
	/*setTextInfo: function(infoText){
		this.textTab.setTextInfo(infoText);
		this.xmlTab.setTextInfo(infoText);
		
	}*/

setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}

});