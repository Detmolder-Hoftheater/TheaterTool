Ext.define('TheaterTool.view.tabPanel.revenue.RevenuePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    bodyBorder: false,
    
    autoScroll: true,
    
    year: null,
    monat: null,
    workPanel: null,
    
    selectedWorkID: null,
    selectedReport: null,
    count: null,
    
    initComponent: function () {
        var me = this;
        var messageWindow = Ext.MessageBox.show({
            msg: 'Loading...'
        });
        Ext.Ajax.request({
            url: 'resources/xql/getMonthsByRevenueYear.xql',
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
                
                if (me.selectedReport !== null) {
                    for (i = 0; i < json.names.length; i++) {
                        var nameMonth = json.names[i][0];
                        
                        var title = json.names[i][1];
                        if (me.selectedReport === title) {
                            var detailSection = new TheaterTool.view.tabPanel.revenue.RevenueTextSection({
                                month: nameMonth, year: me.year, value: 2, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', /*selectedMonth: me.monat,*/
                                selectedWorkID: me.selectedWorkID, messageWindow: messageWindow, rev_index: i, rev_length: i, count: me.count, selectedReport: me.selectedReport, parentPanel: me,
                                icon: 'resources/images/MoneyBox-17.png'
                            });
                            me.add(detailSection);
                            break;
                        }
                    }
                } else {
                    for (i = 0; i < json.names.length; i++) {
                        var nameMonth = json.names[i][0];
                        
                        var detailSection = new TheaterTool.view.tabPanel.revenue.RevenueTextSection({
                            month: nameMonth, year: me.year, value: 2, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', /*selectedMonth: me.monat,*/
                            selectedWorkID: me.selectedWorkID, messageWindow: messageWindow, rev_index: i, rev_length: json.names.length -1, count: me.count, selectedReport: me.selectedReport, parentPanel: me,
                            icon: 'resources/images/MoneyBox-17.png'
                        });
                        me.add(detailSection);
                    }
                }
            }
        });
        
        me.callParent();
    }
});