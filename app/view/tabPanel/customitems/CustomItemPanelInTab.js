Ext.define('TheaterTool.view.tabPanel.customitems.CustomItemPanelInTab', {
sourceID: null,
    werkTitle: null,
    
    extend: 'Ext.panel.Panel',
    
    // title: '<b style="color:gray;">Übersicht</b>',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: true,
    //bodyPadding: 10,
    flex: 1,
   /* extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,
    
    autoScroll: true,*/
    
    itemName: null,
    dbPath: null,
    doctype: null,
    
    initComponent: function () {
        var me = this;
        
        var detailSection = new TheaterTool.view.tabPanel.customitems.CustomItemTextSection({
                            title: '<b style="color:#A87678;">' + me.itemName + '</b>', dbPath: me.dbPath, doctype: me.doctype
                        });
                         me.items =[detailSection];
        
       
        
        me.callParent();
    }
});