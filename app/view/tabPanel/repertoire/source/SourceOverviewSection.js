/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection', {
    extend: 'Ext.panel.Panel',

/*border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,*/

border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,

    title: '<b style="color:gray;">Beschreibung</b>',

    
    repertoireTab:null,

    initComponent: function() {
    
	var me = this;

   Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getOverviewSource.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
				year: me.year
              
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

        this.callParent();
        
        },

setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}

      
});