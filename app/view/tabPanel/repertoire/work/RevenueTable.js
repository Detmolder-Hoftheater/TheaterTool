Ext.define('TheaterTool.view.tabPanel.repertoire.work.RevenueTable', {
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
	collapsible: true,
	collapsed: true,
	title: '<b style="color:gray; font-size: 12px;">Einnahmen</b>',
	icon: 'resources/images/MoneyBox-17.png',
	margin: '0 0 10 0',
	store: null,
	columnLines: true,
	hideHeaders: true,
	detailsColumn: null,
	revenueList: null,
	
	selectedWorkID: null,
     
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
var nameForCount = '';
var selectionCount = 0;
        for(i = 0; i < me.revenueList.length; i++){
            var dailyArray = me.revenueList[i];
            var dailyName = dailyArray[0];
            var selectedJahr= dailyArray[1];
            
            var nameForLoad = dailyName.split(':');
            var roleName = nameForLoad[0];
            if(nameForCount === roleName){
                selectionCount = selectionCount +1;
            }
            else{
                nameForCount = roleName;
                selectionCount = 0;
            }       
        
            /*var datum = me.revenueList[i];
            var split_array = datum.split(' ');*/
			var role = Ext.create('TheaterTool.model.RefData', {
    			/*jahr : split_array[1],
    			monat: split_array[0]*/
    			jahr : dailyName,
    			countFoSelection: selectionCount,
    			selectedJahr: selectedJahr
			});
			me.store.add(role);
			}
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', me);
	
		this.columns =[ 
		
		/*{
			//text: 'Jahr',
			//flex: 2,
			menuDisabled: true,
			dataIndex: 'jahr'
			
		},*/
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createColumn: function (headerName, path, me) {
	var me = this;
	getRevenueContent = function (jahr, countFoSelection, selectedJahr) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            
            var nameForLoad = jahr.split(':');
			        var roleName = nameForLoad[0];
			        var countNumber = parseInt(countFoSelection)+1;
			        var roleNameToHistory = jahr + ' (' + countNumber + ')';
            
                    var historyButton = Ext.getCmp('historyButton'); 
                    //var isHistoryItemExist = toolBarGlobal.foundHistoryitem(historyButton.menu.items, '<font style="color:gray;">Einnahmen: ' + rec.data.jahr + '</font>');
                    //if(!isHistoryItemExist){
                          var menuItem = historyButton.menu.add({text: '<font style="color:gray;">'+roleNameToHistory+'</font>', icon: 'resources/images/MoneyBox-17.png'});  //, selection: 3

                     //}
			
			        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
			        var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFound(existItems, '<font style="color:gray;">'+roleNameToHistory+'</font>' , menuItem.id);
                    if (! isFoundItem) {
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+roleNameToHistory+'</font>',
						icon: 'resources/images/MoneyBox-17.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.revenue.RevenuePanelInTab({year: selectedJahr, /*monat: monat,*/ selectedWorkID: me.selectedWorkID, count: countFoSelection, selectedReport: roleName});
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
                                    var countNumber = parseInt(record.data.countFoSelection)+1;
                                    // this.items[0].icon = 'resources/images/Door-24.png';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getRevenueContent(\'' + record.data.jahr + '\'' + ', \'' + record.data.countFoSelection+ '\',\'' + record.data.selectedJahr + '\');">' + record.data.jahr+'('+countNumber+')' + '</a></small>';
                                } else {
                                    //this.items[0].icon = '';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"> ' + record.data.monat + ' </small>';
                                }
                                // metadata.style = 'cursor: pointer;';
                                return presentationText;
			}
			});
		return eColumn;
	}


});