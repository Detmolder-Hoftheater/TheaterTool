Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree', {
	extend: 'Ext.tree.Panel',
	
	requires:[
	/*'Ext.data.*',
	'Ext.grid.*',*/
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
//lines: false,
rowLines: true,
columnLines: true,

bodyPadding: 5,

header: false,
	
	title: '<b style="color:gray;">Werke</b>',
	
	xmlColumn: null,
	incipitsColumn: null,
	detailsColumn: null,
	
	// region:'west',
	 region:'east',
            flex: 3.3,
            border: true,
   /* style: {
      borderRight: 'px solid whote'
     // borderLeft: '3px solid #FFF',
     // borderTop: '3px solid #FFF',
     // borderBottom: '3px solid #FFF'
    },*/
    
  
	collapsible: true,
            

            //bodyStyle:{"grid-row-cell-background-color":"#A80016"},
    
	workPanel: null,
	sourcePanel: null,
	rismPanel: null,
	repertoirePanel: null,
	beatPanel: null,
	workName: null,
selectedWork: null,
	incipitsPanel: null,

	initComponent: function () {
	
	   var me = this;
		
		//this.xmlColumn = this.createColumn('XML', 'resources/images/Download.png');
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
					me.workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails({workID: eOpts[0].data.werkID});
					me.repertoirePanel.add(me.workPanel);			
					me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].data.name+', '+eOpts[0].data.componist+'</b>');
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 2) {
					me.repertoirePanel.removeAll(true);
					me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel({sourceID: eOpts[0].data.sourceID, werkTitle: eOpts[0].parentNode.data.name});
					me.repertoirePanel.add(me.sourcePanel);	
					me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.data.name+', '+eOpts[0].parentNode.data.componist+' -> '+eOpts[0].data.name+'</b>');
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 3) {
				//console.log(eOpts[0].data);
					me.repertoirePanel.removeAll(true);
					if(eOpts[0].data.name === 'Incipits' && name.indexOf('Bettelstudent') > -1){
						me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel();
						me.repertoirePanel.add(me.incipitsPanel);
						me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> Incipits</b>');	
					}
					else if(eOpts[0].data.name === 'Incipits'){
						me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel({sourceID: eOpts[0].parentNode.parentNode.data.werkID});
						me.repertoirePanel.add(me.incipitsPanel);
						me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> Incipits</b>');	
					}
					else if(eOpts[0].data.name === 'RISM'){
						me.rismPanel = new TheaterTool.view.tabPanel.repertoire.rism.RISMPanel({sourceID: eOpts[0].parentNode.data.sourceID});
						me.repertoirePanel.add(me.rismPanel);
						me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> RISM</b>');	
					}
					else if(eOpts[0].data.name === 'Facsimile'){
						me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel({selectedWork: eOpts[0].parentNode.parentNode.data.name});
						me.repertoirePanel.add(me.beatPanel);
						me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> Facsimile</b>');
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
			header: '<b style="color:gray;">Werk -> Quelle -> Facsimile/Incipits/RISM</b>',
			flex: 2,
			sortable: true,
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			header: '<b style="color:gray;">Autor</b>',
			flex: 1,
			sortable: true,
			menuDisabled: true,
			align: 'center',
			dataIndex: 'componist'
			
		}

		//this.incipitsColumn,
		//this.detailsColumn,
		//this.xmlColumn
		
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

setWorkSelection: function(selectedWork){
		this.selectedWork = selectedWork;
	},
	
	setRepertoirePanel: function(repertoirePanel){
	
		this.repertoirePanel = repertoirePanel;
		
	},

	createColumn: function (headerName, path) {
		
		var eColumn = Ext.create('Ext.grid.column.Action', {			
			xtype: 'actioncolumn',
			header: '<b style="color:gray;">'+headerName+'</b>',
			//width: 40,
			flex:0.2,
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


