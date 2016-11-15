Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
    extend: 'Ext.tab.Panel',
    requires:[ 'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: false,
    
    detailSection: null,
    xmlSection: null,
    navTree: null,
    selectedWork: null,
    
    initComponent: function () {
    
        var me = this;
        
        var selFolder = null;
        if (me.selectedWork === 'Aschenbrödel') {
            selFolder = 'aschenbroedel';
        } else if (me.selectedWork === 'Der Bettelstudent') {
            selFolder = 'bettelstudent';
        }
        var folderForEO = selFolder + '/';
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView({
            selectedWork: me.selectedWork
        });
        
        me.navTree = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree({
            selectedWork: me.selectedWork
        });
        
        var leafletFacsimile = me.detailSection.getLeafletFacsimile();
        var pageSpinner = me.detailSection.getPageSpinner();
        
        me.navTree.setLeafletFacsimile(leafletFacsimile);
        me.navTree.setPageSpinner(pageSpinner);
        
        me.items =[ {
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            
            bodyPadding: 10,
            title: '<b style="color:gray;">Übersicht</b>',
            defaults: {
                frame: true,
                bodyPadding: 10
            },
            
            border: false,
            items:[
            me.navTree,
            me.detailSection]
        }];
        var navTreeStore = new TheaterTool.store.facsimile.FacsimileNames();
        navTreeStore.getProxy().extraParams.selectedWork = me.selectedWork;
        navTreeStore.load();
        me.navTree.getView().bindStore(navTreeStore);
        //navTreeStore.sort('name');
        
        me.listeners = {
            render: function () {
                //if (Ext.browser.is('Firefox')) {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        var tabpanel = tab.up('tabpanel');
                        tabpanel.setActiveTab(idx);
                    });
                });
                //}
            }
        }
        
        me.callParent();
    }
});