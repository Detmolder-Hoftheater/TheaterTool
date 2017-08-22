Ext.define('TheaterTool.view.tabPanel.regiebooks.RegiePanelInTab', {
    /*extend: 'Ext.tab.Panel',
    
    border: true,
    
    flex: 1,
    bodyPadding: 3,
    
    */
    
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,
   
    autoScroll: true,
    
    section_xml: null,
    section_details: null,
    
    regieName: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.title = '<font size="2" face="Arial" style="color:#A87678;">'+me.regieName +'</font>';
        me.icon =  'resources/images/Crown-17.png';
        
        me.section_details = new TheaterTool.view.tabPanel.regiebooks.RegieTabDetails({
            regieName: me.regieName
        });
        
       /* me.section_xml = new TheaterTool.view.tabPanel.regiebooks.RegieTabXML({
            regieName: me.regieName
        });*/
        me.items =[       
            me.section_details
            //me.section_xml
        ]
        
        /*me.listeners = {
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
        }*/
        
        me.callParent();
    }
});