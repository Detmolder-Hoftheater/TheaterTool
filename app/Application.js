/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('TheaterTool.Application', {
	extend: 'Ext.app.Application',
	
	name: 'TheaterTool',
	
	views:[
	'main.Main',
	'toolbar.HTToolbar',
	'panel.ViewPanel',
	'navPanel.HTNavigationPanel',
	'tabPanel.repertoire.TabText',
	'tabPanel.repertoire.TabXML',
	'tabPanel.repertoire.GNDTab',
	'tabPanel.repertoire.VIAFTab',
	'tabPanel.repertoire.work.WorkDetailsTabPanel',
	'tabPanel.repertoire.work.WorkDetailsTabPanelTest',
	'tabPanel.repertoire.PersonDetailsTabPanel',
	'tabPanel.repertoire.work.PlanDetailsTabPanel',
	'tabPanel.repertoire.RepertoirePanel',
	'tabPanel.repertoire.work.WorkPanelDetails',
	'tabPanel.repertoire.source.SourceOverviewSection',
	'tabPanel.repertoire.source.SourcePanel',
	'tabPanel.repertoire.rism.RISMPanel',
	'tabPanel.repertoire.beat.BeatPanel',
	'tabPanel.repertoire.beat.BeatXMLSection',
	'tabPanel.repertoire.work.PlanTable',
	'tabPanel.repertoire.work.WorkJournalSection',
	'tabPanel.repertoire.work.JournalTable',
	'tabPanel.repertoire.work.JournalDetailsTabPanel',
	'tabPanel.repertoire.work.WorkRegieSection',
	'tabPanel.repertoire.work.RegieTable',
	'tabPanel.repertoire.work.RegieDetailsTabPanel',
	'tabPanel.repertoire.work.WorkRoleSection',
	'tabPanel.repertoire.work.RoleTable',
	'tabPanel.repertoire.work.RoleDetailsTabPanel',
	'tabPanel.repertoire.work.WorkRevenueSection',
	'tabPanel.repertoire.work.RevenueTable',
	'tabPanel.repertoire.work.RevenueDetailsTabPanel',
	'tabPanel.repertoire.work.WorkIssueSection',
	'tabPanel.repertoire.work.IssueTable',
	'tabPanel.repertoire.work.IssueDetailsTabPanel',
	'tabPanel.repertoire.work.TabTextWork',
	'tabPanel.repertoire.work.TabXMLWork',
	'tabPanel.repertoire.rism.RISMDetailsTabPanel',
	'tabPanel.repertoire.rism.RISMDetailsSection',
	'tabPanel.repertoire.source.SourceDetailsTabPanel',
	'tabPanel.repertoire.source.SourcesTabPanel',
	'tabPanel.repertoire.source.SourceDetailsSection',
	'tabPanel.repertoire.source.SourcesSection',
	'tabPanel.repertoire.source.TabTextSource',
	'tabPanel.repertoire.source.SourcesTree',
	'tabPanel.repertoire.work.WorkDetailsSectionXML',
	'tabPanel.repertoire.source.TabXMLSource',
	'tabPanel.repertoire.source.SourceDetailsSectionXML',
	'tabPanel.repertoire.rism.RISMDetailsSectionXML',
	'navPanel.SearchPanel',
	'navPanel.SearchTabPanel',
	'navPanel.SearchTab',
	'navPanel.ExtendSearchTab',
	'tabPanel.repertoire.beat.LeafletFacsimile',
	'tabPanel.repertoire.beat.FacsimileView',
	'tabPanel.XMLView',
	'tabPanel.HTTabPanel',
	'tabPanel.HTTab',
	'tabPanel.repertoire.RepertoireAlphNavigation',
	'tabPanel.repertoire.RepertoireDetailsPanel',
	'tabPanel.repertoire.RepertoirePersonSection',
	'tabPanel.repertoire.work.WorkPlanSection',
	'tabPanel.repertoire.work.WorkDetailsSection',
	'navPanel.NavigationTreePublic',
	'navPanel.NavigationTreeTheaterLife',
	'tabPanel.repertoire.RepertoireNavigationTree',
	'main.InformationDialog',
'toolbar.DatenRelationWindow',
'tabPanel.repertoire.RepertoirePanelInTab',
'tabPanel.repertoire.RepertoireMenuItemTree',
'tabPanel.repertoire.beat.FacsimileNavTree',
	'tabPanel.repertoire.PersonTable',
'tabPanel.playSchedules.SchedulePanelInTab',
'tabPanel.playSchedules.ScheduleMenuItemTree',
'tabPanel.playSchedules.SchedulePanelDetails',
'tabPanel.playSchedules.ScheduleTextSection',
'tabPanel.playSchedules.XMLSectionSchedule',
'tabPanel.revenue.XMLSectionRevenue',
'tabPanel.revenue.RevenueTextSection',
'tabPanel.revenue.RevenuePanelDetails',
'tabPanel.revenue.RevenueMenuItemTree',
'tabPanel.revenue.RevenuePanelInTab',
'tabPanel.issue.IssuePanelInTab',
'tabPanel.issue.IssueMenuItemTree',
'tabPanel.issue.IssuePanelDetails',
'tabPanel.issue.IssueTextSection',
'tabPanel.issue.XMLSectionIssue',
'tabPanel.repertoire.incipits.IncipitsPanel',
'tabPanel.repertoire.incipits.IncipitSection',
'tabPanel.repertoire.incipits.IncipitWindow',
'tabPanel.persons.PersonPanelInTab',
'tabPanel.persons.PersonTabXML',
'tabPanel.persons.PersonTabDetails',
'tabPanel.persons.PersonSelectionDialog',
'tabPanel.regiebooks.RegiePanelInTab',
'tabPanel.regiebooks.RegieTabDetails',
'tabPanel.regiebooks.RegieTabXML',
'tabPanel.rolebooks.RoleKostuemPanelInTab',
'tabPanel.rolebooks.RoleTabDetails',
'tabPanel.rolebooks.RoleTabXML',
'tabPanel.gagebooks.GageBookPanelInTab',
'tabPanel.gagebooks.GageBookTabDetails',
'tabPanel.gagebooks.GageBookTabXML',
'tabPanel.abo.AboPanelInTab',
'tabPanel.abo.AboTabDetails',
'tabPanel.abo.AboTabXML',
'tabPanel.journal.JournalPanelInTab',
'tabPanel.journal.JournalTabDetails',
'tabPanel.journal.JournalTabXML',
'tabPanel.repertoire.incipits.IncipitsTabPanel',
'tabPanel.repertoire.incipits.IncipitDetailsSection',
'tabPanel.repertoire.incipits.IncipitDetailsSectionXML',
'tabPanel.repertoire.EventsTable',
'tabPanel.persons.OccupationTable',
'tabPanel.persons.ResidenceTable',
'tabPanel.GagenTable',
'tabPanel.SourcesTable',
'tabPanel.WorksTable',
'tabPanel.issue.FacsimileView',
'tabPanel.issue.LeafletFacsimile',
'tabPanel.link.LinkPanelInTab',
'tabPanel.zettel.TheaterZettelPanelInTab'
	],
	models:[
	'Werk',
	'Plan',
	'Person',
	'Source',
	'FacsimileNavigation',
	'MonthNumber',
	'Contact',
	'FieldError',
	'SourceDetails',
	'Event',
	'RefData',
	'PersonData'
	],
	
	stores:[

	],
	
	sourcesStore: null,
	//movementsStore: null,
	//pagesStore: null,
	//slursStore: null,
	
	hairpinDataStore: null,
	dynamDataStore: null,
	dirDataStore: null,
	slurDataStore: null,
	
	personenForWorkDataStore: null,
	plansForWorkDataStore: null,

	worksStoreMap: null,

	//projectName: null,
	projectYears: null,
	extWorkKeys: null,
	dbPaths: null,
	
createStore: function(){

	var werkDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.Werk',
			extraParams: {
				selection1: '',
				selection2: '',
				selection3: '',
				selection4: '',
				selection5: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getWorks.xql'				
				//url: 'data/getWorks.xql'
			},
			autoLoad: false
		});

return werkDataStore;
},

