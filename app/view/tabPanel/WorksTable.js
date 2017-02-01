Ext.define('TheaterTool.view.tabPanel.WorksTable', {
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
	title: '<b style="color:gray;">Werke</b>',
	//icon: 'resources/images/Presse-16.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	margin: '0 10 10 120',
	worksList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[]
    /*sorters: [{
        sorterFn: function(o1, o2){
            var getRank = function(o){
                var name = o.get('jahr');
                var numberJahr = parseInt(name);               
                return numberJahr;
            },
            rank1 = getRank(o1),
            rank2 = getRank(o2);

            if (rank1 === rank2) {
                return 0;
            }

            return rank1 < rank2 ? -1 : 1;
        }
    }]*/
});

if(me.worksList != 'undefined'){
for(i = 0; i < me.worksList.length; i++){
            var work = me.worksList[i];
            var iconExtend = '';
            if(work[1] === 'H020149' || work[1] === 'H020048' || work[1] === 'H020263'){
                iconExtend = 'resources/images/BookBlau-17.png';
            }
            else{
                iconExtend = 'resources/images/Books1-17.png';
            }
            
			var workRow = Ext.create('TheaterTool.model.RefData', {
    			name : work[0],
    			iconExtend: iconExtend,
    			id : work[1]
			});
			me.store.add(workRow);
			}
	}
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		var extendColumn = this.createColumn('', '');
		
		this.columns =[ 
		extendColumn,
		
		{
			text: 'Name',
			flex: 2,
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
								
				if(headerName == ''){
				  
					this.items[0].icon = record.data.iconExtend;					
				}
				
				metadata.style = 'cursor: pointer;';
				
				/*if(headerName == 'Details'){
					return '<div style="float:right; font-size: 13px; line-height: 1em;">'
                + 'Hey!' 
            + '</div>';
				}
				else{*/
				    return val;
			//	}
				
			},
			
			handler: function(grid, rowIndex, colIndex) {
			
			         var rec = grid.getStore().getAt(rowIndex);
			         var dbkey = rec.data.id;
			
			        var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton'); 
                    var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, dbkey);
                    if(!isHistoryItemExist){
                          historyButton.menu.add({text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: 'resources/images/BookBlau-16.png', dbkey: dbkey});  

                     }
			
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;					
					var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey);
                     if (! isFoundItem) { 
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: dbkey, isSelected: true});
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


