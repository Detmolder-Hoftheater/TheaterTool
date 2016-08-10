/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection', {
    //extend: 'Ext.form.FieldSet',
    extend: 'Ext.panel.Panel',
   // collapsible: true,
    //collapsed: false,
   
    title: '<b style="color:gray;">Übersicht</b>',
border: true,
	//flex:1,


/*style: {
		//borderLeft: '3px solid #A80016',
		borderTop: '2px solid #fff'
		//borderBottom: '1px solid #fff'
	},
	bodyBorder: false,
	border: false,*/

   // resizable: true,
   
   /* features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'restaurantGrouping'
    }],*/
    
    repertoireTab:null,

	sourceID: null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel({sourceID: me.sourceID});

/*	Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getSourceText.xql',
            method: 'GET',
            params: {
               uri: '/db/apps/theater-data/sources/'+me.sourceID+'.xml',
                type: 'source'
            },
            success: function(response){
 				me.repertoireTab.setTextInfo(response.responseText);
     		}
         
        });*/
	
	me.items =[
		me.repertoireTab
		];

		

//var json = jQuery.parseJSON(store.responseText);
					
					/*me.zones = json.zones;
					var page = json.page;

					me.pageNumber = page.pageAnzahl;*/


me.repertoireTab.setTitelValue();
		

	/*me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/getSourceText.xql',
            method: 'GET',
            params: {
               uri: '/db/apps/theater-data/sources/'+this.sourceID+'.xml',
                type: 'source'
            },
            success: function(response){
 				me.repertoireTab.setTextInfo(response.responseText);
     		}
         
        });

         
       }
    },*/
    
        this.callParent();
        
        }


});