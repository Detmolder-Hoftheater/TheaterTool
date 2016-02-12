var store = Ext.create('Ext.data.TreeStore', {
   root: {
        text: 'Ext JS',
        expanded: true,
        children: [
            {
                name: 'Aschenbrödel: Isouard',
                icon: 'resources/images/Books1-17.png',
                 expanded: true,
                xml: true,               
                incipits: true,
                details: false,
                children: [
                    { name: 'Copyist of Detmold',
                    icon: 'resources/images/Book1-16.png',
                    expanded: true,
                    xml: true,
                    details: true,
                    incipits: false,
                     children: [
                    { name: 'RISM',
                    icon: 'resources/images/Literature-17.png',
                    	leaf:true, 
                    	xml: true,
                    	incipits: false,
                    	 details: false
                    },
                    { leaf:true, 
                    name: 'Vertaktung',
                    		xml: true,
                    	incipits: false,
                    	 details: false,
                   icon: 'resources/images/Musical-16.png'}
                ]
                }
       ] 
       }
]
}
})


Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree', {
	extend: 'Ext.tree.Panel',
	
	requires:[
	'Ext.data.*',
	'Ext.grid.*',
	'Ext.tree.*',
	'TheaterTool.model.Werk'
	],
	
	reserveScrollbar: true,
	
	useArrows: true,
	rootVisible: false,
	store: store ,
	
	title: 'A',
	
	xmlColumn: null,
	incipitsColumn: null,
	detailsColumn: null,
	
	 region:'west',
            flex: 3,
            border: false,
    style: {
      borderRight: '1px solid #A80016'
     // borderLeft: '3px solid #FFF',
     // borderTop: '3px solid #FFF',
     // borderBottom: '3px solid #FFF'
    },
  
	collapsible: true,
            
           // bodyStyle:{"grid-row-cell-background-color":"#ffc"},
    
	workPanel: null,
	sourcePanel: null,
	rismPanel: null,
	repertoirePanel: null,
	beatPanel: null,
	
	initComponent: function () {
	
	   var me = this;
		
		this.xmlColumn = this.createColumn('XML', 'resources/images/Save-17.png');
		this.incipitsColumn = this.createColumn('Incipits', 'resources/images/Door-24.png');
		this.detailsColumn = this.createColumn('Facsimile', 'resources/images/Door-24.png');
		
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
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 2) {
					me.repertoirePanel.removeAll(true);
					me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel();
					me.repertoirePanel.add(me.sourcePanel);	
				
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 3) {
				//console.log(eOpts[0].data);
					me.repertoirePanel.removeAll(true);
					if(eOpts[0].data.name === 'RISM'){
						me.rismPanel = new TheaterTool.view.tabPanel.repertoire.rism.RISMPanel();
						me.repertoirePanel.add(me.rismPanel);	
					}
					else{
						me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel();
						me.repertoirePanel.add(me.beatPanel);
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
			text: 'Werk/Quelle/RISM',
			flex: 2,
			sortable: true,
			dataIndex: 'name'
			
		},
		this.incipitsColumn,
		this.detailsColumn,
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
			header: headerName,
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


