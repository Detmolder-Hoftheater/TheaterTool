Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
	extend: 'Ext.tab.Panel',

	border: true,

	flex:1,
	bodyPadding:3,

	dbkey: null, 
	
	section_xml: null,
	section_details: null,
	
	initComponent: function () {

		
	this.section_details = new TheaterTool.view.tabPanel.persons.PersonTabDetails({sourceID: this.sourceID});

	//this.sourcesSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesSection({sourceID: this.sourceID});

	this.section_xml = new TheaterTool.view.tabPanel.persons.PersonTabXML({dbkey: this.dbkey});
	this.items = [
			
			this.section_details,
		//this.sourcesSection,
		this.section_xml
			
			
    ]

    	this.callParent();
	}
});