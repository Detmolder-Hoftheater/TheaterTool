Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
    /*extend: 'Ext.tab.Panel',
    requires:[ 'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: false,*/
    
    extend: 'Ext.panel.Panel',
    requires:[ 'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: false,
    bodyBorder: false,
    
     header:{
   style: {
      backgroundColor:'#FFFFFF',
      backgroundImage:'none'
     // borderBottom: '5px solid #F2EEE1'
   }
},
    
    //autoScroll: true,
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    
    //bodyPadding: 10,
    // title: '<b style="color:gray;">Übersicht</b>',
    defaults: {
        frame: true,
        bodyPadding: 10
    },
    
    
    
    detailSection: null,
    xmlSection: null,
    navTree: null,
    selectedWork: null,
    
    xmlId: null,
    
    initComponent: function () {
        
        var me = this;
        
        
        var selFolder = null;
        console.log(me.selectedWork);
        if (me.selectedWork === 'H020149') {
            selFolder = 'aschenbroedel';
        } else if (me.selectedWork === 'H020263') {
            selFolder = 'bettelstudent';
        } else if (me.selectedWork === 'H020048') {
            selFolder = 'desTeufelsAnteil';
        } else if (me.selectedWork === 'H020076') {
            selFolder = 'unbekannte';
        }
        
        var folderForEO = selFolder + '/';
        
        /*if (me.selectedWork === 'H020076') {
            me.tbar = {
                style: {
                    background: '#dcdcdc'
                },
                border: false,
                fixed: true,
                height: 25,
                items:[ {
                    xtype: 'component',
                    margin: '0 0 0 13',
                    autoEl: {
                        tag: 'a',
                        href: 'http://nashira.upb.de:7107/exist/apps/EdiromOnline/',
                        html: 'Zur Erschließung mit Edirom Online',
                        target: "_blank"
                    }
                }]
            };
        } else {*/
        if(me.selectedWork === 'H020166' || me.selectedWork === 'H020224' || me.selectedWork === 'H021013'){
            me.tbar = {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 30,
                html: '<i>Die Faksimiles werden noch nicht angezeigt. Die Seite ist noch in Bearbeitung.</i>',
                style: 'display:block; padding:5px 0px 5px 10px; background: white;'
            };
        }
        else{
            me.tbar = {
                style: {
                    background: 'white'
                },
                border: false,
                fixed: true,
                height: 25,
                items:[ {
                    xtype: 'component',
                    margin: '0 0 0 13',
                    autoEl: {
                        tag: 'a',
                        href: 'https://edirom.hoftheater-detmold.de/' + folderForEO,
                        html: 'Zur Erschließung mit Edirom Online',
                        target: "_blank"
                    }
                }]
            };
            }
        //}
        
        
        
        
        
        /* var selFolder = null;
        if (me.selectedWork === 'H020149') {
        selFolder = 'aschenbroedel';
        } else if (me.selectedWork === 'H020263') {
        selFolder = 'bettelstudent';
        }
        var folderForEO = selFolder + '/';*/
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileView({
            selectedWork: me.selectedWork, xmlId: me.xmlId
        });
        
        
        
        /* me.navTree = new TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree({
        selectedWork: me.selectedWork
        });*/
        
        var leafletFacsimile = me.detailSection.getLeafletFacsimile();
        var pageSpinner = me.detailSection.getPageSpinner();
        
        /*leafletFacsimile.clear();
        leafletFacsimile.loadFacsimile(me.xmlId, 1, me.selectedWork);
        var number = leafletFacsimile.getPageNumber();
        pageSpinner.setStore(number);
        pageSpinner.setPage(1);
        pageSpinner.setPageID(me.xmlId);*/
        
        /*me.navTree.setLeafletFacsimile(leafletFacsimile);
        me.navTree.setPageSpinner(pageSpinner);*/
        
        me.items =[
        me.detailSection];
        /* var navTreeStore = new TheaterTool.store.facsimile.FacsimileNames();
        navTreeStore.getProxy().extraParams.selectedWork = me.selectedWork;
        navTreeStore.load();
        me.navTree.getView().bindStore(navTreeStore);
        navTreeStore.sort('name');*/
        
        /*me.listeners = {
        render: function () {
        //if (Ext.browser.is('Firefox')) {
        me.items.each(function (itm, idx) {
        itm.tab.on('focus', function (tab) {
        var tabpanel = tab.up('HoftheaterDetmold');
        tabpanel.setActiveTab(idx);
        });
        });
        //}
        }
        }*/
        
        me.callParent();
    }
});