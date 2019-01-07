/*var store = Ext.create('Ext.data.TreeStore', {

root: {
text: 'Start',
children:[ {
text: 'Spielbetrieb',
icon: 'resources/images/Library-17.png',
expanded: true,
children:[
{
text: 'Programm',
icon: 'resources/images/Magazine-17.png',
children:[
{
leaf: true, text: '<font style="color:gray;">Aufführungen</font>',
icon: 'resources/images/Time-17.png'
},
{
leaf: true, text: 'Theaterzettel',
icon: 'resources/images/Day-17.png'
}]
},
{
text: 'Presse',
icon: 'resources/images/Presse-16.png',
children:[ {
leaf: true, text: 'Linksammlung',
icon: 'resources/images/Presse-16.png'
/\*icon: 'resources/images/Link-15.png'*\/
},
{
leaf: true, text: 'Theaterjournal',
icon: 'resources/images/Presse-16.png'
/\*icon: 'resources/images/Dossier-17.png'*\/
}]
}]
},
{
text: 'Verwaltung',
icon: 'resources/images/portfolio-17.png',
expanded: true,
children:[
{
text: 'Finanzwesen',
icon: 'resources/images/Coins-17.png',
// expanded: true,
children:[
{
{
leaf: true,
text: 'Abonnement',
icon: 'resources/images/Ticket-14.png'
},
{
leaf: true, text: 'Gagenbücher',
icon: 'resources/images/Gift-17.png'
}]
},
/\*{ leaf:true, text: '<font style="color:gray;">Dekoration</font>',
icon: 'resources/images/theatre.png' },*\/ {
text: 'Regiebücher',
icon: 'resources/images/Crown-17.png',
children:[]
},
{
leaf: true, text: 'Rollen- & Kostümbücher',
icon: 'resources/images/carnival.png'
},
{
leaf: true, text: '<font style="color:gray;">Theaterberufe</font>',
icon: 'resources/images/theatreB.png'
}]
}]
}
})
 */
