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
	'tabPanel.repertoire.source.SourceDetailsSection',
	'tabPanel.repertoire.source.TabTextSource',
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
'tabPanel.revenue.RevenuePanelInTab'
	],
	
	models:[
	'Werk',
	'Plan',
	'Person',
	'Source',
	'FacsimileNavigation',
	'MonthNumber'
	],
	
	stores:[

	],
	
	sourcesStore: null,
	//movementsStore: null,
	//pagesStore: null,
	//slursStore: null,
	renderer: null,
	hairpinDataStore: null,
	dynamDataStore: null,
	dirDataStore: null,
	slurDataStore: null,
	
	personenForWorkDataStore: null,
	plansForWorkDataStore: null,

	worksStoreMap: null,
	
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

handleStoreForWorks: function(selection){
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
			autoLoad: false
		});
return workDataStore;
},

	launch: function () {
		
		this.renderer = new verovio.toolkit();

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
	
	getHairpinDataStore: function () {
		return this.hairpinDataStore;
	},
	
	getDynamDataStore: function () {
		return this.dynamDataStore;
	},
	
	getSlurDataStore: function () {
		return this.slurDataStore;
	},
	
	getDirDataStore: function () {
		return this.dirDataStore;
	},
	
	
	getPersonenForWorkDataStore: function () {
		return this.personenForWorkDataStore;
	},
	
	getPlansForWorkDataStore: function () {
		return this.plansForWorkDataStore;
	}
	
});