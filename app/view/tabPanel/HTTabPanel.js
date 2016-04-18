/**
 * Creates class TheaterTool.view.tabPanel.CETabPanel that extend from TheaterTool.view.tabPanel.CETabPanel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.HTTabPanel', {
	extend: 'Ext.tab.Panel',
	
	defaults: {
		autoScroll: true
		
	},


bodyPadding: 1,
	
	//id: 'cetabpanel',
	
	//flex: 4,
	
	collapsible: false,
	region: 'center',
	
	
border:false,
bodyBorder: false,
   
	//bodyPadding: 3,

 split: false,
	

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