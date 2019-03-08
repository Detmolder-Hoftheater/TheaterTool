/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.revenue.RevenueTextSection', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    collapsible: true,
    autoScroll: true,
    border: false,
    bodyBorder: false,
    flex: 1,
    
    parentPanel: null,
   
    month: null,
    monthNumber: null,
    year: null,
   
    selectedWorkID: null,
    messageWindow: null,
    rev_index: -1,
    rev_length: -1,
    
    count: null,
    elementList: null,
    workelements: null,
    imagesContent: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.tbar = {
            style: {
                background: '#dcdcdc'
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
                        
                        if (me.month === 'Januar') {
                            me.monthNumber = '01';
                        } else if (me.month === 'Februar') {
                            me.monthNumber = '02';
                        } else if (me.month === 'März') {
                            me.monthNumber = '03';
                        } else if (me.month === 'April') {
                            me.monthNumber = '04';
                        } else if (me.month === 'Mai') {
                            me.monthNumber = '05';
                        } else if (me.month === 'Juni') {
                            me.monthNumber = '06';
                        } else if (me.month === 'Juli') {
                            me.monthNumber = '07';
                        } else if (me.month === 'August') {
                            me.monthNumber = '08';
                        } else if (me.month === 'September') {
                            me.monthNumber = '09';
                        } else if (me.month === 'Oktober') {
                            me.monthNumber = '10';
                        } else if (me.month === 'November') {
                            me.monthNumber = '11';
                        } else if (me.month === 'Dezember') {
                            me.monthNumber = '12';
                        }
                        
                        Ext.Ajax.request({
                            url: 'resources/xql/getRevenueXML.xql',
                            method: 'GET',
                            params: {
                                month: me.monthNumber,
                                year: me.year
                            },
                            success: function (response) {
                                
                                var testText = response.responseXML;
                                
                                var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
                                var personArr = testText.getElementsByTagName('TEI');
                                tempDiv.appendChild(personArr[0]);
                                
                                var tmp = hljs.highlightAuto($(tempDiv).html()).value;
                                var htmlVersion = '<pre>' + tmp + '</<pre>';
                                
                                var win = new Ext.window.Window({
                                    title: '<font style="color:gray;">XML for ' + me.title + ', ' + me.year + '</font>',
                                    html: htmlVersion,
                                    icon: 'resources/images/MoneyBox-17.png',
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
                //disabled: true,
                style: {
                    borderRight: '1px solid gray',
                    borderLeft: '1px solid gray',
                    borderTop: '1px solid gray',
                    borderBottom: '1px solid gray'
                },
                listeners: {
                    click: function (item, e, eOpts) {
                        
                        Ext.Ajax.request({
                            
                            url: 'resources/xql/getRevenueXML.xql',
                            method: 'GET',
                            params: {
                                month: me.monthNumber,
                                year: me.year
                            },
                            success: function (response) {
                                var xmltext = response.responseText;
                                
                                var pom = document.createElement('a');
                                
                                var filename = me.year + '_' + me.monthNumber + ".xml";
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
        
        if (me.month === 'Januar') {
            me.monthNumber = '01';
        } else if (me.month === 'Februar') {
            me.monthNumber = '02';
        } else if (me.month === 'März') {
            me.monthNumber = '03';
        } else if (me.month === 'April') {
            me.monthNumber = '04';
        } else if (me.month === 'Mai') {
            me.monthNumber = '05';
        } else if (me.month === 'Juni') {
            me.monthNumber = '06';
        } else if (me.month === 'Juli') {
            me.monthNumber = '07';
        } else if (me.month === 'August') {
            me.monthNumber = '08';
        } else if (me.month === 'September') {
            me.monthNumber = '09';
        } else if (me.month === 'Oktober') {
            me.monthNumber = '10';
        } else if (me.month === 'November') {
            me.monthNumber = '11';
        } else if (me.month === 'Dezember') {
            me.monthNumber = '12';
        }
        
        
        Ext.Ajax.request({
            url: 'resources/xql/getRevenueTable.xql',
            method: 'GET',
            params: {
                month: me.monthNumber,
                year: me.year
            },
            success: function (response) {
                
                var json = response.responseText;
                
                me.add({
                    
                    flex: 1.5,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items:[ {
                        html: json
                    }],
                    listeners: {
                        afterrender: function (panel) {
                            me.elementList = panel.el.dom.getElementsByTagName('persname');
                            me.workelements = panel.el.dom.getElementsByTagName('rs');
                            me.imagesContent = panel.el.dom.getElementsByTagName('el');
                        }
                    }
                });
                
                if (me.imagesContent.length > 0) {
                    var graphicsArray = new Array();
                    for (var i = 0; i < me.imagesContent.length; i++) {
                        var oneElement = me.imagesContent[i];
                        var graphicContent = new Array();
                        graphicContent.push(oneElement.getAttribute('src'));
                        graphicContent.push(oneElement.getAttribute('height'));
                        graphicContent.push(oneElement.getAttribute('width'));
                        graphicsArray.push(graphicContent);
                    }
                    
                    var detailSection = new TheaterTool.view.tabPanel.revenue.FacsimileView({
                        imageData: graphicsArray
                    });
                    me.add(detailSection);
                }
                
                if (me.rev_index === me.rev_length) {
                    me.messageWindow.close();
                    if (me.selectedWorkID === null) {
                        var itemsList = me.parentPanel.items.getRange();
                        for (var i = 0; i < itemsList.length; i++) {
                            var panelToCollapse = itemsList[i];
                            panelToCollapse.collapse();
                        }
                    }
                }
                
                if (me.selectedWorkID !== null) {
                    var elementToFocus = '';
                    var filteredList = new Array();
                    for (var i = 0; i < me.elementList.length; i++) {
                        var oneElement = me.elementList[i];
                        if (oneElement.id === me.selectedWorkID && filteredList.indexOf(oneElement) === -1) {
                            filteredList.push(oneElement);
                        }
                    }
                    
                    
                    for (var i = 0; i < me.workelements.length; i++) {
                        var element = me.workelements[i];
                        if (element.id === me.selectedWorkID) {
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
                getWorkContent = function (workId, workName) {
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
                            icon: workIcon
                        });
                        
                        /*var personDetails = new TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab({
                        selection: workId, isSelected: true
                        });*/
                        var personDetails = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelInTab({
                            selection: workId, isSelected: true, workName: workName, workIcon: workIcon
                        });
                        
                        // personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + workName + '</font>');
                        repertoireTab.add(personDetails);
                        
                        repertoireTab.setActiveMenuItemId(menuItem.id);
                        repertoireTab.setMenuAdded(true);
                        
                        navTreeGlobal.add(repertoireTab);
                        navTreeGlobal.setActiveTab(repertoireTab);
                        navTreeGlobal.fireEvent('render', navTreeGlobal);
                    }
                };
                
                /**/
                getPersonContent = function (personId, personName) {
                    var toolBarGlobal = Ext.getCmp('toolbar');
                    var historyButton = Ext.getCmp('historyButton');
                    // var isHistoryItemExist = toolBarGlobal.foundHistoryitemWithId(historyButton.menu.items, personId);
                    //if(!isHistoryItemExist){
                    var menuItem = historyButton.menu.add({
                        text: '<font style="color:gray;">' + personName + '</font>', icon: 'resources/images/Mask-19.png', dbkey: personId
                    });
                    
                    //}
                    
                    var navTreeGlobal = Ext.getCmp('NavigationTreeGlobal').getHTTabPanel();
                    var existItems = navTreeGlobal.items;
                    var isFoundItem = navTreeGlobal.isItemFoundWithId(existItems, personId, menuItem.id);
                    if (! isFoundItem) {
                        
                        var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
                            title: '<font style="color:gray;">' + personName + '</font>',
                            icon: 'resources/images/Mask-19.png'
                        });
                        var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({
                            dbkey: personId, title: '<font size="2" face="Arial" style="color:#A87678;">Person: ' + personName + '</font>', icon: 'resources/images/Mask-19.png'
                        });
                        //personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">' + personName + '</font>');
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
        
        me.callParent();
    }
});