createStoreForWork: function(){

	var workDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.Werk',
			extraParams: {
				workName: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getWork.xql'				
				//url: 'data/getWorks.xql'
			},
			autoLoad: false
		});

return workDataStore;
},

createStoreForSource: function(){

	var sourceDataStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Source',
			extraParams: {
				sourceID: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getSourceDetails.xql'				
			},
			autoLoad: false
		});

return sourceDataStore;

},

handleStoreForWorks: function(selection, isSelected){
		var navTreeStore = null;
		if(this.worksStoreMap === null){
			this.worksStoreMap = new Map();
		}
		
			if(selection === 'Aschenbrödel' || selection === 'Des Teufels Anteil' || selection === 'Der Bettelstudent'){
					//for(var i = 0; i < storeField.length; i++){
						var workName = selection;
						if(this.worksStoreMap.has(selection)){
							navTreeStore = this.worksStoreMap.get(selection);
						}
						else{
							navTreeStore = this.createStoreForWork();
							navTreeStore.getProxy().extraParams.workName = selection;					
							navTreeStore.load();
							var key = selection;
							this.worksStoreMap.set(key, navTreeStore);
						}
				
					//}
			}
			else if(isSelected){
			    // one work was selected				
				    var workName = selection;
						if(this.worksStoreMap.has(selection)){
							navTreeStore = this.worksStoreMap.get(selection);
						}
						else{
							navTreeStore = this.createStoreForWork();
							navTreeStore.getProxy().extraParams.workName = selection;					
							navTreeStore.load();
							var key = selection;
							this.worksStoreMap.set(key, navTreeStore);
						}
			}
			else {
				if(this.worksStoreMap.has(selection)){
					navTreeStore = this.worksStoreMap.get(selection);

				}
				else{
					navTreeStore = this.createStore();

                   if(selection === 1){
					navTreeStore.getProxy().extraParams.selection1 = 'A';
					navTreeStore.getProxy().extraParams.selection2 = 'B';
					navTreeStore.getProxy().extraParams.selection3 = 'C';
					
				}
				else if(selection === 2){
					navTreeStore.getProxy().extraParams.selection1 = 'D';
					navTreeStore.getProxy().extraParams.selection2 = 'E';
					navTreeStore.getProxy().extraParams.selection3 = 'F';
					
				}
				else if(selection === 3){
					navTreeStore.getProxy().extraParams.selection1 = 'G';
					navTreeStore.getProxy().extraParams.selection2 = 'H';
					navTreeStore.getProxy().extraParams.selection3 = 'I';
					
				}
				else if(selection === 4){
					navTreeStore.getProxy().extraParams.selection1 = 'J';
					navTreeStore.getProxy().extraParams.selection2 = 'K';
					navTreeStore.getProxy().extraParams.selection3 = 'L';
					
				}
				else if(selection === 5){
					navTreeStore.getProxy().extraParams.selection1 = 'M';
					navTreeStore.getProxy().extraParams.selection2 = 'N';
					navTreeStore.getProxy().extraParams.selection3 = 'O';
					
				}
				else if(selection === 6){
					navTreeStore.getProxy().extraParams.selection1 = 'P';
					navTreeStore.getProxy().extraParams.selection2 = 'Q';
					navTreeStore.getProxy().extraParams.selection3 = 'R';
					
				}
				else if(selection === 7){
					navTreeStore.getProxy().extraParams.selection1 = 'S';
					navTreeStore.getProxy().extraParams.selection2 = 'T';
					navTreeStore.getProxy().extraParams.selection3 = 'U';
					
				}
				else if(selection === 8){
					navTreeStore.getProxy().extraParams.selection1 = 'V';
					navTreeStore.getProxy().extraParams.selection2 = 'W';
					navTreeStore.getProxy().extraParams.selection3 = 'X';
					navTreeStore.getProxy().extraParams.selection3 = 'Y';
					navTreeStore.getProxy().extraParams.selection3 = 'Z';
					
				}
				
				
				navTreeStore.load();
					var key = selection;
					this.worksStoreMap.set(key, navTreeStore);

				}

			}
return navTreeStore;

},

