Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
	extend: 'Ext.tab.Panel',

    //autoScroll: true,
	
	border: true,

	flex:1,
	bodyPadding:3,

	sourceID: null,

	section_xml: null,
	
	initComponent: function () {

		
	//this.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({sourceID: this.sourceID});

	//this.sourcesSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesSection({sourceID: this.sourceID});

this.section_xml = new TheaterTool.view.tabPanel.persons.PersonTabXML({sourceID: this.sourceID});
this.items = [
			
			//this.detailSection,
//this.sourcesSection,
this.section_xml
			
			
    ]

    	this.callParent();
	}
});