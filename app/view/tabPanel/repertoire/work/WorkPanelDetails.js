/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails', {
	extend: 'Ext.panel.Panel',
    

	personSection: null,
	planSection: null,
	detailSection: null,
detailSection_1: null,
	journalSection: null,
	regieSection: null,
	roleSection: null,
	revenueSection: null,
	issueSection: null,
	
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

	workID: null,
	
	
	initComponent: function () {
	
	this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.workID, type:'work'});
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();
	
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection({workID: this.workID});

	this.detailSection_1 = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSectionXML({workID: this.workID});
	
	this.journalSection = new TheaterTool.view.tabPanel.repertoire.work.WorkJournalSection();

 	this.regieSection  = new TheaterTool.view.tabPanel.repertoire.work.WorkRegieSection();

	this.roleSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRoleSection();

	this.revenueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRevenueSection();

	this.issueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkIssueSection();

	
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
			this.detailSection_1,

			{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 0 10 0'

			},
			this.personSection,		
			this.planSection,			
			this.journalSection,
     		this.regieSection,
			this.roleSection,
			this.issueSection,
			this.revenueSection
			
    ]
    	this.callParent();
	}
});