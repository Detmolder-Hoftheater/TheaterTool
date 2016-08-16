Ext.define('TheaterTool.view.tabPanel.abo.AboPanelInTab', {
	extend: 'Ext.tab.Panel',

	border: true,

	flex:1,
	bodyPadding:3,

	regieName: null, 
	
	section_xml: null,
	section_details: null,
	
	initComponent: function () {

		
	this.section_details = new TheaterTool.view.tabPanel.abo.AboTabDetails({sourceID: this.sourceID});

	this.section_xml = new TheaterTool.view.tabPanel.abo.AboTabXML({regieName: this.regieName});
	this.items = [
			
			this.section_details,
		this.section_xml
			
			
    ]

    	this.callParent();
	}
});