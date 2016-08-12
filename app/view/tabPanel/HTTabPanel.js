/**
 * Creates class TheaterTool.view.tabPanel.CETabPanel that extend from TheaterTool.view.tabPanel.CETabPanel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.HTTabPanel', {
	extend: 'Ext.tab.Panel',
	
	defaults: {
		autoScroll: true
		
	},
	
	collapsible: false,
	region: 'center',
	
	flex: 1,
/*border:false,
bodyBorder: false,
   
 split: false,*/
	

	/**
	 * Create items
	 * @overrides
	 */
	initComponent: function () {

		var win = new TheaterTool.view.main.InformationDialog();
				win.show();
	
		this.items =[
		win
		],
		
		this.callParent()
	}
});