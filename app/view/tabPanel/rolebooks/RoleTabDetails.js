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
				
				
				
			/*	var table_layout = Ext.create('Ext.panel.Panel', {
			layout: {
				type: 'table',
				columns: 1,
				tdAttrs: {
        			valign: 'top'
   				 },
   				  tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                        
			},
			
    //bodyPadding: 10,
			bodyBorder: false,
			border: false,
			items:[]
		});
		me.add(table_layout);*/
		//		table_layout.add(roleTable);
				
                
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