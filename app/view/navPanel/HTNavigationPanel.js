Ext.define('TheaterTool.view.navPanel.HTNavigationPanel', {
    extend: 'Ext.panel.Panel',
    
    region: 'west',
    flex: 0.21,
    
    id: 'htNavigationPanel',
    
    autoScroll: true,
    
    //split: true,
    border: false,
    
    
    treePublic: null,
    treeTheaterLife: null,
    
    searchPanel: null,
    tabPanel: null,
    
    initComponent: function () {
        
        this.treePublic = new TheaterTool.view.navPanel.NavigationTreePublic();
        
        this.items =[
        this.treePublic]
        this.callParent()
    },
    
    
    setHTTabPanel: function (tabPanel) {
        this.treePublic.setHTTabPanel(tabPanel);
    }
});