Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    
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
                background: 'white',
                borderBottom: '1px solid #909090'
            },
            border: false,
            
            items:[ {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                
                html: '<font size="2" face="Tahoma" style="color:#909090;">Die Spielpläne wurden aus Einnahmen, Ausgaben, Rollen- und Kostümbüchern generiert</font>',
                style: 'display:block; padding:5px 0px 5px 10px; background: white;'
            }]
        };
        
        if (parseInt(me.year) < 1825) {
            console.log(me.year);
            console.log(me.selectedReport);
            var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                month: me.year, year: me.year, title: '<b style="color:gray; font-size: 12px;">' + me.year + '</b>', selectedMonth: me.year, count: me.count, selectedReport: me.selectedReport,
                selectedWorkID: me.selectedWorkID, icon: 'resources/images/Calendar-17.png', parentPanel: me, rev_index: 0, rev_length: 1
            });
            me.items =[detailSection];
        } else {
            
            Ext.Ajax.request({
                url: 'resources/xql/getMonthsForSelectedYear.xql',
                method: 'GET',
                params: {
                    selectedYear: me.year
                },
                success: function (response) {
                    
                    var json = jQuery.parseJSON(response.responseText);
                    
                    var objs = json.names;
                    
                    var months =[ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
                    objs.sort(function (a, b) {
                        return months.indexOf(a[1]) - months.indexOf(b[1])
                    });
                    
                    console.log(objs);
                    for (i = 0; i < objs.length; i++) {
                        var nameMonthVoll = objs[i];
                        console.log(nameMonthVoll);
                        var nameMonth = nameMonthVoll[0];
                        
                        if (me.selectedReport !== null) {
                            
                            if (me.selectedReport === nameMonth) {
                                var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                                    year: me.year, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', count: me.count, selectedReport: me.selectedReport,
                                    selectedWorkID: me.selectedWorkID, selectedMonth: me.issueName, month: nameMonth, icon: 'resources/images/Calendar-17.png', parentPanel: me
                                });
                                me.add(detailSection);
                                break;
                            }
                        } else {
                            var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                                month: nameMonth, year: me.year, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', count: me.count,
                                selectedWorkID: me.selectedWorkID, selectedMonth: nameMonth, parentPanel: me, rev_index: i, rev_length: objs.length -1,
                                icon: 'resources/images/Calendar-17.png'
                            });
                            
                            me.add(detailSection);
                        }
                    }
                }
               
            });
        }
        
        me.callParent();
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