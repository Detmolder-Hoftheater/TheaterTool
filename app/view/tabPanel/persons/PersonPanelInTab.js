Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,
    
    autoScroll: true,
    
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.section_details = new TheaterTool.view.tabPanel.persons.PersonTabDetails({
            dbkey: me.dbkey, personName: me.title, personIcon: me.icon
        });
        me.section_details.createContent();
        
        me.items =[       
            me.section_details
        ];
        
        me.callParent();
    }
});