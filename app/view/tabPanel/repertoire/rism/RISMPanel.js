/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMPanel', {
	extend: 'Ext.panel.Panel',
    
	
	detailSection: null,
	detailSection_xml: null,
	
	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 15,
				
				/*defaults: {
					frame: true
				},*/
				
	
/*bodyBorder: false,*/
	border: false,
	
	initComponent: function () {
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSection();

	this.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSectionXML({sourceID: this.sourceID});
	
    this.items = [
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Details</b>',
        		margin: '0 0 10 0'

			},
       
			this.detailSection,
			{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '0 0 -11 0'
			},
			this.detailSection_xml
			
       
    ]
    	this.callParent();
	}
});