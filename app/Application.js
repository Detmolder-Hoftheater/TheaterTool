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
	'tabPanel.repertoire.rism.RISMDetailsTabPanel',
	'tabPanel.repertoire.rism.RISMDetailsSection',
	'tabPanel.repertoire.source.SourceDetailsTabPanel',
	'tabPanel.repertoire.source.SourceDetailsSection',
	'navPanel.SearchPanel',
	'navPanel.SearchTabPanel',
	'navPanel.SearchTab',
	'navPanel.ExtendSearchTab',
	'facsimileView.FacsimileView',
	'facsimileView.LeafletFacsimile',
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
	'tabPanel.repertoire.PersonTable'
	],
	
	models:[
	'Werk',
	'Plan',
	'Person',
	'Source'
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
	
	werkDataStore: null,
	personenForWorkDataStore: null,
	plansForWorkDataStore: null,
	
	launch: function () {
		
		this.renderer = new verovio.toolkit();

		this.personenForWorkDataStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Person',
			proxy: {
				type: 'ajax',
				//url: 'data/getPersonenForWork.xql',
				url: 'resources/xql/getPersonenForWork.xql'
			},
			autoLoad: false
		});
		
		this.plansForWorkDataStore = Ext.create('Ext.data.Store', {
			model: 'TheaterTool.model.Plan',
			proxy: {
				type: 'ajax',
				//url: 'data/getPlainsForWork.xql'
				url: 'resources/xql/pmd_ce_getNavigation.xql'
				/*reader: {
					type: 'json',
					rootProperty: 'sigle'
				}*/
			},
			autoLoad: false
		});
		
		
//		this.werkDataStore = Ext.create('Ext.data.TreeStore', {
//			model: 'TheaterTool.model.Werk',
//			proxy: {
//				type: 'ajax',
//				//url: 'resources/xql/getControlEvents.xql'
//				
//				url: 'data/tree/treegridWerk.json'
//			},
//			autoLoad: true
//		});
		
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