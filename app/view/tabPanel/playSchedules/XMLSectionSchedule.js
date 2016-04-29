/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.playSchedules.XMLSectionSchedule', {
    extend: 'Ext.form.FieldSet',
 
    collapsible: true,
   collapsed: true,

    title: '<b style="color:gray;">XML</b>',

	flex:1,


    repertoireTab:null,

	workID: null,

    initComponent: function() {

	var me = this;
    
    /*me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({workID: this.workID});
	
	me.items =[
		me.repertoireTab
		],*/

 	me.listeners = {
        	expand: function (p, eOpts) {
        	console.log("expand");
			/*Ext.Ajax.request({           
    			url:'resources/xql/getXML.xql', 
				//url: 'data/H000001.xml' , 
			method: 'GET',
            params: {
                uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
                type: 'work'
            },        
    			success: function (response, options) {
        			var object = response.responseText;
					me.repertoireTab.setTextInfo(object);       			
    			}
			});*/


        }
    },
    
        me.callParent();
        
        }


});