Ext.define('TheaterTool.view.navPanel.NavigationTreePublic', {
    extend: 'Ext.tree.Panel',
    
    reserveScrollbar: true,
    id: 'NavigationTreeGlobal',
    useArrows: true,
    rootVisible: false,
    store: null,
    
    tabPanel: null,
    
    border: false,
    bodyborder: false,
    bodyPadding: 3,
    
    createNavigationItems: function () {
        var me = this;
        
        console.log(projectNavType);
        
        var navTreeStoreRoot = me.store.getRootNode();
        var repChild_0 = null;
        var repChild_1 = null;
        
        if (projectNavType === 'theatre') {
            navTreeStoreRoot.appendChild({
                text: GUI_NAMES.root_1,
                icon: 'resources/images/Library-17.png',
                expanded: true,
                children:[]
            });
            navTreeStoreRoot.appendChild({
                text: GUI_NAMES.root_2,
                icon: 'resources/images/portfolio-17.png',
                expanded: true,
                children:[]
            });
            repChild_0 = navTreeStoreRoot.childNodes[0];
            repChild_1 = navTreeStoreRoot.childNodes[1];
        } else {
            repChild_0 = navTreeStoreRoot;
            repChild_1 = navTreeStoreRoot;
        }
        
        for (var i = 0; i < CUS_ITEMS.length; i++) {
            var customItem = CUS_ITEMS[i];
            Ext.Ajax.request({
                url: 'resources/xql/getCustomItems.xql',
                method: 'GET',
                params: {
                    path: customItem.data.dbPath,
                    number: i
                },
                success: function (response, options, i) {
                    var json = jQuery.parseJSON(response.responseText);
                    var customItem = CUS_ITEMS[json.number];
                    var navItem = navTreeStoreRoot.appendChild({
                        text: customItem.data.dbValue,
                        icon: Ext.BLANK_IMAGE_URL,
                        children:[]
                    });
                    for (j = 0; j < json.names.length; j++) {
                        var regName = json.names[j];
                        var directoryFullName = regName.split('/');
                        var directoryName = directoryFullName[directoryFullName.length -1].split('.');
                        navItem.appendChild({
                            leaf: true, text: directoryName[0],
                            doctype: directoryName[1],
                            icon: Ext.BLANK_IMAGE_URL,
                            dbPath: regName
                        });
                    }
                }
            });
        }
        
        if (dbPathsMap.get('works') !== undefined) {
            var repChild = repChild_0.appendChild({
                text: GUI_NAMES.repertoire,
                icon: 'resources/images/Folder-17.png',
                children:[ {
                    leaf: true, text: GUI_NAMES.abc_1, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_2, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_3, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_4, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_5, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_6, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_7, icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_8, icon: 'resources/images/BooksVert-17.png'
                }]
            });
        }
        if (dbPathsMap.get('playschedule') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getScheduleItems.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('playschedule')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    var playscheduleItem = repChild_0.appendChild({
                        text: GUI_NAMES.schedul,
                        icon: 'resources/images/Calendar-17.png',
                        children:[]
                    });
                    
                    var temp = new Array();
                    for (i = 0; i < json.names.length; i++) {
                        
                        var regName = json.names[i];
                        if (temp.indexOf(regName) === -1) {
                            temp.push(regName);
                            var directoryName = regName.split('/');
                            playscheduleItem.appendChild({
                                leaf: true, text: directoryName[directoryName.length -1],
                                icon: 'resources/images/Calendar-17.png'
                            });
                        }
                    }
                }
            });
            
            //var navTreeStoreRoot = me.store.getRootNode();
        }
        if (dbPathsMap.get('representation') !== undefined) {
            //var navTreeStoreRoot = me.store.getRootNode();
            var representationItem = repChild_0.appendChild({
                text: GUI_NAMES.repres,
                icon: 'resources/images/Time-17.png',
                children:[]
            });
            // TODO
        }
        
        if (dbPathsMap.get('billOfFare') !== undefined) {
            //var navTreeStoreRoot = me.store.getRootNode();
            var billOfFareItem = repChild_0.appendChild({
                text: GUI_NAMES.bill,
                icon: 'resources/images/Day-17.png',
                children:[]
            });
            // TODO
        }
        
        if (dbPathsMap.get('persons') !== undefined) {
            //var navTreeStoreRoot = me.store.getRootNode();
            repChild_0.appendChild({
                text: GUI_NAMES.persons,
                icon: 'resources/images/Mask-19.png',
                expanded: true,
                children:[ {
                    leaf: true, text: GUI_NAMES.abc_1, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_2, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_3, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_4, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_5, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_6, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_7, icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: GUI_NAMES.abc_8, icon: 'resources/images/Mask-19.png'
                }]
            });
        }
        if (dbPathsMap.get('revenue') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getRevenueItems.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('revenue')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    var playscheduleItem = repChild_1.appendChild({
                        text: GUI_NAMES.rev,
                        icon: 'resources/images/MoneyBox-17.png',
                        children:[]
                    });
                    
                    var temp = new Array();
                    for (i = 0; i < json.names.length; i++) {
                        
                        var regName = json.names[i];
                        if (temp.indexOf(regName) === -1) {
                            temp.push(regName);
                            var directoryName = regName.split('/');
                            playscheduleItem.appendChild({
                                leaf: true, text: directoryName[directoryName.length -1],
                                icon: 'resources/images/MoneyBox-17.png'
                            });
                        }
                    }
                }
            });
            /* var playscheduleItem = navTreeStoreRoot.childNodes[1].appendChild({
            text: GUI_NAMES.rev, //einnahmen
            icon: 'resources/images/MoneyBox-17.png',
            children:[]
            });
            for (i = projectStartYear; i <= projectEndYear; i++) {
            playscheduleItem.appendChild({
            leaf: true,
            text: i,
            icon: 'resources/images/MoneyBox-17.png'
            });
            }*/
        }
        if (dbPathsMap.get('expenses') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getExpensesItems.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('expenses')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    var playscheduleItem = repChild_1.appendChild({
                        text: GUI_NAMES.exp,
                        icon: 'resources/images/MoneyTransfer-17.png',
                        children:[]
                    });
                    
                    var temp = new Array();
                    for (i = 0; i < json.names.length; i++) {
                        
                        var regName = json.names[i];
                        if (temp.indexOf(regName) === -1) {
                            temp.push(regName);
                            var directoryName = regName.split('/');
                            playscheduleItem.appendChild({
                                leaf: true, text: directoryName[directoryName.length -1],
                                icon: 'resources/images/MoneyTransfer-17.png'
                            });
                        }
                    }
                }
            });
            //            var playscheduleItem = navTreeStoreRoot.childNodes[1].appendChild({
            //                text: GUI_NAMES.exp, //ausgaben
            //                icon: 'resources/images/MoneyTransfer-17.png',
            //                children:[]
            //            });
            //            for (i = projectStartYear; i <= projectEndYear; i++) {
            //                playscheduleItem.appendChild({
            //                    leaf: true,
            //                    text: i,
            //                    icon: 'resources/images/MoneyTransfer-17.png'
            //                });
            //            }
        }
        if (dbPathsMap.get('regie') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getRegieMenu.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('regie')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    
                    var directionItem = repChild_1.appendChild({
                        text: GUI_NAMES.direction,
                        icon: 'resources/images/Crown-17.png',
                        children:[]
                    });
                    
                    for (i = 0; i < json.names.length; i++) {
                        var dName = json.names[i];
                        directionItem.appendChild({
                            leaf: true, text: dName,
                            icon: 'resources/images/Crown-17.png'
                        });
                    }
                }
            });
        }
        if (dbPathsMap.get('rolebook') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getRollenKostuemMenu.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('rolebook')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    
                    var directionItem = repChild_1.appendChild({
                        text: GUI_NAMES.rolebook,
                        icon: 'resources/images/carnival.png',
                        children:[]
                    });
                    
                    for (i = 0; i < json.names.length; i++) {
                        var dName = json.names[i];
                        directionItem.appendChild({
                            leaf: true, text: dName,
                            icon: 'resources/images/carnival.png'
                        });
                    }
                }
            });
        }
        
        /*Ext.Ajax.request({
        url: 'resources/xql/getRollenKostuemMenu.xql',
        method: 'GET',
        params: {
        path: dbPathsMap.get('role')
        },
        success: function (response, options) {
        var json = jQuery.parseJSON(response.responseText);
        
        //console.log(json);
        var navTreeStoreRoot = me.store.getRootNode();
        var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[2];
        for (i = 0; i < json.names.length; i++) {
        var regName = json.names[i];
        regieMenu.appendChild({
        leaf: true, text: regName,
        icon: 'resources/images/carnival.png'
        });
        }
        }
        });*/
        if (dbPathsMap.get('gage') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getGagenMenu.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('gage')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    // var navTreeStoreRoot = me.store.getRootNode();
                    var gegeItem = navTreeStoreRoot.childNodes[1].appendChild({
                        text: GUI_NAMES.feebook,
                        icon: 'resources/images/Gift-17.png',
                        children:[]
                    });
                    
                    //console.log(json);
                    for (i = 0; i < json.names.length; i++) {
                        var regName = json.names[i];
                        gegeItem.appendChild({
                            leaf: true, text: regName,
                            icon: 'resources/images/Gift-17.png'
                        });
                    }
                }
            });
        }
        
        if (dbPathsMap.get('abo') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getAboMenu.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('abo')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    
                    //console.log(json);
                    // var navTreeStoreRoot = me.store.getRootNode();
                    var aboItem = navTreeStoreRoot.childNodes[1].appendChild({
                        text: GUI_NAMES.subs,
                        icon: 'resources/images/Ticket-14.png',
                        children:[]
                    });
                    for (i = 0; i < json.names.length; i++) {
                        var regName = json.names[i];
                        aboItem.appendChild({
                            leaf: true, text: regName,
                            icon: 'resources/images/Ticket-14.png'
                        });
                    }
                }
            });
        }
        if (dbPathsMap.get('journal') !== undefined) {
            Ext.Ajax.request({
                url: 'resources/xql/getJournalMenu.xql',
                method: 'GET',
                params: {
                    path: dbPathsMap.get('journal')
                },
                success: function (response, options) {
                    var json = jQuery.parseJSON(response.responseText);
                    var pressItem = navTreeStoreRoot.childNodes[0].appendChild({
                        text: GUI_NAMES.press,
                        icon: 'resources/images/Presse-16.png',
                        children:[]
                    });
                    for (i = 0; i < json.names.length; i++) {
                        var regName = json.names[i];
                        pressItem.appendChild({
                            leaf: true, text: regName,
                            icon: 'resources/images/Presse-16.png'
                        });
                    }
                }
            });
        }
    },
    
    isItemFound: function (existItems, titletext, activeMenuItemId) {
        for (i = 0; i < existItems.items.length; i++) {
            var existItem = existItems.items[i];
            if (existItem.title === titletext) {
                //console.log(activeMenuItemId);
                //console.log(existItem);
                existItem.setMenuAdded(true);
                this.tabPanel.setActiveTab(existItem);
                existItem.setActiveMenuItemId(activeMenuItemId);
                
                //console.log("Set bei found: "+ activeMenuItemId);
                // console.log(existItem);
                // this.tabPanel.fireEvent('render', this.tabPanel);
                return true;
            }
        }
        return false;
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
    
    initComponent: function () {
        var me = this;
        
        
        me.store = Ext.create('Ext.data.TreeStore', {
            root: {
                text: 'Start',
                children:[]
            }
        });
        
        
        this.listeners = {
            itemclick: function (record, item, index, e, eOpts) {
                
                /*var activeTab = me.tabPanel.getActiveTab();
                console.log(me.tabPanel.getItems());
                var activeTabIndex = me.tabPanel.items.findIndex('id', item.id);
                console.log(activeTabIndex);*/
                /*console.log(record);
                console.log(item);
                console.log(e);
                console.log(eOpts);*/
                
                /*var metaPanel = me.tabPanel.getComponent(item.data.id);
                console.log(metaPanel);*/
                //console.log(me.tabPanel.items);
                /*console.log(eOpts);
                console.log(item);
                
                Ext.getCmp(tabid)*/
                if (item.isExpanded()) {
                    item.collapse();
                } else {
                    item.expand();
                }
                var existItems = me.tabPanel.items;
                var repertoireTab = null;
                var historyButton = Ext.getCmp('historyButton');
                console.log(item.data.text);
                
                if (item.parentNode.data.text === GUI_NAMES.repertoire) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + GUI_NAMES.workTabTailTitle + ': ' + item.data.text + '</font>', icon: 'resources/images/BooksVert-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + GUI_NAMES.workTabTailTitle + ': ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + GUI_NAMES.workTabTailTitle + ': ' + item.data.text + '</font>',
                            icon: 'resources/images/BooksVert-17.png'
                        });
                        
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({
                            selection: item.data.text, navTreetitle: '<font style="color:#A87678;">' + GUI_NAMES.workTabTailTitle + ': ' + item.data.text + '</font>'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.schedul) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + GUI_NAMES.schedul + ': ' + item.data.text + '</font>', icon: 'resources/images/Calendar-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + GUI_NAMES.schedul + ': ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + GUI_NAMES.schedul + ': ' + item.data.text + '</font>',
                            icon: 'resources/images/Calendar-17.png'
                        });
                        var scheduleDetails = new TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab({
                            year: item.data.text
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Aschenbrödel'});
                        repertoireTab.add(scheduleDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === GUI_NAMES.repres) {
                    /*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">Aufführungen</font>',
                    icon: 'resources/images/Time-17.png'
                    });*/
                } else if (item.data.text === GUI_NAMES.bill) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Day-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Day-17.png'
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.zettel.TheaterZettelPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.persons) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + GUI_NAMES.personTabTailTitle + ': ' + item.data.text + '</font>', icon: 'resources/images/Mask-19.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + GUI_NAMES.personTabTailTitle + ': ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + GUI_NAMES.personTabTailTitle + ': ' + item.data.text + '</font>',
                            icon: 'resources/images/Mask-19.png'
                        });
                        var repertoireDetails = new TheaterTool.view.tabPanel.persons.PersonDetailsPanel({
                            selection: item.data.text, navTreetitle: '<font style="color:#A87678;">' + GUI_NAMES.personTabTailTitle + ': ' + item.data.text + '</font>'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                    
                    /*var win = new TheaterTool.view.tabPanel.persons.PersonSelectionDialog({selection: item.data.text, tabPanel : this.tabPanel});
                    win.show();
                    if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
                    Ext.getCmp('infoDialog').close();
                    }*/
                    
                    
                    /*	repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">'+item.data.text+'</font>',
                    icon: 'resources/images/Mask-19.png'
                    });
                    //var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({year: item.data.text});
                    var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({selection: item.data.text});
                    repertoireTab.add(repertoireDetails);	*/
                } else if (item.parentNode.data.text === GUI_NAMES.subs) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Ticket-14.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Ticket-14.png'
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.abo.AboPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.press) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Presse-16.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Presse-16.png'
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.journal.JournalPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.direction) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Crown-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Crown-17.png'
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.regiebooks.RegiePanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.rolebook) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/carnival.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/carnival.png'
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.rolebooks.RoleKostuemPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                    /*} else if (item.data.text === 'Theaterberufe') {
                    /\*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">Theaterberufe</font>',
                    icon: 'resources/images/theatreB.png'
                    });*\/*/
                } else if (item.parentNode.data.text === GUI_NAMES.exp) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/MoneyTransfer-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/MoneyTransfer-17.png'
                        });
                        var issueDetails = new TheaterTool.view.tabPanel.issue.IssuePanelInTab({
                            year: item.data.text
                        });
                        repertoireTab.add(issueDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.rev) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + GUI_NAMES.rev + ': ' + item.data.text + '</font>', icon: 'resources/images/MoneyBox-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + GUI_NAMES.rev + ': ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + GUI_NAMES.rev + ': ' + item.data.text + '</font>',
                            icon: 'resources/images/MoneyBox-17.png'
                        });
                        
                        var revenueDetails = new TheaterTool.view.tabPanel.revenue.RevenuePanelInTab({
                            year: item.data.text
                        });
                        repertoireTab.add(revenueDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === GUI_NAMES.feebook) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Gift-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Gift-17.png'
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.dbPath !== undefined) {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: Ext.BLANK_IMAGE_URL, selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: Ext.BLANK_IMAGE_URL
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.customitems.CustomItemPanelInTab({
                            itemName: item.data.text, dbPath: item.data.dbPath, doctype: item.data.doctype
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                }
                
                if (repertoireTab !== null) {
                    if (typeof Ext.getCmp('infoDialog') !== 'undefined') {
                        Ext.getCmp('infoDialog').close();
                    }
                    if (repertoireTab !== null) {
                        this.tabPanel.add(repertoireTab);
                        this.tabPanel.setActiveTab(repertoireTab);
                        this.tabPanel.fireEvent('render', this.tabPanel);
                        historyButton.setDisabled(false);
                        var toolBar = Ext.getCmp('toolbar');
                        toolBar.handleHistoryButtons();
                    }
                }
            }
        };
        
        this.items =[ {
            title: 'Spielbetrieb',
            useArrows: true
        }];
        
        this.callParent();
    },
    
    setHTTabPanel: function (tabPanel) {
        this.tabPanel = tabPanel;
    },
    
    getHTTabPanel: function () {
        return this.tabPanel;
    }
});