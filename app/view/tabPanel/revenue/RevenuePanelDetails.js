Ext.define('TheaterTool.view.tabPanel.revenue.RevenuePanelDetails', {
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
                        var tabpanel = tab.up('HoftheaterDetmold');
                        tabpanel.setActiveTab(idx);
                    });
                });
                //}
            }
        }
        
        me.callParent();
    }
});