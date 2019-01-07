Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireDetailsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-border',
    requires:[ 'Ext.layout.container.Border'],
    layout: 'border',
    flex: 1,
    bodyBorder: false,
    border: false,
    style: {
        borderRight: '7px solid white',
        borderLeft: '7px solid white',
        borderTop: '7px solid white',
        borderBottom: '7px solid white'
    },
    
    defaults: {
        autoScroll: true,
        split: true
    },
    
    navTreetitle: null,
    
    selection: null,
    
    initComponent: function () {
        
        var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree({
            title: this.navTreetitle
        });
        
        var navTreeStore = new TheaterTool.store.work.Works();
        navTreeStore.getProxy().extraParams.selection = this.selection;
        navTreeStore.getProxy().extraParams.dbsourcePath = dbPathsMap.get('sources');
        navTreeStore.getProxy().extraParams.dbPath = dbPathsMap.get('works');
        navTreeStore.getProxy().extraParams.dbexpPath = dbPathsMap.get('expressions');
        navTreeStore.getProxy().extraParams.eoutPath = dbPathsMap.get('eoutPath');
        /*console.log(dbPathsMap.get('expressions'));*/
        navTreeStore.load();
        navTree.getView().bindStore(navTreeStore);
        navTreeStore.sort('name');
        
        var repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
        navTree.setRepertoirePanel(repertoirePanel);
        
        this.items =[
        navTree,
        repertoirePanel]
        this.callParent();
    }
});