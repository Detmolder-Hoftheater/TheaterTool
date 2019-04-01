Ext.define('TheaterTool.view.tabPanel.persons.PersonNavigationTree', {
	extend: 'Ext.grid.Panel',
	requires:[
	 'Ext.grid.column.Action',
	'TheaterTool.model.Person'
	],
/*reserveScrollbar: true,
	
	useArrows: true,
	rootVisible: false,

rowLines: true,
columnLines: true,

bodyPadding: 5,

header: false,
	
	title: '<b style="color:gray;">Personen</b>',
	
	// region:'west',
	 region:'east',
            flex: 3.3,
            border: true,
   /\* style: {
      borderRight: 'px solid whote'
     // borderLeft: '3px solid #FFF',
     // borderTop: '3px solid #FFF',
     // borderBottom: '3px solid #FFF'
    },*\/
    
  
	collapsible: true,
    
	persStore: null,
	persons_list: null,*/
	
	
	/*layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},*/
	flex: 3.3,
	region:'east',
	//title: '<b style="color:gray;">Personen</b>',
	//icon: 'resources/images/Mask-19.png',
	collapsible: true,
	header: false,
	//sortableColumns: false,
	rowLines: false,
    columnLines: true,
	
	repertoirePanel:null,
	
	persons_list: null,
		
	store: null,
	
	initComponent: function () {
	
	  var me = this;

		me.store = Ext.create('Ext.data.Store', {
   	    model: 'TheaterTool.model.Person',
        data:[]
        });


		for(i = 0; i < me.persons_list.length; i++){
			var person_details = me.persons_list[i];
			var typeValue = '';
			if(person_details[3] === 'reg'){
		      typeValue = 'regulär';
		 }
		 else if(person_details[3] === 'alt'){
		      typeValue = 'alternativ';
		 }
		  else if(person_details[3] === 'full'){
		      typeValue = 'vollständig';
		 }
		 else if(person_details[3] === 'pseud'){
		      typeValue = 'pseudonym';
		 }
			
			var person = Ext.create('TheaterTool.model.Person', {
    			'name' : person_details[0] + ', '+person_details[2],
    			'persId'  : person_details[1],
    			'forename': person_details[2],
    			'type': typeValue,
    			leaf: true 
			});
			me.store.add(person);

}

me.store.sort('name');


		me.columns = [
            {
            
            header: '<font style="color:#585858;">Name/Pseudonym</font>',
			flex: 2,
			menuDisabled: true,
			dataIndex: 'name',
			 style: {
         paddingLeft: 6,
         paddingTop: 6,
         paddingRight: 6,
         paddingBottom: 6
    }
            },
            {
                
                header: '<font style="color:#585858;">Nametype</font>',
                flex: 1.3,
                menuDisabled: true,
                dataIndex: 'type',
                 style: {
         paddingLeft: 6,
         paddingTop: 6,
         paddingRight: 6,
         paddingBottom: 6
    }
                
            }
        ]
		

		this.listeners = {
			
			selectionchange: function (selected, eOpts) {
			        me.repertoirePanel.removeAll(true);
					me.workPanel = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: eOpts[0].data.persId, icon: 'resources/images/Mask-19.png', title:'<font size="2" face="Tahoma" style="color:#909090;">Person: '+eOpts[0].data.name +'</font>'});
					me.repertoirePanel.add(me.workPanel);	
					//me.repertoirePanel.setTitle('<b style="color:#A87678;">'+eOpts[0].data.name +'</b>');

			//me.repertoirePanel.setIcon('resources/images/Mask-19.png');
			
			
			
			
			   /*  var personSelected = me.personen.getSelectionModel().getSelection()[0];
				var selectedId = personSelected.data.persId;
				var selectedName = personSelected.data.name + ', '+personSelected.data.forename;
				var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+selectedName+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: selectedId});
					personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">'+selectedName+'</font>');
					repertoireTab.add(personDetails);
					me.tabPanel.add(repertoireTab);
					me.tabPanel.setActiveTab(repertoireTab);*/
			
			
				/*if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 1) {
					me.repertoirePanel.removeAll(true);
					me.workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails({workID: eOpts[0].data.werkID});
					me.repertoirePanel.add(me.workPanel);			
					me.repertoirePanel.setTitle('<b style="color:#A87678;">Werk: '+eOpts[0].data.name+', '+eOpts[0].data.componist+'</b>');
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 2) {
					me.repertoirePanel.removeAll(true);
					me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel({sourceID: eOpts[0].data.sourceID, werkTitle: eOpts[0].parentNode.data.name});
					me.repertoirePanel.add(me.sourcePanel);	
					me.repertoirePanel.setTitle('<b style="color:#A87678;">'+eOpts[0].data.name+' (Werk: '+eOpts[0].parentNode.data.name+'; '+eOpts[0].parentNode.data.componist+')</b>');
				}
				else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 3) {
				//console.log(eOpts[0].data);
					me.repertoirePanel.removeAll(true);
					/\*if(eOpts[0].data.name === 'Incipits' && name.indexOf('Bettelstudent') > -1){
						me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel();
						me.repertoirePanel.add(me.incipitsPanel);
						me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> Incipits</b>');	
					}*\/
					//else 
					if(eOpts[0].data.name === 'Incipits'){
						me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel({sourceID: eOpts[0].parentNode.parentNode.data.werkID});
						me.repertoirePanel.add(me.incipitsPanel);
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Incipits für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');	
					}
					else if(eOpts[0].data.name === 'RISM'){
						me.rismPanel = new TheaterTool.view.tabPanel.repertoire.rism.RISMPanel({sourceID: eOpts[0].parentNode.data.sourceID});
						me.repertoirePanel.add(me.rismPanel);
						me.repertoirePanel.setTitle('<b style="color:#A87678;">RISM für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');	
					}
					else if(eOpts[0].data.name === 'Faksimiles'){
						me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel({selectedWork: eOpts[0].parentNode.parentNode.data.name});
						me.repertoirePanel.add(me.beatPanel);
						me.repertoirePanel.setTitle('<b style="color:#A87678;">Faksimiles für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
					}
						
				
				}*/
				
			}
		};
		
		
		/*this.columns =[ {
			xtype: 'treecolumn',
			header: '<b style="color:gray;">Werk -> Quelle -> Faksimiles/Incipits/RISM</b>',
			flex: 1,
			sortable: true,
			menuDisabled: true,
			dataIndex: 'name'
			
		},
		{
			header: '<b style="color:gray;">Personen</b>',
			flex: 1,
			sortable: true,
			menuDisabled: true,
			//align: 'center',
			dataIndex: 'componist'
			
		}

		];*/
		
		
		
		me.callParent();
	},

setWorkSelection: function(selectedWork){
		this.selectedWork = selectedWork;
	},
	
	setRepertoirePanel: function(repertoirePanel){
	
		this.repertoirePanel = repertoirePanel;
		
	}

});


