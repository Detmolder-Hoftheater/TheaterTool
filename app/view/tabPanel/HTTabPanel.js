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
        win],
        
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
            },
            
            
            beforetabchange: function (newCard, oldCard, eOpts) {
                var historyButton = Ext.getCmp('historyButton');
                if (! oldCard.isMenuAdded) {
                    var isFound = me.foundHistoryitem(historyButton.menu.items, oldCard);
                    
                    var menuItem = historyButton.menu.add({
                        text: oldCard.title, icon: oldCard.icon
                    });
                    oldCard.setActiveMenuItemId(menuItem.id);
                    oldCard.setMenuAdded(true);
                } else {
                    oldCard.setMenuAdded(false);
                }
                
                // var isFound = me.foundHistoryitem(historyButton.menu.items, oldCard);
                // if(!isFound){
                //     var menuItem = historyButton.menu.add({text: oldCard.title, icon: oldCard.icon});
                //     oldCard.setActiveMenuItemId(menuItem.id);
                // }
                var toolBar = Ext.getCmp('toolbar');
                toolBar.handleHistoryButtons();
            }
        }
        
        me.callParent()
    },
    
    foundHistoryitem: function (menuItems, card) {
        for (i = 0; i < menuItems.items.length; i++) {
            var existItem = menuItems.items[i];
            if (existItem.text === card.title && existItem.id === card.activeMenuItemId) {
                return true;
            }
        }
        return false;
    },
    
    isItemFoundWithId: function (existItems, dbId, activeMenuItemId) {
        for (i = 0; i < existItems.items.length; i++) {
            var existItem = existItems.items[i];
            if (existItem.items.items[0].dbkey === dbId || existItem.items.items[0].selection === dbId) {
                existItem.setMenuAdded(true);
                this.setActiveTab(existItem);
                existItem.setActiveMenuItemId(activeMenuItemId);
                //this.fireEvent('render', this);
                return true;
            }
        }
        return false;
    },
    
    isItemFound: function (existItems, titletext, activeMenuItemId) {
        for (i = 0; i < existItems.items.length; i++) {
            var existItem = existItems.items[i];
            if (existItem.title === titletext) {
                existItem.setMenuAdded(true);
                this.setActiveTab(existItem);
                existItem.setActiveMenuItemId(activeMenuItemId);
                
                return true;
            }
        }
        return false;
    }
});