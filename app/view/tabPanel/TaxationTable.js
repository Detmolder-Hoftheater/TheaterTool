Ext.define('TheaterTool.view.tabPanel.TaxationTable', {
	extend: 'Ext.grid.Panel',
	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.RefData'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	sortableColumns: false,
	hideHeaders: true,
	columnLines: true,
	collapsible: true,
	collapsed: true,
	title: '<b style="color:gray; font-size: 12px;">Taxation</b>',
	icon: 'resources/images/tax.png',
	margin: '0 0 10 0',
	store: null,
	
	detailsColumn: null,
	taxList: null,
	dbkey: null,
	
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[]
});

for(var i = 0; i < me.taxList.length; i++){
			var role = Ext.create('TheaterTool.model.RefData', {
    			name : me.taxList[i]
			});
			me.store.add(role);
			}
	
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', me);
		
		this.columns =[ 
		
		
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createColumn: function (headerName, path, me) {
	
	getRegieContent = function (regieName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton'); 
                   // var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">' + rec.data.name + '</font>');
                   // if(!isHistoryItemExist){
                          var menuItem = historyButton.menu.add({text: '<font style="color:gray;">' + regieName + '</font>', icon: 'resources/images/tax.png'});  //, selection: 3

                    // }
			
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+regieName+'</font>', menuItem.id);
                    if (! isFoundItem) {
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+regieName+'</font>',
						icon: 'resources/images/tax.png'
					});
					
                    var selectedRow = me.getSelectionModel().getSelection()[0];
                    var count = me.store.indexOf(selectedRow);
                   
					var personDetails = new TheaterTool.view.tabPanel.taxation.TaxPanelInTab({regieName: regieName, count: count, dbkey: me.dbkey});
					repertoireTab.add(personDetails);

					repertoireTab.setActiveMenuItemId(menuItem.id);
                    repertoireTab.setMenuAdded(true);
                    
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
                    navTreeGlobal.fireEvent('render', navTreeGlobal);
              
                }
        };
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			//header: headerName,
			flex:1,
			//align: 'center',
			menuDisabled: true,
			dataIndex: 'name',
			renderer: function (val, metadata, record) {
			
			var presentationText = '';
                                if (record.data.dbkey !== '') {
                                    // this.items[0].icon = 'resources/images/Door-24.png';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getRegieContent(\'' + record.data.name + '\');">' + record.data.name + '</a></small>';
                                } else {
                                    //this.items[0].icon = '';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.name + ' </small>';
                                }
                                // metadata.style = 'cursor: pointer;';
                               
                                return presentationText;
			
			}
			});
		return eColumn;
	}
});