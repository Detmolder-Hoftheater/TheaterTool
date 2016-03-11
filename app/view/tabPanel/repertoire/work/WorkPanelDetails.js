/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails', {
	extend: 'Ext.panel.Panel',
    
	
	personSection: null,
	planSection: null,
	detailSection: null,
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
				
				bodyPadding: 3,
				
				/*defaults: {
					frame: true
				},*/
				
				border: false,

	workID: null,
	
	
	initComponent: function () {
	
	this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.workID});
	
	this.planSection = new TheaterTool.view.tabPanel.repertoire.work.WorkPlanSection();
	
	this.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection({workID: this.workID});
	
	this.journalSection = new TheaterTool.view.tabPanel.repertoire.work.WorkJournalSection();

 	this.regieSection  = new TheaterTool.view.tabPanel.repertoire.work.WorkRegieSection();

	this.roleSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRoleSection();

	this.revenueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkRevenueSection();

	this.issueSection = new TheaterTool.view.tabPanel.repertoire.work.WorkIssueSection();

	
    this.items = [
       
			this.detailSection,
			this.planSection,
			this.personSection,
			this.journalSection,
     		this.regieSection,
			this.roleSection,
			this.issueSection,
			this.revenueSection
			
    ]
    	this.callParent();
	}
});