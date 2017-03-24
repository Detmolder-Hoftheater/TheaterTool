Ext.define('TheaterTool.view.tabPanel.search.PersonResultTable', {
	extend: 'Ext.grid.Panel',	
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Person'
	],
	
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,
	sortableColumns: false,
	border: false,
	//title: '<b style="color:gray;">Suchergebnisse: Werke</b>',
	icon: 'resources/images/Mask-19.png',
	store: null,
	columnLines: true,	
	detailsColumn: null,
	//margin: '0 10 10 120',
	personList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.Store', {
	model: 'TheaterTool.model.Person',
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

if(me.personList != 'undefined'){
for(i = 0; i < me.personList.length; i++){
            var work = me.personList[i];
            
            var nameTypeLong = '';
            var nameTypeShort = work[2];
            if(nameTypeShort === 'uniform'){
                    nameTypeLong = 'Einheitstitel';
					}
					else if(nameTypeShort === 'alt'){
					nameTypeLong = 'Alternativtitel';
					}
					else if(nameTypeShort === 'sub'){
					nameTypeLong = 'Untertitel';
					}
            
			var workRow = Ext.create('TheaterTool.model.Person', {
    			name : work[0],
    			dbkey : work[1],
    			type: work[2]
			});
			me.store.add(workRow);
			}
	}
		this.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		
		this.columns =[ 
		{
                xtype: 'rownumberer',
                text: 'Nr.',
                flex: 0.2,
                align: 'center'
            },
		
		{
			text: 'Name',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			text: 'Name Type',
			flex: 0.7,
			menuDisabled: true,
			dataIndex: 'type'
			
		},
		
		this.detailsColumn
		];
		
		this.callParent();
	},
	
	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: headerName,
			flex:0.5,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			
			if(headerName == 'Details'){
					this.items[0].icon = path;	
				}
								
				if(headerName == 'Tiefenerschliessung'){
				  
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
			 if(colIndex === 3){
					var rec = grid.getStore().getAt(rowIndex);
					//console.log(rec);
					var dbkey = rec.data.dbkey;
					
					var historyButton = Ext.getCmp('historyButton'); 
					var menuItem = historyButton.menu.add({text: '<font style="color:gray;">' + rec.data.name + '</font>', icon: 'resources/images/Mask-19.png', dbkey: dbkey});  

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					var existItems = navTreeGlobal.items;					
					var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, dbkey, menuItem.id);
                     if (! isFoundItem) { 
					
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: dbkey, title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/Mask-19.png'});
					repertoireTab.add(personDetails);

					repertoireTab.setActiveMenuItemId(menuItem.id);
                    repertoireTab.setMenuAdded(true);
                    
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);
					navTreeGlobal.fireEvent('render', Ext.getCmp('tabpanel'));
					}
							     
			 }
                    
                }
		});
		return eColumn;
	}


});


