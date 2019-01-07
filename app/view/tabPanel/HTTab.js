Ext.define('TheaterTool.view.tabPanel.HTTab', {
    extend: 'Ext.panel.Panel',
    requires:[ 'Ext.layout.container.VBox'],
    flex: 1,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    bodyPadding: 10,
    
    border: false,
    bodyBorder: true,
    
    closable: true,
    
    activeMenuItemId: null,
    
    autoScroll: true,
    
    repertoireNavigation: null,
    repertoireDetails: null,
    isMenuAdded: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.listeners = {
            beforeclose: function (panel, eOpts) {
                var historyButton = Ext.getCmp('historyButton');
                var menuItems = historyButton.menu.items;
                var itemsToDelete = new Array();
                for (i = 0; i < menuItems.items.length; i++) {
                    var existItem = menuItems.items[i];
                    
                    if (existItem.text === panel.title) {
                        itemsToDelete.push(existItem);
                    }
                }
                for (i = 0; i < itemsToDelete.length; i++) {
                    var itemToDelete = itemsToDelete[i];
                    historyButton.menu.remove(itemToDelete, true);
                }
                if (menuItems.items.length === 0) {
                    historyButton.setDisabled(true);
                }
                var toolBar = Ext.getCmp('toolbar');
                toolBar.handleHistoryButtons();
                var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                var openTabs = navTreeGlobal.items;
                for (i = 0; i < openTabs.items.length; i++) {
                    var openTab = openTabs.items[i];
                    openTab.setMenuAdded(true);
                }
            }
        }
        
        this.callParent();
    },
    
    setActiveMenuItemId: function (activeMenuItemId) {
        this.activeMenuItemId = activeMenuItemId;
    },
    
    setMenuAdded: function (isMenuAdded) {
        this.isMenuAdded = isMenuAdded;
    }
});