/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSection', {
    //extend: 'Ext.form.FieldSet',
    extend: 'Ext.panel.Panel',
   // collapsible: true,
    //collapsed: false,
   
   // title: '<b style="color:gray;">Übersicht</b>',
border: false,
	flex:1,
bodyBorder: false,
style: {
      
     borderLeft: '25px solid white'
   },
//bodyPadding:25,
autoScroll: true,
    repertoireTab:null,

	sourceID: null,
	
	bodyStyle:{"background-color":"white"},
	
	in_panel: null,
	
    initComponent: function() {

	var me = this;

me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel({sourceID: me.sourceID, in_panel: me.in_panel});
						
    //me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsTabPanel({sourceID: me.sourceID});

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



//me.repertoireTab.setTitelValue();
		

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