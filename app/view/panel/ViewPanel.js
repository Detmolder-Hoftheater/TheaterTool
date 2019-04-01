Ext.define('TheaterTool.view.panel.ViewPanel', {
    extend: 'Ext.panel.Panel',
    id: 'cepanel',
    requires:[
    'Ext.layout.container.Border'],
    layout: 'border',
    flex: 1,
    
    bodyBorder: false,
    //border: false,
    
    border: false,
    style: {
        borderRight: '5px solid #F2EEE1',
        borderLeft: '5px solid #F2EEE1',
        borderTop: '3px solid #F2EEE1',
        borderBottom: '5px solid #F2EEE1'
    },
    // split:true,
    
    ceTabView: null,
    facsimileView: null,
    
    htTabView: null,
    htNavPanel: null,
    
    initComponent: function () {
        
        var labelPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            region: 'north',
            height: 33,
            style: 'display:block; background-color:white; padding:8px 0px 5px 17px',
            html: '<font style="color:gray; font-size: 14px;">Detmolder Hoftheater (1825-1875)</font>'
        });
        
        
        this.htTabView = new TheaterTool.view.tabPanel.HTTabPanel();
        
        this.htNavPanel = new TheaterTool.view.navPanel.HTNavigationPanel();
        
        this.htNavPanel.setHTTabPanel(this.htTabView);
        
        this.items =[
        labelPanel,
        this.htTabView,
        this.htNavPanel],
        
        this.callParent();
    },
    
    getHTTabPanel: function () {
        return this.htTabView;
    }
});