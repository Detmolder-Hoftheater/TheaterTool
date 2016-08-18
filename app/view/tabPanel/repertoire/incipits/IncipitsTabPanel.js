/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel', {
extend: 'Ext.tab.Panel',

//autoScroll: true,
	
	flex: 1,
border: false,
//bodyPadding:15,

	personSection: null,
	detailSection: null,
	sourcesSection: null,
	overviewSection: null,
	detailSection_xml: null,
			
	sourceID: null,
	werkTitle: null,
	
	
	initComponent: function () {

		/*var app = TheaterTool.getApplication();
        var sourceStore = app.createStoreForSource();
		sourceStore.getProxy().extraParams.sourceID = this.sourceID;				
		sourceStore.load();*/
	
	//this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.sourceID, type: 'source'});
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSection({sourceID: this.sourceID});
	
	this.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSectionXML({sourceID: this.sourceID});
	
    this.items = [
			
		this.detailSection,
		this.sourcesSection,
		this.detailSection_xml
			
			
    ]

    	this.callParent();
	}
});
