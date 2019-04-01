/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.abo.AboTabDetails', {
extend: 'Ext.panel.Panel',
	
   /*  title: '<b style="color:gray;">Übersicht</b>',
    
	border: false,
	flex:1,

bodyPadding:10,
autoScroll: true,*/

layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,


regieName: null,

    initComponent: function() {

	var me = this;
	
	
	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/getAbo.xql',
 			url: 'resources/xql/getAboContent.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
              
            },
            success: function(response){
				var tableInhalt = response.responseText;
           
me.add(

{
    
   html:  tableInhalt,
   border: false
   }

);
				
				
				//me.setTextInfo(response.responseText);
 				
     		}
         
        });


        me.callParent();
        
        },
        
          setTextInfo: function(infoText){
		$('#'+this.id+'-innerCt').html(infoText);

	}

});