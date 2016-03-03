/**
 * Creates class TheaterTool.view.tabPanel.CETabPanel that extend from TheaterTool.view.tabPanel.CETabPanel.
 * @class
 */
Ext.define('TheaterTool.view.navPanel.SearchTabPanel', {
	extend: 'Ext.tab.Panel',
	
	//id: 'cetabpanel',
	
	
	//collapsible: false,
	//region: 'center',
	
	searchTab: null,
	extendSearchTab: null,

border: false,
	
	//minHeight: 205,
	
	//bodyPadding: 3,
	
	
	/**
	 * Create items
	 * @overrides
	 */
	initComponent: function () {
		
		/*this.slursItem = new TheaterTool.view.tabPanel.ControlEventsItem({
			title: 'Slurs',
			id: 'slursitem'
			// icon: 'resources/images/mix_volume.png'
			
		}),*/
		
		
		this.searchTab = new TheaterTool.view.navPanel.SearchTab({
			title: 'Suche'
			//id: 'searchitem'
			//bodyStyle:{"background-color":"#A80016"}
		});
		
		this.extendSearchTab = new TheaterTool.view.navPanel.ExtendSearchTab({
			title: 'Erweitert'
			//id: 'extendsearchitem'
		});
	
	
		this.items =[
		 this.searchTab,
		 this.extendSearchTab
		];
		
		
		
		/*this.dynamsItems = new TheaterTool.view.tabPanel.ControlEventsItem({
			title: 'Dynams',
			id: 'dynamsitem'
			// icon: 'resources/images/mix_volume.png'
		}),
		
		this.dirsItems = new TheaterTool.view.tabPanel.ControlEventsItem({
			title: 'Dirs',
			id: 'dirsitem'
			// icon: 'resources/images/mix_volume.png'
		}),*/
		
		
		this.callParent()
	}
});