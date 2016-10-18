/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.abo.AboTabDetails', {
 extend: 'Ext.panel.Panel',
	
	/*border: false,

	flex:1,

	autoScroll: true,*/

    title: '<b style="color:gray;">Übersicht</b>',
    
	border: false,
	flex:1,
//bodyBorder: true,
bodyPadding:10,
autoScroll: true,

regieName: null,

    initComponent: function() {

	var me = this;
	
	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getAbo.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
              
            },
            success: function(response){
				//var idtemp = me.repertoireTab.getTextTab().id;

				//$('#'+me.id).html(response.responseText);
				me.setTextInfo(response.responseText);
 				//me.repertoireTab.setTextInfo(response.responseText);
				//me.repertoireTab.setTextInfo1(response.responseText);
			//$('#'+me.id+'-innerCt').html(response.responseText);

     		}
         
        });


        me.callParent();
        
        },
        
          setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}

});