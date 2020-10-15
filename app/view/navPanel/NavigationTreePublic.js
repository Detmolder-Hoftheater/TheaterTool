var store = Ext.create('Ext.data.TreeStore', {
    
    root: {
        text: 'Start',
        children:[ {
            text: 'Spielbetrieb',
            icon: 'resources/images/Library-17.png',
            expanded: true,
            children:[ {
                text: 'Repertoire (1.750 Werke)',
                icon: 'resources/images/Folder-17.png',
                children:[ {
                    leaf: true, text: 'A-B-C',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'D-E-F',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'G-H-I',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'J-K-L',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'M-N-O',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'P-Q-R',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'S-T-U',
                    icon: 'resources/images/BooksVert-17.png'
                }, {
                    leaf: true, text: 'V-W-X-Y-Z',
                    icon: 'resources/images/BooksVert-17.png'
                }]
            }, {
                text: 'Tiefenerschlossene Werke',
                
                icon: 'resources/images/AddFolder-16.png',
                children:[ {
                    leaf: true, text: 'Aschenbrödel',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Der Bettelstudent',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Joseph',
                    icon: 'resources/images/BookBlau-16.png'
                },{
                    leaf: true, text: 'Der Kapellmeister',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Der Müller',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Des Teufels Anteil',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Die Unbekannte',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Yelva (Lortzing)',
                    icon: 'resources/images/BookBlau-16.png'
                }, {
                    leaf: true, text: 'Yelva (Reissiger)',
                    icon: 'resources/images/BookBlau-16.png'
                }]
            }, {
                text: 'Programm',
                
                icon: 'resources/images/Magazine-17.png',
                children:[ {
                    text: 'Spielpläne',
                    icon: 'resources/images/Calendar-17.png',
                    children:[ {
                        leaf: true, text: '1820',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1821',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1822',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1823',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1824',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1825',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1826',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1827',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1828',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1829',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1830',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1831',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1832',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1833',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1834',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1835',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1836',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1837',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1838',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1839',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1840',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1841',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1842',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1843',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1844',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1845',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1846',
                        icon: 'resources/images/Calendar-17.png'
                    }, {
                        leaf: true, text: '1847',
                        icon: 'resources/images/Calendar-17.png'
                    }]
                },
                /*{
                leaf: true, text: '<font style="color:gray;">Aufführungen</font>',
                icon: 'resources/images/Time-17.png'
                }, */ {
                    leaf: true, text: 'Theaterzettel',
                    icon: 'resources/images/Day-17.png'
                }
                /*, {
                text: 'Theaterzettel Dresden',
                icon: 'resources/images/Day-17.png',
                children:[ {
                leaf: true, text: '1834',
                icon: 'resources/images/Day-17.png'
                }, {
                leaf: true, text: '1846',
                icon: 'resources/images/Day-17.png'
                }]
                }*/]
            }, {
                text: 'Personen (2.089)',
                icon: 'resources/images/Mask-19.png',
                children:[ {
                    leaf: true, text: 'A-B-C',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'D-E-F',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'G-H-I',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'J-K-L',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'M-N-O',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'P-Q-R',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'S-T-U',
                    icon: 'resources/images/Mask-19.png'
                }, {
                    leaf: true, text: 'V-W-X-Y-Z',
                    icon: 'resources/images/Mask-19.png'
                }]
            }, {
                text: 'Rollen (2.665)',
                icon: 'resources/images/theatreB.png',
                children:[/*{
                leaf: true, text: 'Zahlen',
                icon: 'resources/images/theatreB.png'
                },*/ {
                    leaf: true, text: 'A-B-C',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'D-E-F',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'G-H-I',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'J-K-L',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'M-N-O',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'P-Q-R',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'S-T-U',
                    icon: 'resources/images/theatreB.png'
                }, {
                    leaf: true, text: 'V-W-X-Y-Z',
                    icon: 'resources/images/theatreB.png'
                }]
            }, {
                text: 'Presse',
                icon: 'resources/images/Presse-16.png',
                children:[ {
                    leaf: true, text: 'Linksammlung',
                    icon: 'resources/images/Presse-16.png'
                    /*icon: 'resources/images/Link-15.png'*/
                }, {
                    leaf: true, text: 'Theaterjournals',
                    icon: 'resources/images/Presse-16.png'
                    /*icon: 'resources/images/Dossier-17.png'*/
                }]
            }]
        }, {
            text: 'Verwaltung',
            icon: 'resources/images/portfolio-17.png',
            expanded: true,
            children:[
            // {
            /* text: 'Theater Organisation',
            icon: 'resources/images/Audience-17.png',
            expanded: true,
            children: [*/
            
            //]
            //  },
            {
                text: 'Finanzwesen',
                icon: 'resources/images/Coins-17.png',
                // expanded: true,
                children:[ {
                    text: 'Einnahmen',
                    icon: 'resources/images/MoneyBox-17.png',
                    children:[ {
                        leaf: true, text: '1825',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1826',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1827',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1828',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1829',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1830',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1831',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1832',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1833',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1834',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1835',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1836',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1837',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1838',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1839',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1840',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1841',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1842',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1843',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1844',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1845',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1846',
                        icon: 'resources/images/MoneyBox-17.png'
                    }, {
                        leaf: true, text: '1847',
                        icon: 'resources/images/MoneyBox-17.png'
                    }]
                }, {
                    text: 'Ausgaben',
                    icon: 'resources/images/MoneyTransfer-17.png',
                    children:[
                    /*{ leaf:true, text: '1825',
                    icon: 'resources/images/MoneyTransfer-17.png'
                    },*/ {
                        leaf: true, text: '1826',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1827',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1828',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1829',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1830',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1831',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1832',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1833',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1834',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1835',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1836',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1837',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1838',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1839',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1840',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1841',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1842',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1843',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1844',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1845',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1846',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }, {
                        leaf: true, text: '1847',
                        icon: 'resources/images/MoneyTransfer-17.png'
                    }]
                }, {
                    leaf: true,
                    text: 'Abonnements',
                    icon: 'resources/images/Ticket-14.png'
                }, {
                    leaf: true, text: 'Gagenhefte',
                    icon: 'resources/images/Gift-17.png'
                }, {
                    leaf: true, text: 'Taxations',
                    icon: 'resources/images/tax.png'
                }]
            },
            /*{ leaf:true, text: '<font style="color:gray;">Dekoration</font>',
            icon: 'resources/images/theatre.png' },*/ 
            {
                text: 'Bestandsverzeichnisse',
                icon: 'resources/images/openBox1.png',
                children:[]
            },
            {
                text: 'Regiebücher',
                icon: 'resources/images/Crown-17.png',
                children:[]
            }, {
                leaf: true, text: 'Rollen- & Kostümbücher',
                icon: 'resources/images/carnival.png'
            }, {
                text: 'Tagesberichte',
                icon: 'resources/images/news1-16.png',
                children:[ {
                    leaf: true, text: '1843',
                    icon: 'resources/images/news1-16.png'
                }, {
                    leaf: true, text: '1844',
                    icon: 'resources/images/news1-16.png'
                }, {
                    leaf: true, text: '1845',
                    icon: 'resources/images/news1-16.png'
                }, {
                    leaf: true, text: '1846',
                    icon: 'resources/images/news1-16.png'
                }]
            }
            /*{
            leaf: true, text: '<font style="color:gray;">Theaterberufe</font>',
            icon: 'resources/images/theatreB.png'
            }*/]
        }]
    }
})


