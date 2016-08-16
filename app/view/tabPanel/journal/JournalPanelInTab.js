Ext.define('TheaterTool.view.tabPanel.journal.JournalPanelInTab', {
	extend: 'Ext.tab.Panel',

	border: true,

	flex:1,
	bodyPadding:3,

	regieName: null, 
	
	section_xml: null,
	section_details: null,
	
	initComponent: function () {

		
	this.section_details = new TheaterTool.view.tabPanel.journal.JournalTabDetails({sourceID: this.sourceID});

	this.section_xml = new TheaterTool.view.tabPanel.journal.JournalTabXML({regieName: this.regieName});
	this.items = [
			
			this.section_details,
		this.section_xml
			
			
    ]

    	this.callParent();
	}
});