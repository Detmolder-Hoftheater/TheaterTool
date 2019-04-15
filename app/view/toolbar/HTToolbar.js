Ext.define('TheaterTool.view.toolbar.HTToolbar', {
    extend: 'Ext.panel.Panel',
    
    requires:[
    'Ext.tip.*',
    'Ext.Button',
    'Ext.window.MessageBox'],
    
    id: 'toolbar',
    
    style: {
        borderLeft: '3px solid #F2EEE1',
        borderTop: '5px solid #F2EEE1'
    },
    bodyBorder: false,
    border: false,
    
    htPanel: null,
    searchField: null,
    searchFilterButton: null,
    
    initComponent: function () {
        
        var me = this;
        
        this.searchFilterButton = this.creatButtonWithMenu();
        
        this.searchField = this.createSearchField(this.searchFilterButton);
        
        this.tbar = new Ext.Toolbar({
            height: 33,
            style: {
                background: '#F2EEE1'
            },
            
            items:[ {
                xtype: 'component',
                margin: '0 0 0 3',
                autoEl: {
                    tag: 'a',
                    href: 'http://hoftheater-detmold.de',
                    html: '<img src="resources/images/TheaterBild.tif" style="width:27px;height:27px;padding:2px;border:thin solid #CCC8C2; border-radius: 50%" title="http://hoftheater-detmold.de">',
                    target: "_blank"
                }
            }, {
                
                xtype: 'label',
                html: '<font style="color:#CCC1C2; font-size: 14px;">Theatre Tool</font>',
                margin: '0 0 0 5'
            },
            '->', {
                xtype: 'button',
                hidden: true,
                border: false,
                glyph: null,
                icon: 'resources/images/page-prev-disabled.gif',
                id: 'prevHistoryButton',
                disabled: true,
                listeners: {
                    click: function () {
                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                        var selectedTab = navTreeGlobal.getActiveTab();
                        var openTabs = navTreeGlobal.items;
                        
                        var historyButton = Ext.getCmp('historyButton');
                        var menuItems = historyButton.menu.items;
                        var itemToSelect = null;
                        for (i = 0; i < menuItems.items.length; i++) {
                            var existItem = menuItems.items[i];
                            console.log(i);
                            if (existItem.text === selectedTab.title && i > 0 && selectedTab.activeMenuItemId === existItem.id) {
                                
                                itemToSelect = menuItems.items[i -1];
                                
                                break;
                            }
                        }
                        if (itemToSelect !== null) {
                            for (i = 0; i < openTabs.items.length; i++) {
                                var openTab = openTabs.items[i];
                                console.log(itemToSelect);
                                console.log(openTab);
                                if (openTab.title === itemToSelect.text) {
                                    openTab.setMenuAdded(true);
                                    navTreeGlobal.setActiveTab(openTab);
                                    openTab.setActiveMenuItemId(itemToSelect.id);
                                }
                            }
                        }
                        me.handleHistoryButtons();
                    }
                }
            }, {
                xtype: 'button',
                id: 'historyButton',
                hidden: true,
                selection: null,
                text: '<span style="font-family:Tahoma; color:gray;">Verlauf</span>',
                margin: '0 3 0 3',
                menu: {
                    xtype: 'menu',
                    items:[],
                    listeners: {
                        click: function (menu, item, e, eOpts) {
                            var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                            var existItems = navTreeGlobal.items;
                            var isFoundItem = navTreeGlobal.isItemFound(existItems, item.text, item.id);
                            menu.hide();
                            me.handleHistoryButtons();
                            if (isFoundItem) {
                            }
                        }
                    }
                },
                listeners: {
                    click: function () {
                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                        var selectedTab = navTreeGlobal.getActiveTab();
                        var menuItems = this.menu.items;
                        for (i = 0; i < menuItems.items.length; i++) {
                            var existItem = menuItems.items[i];
                            if (existItem.text === selectedTab.title && selectedTab.activeMenuItemId === existItem.id) {
                                existItem.focus();
                                selectedTab.setActiveMenuItemId(existItem.id);
                            }
                        }
                        me.handleHistoryButtons();
                    }
                }
            }, {
                xtype: 'button',
                id: 'naxtHistoryButton',
                hidden: true,
                disabled: true,
                border: false,
                icon: 'resources/images/page-next-disabled.gif',
                listeners: {
                    click: function () {
                        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                        var selectedTab = navTreeGlobal.getActiveTab();
                        var openTabs = navTreeGlobal.items;
                        
                        var historyButton = Ext.getCmp('historyButton');
                        var menuItems = historyButton.menu.items;
                        var itemToSelect = null;
                        for (i = 0; i < menuItems.items.length; i++) {
                            var existItem = menuItems.items[i];
                            
                            if (existItem.text === selectedTab.title && i < menuItems.items.length && selectedTab.activeMenuItemId === existItem.id) {
                                
                                itemToSelect = menuItems.items[i + 1];
                                
                                break;
                            }
                        }
                        if (itemToSelect !== undefined) {
                            for (i = 0; i < openTabs.items.length; i++) {
                                var openTab = openTabs.items[i];
                                if (openTab.title === itemToSelect.text) {
                                    openTab.setMenuAdded(true);
                                    navTreeGlobal.setActiveTab(openTab);
                                    openTab.setActiveMenuItemId(itemToSelect.id);
                                }
                            }
                        }
                        me.handleHistoryButtons();
                    }
                }
            },
           
            '->',
            
            this.searchFilterButton,
            
            this.searchField,
            '->', {
                xtype: 'button',
                text: '<span style="font-family:Tahoma; color:gray;">Hilfe</span>',
                margin: '0 5 0 0',
                
                menu:[ {
                    text: '<span style="font-family:Tahoma; color:gray;">Daten Relation</span>',
                    
                    listeners: {
                        
                        click: function (item, e, eOpts) {
                            
                            var win = new TheaterTool.view.toolbar.DatenRelationWindow();
                            win.show();
                        }
                    }
                }, {
                    xtype: 'component',
                     autoEl: {
                        tag: 'a',
                        href: 'https://github.com/Detmolder-Hoftheater/TheaterTool/tree/master/add/docu',
                        html: 'Dokumentation',
                        target: "_blank"
                    }
                    
                }]
                
            }]
        });
        
        this.callParent()
    },
    
    setViewPanel: function (htPanel) {
        this.htPanel = htPanel;
    },
    
    creatButtonWithMenu: function () {
        var me = this;
        var menuButton = Ext.create('Ext.button.Button', {
            
            xtype: 'button',
            text: '<span style="font-family:Tahoma; color:gray;">Suchfilter</span>',
            
            menu:[ {
                text: '<span style="font-family:Tahoma; color:gray;">Werke</span>',
                icon: 'resources/images/BooksVert-17.png',
                listeners: {
                    
                    click: function (item, e, eOpts) {
                        
                        menuButton.setText(item.text);
                    }
                }
            }, {
                text: '<span style="font-family:Tahoma; color:gray;">Personen</span>',
                icon: 'resources/images/Mask-19.png',
                listeners: {
                    
                    click: function (item, e, eOpts) {
                        
                        
                        menuButton.setText(item.text);
                    }
                }
            }]
        });
        
        return menuButton;
    },
    
    createSearchField: function (searchFilterButton) {
        
        var searchField = Ext.create('Ext.form.field.Text', {
            labelWidth: 0,
            
            fieldStyle: 'padding:1px;border:#CCC8C2;',
            triggers: {
                clear: {
                    weight: 0,
                    cls: Ext.baseCSSPrefix + 'form-clear-trigger',
                    hidden: true,
                    handler: 'onClearClick',
                    scope: 'this'
                },
                search: {
                    weight: 1,
                    cls: Ext.baseCSSPrefix + 'form-search-trigger',
                    handler: 'onSearchClick',
                    scope: 'this'
                }
            },
            
            hasSearch: false,
            paramName: 'query',
            
            initComponent: function () {
                var me = this;
                me.callParent(arguments);
                me.on('specialkey', function (f, e) {
                    if (e.getKey() == e.ENTER) {
                        me.onSearchClick();
                    }
                });
            },
            
            onClearClick: function () {
                var me = this,
                activeFilter = me.activeFilter;
                
                if (activeFilter) {
                    me.setValue('');
                    me.activeFilter = null;
                    me.getTrigger('clear').hide();
                    me.updateLayout();
                }
            },
            
            onSearchClick: function () {
                var me = this,
                value = me.getValue();
                searchType = searchFilterButton.getText();
                if (searchType === '<span style="font-family:Tahoma; color:gray;">Suchfilter</span>') {
                    Ext.MessageBox.show({
                        title: 'Suche',
                        msg: 'Bitte wählen Sie den Suchfilter aus!',
                        buttons: Ext.MessageBox.OK
                    });
                    return;
                }
                var historyButton = Ext.getCmp('historyButton');
                
                var menuItem = historyButton.menu.add({
                    text: '<font style="font-family:Tahoma; color:gray;">' + searchType + ': ' + value + '</font>', icon: 'resources/images/Search-16.png', selection: value
                });
                
                var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="font-family:Tahoma; color:gray;">' + searchType + ': ' + value + '</font>',
                    icon: 'resources/images/Search-16.png'
                });
                var regieDetails = new TheaterTool.view.tabPanel.search.SearchPanelInTab({
                    searchValue: value, type: searchType
                });
                repertoireTab.add(regieDetails);
                
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                
                var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                navTreeGlobal.add(repertoireTab);
                navTreeGlobal.setActiveTab(repertoireTab);
                navTreeGlobal.fireEvent('render', navTreeGlobal);
                
                historyButton.setDisabled(false);
                var toolBar = Ext.getCmp('toolbar');
                toolBar.handleHistoryButtons();
                
                if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
                    Ext.getCmp('infoDialog').close();
                }
                
                
                
                if (value.length > 0) {
                    me.activeFilter = new Ext.util.Filter({
                        property: me.paramName,
                        value: value
                    });
                    me.getTrigger('clear').show();
                    me.updateLayout();
                }
            }
        });
        
        return searchField;
    },
    
    foundHistoryitem: function (menuItems, titletext) {
        for (i = 0; i < menuItems.items.length; i++) {
            var existItem = menuItems.items[i];
            if (existItem.text === titletext) {
                return true;
            }
        }
        return false;
    },
    
    foundHistoryitemWithId: function (menuItems, dbKey) {
        for (i = 0; i < menuItems.items.length; i++) {
            var existItem = menuItems.items[i];
            if (existItem.dbkey === dbKey) {
                return true;
            }
        }
        return false;
    },
    
    handleHistoryButtons: function () {
        var prevHistoryButton = Ext.getCmp('prevHistoryButton');
        var naxtHistoryButton = Ext.getCmp('naxtHistoryButton');
        var historyButton = Ext.getCmp('historyButton');
        var menuItems = historyButton.menu.items;
        var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
        var selectedTab = navTreeGlobal.getActiveTab();
        if (selectedTab !== null) {
            for (i = 0; i < menuItems.items.length; i++) {
                var existItem = menuItems.items[i];
                
                if (existItem.text === selectedTab.title && existItem.id === selectedTab.activeMenuItemId) {
                    if (i === 0) {
                        if (menuItems.items.length === 1) {
                            prevHistoryButton.setDisabled(true);
                            naxtHistoryButton.setDisabled(true);
                        } else {
                            prevHistoryButton.setDisabled(true);
                            naxtHistoryButton.setDisabled(false);
                        }
                    } else if (i === menuItems.items.length -1) {
                        if (menuItems.items.length === 1) {
                            prevHistoryButton.setDisabled(true);
                            naxtHistoryButton.setDisabled(true);
                        } else {
                            prevHistoryButton.setDisabled(false);
                            naxtHistoryButton.setDisabled(true);
                        }
                    } else {
                        prevHistoryButton.setDisabled(false);
                        naxtHistoryButton.setDisabled(false);
                    }
                }
            }
        }
    }
});