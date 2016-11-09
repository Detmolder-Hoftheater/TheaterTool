Ext.define('TheaterTool.view.tabPanel.search.SearchPanelInTab', {
	extend: 'Ext.panel.Panel',
	
	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},

	//border: true,

	/*flex:1,
	bodyPadding:7,*/
	autoScroll: true,
	border: true,
    bodyPadding:10,
    flex:1,
	
	searchValue: null,
    type: null,

	initComponent: function () {
	
	var me = this;
	
	
	 Ext.Ajax.request({
            url: 'resources/xql/searchWorks.xql',
            method: 'GET',
            params: {
					searchValue: me.searchValue,
					type: me.type
				},
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                 console.log(json);
                var ref_layout = Ext.create('Ext.panel.Panel', {
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
		me.add(ref_layout);
		
		var worksTable = new TheaterTool.view.tabPanel.search.WorkResultTable({worksList: json});
		ref_layout.add(worksTable);
                
               
            }
        });

	
	
	
		
		
	
    	me.callParent();
	}
});