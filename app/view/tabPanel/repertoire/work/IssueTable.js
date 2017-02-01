Ext.define('TheaterTool.view.tabPanel.repertoire.work.IssueTable', {
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
	title: '<b style="color:gray;">Jährliche Ausgaben</b>',
	icon: 'resources/images/MoneyTransfer-17.png',
	margin: '0 10 10 120',
	store: null,
	
	detailsColumn: null,
	issueList: null,
	
	initComponent: function () {
	
	    var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[]
});

for(i = 0; i < me.issueList.length; i++){
            var data = me.issueList[i];
			var role = Ext.create('TheaterTool.model.RefData', {
    			name : data[0],
    			jahr : data[1]
			});
			me.store.add(role);
			}
			
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		this.columns =[ 
		
		{
			text: 'Jahr',
			flex: 1,
			menuDisabled: true,
			dataIndex: 'jahr'
			
		},
		{
			text: 'Name',
			flex: 3,
			menuDisabled: true,
			dataIndex: 'name'
		},
		this.detailsColumn
		];
		
		
		this.callParent();
	},
	
	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex:1,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			
			if(headerName == 'Details'){
					this.items[0].icon = path;					
				}
				
				metadata.style = 'cursor: pointer;';
				return val;
			},
			handler: function(grid, rowIndex, colIndex) {
			
			        var rec = grid.getStore().getAt(rowIndex);
			
			        var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton'); 
                    var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">' + rec.data.jahr + '</font>');
                    if(!isHistoryItemExist){
                          historyButton.menu.add({text: '<font style="color:gray;">' + rec.data.jahr + '</font>', icon: 'resources/images/Transfer-17.png'});  //, selection: 3

                     }
			
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+rec.data.jahr+'</font>');
                    if (! isFoundItem) {
					var dbkey = rec.data.name;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.jahr+'</font>',
						icon: 'resources/images/MoneyTransfer-17.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.issue.IssuePanelInTab({issueName: dbkey, year: rec.data.jahr});
					repertoireTab.add(personDetails);

					
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', navTreeGlobal);
				
                }
                }
		});
		return eColumn;
	}


});


