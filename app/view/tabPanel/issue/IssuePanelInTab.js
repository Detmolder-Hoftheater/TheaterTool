Ext.define('TheaterTool.view.tabPanel.issue.IssuePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: false,
    bodyBorder: false,
    autoScroll: true,
    
    year: null,
    issueName: null,
    
    selectedWorkID: null,
    selectedReport: null,
    count: null,
    
    initComponent: function () {
        var me = this;
        var messageWindow = Ext.MessageBox.show({
            msg: 'Loading...'
        });
        Ext.Ajax.request({
            url: 'resources/xql/getIssueNames.xql',
            method: 'GET',
            params: {
                selectedYear: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                if (me.selectedReport !== null) {
                    for (i = 0; i < json.names.length; i++) {
                        var nameMonth = json.names[i];//[0];
                        if (me.selectedReport === nameMonth) {
                            var detailSection = new TheaterTool.view.tabPanel.issue.IssueTextSection({
                                issueName: nameMonth, year: me.year, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', selectedIssueName: me.issueName, count: me.count,
                                selectedWorkID: me.selectedWorkID, rev_index: i, rev_length: i, messageWindow: messageWindow, parentPanel: me,
                                icon: 'resources/images/MoneyTransfer-17.png'
                            });
                            me.add(detailSection);
                            break;
                        }
                    }
                } else {
                    for (i = 0; i < json.names.length; i++) {
                        var nameMonth = json.names[i];//[0];
                        var detailSection = new TheaterTool.view.tabPanel.issue.IssueTextSection({
                            issueName: nameMonth, year: me.year, title: '<b style="color:gray; font-size: 12px;">' + nameMonth + '</b>', selectedIssueName: me.issueName, count: me.count,
                            selectedWorkID: me.selectedWorkID, rev_index: i, rev_length: json.names.length -1, messageWindow: messageWindow, parentPanel: me,
                            icon: 'resources/images/MoneyTransfer-17.png'
                        });
                        me.add(detailSection);
                    }
                }
            }
        });
        
        me.callParent();
    }
});