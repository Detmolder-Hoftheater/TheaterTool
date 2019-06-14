Ext.define('TheaterTool.view.tabPanel.dailyreport.DailyreportTextSection', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    collapsible: true,
    
    year: null,
    reportPath: null,
    count: null,
    dbkeyPerson: null,
    dbkey: null,
    elementList: null,
    workelements: null,
    imagesContent: null,
    
    initComponent: function () {
        
        var me = this;
        
        if (me.count === null) {
            me.collapsed = true;
        }
        
        me.tbar = {
            style: {
                background: 'white'
            },
            border: false,
            height: 30,
            items:[ {
                xtype: 'button',
                text: '<font size = "1"><b style="color:gray;">XML ansehen</b></font>',
                style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                },
                margin: '0 3 0 5',
                listeners: {
                    click: function (item, e, eOpts) {
                        
                        
                        Ext.Ajax.request({
                            url: 'resources/xql/getDailyrReportXML.xql',
                            method: 'GET',
                            params: {
                                regieName: me.reportPath
                            },
                            success: function (response) {
                                
                                var testText = response.responseXML;
                                
                                var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                                var personArr = testText.getElementsByTagName('TEI');
                                tempDiv.appendChild(personArr[0]);
                                
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';
                                
                                var win = new Ext.window.Window({
                                    title: '<font style="color:gray;">XML for ' + me.title + '</font>',
                                    html: htmlVersion,
                                    icon: 'resources/images/MoneyTransfer-17.png',
                                    bodyStyle: {
                                        "background-color": "white"
                                    },
                                    height: 600,
                                    width: 800,
                                    autoScroll: true,
                                    bodyPadding: 10
                                });
                                win.show();
                            }
                        });
                    }
                }
            }, {
                xtype: 'button',
                text: '<font size = "1"><b style="color:gray;">XML laden</b></font>',
                style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                },
                listeners: {
                    click: function (item, e, eOpts) {
                        
                        Ext.Ajax.request({
                            
                            url: 'resources/xql/getDailyrReportXML.xql',
                            method: 'GET',
                            params: {
                                regieName: me.reportPath
                            },
                            success: function (response) {
                                var xmltext = response.responseText;
                                
                                var pom = document.createElement('a');
                                
                                var pathSplit = me.reportPath.split('/');
                                var filename = pathSplit[pathSplit.length - 1];
                                
                                var pom = document.createElement('a');
                                var bb = new Blob([xmltext], {
                                    type: 'text/plain'
                                });
                                
                                pom.setAttribute('href', window.URL.createObjectURL(bb));
                                pom.setAttribute('download', filename);
                                
                                pom.dataset.downloadurl =[ 'text/plain', pom.download, pom.href].join(':');
                                pom.draggable = true;
                                pom.classList.add('dragout');
                                
                                //apply the click on to download the file
                                document.body.appendChild(pom);
                                pom.click();
                                document.body.removeChild(pom);
                            }
                        });
                    }
                }
            }]
        };
        
        
        Ext.Ajax.request({
            url: 'resources/xql/getDailyReportContent.xql',
            method: 'GET',
            params: {
                regieName: me.reportPath
            },
            success: function (response) {
                var tableInhalt = response.responseText;
                me.add({
                    
                    /*html: tableInhalt,
                    border: false,*/
                    flex: 1.5,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    border: false,
                    items:[ {
                        html: tableInhalt
                    }],
                    listeners: {
                        afterrender: function (panel) {
                            me.elementList = panel.el.dom.getElementsByTagName('persname');
                            me.workelements = panel.el.dom.getElementsByTagName('rs');
                            me.imagesContent = panel.el.dom.getElementsByTagName('el');
                            if (me.imagesContent !== null && me.imagesContent.length > 0) {
                                var graphicsArray = new Array();
                                for (var i = 0; i < me.imagesContent.length; i++) {
                                    var oneElement = me.imagesContent[i];
                                    var graphicContent = new Array();
                                    graphicContent.push(oneElement.getAttribute('src'));
                                    graphicContent.push(oneElement.getAttribute('height'));
                                    graphicContent.push(oneElement.getAttribute('width'));
                                    graphicsArray.push(graphicContent);
                                }
                                
                                var detailSection = new TheaterTool.view.tabPanel.dailyreport.FacsimileView({
                                    imageData: graphicsArray
                                });
                                me.add(detailSection);
                            }
                        }
                    }
                });
                
                if (me.dbkey !== null) {
                    var elementToFocus = '';
                    
                    var filteredList = new Array();
                    for (var i = 0; i < me.elementList.length; i++) {
                        var oneElement = me.elementList[i];
                        if (oneElement.id === me.dbkey && filteredList.indexOf(oneElement) === -1) {
                            filteredList.push(oneElement);
                        }
                    }
                    for (var i = 0; i < me.workelements.length; i++) {
                        var element = me.workelements[i];
                        if (element.id === me.dbkey) {
                            filteredList.push(element);
                        }
                    }
                    
                    for (var i = 0; i < filteredList.length; i++) {
                        var element = filteredList[i];
                        element.style.backgroundColor = "lightgray";
                        if (elementToFocus === '' && parseInt(me.count) === parseInt(i)) {
                            
                            element.style.border = "thick solid lightgray";
                            elementToFocus = element;
                            elementToFocus.scrollIntoView();
                        }
                    }
                }
                
                getWorkContentForDailyRep = function (workId, workName) {
                    var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton');
                    
                    var workIcon = '';
                    if (extWorkKeys.indexOf(workId) > -1) {
                        workIcon = 'resources/images/BookBlau-16.png';
                    } else {
                        workIcon = 'resources/images/Books1-17.png';
                    }
                    
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + workName + '</font>', icon: workIcon, dbkey: workId
                    });
                    
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, workId, menuItem.id);
                    if (! isFoundItem) {
                        
                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + workName + '</font>',
                            icon: workIcon,
                            id: 'werk_' + workId
                        });
                        
                        var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                        });
                        repertoireTab.add(personDetails);
                        
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                        
                        navTreeGlobal.add(repertoireTab);
                        navTreeGlobal.setActiveTab(repertoireTab);
                        navTreeGlobal.fireEvent('render', navTreeGlobal);
                    }
                };
                
                /**/
                getPersonContentForDailyRep = function (personId, personName) {
                    var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton');
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
                    });
                    
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
                    if (! isFoundItem) {
                        
                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + personName + '</font>',
                            icon: 'resources/images/Mask-19.png',
                            id: 'person_' + personId
                        });
                        var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                            dbkey: personId, title: '<font size="2" face="Tahoma" style="color:#909090;">Person: ' + personName + '</font>',
                            icon: 'resources/images/Mask-19.png'
                        });
                        repertoireTab.add(personDetails);
                        
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                        
                        navTreeGlobal.add(repertoireTab);
                        navTreeGlobal.setActiveTab(repertoireTab);
                        navTreeGlobal.fireEvent('render', navTreeGlobal);
                    }
                }
            }
        });
        
        me.listeners = { afterrender: function (panel) {
                panel.header.el.on('click', function () {
                    if (panel.collapsed) {
                        panel.expand();
                    } else {
                        panel.collapse();
                    }
                });
            }
        };
        
        
        me.callParent();
    }
});