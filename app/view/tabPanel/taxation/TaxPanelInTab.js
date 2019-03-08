Ext.define('TheaterTool.view.tabPanel.taxation.TaxPanelInTab', {
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
        me.icon = 'resources/images/tax.png';
        var section_details = new TheaterTool.view.tabPanel.taxation.TaxTabDetails({
            regieName: me.regieName, count: me.count, dbkey: me.dbkey
        });
        
        me.items =[
            section_details
        ]
       
        me.callParent();
    }
});