Ext.define('TheaterTool.view.tabPanel.revenue.RevenuePanelDetails', {
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
    
    month: null,
    year: null,
  
    initComponent: function () {
        
        var me = this;
        
        me.detailSection = new TheaterTool.view.tabPanel.revenue.RevenueTextSection({
            month: me.month, year: me.year
        });
        
        me.detailSection_1 = new TheaterTool.view.tabPanel.revenue.XMLSectionRevenue({
            month: me.month, year: me.year
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