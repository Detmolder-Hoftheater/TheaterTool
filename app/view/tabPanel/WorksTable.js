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
	hideHeaders: true,
	collapsible: true,
	collapsed: true,
	title: '<b style="color:gray; font-size: 12px;">Werke</b>',
	icon: 'resources/images/BooksVert-17.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	margin: '0 0 10 0',
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
            var iconPath = '';
            var workId = work[1];
            console.log(workId);
            if (extWorkKeys.indexOf(workId) > -1) {
                iconPath = 'resources/images/BookBlau-16.png';
            } else {
                iconPath = 'resources/images/Books1-17.png';
            }
       
			var workRow = Ext.create('TheaterTool.model.RefData', {
    			name : work[0],
    			iconExtend: iconPath,
    			id : work[1]
			});
			me.store.add(workRow);
			}
	}
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png', 'name');
		
		var extendColumn = this.createExtendColumn();
		
		this.columns =[ 
		extendColumn,
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createExtendColumn: function () {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			//header: headerName,
			//flex:0.3,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {	
			    this.items[0].icon = record.data.iconExtend;					
				metadata.style = 'cursor: pointer;';				
			}
			
			});
		return eColumn;
	},
	
	createColumn: function (headerName, path, dataind) {
	
	getWorkContent = function (workId, workName) {
            var toolBarGlobal = Ext.getCmp('toolbar');
            var historyButton = Ext.getCmp('historyButton');
            
            var workIcon = '';
            if (extWorkKeys.indexOf(workId) > -1) {
                workIcon = 'resources/images/BookBlau-16.png';
            } else {
                workIcon = 'resources/images/Books1-17.png';
            }
            
            var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">' + workName + '</font>', icon: workIcon, dbkey: workId
            });
            
            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
            var existItems = navTreeGlobal.items;
            var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
            if (! isFoundItem) {
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">' + workName + '</font>',
                    icon: workIcon
                });
                
                /*var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                selection: workId, isSelected: true
                });*/
                var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                    selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                });
                
               // personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + workName + '</font>');
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
			header: headerName,
			flex:1,
			//align: 'center',
			dataIndex: dataind,
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			     var presentationText = '';
                                if (record.data.id !== '') {
                                    // this.items[0].icon = 'resources/images/Door-24.png';
                                    presentationText = '<small style="font-size: 11px; line-height: 1.5em; vertical-align:top;"><a href="javascript:getWorkContent(\'' + record.data.id + '\'' + ', \'' + record.data.name + '\');">' + record.data.name + '</a></small>';
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


