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
			var role = Ext.create('TheaterTool.model.RefData', {
    			name : me.issueList[i]
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
			disabled: true,
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			
			if(headerName == 'Details'){
					this.items[0].icon = path;					
				}
				
				metadata.style = 'cursor: pointer;';
				return val;
			}
			/*handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
					console.log(rec);
					var dbkey = rec.data.name;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">Jährliche Ausgaben</font>',
						icon: 'resources/images/MoneyTransfer-17.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.issue.IssuePanelInTab({year: dbkey});
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
				
                }*/
		});
		return eColumn;
	}


});


