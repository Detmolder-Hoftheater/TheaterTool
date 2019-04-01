/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection', {
    extend: 'Ext.panel.Panel',
    
    /*collapsible: true,
    
    layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
    },
    
    border: false,
    bodyBorder: false,
    
    flex: 1,
    
    repertoireTab: null,
    
    month: null,
    monthNumber: null,
    year: null,
    
    tableheight: null,
    tablewidth: null,
    
    xmlSection: null,
    
    selectedMonth: null,
    
    selectedWorkID: null,*/
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyBorder: false,
    flex: 1,
    parentPanel: null,
    
    month: null,
    monthNumber: null,
    year: null,
    collapsible: true,
    //collapsed: true,
    
    xmlSection: null,
    selectedReport: null,
    revenueTable: null,
    selectedWorkID: null,
    messageWindow: null,
    rev_index: -1,
    rev_length: -1,
    
    count: null,
    elementList: null,
    workelements: null,
    
    parentPanel: null,
    
    margin: '0 10 5 10',
    
    initComponent: function () {
        
        var me = this;
        
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
            // url: 'data/Output_Exist.xql',
            url: 'resources/xql/getScheduleTable.xql',
            method: 'GET',
            params: {
                month: me.month,
                year: me.year
            },
            success: function (response) {
                
                var json = response.responseText;//jQuery.parseJSON(response.responseText);
                
                me.add({
                    
                    //html:  json,
                    
                    flex: 1.5,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                   margin: '0 15 15 15',
                   bodyBorder: false,
                   border: false,
                    items:[ {
                        html: json,
                        border: false,
                        bodyBorder: false
                    }],
                    listeners: {
                        afterrender: function (panel) {
                            me.elementList = panel.el.dom.getElementsByTagName('persname');
                            me.workelements = panel.el.dom.getElementsByTagName('rs');
                        }
                    }
                });
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
                    
                    
                } else {
                   if (me.parentPanel != null) {
                        var itemsList = me.parentPanel.items.getRange();
                        for (var i = 0; i < itemsList.length; i++) {
                            var panelToCollapse = itemsList[i];
                            panelToCollapse.collapse();
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
                            dbkey: personId, title: '<font style="color:gray;">Person: ' + personName + '</font>', icon: 'resources/images/Mask-19.png'
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
        
        me.listeners = { afterrender: function (panel) {
                    //console.log(panel.header.el);
                    panel.header.el.on('click', function () {
                        // panel.header.el.on('click', function () {
                        if (panel.collapsed) {
                            panel.expand();
                        } else {
                            panel.collapse();
                        }
                    });
                   
                }
            };
        me.callParent();
    },
    
    setTextInfo: function (infoText) {
        $('#' + this.id + '-innerCt').html(infoText);
    }
});