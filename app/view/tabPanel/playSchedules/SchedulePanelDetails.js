/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelDetails', {
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

	month: null,
	year: null,
	
	
	initComponent: function () {

var me = this;

	this.detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({month: me.month, year: me.year});

	this.detailSection_1 = new TheaterTool.view.tabPanel.playSchedules.XMLSectionSchedule({workID: this.workID});
	
    this.items = [
//			{
//				xtype: 'label',
//        		html: '<b style="color:gray;">Details</b>',
//        		margin: '0 0 10 0'
//
//			},
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

			}
			
    ]
    	this.callParent();
	}
});