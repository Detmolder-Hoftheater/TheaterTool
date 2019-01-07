Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,
    
    autoScroll: true,
   
    workID: null,
    
    workName: null,
    workIcon: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.work.WorkDetailsSection({
            workID: me.workID, workName: me.title, workIcon: me.icon
        });
        
        me.detailSection.createComponents();
        
        me.items =[        
        me.detailSection
       ]
        me.callParent();
    }
});