createStoreForPersonInRep: function(){

this.personenForWorkDataStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Person',
			extraParams: {
				fileName: '',
				type: ''
			},
			proxy: {
				type: 'ajax',
				//url: 'data/getPersonenForWork.xql'
				url: 'resources/xql/getPersonenForWork.xql'
			},
			autoLoad: false
		});

return this.personenForWorkDataStore;
},


creteStoreForFacsimileNavigation: function(){
	var workDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.FacsimileNavigation',
			extraParams: {
				selectedWork: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getFacsimileViewNavigation.xql'				
				//url: 'data/getFacsimileViewNavigation.xql'
			},
			autoLoad: false
		});
return workDataStore;
},

creteStoreForComboMonth: function(){
	var workDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.MonthNumber',
			extraParams: {
				selectedYear: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getMonthsForSelectedYear.xql'				
				//url: 'data/getFacsimileViewNavigation.xql'
			},
		sorters: [{
        sorterFn: function(o1, o2){
            var getRank = function(o){
                var name = o.get('name');
                if (name === 'Januar') {
                    return 1;
                } else if (name === 'Februar') {
                    return 2;
                } 
				else if (name === 'März') {
                    return 3;
                } 
				else if (name === 'April') {
                    return 4;
                } 
				else if (name === 'Mai') {
                    return 5;
                } 
				else if (name === 'Juni') {
                    return 6;
                } 
				else if (name === 'Juli') {
                    return 7;
                } 
				else if (name === 'August') {
                    return 8;
                } 
				else if (name === 'September') {
                    return 9;
                } 
				else if (name === 'Oktober') {
                    return 10;
                } 
				else if (name === 'November') {
                    return 11;
                } 
				else {
                    return 12;
                }
            },
            rank1 = getRank(o1),
            rank2 = getRank(o2);

            if (rank1 === rank2) {
                return 0;
            }

            return rank1 < rank2 ? -1 : 1;
        }
    }],
			autoLoad: false
		});
