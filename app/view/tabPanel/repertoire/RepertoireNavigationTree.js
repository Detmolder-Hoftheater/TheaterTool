Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree', {
	extend: 'Ext.tree.Panel',
	
	requires:[
	'Ext.data.*',
	'Ext.grid.*',
	'Ext.tree.*',
	'TheaterTool.model.Werk'
	],
	
	//reserveScrollbar: true,
	
	//useArrows: true,
	//rootVisible: false,
	//store: store ,

reserveScrollbar: true,
	
	useArrows: true,
	rootVisible: false,
	
	title: 'Werke',
	
	xmlColumn: null,
	incipitsColumn: null,
	detailsColumn: null,
	
	 region:'west',
	 //region:'east',
            flex: 3,
            border: false,
    style: {
      borderRight: '1px solid #A80016'
     // borderLeft: '3px solid #FFF',
     // borderTop: '3px solid #FFF',
     // borderBottom: '3px solid #FFF'
    },
    
  
	collapsible: true,
            
            //bodyStyle:{"grid-row-cell-background-color":"#A80016"},
    
	workPanel: null,
	sourcePanel: null,
	rismPanel: null,
	repertoirePanel: null,
	beatPanel: null,
	
	initComponent: function () {
	
	   var me = this;
		
		this.xmlColumn = this.createColumn('XML', 'resources/images/Save-17.png');
		//this.incipitsColumn = this.createColumn('Incipits', 'resources/images/Door-24.png');
		//this.detailsColumn = this.createColumn('Facsimile', 'resources/images/Door-24.png');
		
		this.listeners = {
			
			selectionchange: function (selected, eOpts) {				
				if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 1) {	
					/*if(me.sourcePanel !== null){						
						me.repertoirePanel.removeAll(true);			
					}
					if(me.rismPanel !== null){
						me.repertoirePanel.removeAll(true);
					}*/
					me.repertoirePanel.removeAll(true);
					me.workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails();
					me.repertoirePanel.add(me.workPanel);
				me.repertoirePanel.setTitle('<b style="color:#A87678;">Aschenbrödel: Isouard</b>');
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 2) {
					me.repertoirePanel.removeAll(true);
					if(eOpts[0].data.name === 'Incipits'){
						// TODO
						//me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel();
						//me.repertoirePanel.add(me.sourcePanel);	
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Aschenbrödel: Isouard -> Incipits</b>');
					}
					else {
						me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel();
						me.repertoirePanel.add(me.sourcePanel);	
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Aschenbrödel: Isouard -> Quelle: Copyst of Detmold</b>');
					}
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 3) {
				//console.log(eOpts[0].data);
					me.repertoirePanel.removeAll(true);
					if(eOpts[0].data.name === 'RISM'){
						me.rismPanel = new TheaterTool.view.tabPanel.repertoire.rism.RISMPanel();
						me.repertoirePanel.add(me.rismPanel);
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Aschenbrödel: Isouard -> Quelle: Copyst of Detmold -> RISM</b>');	
					}
					else if(eOpts[0].data.name === 'Vertaktung'){
						me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel();
						me.repertoirePanel.add(me.beatPanel);
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Aschenbrödel: Isouard -> Quelle: Copyst of Detmold -> Vertaktung</b>');
					}
					else if(eOpts[0].data.name === 'Facsimile'){
						// TODO
						//me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel();
						//me.repertoirePanel.add(me.beatPanel);
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Aschenbrödel: Isouard -> Quelle: Copyst of Detmold -> Facsimile</b>');
					}
						
				
				}
				/*if (typeof selectedObject !== 'undefined') {					
					Ext.getCmp('leafletfacsimile').showMeasure(selectedObject);					
					this.showXMLforSelectedElement(selectedObject);
				}*/
			}
		};
		
		
		this.columns =[ {
			xtype: 'treecolumn',
			header: '<b style="color:#A87678;">Werk/Insipits/Quelle/Facsimile/RISM/Vertaktung</b>',
			flex: 1,
			sortable: true,
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		//this.incipitsColumn,
		//this.detailsColumn,
		this.xmlColumn
		
		];
		
		
		/*this.viewConfig = {
        getRowClass: function(record, index) {
            var c = record.get('change');
            if (c < 0) {
                return 'price-fall';
                console.log(index);
            } else if (c > 0) {
                return 'price-rise';
            }
        }
    }*/
	
		this.callParent();
	},
	
	setRepertoirePanel: function(repertoirePanel){
	
		this.repertoirePanel = repertoirePanel;
		
	},
	
	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: '<b style="color:#A87678;">'+headerName+'</b>',
			width: 40,
			//flex:1,
			align: 'center',
			menuDisabled: true,
			renderer: function (val, metadata, record) {
			
			//console.log(record.data);
			
			if(headerName == 'XML'){
				if(record.data.xml === true){
					this.items[0].icon = path;					
				}
				else {					
					this.items[0].icon = '';
				}				
			}
			
			else if(headerName == 'Incipits'){
					if (record.data.incipits === true) {
					this.items[0].icon = path;
				}
				else {					
					this.items[0].icon = '';
				}
				}
				
				
				else if(headerName == 'Facsimile'){
					if(record.data.details === true){
					this.items[0].icon = path;					
				}				
				else {					
					this.items[0].icon = '';
				}
				}
				
				metadata.style = 'cursor: pointer;';
				return val;
			}
			//handler: this.changeElementDialog
		});
		return eColumn;
	}


});


