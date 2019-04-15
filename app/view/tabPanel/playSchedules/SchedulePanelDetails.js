Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelDetails', {
    extend: 'Ext.tab.Panel',
    
    flex: 1,
    border: true,
    bodyPadding: 15,
    
    personSection: null,
    planSection: null,
    detailSection: null,
    detailSection_1: null,
    journalSection: null,
    regieSection: null,
    roleSection: null,
    revenueSection: null,
    issueSection: null,
    
    collapsible: true,
    
    month: null,
    year: null,
    
    
    initComponent: function () {
        
        var me = this;
        
        me.detailSection_1 = new TheaterTool.view.tabPanel.playSchedules.XMLSectionSchedule({
            month: me.month, year: me.year, value: 2
        });
        
        me.detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
            month: me.month, year: me.year, xmlSection: me.detailSection_1, value: 2
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