return workDataStore;
},

creteStoreForComboMonthRevenue: function(){
	var workDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.MonthNumber',
			extraParams: {
				selectedYear: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getRevenueMonth.xql'				
				//url: 'data/getFacsimileViewNavigation.xql'
			},
sorters: [{
        sorterFn: function(o1, o2){
            var getRank = function(o){
                var name = o.get('name');
                if (name === 'Januar') {
                    return 1;
                } else if (name === 'Februar') {
                    return 2;
                } 
				else if (name === 'März') {
                    return 3;
                } 
				else if (name === 'April') {
                    return 4;
                } 
				else if (name === 'Mai') {
                    return 5;
                } 
				else if (name === 'Juni') {
                    return 6;
                } 
				else if (name === 'Juli') {
                    return 7;
                } 
				else if (name === 'August') {
                    return 8;
                } 
				else if (name === 'September') {
                    return 9;
                } 
				else if (name === 'Oktober') {
                    return 10;
                } 
				else if (name === 'November') {
                    return 11;
                } 
				else {
                    return 12;
                }
            },
            rank1 = getRank(o1),
            rank2 = getRank(o2);

            if (rank1 === rank2) {
                return 0;
            }

            return rank1 < rank2 ? -1 : 1;
        }
    }],
			autoLoad: false
		});
return workDataStore;
},

creteStoreForComboMonthIssue: function(){
	var workDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.IssueName',
			extraParams: {
				selectedYear: ''
			},
			proxy: {
				type: 'ajax',
				url: 'resources/xql/getIssueNames.xql'				
				//url: 'data/getFacsimileViewNavigation.xql'
			},
			autoLoad: false
		});
