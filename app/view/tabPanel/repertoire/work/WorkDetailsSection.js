/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection', {
    extend: 'Ext.panel.Panel',
    
    collapsible: true,
    collapsed: true,
   // iconCls: 'icon-grid',
    //frame: true,
    //width: 600,
    //height: 400,

 //width: 600,
   // height: 200,

    // Need a minHeight. Neptune resizable framed panels are overflow:visible so as to
    // enable resizing handles to be embedded in the border lines.
  //  minHeight: 100,
   
    //resizable: true,


    title: '<b style="color:gray;">Text und XML Ansicht</b>',

    //resizable: true,


  

style: {
		//borderLeft: '3px solid #A80016',
		borderTop: '2px solid #fff'
		//borderBottom: '1px solid #fff'
	},
	bodyBorder: false,
	border: false,
    
    repertoireTab:null,

	workID: null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel({workID: this.workID});
	
	me.items =[
		this.repertoireTab
		],

 	/*me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+this.workID+'.xml',
                type: 'work'
            },
            success: function(response){
				
 				me.repertoireTab.setTextInfo(response.responseText);
			//$('#'+me.id+'-innerCt').html(response.responseText);

     		}
         
        });
         
        }
    },*/
    
        me.callParent();
        
        }


});