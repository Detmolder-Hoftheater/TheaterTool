Ext.define('TheaterTool.view.tabPanel.dailyreport.DailyreportPanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    autoScroll: true,
    
    regieName: null,
    selectedWorkID: null,
    count: null,
    selectedReport: null,
    
    initComponent: function () {
        
        var me = this;
        
        Ext.Ajax.request({
            url: 'resources/xql/getDailyReportNames.xql',
            method: 'GET',
            params: {
                selectedYear: me.regieName
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                if (me.selectedReport !== null) {
                    for (i = 0; i < json.names.length; i++) {
                        if (json.names[i] !== undefined) {
                            var singleNamePath = json.names[i];
                            
                            if (me.selectedReport === singleNamePath[0]) {
                                var detailSection = new TheaterTool.view.tabPanel.dailyreport.DailyreportTextSection({
                                    year: me.regieName, title: '<b style="color:gray; font-size: 12px;">' + singleNamePath[0] + '</b>',
                                    reportPath: singleNamePath[1], count: me.count, dbkey: me.selectedWorkID,
                                    icon: 'resources/images/news1-16.png'
                                });
                                me.add(detailSection);
                                break;
                            }
                        }
                    }
                } else {
                    for (i = 0; i < json.names.length; i++) {
                        if (json.names[i] !== undefined) {
                            var singleNamePath = json.names[i];
                            var detailSection = new TheaterTool.view.tabPanel.dailyreport.DailyreportTextSection({
                                year: me.regieName, title: '<b style="color:gray; font-size: 12px;">' + singleNamePath[0] + '</b>',
                                reportPath: singleNamePath[1], count: me.count, dbkey: me.selectedWorkID,
                                icon: 'resources/images/news1-16.png'
                            });
                            me.add(detailSection);
                        }
                    }
                }
            }
        });
        
        me.callParent();
    }
});