return workDataStore;
},

	launch: function () {

		//var me = this;
		// global
		renderer = new verovio.toolkit();

		var workPath;


		Ext.Ajax.request({           
    			url:'resources/xql/getDBStructure.xql', 
			method: 'GET',      
    			success: function (response, options) {
					var json = jQuery.parseJSON(response.responseText);
					this.dbPaths = json.dbPaths;
    			}
			});
      

		Ext.Ajax.request({           
    			url:'resources/xql/getTheaterData.xql', 
			method: 'GET',
            params: {
                uri: workPath
            },      
    			success: function (response, options) {
					var json = jQuery.parseJSON(response.responseText);
					this.extWorkKeys = json.dbkeys;
					projectName = json.name;
					this.projectYears = json.years;
					Ext.getCmp('htNavigationPanel').setTitle('<b style="color:#A87678;">'+projectName+' '+ this.projectYears+'</b>');
    			}
			});

		storeField = new Array("Aschenbrödel", "Der Bettelstudent", 'Des Teufels Anteil');

		/*this.personenForWorkDataStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Person',
			extraParams: {
				fileName: ''
			},
			proxy: {
				type: 'ajax',
				//url: 'data/getPersonenForWork.xql'
				url: 'resources/xql/getPersonenForWork.xql'
			},
			autoLoad: false
		});*/
		
		/*this.plansForWorkDataStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Plan',
			proxy: {
				type: 'ajax',
				//url: 'data/getPlainsForWork.xql'
				url: 'resources/xql/pmd_ce_getNavigation.xql'
				/\*reader: {
					type: 'json',
					rootProperty: 'sigle'
				}*\/
			},
			autoLoad: false
		});*/
		
		
		/*this.sourcesStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Source',
			proxy: {
				type: 'ajax',
				url: 'data/pmd_ce_getNavigation.xql',
				//url: 'resources/xql/pmd_ce_getNavigation.xql',
				reader: {
					type: 'json',
					rootProperty: 'sigle'
				}
			},
			autoLoad: true
		});
		
		this.hairpinDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.Hairpin',
			
			extraParams: {
				path: ''
			},
			proxy: {
				type: 'ajax',
				//url: 'resources/xql/getControlEvents.xql'
				
				url: 'data/tree/treegrid_1.json'
			},
			autoLoad: false
		});
		
		this.dynamDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.Dynam',
			
			extraParams: {
				path: ''
			},
			proxy: {
				type: 'ajax',
				//url: 'resources/xql/getDynams.xql'
				
				url: 'data/tree/treegrid_2.json'
			},
			autoLoad: false
		});
		
		this.dirDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.Dir',
			
			extraParams: {
				path: ''
			},
			proxy: {
				type: 'ajax',
				//url: 'resources/xql/getDirs.xql'
				
				url: 'data/tree/treegrid_3.json'
			},
			autoLoad: false
		});
		
		
		this.slurDataStore = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.Slur',
			
			extraParams: {
				path: ''
			},
			proxy: {
				type: 'ajax',
				//url: 'resources/xql/getSlurs.xql'
				
				url: 'data/tree/treegrid_4.json'
			},
			autoLoad: false
		});
		
		this.sourcesStore.load();*/
		
		//this.werkDataStore.load();
	},
	
	
	getSourcesStore: function () {
		return this.sourcesStore;
	},
	
	getRenderer: function () {
		return this.renderer;
	},

	getProjectName: function () {
		return this.projectName;
	},

	getProjectYears: function () {
		return this.projectYears;
	},

	getExtWorkKeys: function () {
		return this.extWorkKeys;
	},

	getDBPaths: function () {
		return this.dbPaths;
	},
	
	getPersonenForWorkDataStore: function () {
		return this.personenForWorkDataStore;
	},
	
	getPlansForWorkDataStore: function () {
		return this.plansForWorkDataStore;
	},

	getProjektName: function(){
		return projectName;
	}
	
});