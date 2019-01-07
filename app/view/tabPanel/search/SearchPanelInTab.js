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
    padding:10,
    flex:1,
	
	searchValue: null,
    type: null,

	initComponent: function () {
	
	var me = this;
	
	if(me.type === GUI_NAMES.filterworks){
	    Ext.Ajax.request({
            url: 'resources/xql/searchWorks.xql',
            method: 'GET',
            params: {
					searchValue: me.searchValue,
					type: me.type,
					path: dbPathsMap.get('works')
				},
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
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
			bodyBorder: false,
			border: false,
			items:[]
		});
		me.add(ref_layout);
		
		var tableTitle = '';
		if(me.searchValue === ''){
		    tableTitle = '<b style="color:gray;">'+GUI_NAMES.search_all_works+'</b>';
		}
		else{
		    tableTitle = '<b style="color:gray;">'+GUI_NAMES.search_works_with+' "'+me.searchValue+'"</b>';
		}
		
		var worksTable = new TheaterTool.view.tabPanel.search.WorkResultTable({worksList: json, 
		  title: tableTitle});
		ref_layout.add(worksTable);
                
               
            }
        });
	}
	else if(me.type === GUI_NAMES.filterpersons){
	    Ext.Ajax.request({
            url: 'resources/xql/searchPersons.xql',
            method: 'GET',
            params: {
					searchValue: me.searchValue,
					path: dbPathsMap.get('persons')
				},
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
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
			bodyBorder: false,
			border: false,
			items:[]
		});
		me.add(ref_layout);
		
		var tableTitle = '';
		if(me.searchValue === ''){
		    tableTitle = '<b style="color:gray;">'+GUI_NAMES.search_all_persons+'</b>';
		}
		else{
		    tableTitle = '<b style="color:gray;">'+GUI_NAMES.search_persons_with+' "'+me.searchValue+'"</b>';
		}
		
		var personTable = new TheaterTool.view.tabPanel.search.PersonResultTable({personList: json, 
		  title: tableTitle});
		ref_layout.add(personTable);
                            
            }
        });
	    
	}
	
    	me.callParent();
	}
});