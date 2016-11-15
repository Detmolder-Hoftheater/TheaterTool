Ext.define('TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab', {
    extend: 'Ext.tab.Panel',
    
    border: true,
    
    flex: 1,
    bodyPadding: 3,
    
    regieName: null,
    
    section_xml: null,
    section_details: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.section_details = new TheaterTool.view.tabPanel.gagebooks.GageBookTabDetails({
            regieName: me.regieName
        });
        
        me.section_xml = new TheaterTool.view.tabPanel.gagebooks.GageBookTabXML({
            regieName: me.regieName
        });
        me.items =[
        
        me.section_details,
        me.section_xml]
        
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