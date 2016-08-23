/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSection', {
    extend: 'Ext.panel.Panel',
   // collapsible: true,
    //collapsed: false,
   
    title: '<b style="color:gray;">Übersicht</b>',
border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,
    
    repertoireTab:null,

    initComponent: function() {
    
    this.repertoireTab = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsTabPanel();
	
	this.items =[
		this.repertoireTab
		],
    
        /*this.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			/\*Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
               uri: '/db/apps/theater-data/sources/'+this.sourceID+'.xml',
                type: 'source'
            },
            success: function(response){
 				me.repertoireTab.setTextInfo(response.responseText);
     		}
         
        });*\/

         
       }
    },*/

        this.callParent();
        
        }

       
});