Ext.define('TheaterTool.view.navPanel.NavigationTreePublic', {
    extend: 'Ext.tree.Panel',
    
    reserveScrollbar: true,
    id: 'NavigationTreeGlobal',
    useArrows: true,
    rootVisible: false,
    store: store,
    
    tabPanel: null,
    
    border: false,
    bodyborder: false,
    bodyPadding: 13,
    //bodyborder: true,
    height: 700,
    
    getNavigationItems: function () {
        var me = this;
        
        Ext.Ajax.request({
            url: 'resources/xql/getTaxMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('tax')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                var navTreeStoreRoot = me.store.getRootNode();
                var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[0].childNodes[4];
                
                for (i = 0; i < json.names.length; i++) {
                    var regName = json.names[i];
                    regieMenu.appendChild({
                        leaf: true, text: regName,
                        icon: 'resources/images/tax.png'
                    });
                }
            }
        });
               
        Ext.Ajax.request({
            url: 'resources/xql/getRegieMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('regie')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                var navTreeStoreRoot = me.store.getRootNode();
                var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[2];
                
                for (i = 0; i < json.names.length; i++) {
                    var regName = json.names[i];
                    regieMenu.appendChild({
                        leaf: true, text: regName,
                        icon: 'resources/images/Crown-17.png'
                    });
                }
            }
        });
        
        Ext.Ajax.request({
            url: 'resources/xql/getBestandMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('bestand')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                var navTreeStoreRoot = me.store.getRootNode();
                var bestandMenu = navTreeStoreRoot.childNodes[1].childNodes[1];
                
                for (i = 0; i < json.names.length; i++) {
                    var bestandName = json.names[i];
                    bestandMenu.appendChild({
                        leaf: true, text: bestandName,
                        icon: 'resources/images/openBox1.png'
                    });
                }
            }
        });
        
        Ext.Ajax.request({
            url: 'resources/xql/getRollenKostuemMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('role')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                //console.log(json);
                var navTreeStoreRoot = me.store.getRootNode();
                var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[3];
                for (i = 0; i < json.names.length; i++) {
                    var regName = json.names[i];
                    regieMenu.appendChild({
                        leaf: true, text: regName,
                        icon: 'resources/images/carnival.png'
                    });
                }
            }
        });
        
        Ext.Ajax.request({
            url: 'resources/xql/getGagenMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('gage')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                //console.log(json);
                var navTreeStoreRoot = me.store.getRootNode();
                var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[0].childNodes[3];
                for (i = 0; i < json.names.length; i++) {
                    var regName = json.names[i];
                    regieMenu.appendChild({
                        leaf: true, text: regName,
                        icon: 'resources/images/Gift-17.png'
                    });
                }
            }
        });
        
        Ext.Ajax.request({
            url: 'resources/xql/getAboMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('abo')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                //console.log(json);
                var navTreeStoreRoot = me.store.getRootNode();
                var regieMenu = navTreeStoreRoot.childNodes[1].childNodes[0].childNodes[2];
                for (i = 0; i < json.names.length; i++) {
                    var regName = json.names[i];
                    regieMenu.appendChild({
                        leaf: true, text: regName,
                        icon: 'resources/images/Ticket-14.png'
                    });
                }
            }
        });
        
        Ext.Ajax.request({
            url: 'resources/xql/getJournalMenu.xql',
            method: 'GET',
            params: {
                path: dbPathsMap. get ('journal')
            },
            success: function (response, options) {
                var json = jQuery.parseJSON(response.responseText);
                
                //console.log(json);
                var navTreeStoreRoot = me.store.getRootNode();
                var regieMenu = navTreeStoreRoot.childNodes[0].childNodes[5].childNodes[1];
                for (i = 0; i < json.names.length; i++) {
                    var regName = json.names[i];
                    regieMenu.appendChild({
                        leaf: true, text: regName,
                        icon: 'resources/images/Presse-16.png'
                    });
                }
            }
        });
    },
    
    isItemFound: function (existItems, titletext, activeMenuItemId) {
        for (i = 0; i < existItems.items.length; i++) {
            var existItem = existItems.items[i];
            if (existItem.title === titletext) {
                console.log(activeMenuItemId);
                console.log(existItem);
                existItem.setMenuAdded(true);
                this.tabPanel.setActiveTab(existItem);
                existItem.setActiveMenuItemId(activeMenuItemId);
               
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
        
        me.listeners = {
            itemclick: function (record, item, index, e, eOpts) {
                
                if (item.isExpanded()) {
                    item.collapse();
                } else {
                    item.expand();
                }
                var existItems = me.tabPanel.items;
                var repertoireTab = null;
                var historyButton = Ext.getCmp('historyButton');
                
                if (item.data.text === 'Aschenbrödel') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Aschenbrödel</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020149'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Aschenbrödel</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Aschenbrödel</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020149'
                        });
                       
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020149', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Des Teufels Anteil') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Des Teufels Anteil</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020048'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Des Teufels Anteil</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Des Teufels Anteil</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020048'
                        });
                       
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020048', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Der Bettelstudent') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Der Bettelstudent</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020263'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Der Bettelstudent</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Der Bettelstudent</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020263'
                        });
                       
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020263', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Joseph') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Joseph</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020166'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Joseph</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Joseph</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020166'
                        });
                        
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020166', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Der Kapellmeister') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Der Kapellmeister</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020090'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Der Kapellmeister</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Der Kapellmeister</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020090'
                        });
                        
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020090', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                }else if (item.data.text === 'Der Müller') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Der Müller</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020261'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Der Müller</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Der Müller</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020261'
                        });
                        
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020261', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Yelva (Lortzing)') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Yelva (Lortzing)</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020224'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Yelva (Lortzing)</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Yelva (Lortzing)</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020224'
                        });
                        /* var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                        selection: 'H020263'
                        });*/
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020224', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Yelva (Reissiger)') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Yelva (Reissiger)</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H021013'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Yelva (Reissiger)</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Yelva (Reissiger)</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H021013'
                        });
                        /* var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                        selection: 'H020263'
                        });*/
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H021013', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Die Unbekannte') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werk: Die Unbekannte</font>', icon: 'resources/images/BookBlau-16.png', selection: 'H020076'
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werk: Die Unbekannte</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werk: Die Unbekannte</font>',
                            icon: 'resources/images/BookBlau-16.png',
                            id: 'werk_H020076'
                        });
                        /* var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                        selection: 'H020263'
                        });*/
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: 'H020076', workName: item.data.text, workIcon: 'resources/images/BookBlau-16.png'
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Der Bettelstudent'});
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Repertoire (1.750 Werke)') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Werke: ' + item.data.text + '</font>', icon: 'resources/images/BooksVert-17.png', selection: 1
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Werke: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Werke: ' + item.data.text + '</font>',
                            icon: 'resources/images/BooksVert-17.png',
                            id: 'werke_' + item.data.text
                        });
                        
                        var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({
                            selection: item.data.text, navTreetitle: '<font style="color:#A87678;">Werke: ' + item.data.text + '</font>'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Spielpläne') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Spielpläne: ' + item.data.text + '</font>', icon: 'resources/images/Calendar-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Spielpläne: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Spielpläne: ' + item.data.text + '</font>',
                            icon: 'resources/images/Calendar-17.png',
                            id: 'spielplaene_' + item.data.text
                        });
                        var scheduleDetails = new TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab({
                            year: item.data.text
                        });
                        //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Aschenbrödel'});
                        repertoireTab.add(scheduleDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Aufführungen') {
                    /*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">Aufführungen</font>',
                    icon: 'resources/images/Time-17.png'
                    });*/
                } else if (item.data.text === 'Theaterzettel') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Day-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Day-17.png',
                            id: 'theaterzettel_' + item.data.text
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.zettel.TheaterZettelPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                }
                /*else if (item.parentNode.data.text === 'Theaterzettel Dresden') {
                var menuItem = historyButton.menu.add({
                text: '<font style="color:gray;">Theaterzettel Dresden: ' + item.data.text + '</font>', icon: 'resources/images/Day-17.png', selection: item.data.text
                });
                var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Theaterzettel Dresden: ' + item.data.text + '</font>', menuItem.id);
                if (! isFoundItem) {
                repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                title: '<font style="color:gray;">Theaterzettel Dresden: ' + item.data.text + '</font>',
                icon: 'resources/images/Day-17.png'
                });
                var scheduleDetails = new TheaterTool.view.tabPanel.zettel.TheaterZettelPanelInTabDresden({
                year: item.data.text
                });
                //var repertoireDetails = new TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel({selection: 'Aschenbrödel'});
                repertoireTab.add(scheduleDetails);
                repertoireTab.setActiveMenuItemId(menuItem.id);
                repertoireTab.setMenuAdded(true);
                }
                }*/ else if (item.parentNode.data.text === 'Personen (2.089)') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Personen: ' + item.data.text + '</font>', icon: 'resources/images/Mask-19.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Personen: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Personen: ' + item.data.text + '</font>',
                            icon: 'resources/images/Mask-19.png',
                            id: 'personen_' + item.data.text
                        });
                        var repertoireDetails = new TheaterTool.view.tabPanel.persons.PersonDetailsPanel({
                            selection: item.data.text, navTreetitle: '<font style="color:#A87678;">Personen: ' + item.data.text + '</font>'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Rollen (2.665)') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Rollen: ' + item.data.text + '</font>', icon: 'resources/images/theatreB.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Rollen: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Rollen: ' + item.data.text + '</font>',
                            icon: 'resources/images/theatreB.png',
                            id: 'rollen_' + item.data.text
                        });
                        var repertoireDetails = new TheaterTool.view.tabPanel.roles.RoleDetailsPanel({
                            selection: item.data.text, navTreetitle: '<font style="color:#A87678;">Rollen: ' + item.data.text + '</font>'
                        });
                        repertoireTab.add(repertoireDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Abonnements') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Ticket-14.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Ticket-14.png',
                            id: 'abonnement_' + item.data.text.replace(/\s/g, '')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.abo.AboPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Taxations') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/tax.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/tax.png',
                            id: 'taxation_' + item.data.text.replace(/\s/g, '').replace(/[()]/g, '')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.taxation.TaxPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Bestandsverzeichnisse') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/openBox1.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/openBox1.png',
                            id: 'bestand_' + item.data.text.replace(/\s/g, '').replace(/[()]/g, '')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.bestand.BestandPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                }else if (item.data.text === 'Linksammlung') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Presse-16.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Presse-16.png',
                            id: 'linksammlung_' + item.data.text
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.link.LinkPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Theaterjournals') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Presse-16.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Presse-16.png',
                            id: 'theaterjournal_' + item.data.text.replace(/\s/g, '')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.journal.JournalPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Dekoration') {
                    /*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">Dekoration</font>',
                    icon: 'resources/images/theatre.png'
                    });*/
                } else if (item.parentNode.data.text === 'Regiebücher') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Crown-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Crown-17.png',
                            id: 'regiebuch_' + item.data.text.replace(/\s/g, '').replace(/[()]/g, '')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.regiebooks.RegiePanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Rollen- & Kostümbücher') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/carnival.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/carnival.png',
                            id: 'rollenundkostuem_' + item.data.text.replace(/\s/g, '').replace(/[()]/g, '').replace(/ü/g, 'u')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.rolebooks.RoleKostuemPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(regieDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.data.text === 'Theaterberufe') {
                    /*repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                    title: '<font style="color:gray;">Theaterberufe</font>',
                    icon: 'resources/images/theatreB.png'
                    });*/
                } else if (item.parentNode.data.text === 'Ausgaben') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Ausgaben: ' + item.data.text + '</font>', icon: 'resources/images/MoneyTransfer-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Ausgaben: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Ausgaben: ' + item.data.text + '</font>',
                            icon: 'resources/images/MoneyTransfer-17.png',
                            id: 'ausgaben_' + item.data.text
                        });
                        var issueDetails = new TheaterTool.view.tabPanel.issue.IssuePanelInTab({
                            year: item.data.text
                        });
                        repertoireTab.add(issueDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Einnahmen') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Einnahmen: ' + item.data.text + '</font>', icon: 'resources/images/MoneyMoneyBox-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Einnahmen: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Einnahmen: ' + item.data.text + '</font>',
                            icon: 'resources/images/MoneyBox-17.png',
                            id: 'einnahmen_' + item.data.text
                        });
                        
                        var revenueDetails = new TheaterTool.view.tabPanel.revenue.RevenuePanelInTab({
                            year: item.data.text
                        });
                        repertoireTab.add(revenueDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Tagesberichte') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">Tagesberichte: ' + item.data.text + '</font>', icon: 'resources/images/news1-16.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">Tagesberichte: ' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">Tagesberichte: ' + item.data.text + '</font>',
                            icon: 'resources/images/news1-16.png',
                            id: 'tagesberichte_' + item.data.text
                        });
                        var issueDetails = new TheaterTool.view.tabPanel.dailyreport.DailyreportPanelInTab({
                            regieName: item.data.text
                        });
                        repertoireTab.add(issueDetails);
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                    }
                } else if (item.parentNode.data.text === 'Gagenhefte') {
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + item.data.text + '</font>', icon: 'resources/images/Gift-17.png', selection: item.data.text
                    });
                    var isFoundItem = me.isItemFound(existItems, '<font style="color:gray;">' + item.data.text + '</font>', menuItem.id);
                    if (! isFoundItem) {
                        repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + item.data.text + '</font>',
                            icon: 'resources/images/Gift-17.png',
                            id: 'gagenheft_' + item.data.text.replace(/\s/g, '').replace(/ü/g, 'u')
                        });
                        var regieDetails = new TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab({
                            regieName: item.data.text
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
        
        
        me.items =[ {
            title: 'Spielbetrieb',
            useArrows: true
        }];
        
        
        
        
        me.callParent();
    },
    
    setHTTabPanel: function (tabPanel) {
        this.tabPanel = tabPanel;
    },
    
    getHTTabPanel: function () {
        return this.tabPanel;
    }
});