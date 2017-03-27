Ext.define('TheaterTool.view.tabPanel.GagenTable', {
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
	//title: '<b style="color:gray;">Gagenbücher</b>',
	//icon: 'resources/images/Gift-17.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	margin: '0 0 10 0',
	gagenList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[]
});

for(i = 0; i < me.gagenList.length; i++){
            var role = Ext.create('TheaterTool.model.RefData', {
    			name : me.gagenList[i]
			});
			me.store.add(role);
			}
	
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		this.columns =[ 
		
		/*{
			text: 'Name',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'name'
			
		},*/
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createColumn: function (headerName, path) {
	
	getGagenContent = function (gagenName) {
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
					var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+gagenName+'</font>');
                    if (! isFoundItem) {
					
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+gagenName+'</font>',
						icon: 'resources/images/Gift-17.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({regieName: gagenName});
					repertoireTab.add(personDetails);

					
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', navTreeGlobal);
                }
        };
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex:1,
			//align: 'center',
			dataIndex: 'name',
			menuDisabled: true,
			renderer: function (val, metadata, record) {			
			var presentationText = '';
                              
                                var presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getGagenContent(\'' + record.data.name + '\');">' + record.data.name + '</a></small>';
                               
                                return presentationText;
			
			}/*,
			handler: function(grid, rowIndex, colIndex) {
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
                    var rec = grid.getStore().getAt(rowIndex);
					var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+rec.data.name+'</font>');
                    if (! isFoundItem) {
					var dbkey = rec.data.name;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Gift-17.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({regieName: dbkey});
					repertoireTab.add(personDetails);

					
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', navTreeGlobal);
                }
                }*/
		});
		return eColumn;
	}


});


