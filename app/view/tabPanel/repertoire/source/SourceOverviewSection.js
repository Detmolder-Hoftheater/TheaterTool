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


/*border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,*/

bodyPadding:10,
autoScroll: true,

    title: '<b style="color:gray;">Beschreibung</b>',

    path: null,
      
    repertoireTab:null,

    initComponent: function() {
    
	var me = this;

   Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getOverviewSource.xql',
            method: 'GET',
            params: {
                path: me.path
            },
            success: function(response){
				// for Firefox
				var htmlText = response.responseText;
				me.html = htmlText;
				// for Safari
			     me.setTextInfo(htmlText);
			
     		}
         
        });

        this.callParent();
        
        },

setTextInfo: function(infoText){

		$('#'+this.id+'-innerCt').html(infoText);

	}

      
});