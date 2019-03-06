Ext.define('TheaterTool.view.tabPanel.issue.IssuePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    /*layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    flex: 1,
    border: false,
    
    navButton: null,
    year: null,
    issueName: null,*/
    
    flex: 1,
    border: true,
    bodyBorder: false,
   
    autoScroll: true,
   
    year: null,
    issueName: null,
    workPanel: null,
        
    selectedWorkID: null,
    selectedReport: null,
    count: null,
    
    initComponent: function () {
        var me = this;
        var messageWindow =  Ext.MessageBox.show({
           // title: 'Load Incipits',
            msg: 'Loading...'
            //buttons: Ext.MessageBox.OK
        });
        Ext.Ajax.request({
            url: 'resources/xql/getIssueNames.xql',
            method: 'GET',
            params: {
                selectedYear: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
              
                for (i = 0; i < json.names.length; i++) {
                    var nameMonth = json.names[i];//[0];
                    
                    if(me.selectedReport !== null){
                        var title = json.names[i];//[1];
                        if(me.selectedReport === title){
                             
            var detailSection = new TheaterTool.view.tabPanel.issue.IssueTextSection({
            issueName: title, year: me.year, title: '<b style="color:#A87678;">'+title+'</b>', selectedIssueName: me.issueName, count:me.count, selectedReport: me.selectedReport,
            selectedWorkID: me.selectedWorkID, rev_index: i, rev_length:i, messageWindow: messageWindow, parentPanel:me
        });
        me.add(detailSection);
        break;
                        }
                    }
                    else{
                        
        var detailSection = new TheaterTool.view.tabPanel.issue.IssueTextSection({
            issueName: nameMonth, year: me.year, title: '<b style="color:#A87678;">'+nameMonth+'</b>', selectedIssueName: me.issueName, count:me.count, selectedReport: me.selectedReport,
            selectedWorkID: me.selectedWorkID, rev_index: i, rev_length:json.names.length-1, messageWindow: messageWindow, parentPanel:me
        });
        me.add(detailSection);
                        
                    }
             
                }
            }
        });
     
        me.callParent();
    },
    
    createButton: function (navTree) {
        var me = this;
        var ceButton = Ext.create('Ext.button.Button', {
            text: '<font size="2" face="Arial" style="color:#A87678;"><b>Ausgabe</b></font>',
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