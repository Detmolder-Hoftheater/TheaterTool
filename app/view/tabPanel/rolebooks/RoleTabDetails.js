Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTabDetails', {
 extend: 'Ext.panel.Panel',

    title: '<b style="color:gray;">Übersicht</b>',

		border: false,
	flex:1,
bodyPadding:10,
autoScroll: true,

    initComponent: function() {

	var me = this;
	
	Ext.Ajax.request({
 			url: 'resources/xql/getRoleCostum.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
              
            },
            success: function(response){
				
				
			/*var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Daten Relationen (Referenzen intern)</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true
		});
		me.add(titel_group);
				
		var titel_group = Ext.create('Ext.form.FieldSet', {
			title: '<b style="color:gray;">Inhalt</b>',
			bodyBorder: false,
			collapsible: false,
			collapsed: true
		});
		me.add(titel_group);*/
		
		
		
		me.add({
			html: response.responseText,
            border: false
		});
     		}
         
        });

        me.callParent();
        
        }
});