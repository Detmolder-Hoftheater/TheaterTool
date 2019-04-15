Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSection', {
    extend: 'Ext.panel.Panel',
   border: false,
    flex: 1,
    bodyBorder: false,
    style: {
        
        borderLeft: '25px solid white'
    },
    autoScroll: true,
    repertoireTab: null,
    
    sourceID: null,
    
    bodyStyle: {
        "background-color": "white"
    },
    
    in_panel: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel({
            sourceID: me.sourceID, in_panel: me.in_panel
        });
        
        me.items =[
        me.repertoireTab];
        
        this.callParent();
    }
});