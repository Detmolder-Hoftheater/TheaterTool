Ext.define('TheaterTool.view.tabPanel.HTTabPanel', {
	extend: 'Ext.tab.Panel',
	
	id: 'tabpanel',
	
	defaults: {
		autoScroll: true
		
	},
	 style: {
      
      borderTop: '3px solid #A80016'
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
	
	   var me = this;

		var win = new TheaterTool.view.main.InformationDialog();
				win.show();
	
		me.items =[
		win
		],
		
		me.listeners = {
            render: function () {
                //if (Ext.browser.is('Firefox')) {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        var tabpanel = tab.up('tabpanel');
                        tabpanel.setActiveTab(idx);
                    });
                });
                //}
            }
        }
		
		me.callParent()
	},
	
	isItemFound: function (existItems, titletext) {
        for (i = 0; i < existItems.items.length; i++) {
            var existItem = existItems.items[i];
            if (existItem.title === titletext) {
                this.setActiveTab(existItem);
                this.fireEvent('render', this);
                return true;
            }
        }
        return false;
    }
    
});