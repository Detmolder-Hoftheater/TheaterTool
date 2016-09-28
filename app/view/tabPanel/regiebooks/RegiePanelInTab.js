Ext.define('TheaterTool.view.tabPanel.regiebooks.RegiePanelInTab', {
	extend: 'Ext.tab.Panel',

	border: true,

	flex:1,
	bodyPadding:3,

	regieName: null, 
	
	section_xml: null,
	section_details: null,
	
	initComponent: function () {

		
	this.section_details = new TheaterTool.view.tabPanel.regiebooks.RegieTabDetails({regieName: this.regieName});

	this.section_xml = new TheaterTool.view.tabPanel.regiebooks.RegieTabXML({regieName: this.regieName});
	this.items = [
			
			this.section_details,
		this.section_xml
			
			
    ]

    	this.callParent();
	}
});