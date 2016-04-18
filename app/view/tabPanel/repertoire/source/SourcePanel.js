/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
	extend: 'Ext.panel.Panel',
    
	personSection: null,
	detailSection: null,
	overviewSection: null,
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
				
				border: false,

	sourceID: null,
	werkTitle: null,
	
	
	initComponent: function () {
	
	this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.sourceID, type: 'source'});
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({sourceID: this.sourceID});

	this.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSectionXML({sourceID: this.sourceID});

	if(storeField.indexOf(this.werkTitle) > -1){
		this.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection();
	}

	if(this.overviewSection !== null){
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
			this.detailSection_xml,
			this.overviewSection,			
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 0 10 0'

			},
			this.personSection
    ]
	}
else{
    this.items = [
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Details</b>',
        		margin: '0 0 10 0'

			},
       
			this.detailSection,	
			{
        		html: '<img src="resources/images/Download.png" style="width:17px;height:17px;">',
				border: false,
				margin: '0 0 -19 70'
			},
			this.detailSection_xml,
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 0 10 0'

			},
			this.personSection
    ]
}
    	this.callParent();
	}
});