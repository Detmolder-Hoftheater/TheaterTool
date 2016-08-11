Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
	extend: 'Ext.tab.Panel',

 /*defaults: {
		autoScroll: true
		
	},*/
    autoScroll: true,
	
	section_xml: null,
//flex:1,
	
	/*layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},*/
				
				//bodyPadding: 15,
				
				/*defaults: {
					frame: true
					
				},*/
				
				border: false,
//bodyPadding: 15,
	sourceID: null,
	werkTitle: null,
	
	
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