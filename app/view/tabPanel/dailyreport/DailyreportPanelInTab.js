Ext.define('TheaterTool.view.tabPanel.dailyreport.DailyreportPanelInTab', {
    extend: 'Ext.panel.Panel',
    
    /*flex: 1,
    border: true,
    bodyBorder: false,
   
    autoScroll: true,
    regieName: null,
    
    section_xml: null,
    section_details: null,*/
    flex: 1,
    border: true,
    bodyBorder: false,
   
    autoScroll: true,
   
    year: null,
    regieName: null,
    workPanel: null,
        
    selectedWorkID: null,
    
    
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
              
                for (i = 0; i < json.names.length; i++) {
                    if (json.names[i] !== undefined) {
                     var singleNamePath = json.names[i];
                      var detailSection = new TheaterTool.view.tabPanel.dailyreport.DailyreportTextSection({
            regieName: singleNamePath[0], year: me.regieName, title: '<b style="color:#A87678;">'+singleNamePath[0]+'</b>', selectedIssueName: me.regieName,
            selectedWorkID: me.selectedWorkID, reportPath: singleNamePath[1]
        });
        me.add(detailSection);
                    }
                }
            }
        });
//        var me = this;
//        me.title = '<font size="2" face="Arial" style="color:#A87678;">Theaterjournal für '+me.regieName +'</font>';
//        me.icon =  'resources/images/Presse-16.png';
//        me.section_details = new TheaterTool.view.tabPanel.dailyreport.DailyreportTextSection({
//            regieName: me.regieName
//        });
//        
//        me.items =[
//        
//        me.section_details
//        //me.section_xml
//        ],
        
        
        
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
            text: '<font size="2" face="Arial" style="color:#A87678;"><b>Tagesbericht</b></font>',
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