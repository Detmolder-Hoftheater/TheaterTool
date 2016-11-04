Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
    extend: 'Ext.tab.Panel',
    requires:['TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: false,
    
    detailSection: null,
    xmlSection: null,
    navTree: null,    
    selectedWork: null,
       
    initComponent: function () {
        
        var selFolder = null;
        if (this.selectedWork === 'Aschenbrödel') {
            selFolder = 'aschenbroedel';
        } else if (this.selectedWork === 'Der Bettelstudent') {
            selFolder = 'bettelstudent';
        }
        var folderForEO = selFolder + '/';
        
        this.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView({
            selectedWork: this.selectedWork
        });
        
        this.navTree = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree({
            selectedWork: this.selectedWork
        });
        
        var leafletFacsimile = this.detailSection.getLeafletFacsimile();
        var pageSpinner = this.detailSection.getPageSpinner();
        
        this.navTree.setLeafletFacsimile(leafletFacsimile);
        this.navTree.setPageSpinner(pageSpinner);
        
        this.items =[ {
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
                this.navTree,
                this.detailSection
            ]
        }];
        var navTreeStore = new TheaterTool.store.facsimile.FacsimileNames();
        navTreeStore.getProxy().extraParams.selectedWork = this.selectedWork;
        navTreeStore.load();
        this.navTree.getView().bindStore(navTreeStore);
        //navTreeStore.sort('name');
        
        this.callParent();
    }
});