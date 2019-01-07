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
                selectedYear: me.year,
                dbPath: dbPathsMap.get('expenses')
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                console.log(json.names.length);
                for (i = 0; i < json.names.length; i++) {
                    if (json.names[i] !== undefined) {
                        var nameArray = json.names[i];
                        var name = nameArray[0];
                        var issueID = nameArray[1];
                        var detailSection = new TheaterTool.view.tabPanel.issue.IssueTextSection({
                            issueName: name, year: me.year, title: '<b style="color:#A87678;">' + name + '</b>', selectedIssueName: me.issueName,
                            selectedWorkID: me.selectedWorkID, issueID: issueID, messageWindow: messageWindow, rev_index: i, rev_length:json.names.length-1
                        });
                        me.add(detailSection);
                    }
                }
            }
        });
        
        
        
        /*var navTree = new TheaterTool.view.tabPanel.issue.IssueMenuItemTree({ year: me.year });
        var store = new TheaterTool.store.issue.IssueNames();
        store.getProxy().extraParams.selectedYear = me.year;
        store.load();
        navTree.getView().bindStore(store);
        navTree.setRepertoirePanel(me);
        
        me.navButton = me.createButton(navTree);
        navTree.setNavButton(me.navButton);
        
        if (me.issueName !== null) {
        var issuePanel = new TheaterTool.view.tabPanel.issue.IssuePanelDetails({
        issueName: me.issueName,
        year: me.year
        });
        me.items =[issuePanel]
        me.navButton.setText('<font size="2" face="Arial" style="color:#A87678;"><b>' + me.issueName + '</b></font>');
        }
        
        me.tbar = {
        style: {
        background: '#dcdcdc'
        },
        height: 33,
        items:[me.navButton]
        };*/
        
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