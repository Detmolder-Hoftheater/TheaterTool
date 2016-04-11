/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcePanel', {
	extend: 'Ext.panel.Panel',
    
	personSection: null,
	detailSection: null,
	overviewSection: null,
	
	layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 3,
				
				/*defaults: {
					frame: true
					
				},*/
				
				border: false,

	sourceID: null,
	werkTitle: null,
	
	
	initComponent: function () {
	
	this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.sourceID, type: 'source'});
		
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({sourceID: this.sourceID});

	if(storeField.indexOf(this.werkTitle) > -1){
		this.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection();
	}

	if(this.overviewSection !== null){
		this.items = [
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Details</b>',
        		margin: '10 10 10 10'

			},
       
			this.detailSection,
			this.overviewSection,			
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 10 10 10'

			},
			this.personSection
    ]
	}
else{
    this.items = [
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Details</b>',
        		margin: '10 10 10 10'

			},
       
			this.detailSection,	
			{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 10 10 10'

			},
			this.personSection
    ]
}
    	this.callParent();
	}
});