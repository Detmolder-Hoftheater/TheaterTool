Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTabDetails', {
 extend: 'Ext.panel.Panel',

    title: '<b style="color:gray;">Übersicht</b>',
    
    layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
	autoScroll: true,
	border: false,
	bodyBorder: false,
//bodyPadding:10,
flex:1,

		/*border: false,
	flex:1,
bodyPadding:10,
autoScroll: true,*/

regieName: null,

    initComponent: function() {

	var me = this;
	
	Ext.Ajax.request({
 			url: 'resources/xql/getRoleCostumTable.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
              
            },
            success: function(response){
				
				var json = jQuery.parseJSON(response.responseText);
				//console.log(json);
				
				
				var roleTable = new TheaterTool.view.tabPanel.rolebooks.RoleTable({lineList: json});
                
		       /* var role_panel = Ext.create('Ext.panel.Panel', {
			border: false,
			//bodyPadding: 10,
			margin: '10 10 0 10',
			items:[]
		});
		role_panel.add(me.roleTable);*/
				
		me.add(roleTable);
				
			
		/*me.add({
			html: response.responseText,
            border: false
		});*/
     		}
         
        });

        me.callParent();
        
        }
});