Ext.define('TheaterTool.view.tabPanel.gagebooks.GageBookPanelInTab', {
   extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,   
    autoScroll: true,
        
    regieName: null,
    count: null,
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.title = '<font size="2" face="Arial" style="color:#A87678;">' + me.regieName + '</font>';
        me.icon = 'resources/images/Gift-17.png';
        
        var section_details = new TheaterTool.view.tabPanel.gagebooks.GageBookTabDetails({
            regieName: me.regieName, dbkey: me.dbkey, count: me.count
        });
       
        me.items =[        
            section_details
        ]
       
        me.callParent();
    }
});