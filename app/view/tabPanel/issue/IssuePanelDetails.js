/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.issue.IssuePanelDetails', {
	//extend: 'Ext.panel.Panel',
    extend: 'Ext.tab.Panel',
    
	flex: 1,
border: false,
//bodyPadding:15,

	personSection: null,
	planSection: null,
	detailSection: null,
detailSection_1: null,
	journalSection: null,
	regieSection: null,
	roleSection: null,
	revenueSection: null,
	issueSection: null,
	
	/*layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
				
				bodyPadding: 15,
				
				/\*defaults: {
					frame: true
				},*\/
				
				border: false,*/

	issueName: null,
	year: null,
	
	
	initComponent: function () {

var me = this;

	this.detailSection = new TheaterTool.view.tabPanel.issue.IssueTextSection({issueName: me.issueName, year: me.year});

	this.detailSection_1 = new TheaterTool.view.tabPanel.issue.XMLSectionIssue({issueName: me.issueName, year: me.year});
	
    this.items = [
			/*{
				xtype: 'label',
        		html: '<b style="color:gray;">Übersicht</b>',
        		margin: '0 0 10 0'

			},*/
			this.detailSection,

			/*{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '0 0 -11 0'
			},*/
			this.detailSection_1

			/*{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 0 10 0'

			}*/
			
    ]
    	this.callParent();
	}
});