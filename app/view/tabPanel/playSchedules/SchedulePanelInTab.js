Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    bodyBorder: false,
    
    autoScroll: true,
    
    navButton: null,
    year: null,
    monat: null,
    workPanel: null,
    
    selectedWorkID: null,
    selectedReport: null,
    count: null,
    
    
    
    initComponent: function () {
        var me = this;
        
         me.tbar = {
            style: {
                background: 'white'
            },
            border: false,
            
            //height: 30,
            items:[ {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                //height: 30,
                html: '<font size="2" face="Tahoma" style="color:#909090;">Die Spielpläne wurden aus Einnahmen, Ausgaben, Rollen- und Kostümbüchern generiert</font>',
                style: 'display:block; padding:5px 0px 5px 10px; background: white;'
            }
                ]
        };
        
        Ext.Ajax.request({
            url: 'resources/xql/getMonthsForSelectedYear.xql',
            method: 'GET',
            params: {
                selectedYear: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                var objs = new Array();
                for (i = 0; i < json.names.length; i++) {
                    var name = json.names[i];
                    if (name === 'Januar') {
                        objs[1] = name;
                    } else if (name === 'Februar') {
                        objs[2] = name;
                    } else if (name === 'März') {
                        objs[3] = name;
                    } else if (name === 'April') {
                        objs[4] = name;
                    } else if (name === 'Mai') {
                        objs[5] = name;
                    } else if (name === 'Juni') {
                        objs[6] = name;
                    } else if (name === 'Juli') {
                        objs[7] = name;
                    } else if (name === 'August') {
                        objs[8] = name;
                    } else if (name === 'September') {
                        objs[9] = name;
                    } else if (name === 'Oktober') {
                        objs[10] = name;
                    } else if (name === 'November') {
                        objs[11] = name;
                    } else {
                        objs[12] = name;
                    }
                }
                
                /*me.add({
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 30,
                html: '<font size="2" face="Tahoma" style="color:#909090;">Die Spielpläne wurden aus Einnahmen, Ausgaben, Rollen- und Kostümbüchern generiert</font>',
                style: 'display:block; padding:5px 0px 0px 10px; background: white;'
            });*/
            
           
        
        
                
                for (i = 0; i < json.names.length; i++) {
                    
                    var nameMonth = json.names[i];
                    console.log(me.selectedReport);
                    if (me.selectedReport !== null) {
                        var title = json.names[i];//[1];
                        if (me.selectedReport === title) {
                            
                            var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                                issueName: title, year: me.year, value: 2, title: '<b style="color:gray; font-size: 12px;">' + title + '</b>', selectedIssueName: me.issueName, count: me.count, selectedReport: me.selectedReport,
                                selectedWorkID: me.selectedWorkID, selectedMonth: me.issueName, month: nameMonth, icon: 'resources/images/Calendar-17.png'
                            });
                            me.add(detailSection);
                            break;
                        }
                    } else {
                        var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                            month: nameMonth, year: me.year, value: 2, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', selectedIssueName: me.issueName, count: me.count, selectedReport: me.selectedReport,
                            selectedWorkID: me.selectedWorkID, selectedMonth: nameMonth, issueName: nameMonth, month: nameMonth, parentPanel: me, icon: 'resources/images/Calendar-17.png'
                        });
                        me.add(detailSection);
                    }
                }
                if (parseInt(me.year) < 1825) {
                    var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                        month: title, year: me.year, value: 2, title: '<b style="color:gray; font-size: 12px;">' + me.year + '</b>', selectedMonth: title, selectedIssueName: me.issueName, count: me.count, selectedReport: me.selectedReport,
                        selectedWorkID: me.selectedWorkID, icon: 'resources/images/Calendar-17.png'
                    });
                    me.add(detailSection);
                    /* var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                    month: objs[i], year: me.year, value: 2, title: '<b style="color:#A87678;">' + me.year + '</b>', selectedMonth: me.monat,
                    selectedWorkID: me.selectedWorkID
                    });
                    me.add(detailSection);*/
                }
            }
        });
        
        this.callParent();
    },
    
    createButton: function (navTree) {
        var me = this;
        var ceButton = Ext.create('Ext.button.Button', {
            text: '<b style="color:gray;">Monat<b>',
            menuAlign: 'tr-bl?',
            menu: Ext.create('Ext.menu.Menu', {
                style: {
                    background: '#dcdcdc'
                },
                items:[navTree]
            }),
            listeners: {
                afterrender: function () {
                    me.navButton.menu.show();
                    me.navButton.menu.setPosition(35, 100);
                }
            }
        });
        
        return ceButton;
    }
});