Ext.define('TheaterTool.view.tabPanel.HTTabPanel', {
    extend: 'Ext.tab.Panel',
    requires:[
    'Ext.util.History'],
    
    id: 'tabpanel',
    
    defaults: {
        autoScroll: true
    },
    
    collapsible: false,
    region: 'center',
    cls: 'navigationTabPanel',
    bodyCls: 'navigationTabPanelBody',
    flex: 1,
    border: false,
    style: {
        borderLeft: '1px solid lightgray'
    },
    
    
    initComponent: function () {
        
        var me = this;
        Ext.History.init();
        var tokenDelimiter = ':';
        /*var win = new TheaterTool.view.main.InformationDialog();
        win.show();*/
        
        me.items =[
        //win
        ],
        
        me.listeners = {
            tabchange: function (tabPanel, tab) {
                var tabs =[],
                ownerCt = tabPanel.ownerCt, oldToken, newToken;
                
                tabs.push(tab.id);
                tabs.push(tabPanel.id);
                
                while (ownerCt && ownerCt.is('tabpanel')) {
                    tabs.push(ownerCt.id);
                    ownerCt = ownerCt.ownerCt;
                }
                
                var newToken = tabs.reverse().join(tokenDelimiter);
                
                var oldToken = Ext.History.getToken();
                
                if (oldToken === null || oldToken.search(newToken) === -1) {
                    console.log('add');
                    Ext.History.add(newToken);
                }
            },
            afterrender: function () {
                Ext.History.on('change', function (token) {
                    var parts, tabPanel, length, i;
                    
                    if (token) {
                        parts = token.split(tokenDelimiter);
                        length = parts.length;
                        console.log(parts);
                          
                        
                        
                        // setActiveTab in all nested tabs
                        for (i = 0; i < length - 1; i++) {
                            Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
                        }
                    }
                    
                   
                });
                
                // This is the initial default state.  Necessary if you navigate starting from the
                // page without any existing history token params and go back to the start state.
                var activeTab1 = Ext.getCmp('tabpanel').getActiveTab();
                console.log(activeTab1);
                if (activeTab1 !== null) {
                    var activeTab2 = activeTab1.getActiveTab();
                   me.tabchange(activeTab1, activeTab2);
                }
            },
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