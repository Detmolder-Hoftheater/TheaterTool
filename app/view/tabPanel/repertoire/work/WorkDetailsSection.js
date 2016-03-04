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
   

    title: '<b style="color:gray;">Text und XML Ansicht</b>',

   // resizable: true,
  

style: {
		//borderLeft: '3px solid #A80016',
		borderTop: '2px solid #fff'
		//borderBottom: '1px solid #fff'
	},
	bodyBorder: false,
	border: false,
    
    repertoireTab:null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel();
	
	me.items =[
		this.repertoireTab
		],

 	me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			/*if(me.store === null){
				var app = TheaterTool.getApplication();
        		me.store = app.getPersonenForWorkDataStore();
				me.store.load();
			}
        	
			me.personTable.getView().bindStore(me.store);*/
         
        }
    },
    
        me.callParent();
        
        }


});