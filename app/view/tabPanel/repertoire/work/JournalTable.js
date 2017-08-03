Ext.define('TheaterTool.view.tabPanel.repertoire.work.JournalTable', {
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
	sortableColumns: false,collapsible: true,
	collapsed: true,
	collapsible: true,
	collapsed: true,
	title: '<b style="color:gray; font-size: 12px;">Theaterjournal</b>',
	icon: 'resources/images/Presse-16.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	hideHeaders: true,
	margin: '0 0 10 0',
	journalList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.RefData',
    data:[],
    sorters: [{
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
    }]
});

for(i = 0; i < me.journalList.length; i++){
            var datum = me.journalList[i];
			var role = Ext.create('TheaterTool.model.RefData', {
    			jahr : datum
			});
			me.store.add(role);
			}
	
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		this.columns =[ 
		
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createColumn: function (headerName, path) {
	   getJournalContent = function (jahr) {
            var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton'); 
                    //var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">' + rec.data.jahr + '</font>');
                    //if(!isHistoryItemExist){
                          var menuItem = historyButton.menu.add({text: '<font style="color:gray;">' + jahr + '</font>', icon: 'resources/images/Presse-16.png'});  //, selection: 3

                     //}
			
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+jahr+'</font>', menuItem.id);
                    if (! isFoundItem) {
				
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+jahr+'</font>',
						icon: 'resources/images/Presse-16.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.journal.JournalPanelInTab({regieName: jahr});
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
			dataIndex: 'jahr',
			renderer: function (val, metadata, record) {
			var presentationText = '';
                                if (record.data.dbkey !== '') {
                                    // this.items[0].icon = 'resources/images/Door-24.png';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getJournalContent(\'' + record.data.jahr + '\');">' + record.data.jahr + '</a></small>';
                                } else {
                                    //this.items[0].icon = '';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.jahr + ' </small>';
                                }
                                // metadata.style = 'cursor: pointer;';
                                return presentationText;
			}
			});
		return eColumn;
	}


});


