Ext.define('TheaterTool.view.tabPanel.dailyreport.DailyreportPanelDetails', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.tab.Panel',
    
    flex: 1,
    border: false,
    //bodyPadding:15,
    
    personSection: null,
    planSection: null,
    detailSection: null,
    detailSection_1: null,
    journalSection: null,
    regieSection: null,
    roleSection: null,
    revenueSection: null,
    issueSection: null,
    
    /*layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
    },
    
    bodyPadding: 15,
    
    /\*defaults: {
    frame: true
    },*\/
    
    border: false,*/
    
    issueName: null,
    year: null,
    
   
    initComponent: function () {
        
        var me = this;
        
        me.detailSection = new TheaterTool.view.tabPanel.dailyreport.DailyreportTextSection({
            issueName: me.issueName, year: me.year
        });
        
        me.detailSection_1 = new TheaterTool.view.tabPanel.dailyreport.XMLSectionDailyreport({
            issueName: me.issueName, year: me.year
        });
        
        me.items =[
        /*{
        xtype: 'label',
        html: '<b style="color:gray;">Übersicht</b>',
        margin: '0 0 10 0'
        
        },*/
        me.detailSection,
        
        /*{
        html: '<img src="resources/images/Download.png" style="width:11px;height:14px;">',
        border: false,
        margin: '0 0 -11 0'
        },*/
        me.detailSection_1
        
        /*{
        xtype: 'label',
        html: '<b style="color:gray;">Referenzen</b>',
        margin: '10 0 10 0'
        
        }*/]
        
        me.listeners = {
            render: function () {
                //if (Ext.browser.is('Firefox')) {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        var tabpanel = tab.up('tabpanel');
                        tabpanel.setActiveTab(idx);
                    });
                });
                //}
            }
        }
        
        me.callParent();
    }
});