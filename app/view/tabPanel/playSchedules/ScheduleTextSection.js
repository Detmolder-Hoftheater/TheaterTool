/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection', {
    extend: 'Ext.form.FieldSet',
 
    collapsible: true,
   collapsed: true,

    title: '<b style="color:gray;">Text</b>',

flex:1,


    repertoireTab:null,

	workID: null,

    initComponent: function() {

	var me = this;
    
    me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel({workID: this.workID});
	
	me.items =[
		this.repertoireTab
		],

 	me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			url: 'resources/xql/test_Exist.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },
            success: function(response){
				//var idtemp = me.repertoireTab.getTextTab().id;

				//$('#'+me.id).html(response.responseText);
				
 				me.repertoireTab.setTextInfo(response.responseText);
				//me.repertoireTab.setTextInfo1(response.responseText);
			//$('#'+me.id+'-innerCt').html(response.responseText);

     		}
         
        });

         
       }
    },
    
        me.callParent();
        
        }


});