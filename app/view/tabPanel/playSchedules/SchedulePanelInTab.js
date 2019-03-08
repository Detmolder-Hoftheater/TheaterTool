Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
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
                
                for (i = 0; i < json.names.length; i++) {
                    
                    var nameMonth = json.names[i];
                    
                    if (me.selectedReport !== null) {
                        var title = json.names[i];//[1];
                        if (me.selectedReport === title) {
                            
                            var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                                issueName: title, year: me.year, value: 2, title: '<b style="color:#A87678;">' + title + '</b>', selectedIssueName: me.issueName, count: me.count, selectedReport: me.selectedReport,
                                selectedWorkID: me.selectedWorkID, selectedMonth: me.issueName, month: nameMonth
                            });
                            me.add(detailSection);
                            break;
                        }
                    } else {
                        var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                            month: nameMonth, year: me.year, value: 2, title: '<b style="color:#A87678;">' + nameMonth + '</b>', selectedIssueName: me.issueName, count: me.count, selectedReport: me.selectedReport,
                            selectedWorkID: me.selectedWorkID, selectedMonth: nameMonth, issueName: nameMonth, month: nameMonth, parentPanel: me
                        });
                        me.add(detailSection);
                    }
                }
                if (parseInt(me.year) < 1825) {
                    var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                        month: title, year: me.year, value: 2, title: '<b style="color:#A87678;">' + me.year + '</b>', selectedMonth: title, selectedIssueName: me.issueName, count: me.count, selectedReport: me.selectedReport,
                        selectedWorkID: me.selectedWorkID
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