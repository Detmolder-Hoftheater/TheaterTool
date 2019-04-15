Ext.define('TheaterTool.view.tabPanel.dailyreport.DailyreportPanelDetails', {
    extend: 'Ext.tab.Panel',
    
    flex: 1,
    border: false,
    
    personSection: null,
    planSection: null,
    detailSection: null,
    detailSection_1: null,
    journalSection: null,
    regieSection: null,
    roleSection: null,
    revenueSection: null,
    issueSection: null,
    
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
        me.detailSection,       
            me.detailSection_1
        ]
        
        me.listeners = {
            render: function () {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        var tabpanel = tab.up('HoftheaterDetmold');
                        tabpanel.setActiveTab(idx);
                    });
                });
            }
        }
        
        me.callParent();
    }
});