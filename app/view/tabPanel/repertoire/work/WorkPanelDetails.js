/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails', {
	extend: 'Ext.tab.Panel',
    
    
	flex: 1,
border: false,
//bodyPadding:15,
	
	detailSection: null,
	detailSection_1: null,
	
	/*border: false,
	autoScroll: true,*/

	workID: null,
	
	
	initComponent: function () {

var me = this;

/*Ext.Ajax.request({
           // url: 'data/Output_Exist.xql',
 			//url: 'resources/xql/test_Exist.xql',
			url: 'resources/xql/getWorkOverview.xql',
            method: 'GET',
            params: {
                workID: me.workID
            },
            success: function(response){

					var json = jQuery.parseJSON(response.responseText);
					
					console.log(json);	*/
	
	
	
	me.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection({workID: me.workID});

	me.detailSection_1 = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSectionXML({workID: me.workID});
	
	

	
    me.items = [
			/*{
				xtype: 'label',
        		html: '<b style="color:gray;">Übersicht</b>',
        		margin: '0 0 10 0'

			},*/
			me.detailSection,

			/*{
        		html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
				border: false,
				margin: '0 0 -11 0'
			},*/
			me.detailSection_1

			/*{
				xtype: 'label',
        		html: '<b style="color:gray;">Referenzen</b>',
        		margin: '10 0 10 0'

			},*/
			/*this.personSection,		
			this.planSection,			
			this.journalSection,
     		this.regieSection,
			this.roleSection,
			this.issueSection,
			this.revenueSection*/
			
    ]
/*}        
        })*/
    	me.callParent();
	}
});