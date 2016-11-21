Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTable', {
	extend: 'Ext.tree.Panel',	
	/*layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	flex:1,*/
	//xtype: 'grouped-header-grid',
	sortableColumns: false,
	
	border:false,
    useArrows: true,
    rootVisible: false,
    flex:1,
	
	
	//title: '<b style="color:gray;">Suchergebnisse: Werke</b>',
	//icon: 'resources/images/BooksVert-17.png',
	store: null,
	rowLines: true,
    columnLines: true,
   // reserveScrollbar: true,
	
	useArrows: true,
	detailsColumn: null,
	//margin: '0 10 10 120',
	lineList: null,
   
	initComponent: function () {
	
	   var me = this;
	
	me.store = Ext.create('Ext.data.TreeStore', {
	model: 'TheaterTool.model.Theaterakte',
    root: {
        expanded: true,
        children: [
            ]
    }
});

if(me.lineList != 'undefined'){
//console.log(me.lineList);

var rootNode = me.store.getRootNode();
for(i = 0; i < me.lineList.length; i++){
            var one_row = me.lineList[i]; 
            var arrayTmp = one_row[0];
           
              var one_line_1 = Ext.create('TheaterTool.model.Theaterakte', {
    			      //name : nameResult[0],
    			      //workKey: nameResult[1],
    			      details : one_row[1],
    			      anmerkung: one_row[2],
    			      expanded: true,
    			      icon: Ext.BLANK_IMAGE_URL,
    			     // cls: 'x-tree-noicon',
    			      //iconCls: '{display: none !important;}',
    			      leaf: false 
			     });
			     //one_line_1.icon.width = 0;
			    // one_line_1.set('iconCls', '{display: none !important;}');
			     rootNode.appendChild(one_line_1);
            
                for(j = 0; j < arrayTmp.length; j++){
                    var nameResult = arrayTmp[j];
                   var otherName = '';
                   
                   if(nameResult[1]= ''){
                       otherName = nameResult;
                       
                   }
                   else{
                       otherName = nameResult[0];
                   }
                    one_line_1.appendChild({
    			      name : otherName,
    			      workKey: nameResult[1],
    			      //details : one_row[1],
    			      //anmerkung: one_row[2] ,
    			      leaf: true 
			     });
			    
			     
                }
          
           
			
			}
	}
		//me.detailsColumn = this.createColumn('Details', 'resources/images/Door-24.png');
		
		//var extendColumn = this.createColumn('Tiefenerschliessung', '');
		
		me.columns =[ 
		//extendColumn,
		//me.detailsColumn,
		{
		//text: 'Original',
		
		//hideHeaders: true,
		//columns : [{
			//text: 'Titel',
			flex: 1,
			//width    : 100,
			//xtype: 'treecolumn',
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			//text: 'Titel Type',
			flex: 1,
			//width    : 75,
			menuDisabled: true,
			dataIndex: 'details'
			
		},
		{
			//text: 'Sprache',
			flex: 1,
			//width    : 80,
			menuDisabled: true,
			dataIndex: 'anmerkung'
			
		},
		//this.detailsColumn
		//]},
		{
		text: 'Referenzen',
		//hideHeaders: true,
		columns : [{
			text: 'Werke',
			//flex: 3,
			width    : 170,
			xtype: 'treecolumn',
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			text: 'Personen',
			//flex: 3,
			width    : 170,
			menuDisabled: true,
			dataIndex: 'details'
			
		}]
		}
		];
		
		me.callParent();
	},
	
	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			//header: headerName,
			//flex: 1.5,
			
			menuDisabled: true,
			dataIndex: 'name',			
			//align: 'center',
			renderer: function (val, metadata, record) {
			
			if(headerName == 'Details'){
					this.items[0].icon = path;	
					console.log(val);
					console.log(metadata);
					console.log(record);
					return '<div style="float:left; font-size: 11px;  line-height: 1em;">'+ val + '</div>';
					
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
			console.log(grid);
					console.log(rowIndex);
					console.log(colIndex);
					var rec = grid.getStore().getAt(rowIndex);
			         console.log(rec);
			 /*if(colIndex === 6){
			     var rec = grid.getStore().getAt(rowIndex);
					var dbkey = rec.data.workid;
					var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+rec.data.name+'</font>',
						icon: 'resources/images/BookBlau-16.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: dbkey, isSelected: true});
					repertoireTab.add(personDetails);

					var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
					navTreeGlobal.add(repertoireTab);
					navTreeGlobal.setActiveTab(repertoireTab);	
					navTreeGlobal.fireEvent('render', Ext.getCmp('tabpanel'));		     
			 }*/
                    
                }
		});
		return eColumn;
	}


});


