Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSection', {
    extend: 'Ext.panel.Panel',
    
    title: '<b style="color:gray;">Übersicht</b>',
    border: true,
    flex: 1,
    bodyBorder: true,
    bodyPadding: 10,
    autoScroll: true,
    
    repertoireTab: null,
    
    initComponent: function () {
        
        this.repertoireTab = new TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsTabPanel();
        
        this.items =[
        this.repertoireTab],
        
        this.callParent();
    }
});