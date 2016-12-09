Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTabDetails', {
 extend: 'Ext.panel.Panel',

    title: '<b style="color:gray;">Übersicht</b>',
    
	layout: {
		type: 'hbox',
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
				roleTable.setTablePanel(me);
                me.add(roleTable);
                
                /*var source_group = Ext.create('Ext.panel.Panel', {
			         flex:1,
                    border:false,
                    bodyPadding:15,
                    autoScroll: true,
			         items:[]
		      });
		      me.add(source_group);
		      
		      var info_group = Ext.create('Ext.form.FieldSet', {
			        title: '<b style="color:gray;">Allgemeine Information</b>',
		            bodyBorder: false,
			         collapsible: false,
			         collapsed: true,
			         margin: '0 0 10 0'
		      });
		      source_group.add(info_group);*/
				
				
			
		/*me.add({
			html: response.responseText,
            border: false
		});*/
     		}
         
        });

        me.callParent();
        
        }
});