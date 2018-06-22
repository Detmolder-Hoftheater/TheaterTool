Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatPanel', {
    /*extend: 'Ext.tab.Panel',
    requires:[ 'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: false,*/
    
    extend: 'Ext.panel.Panel',
    requires:[ 'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],
    
    flex: 1,
    border: true,
    bodyBorder: false,
    
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
        }
        else if (me.selectedWork === 'H020048') {
            selFolder = 'desTeufelsAnteil';
        }
        var folderForEO = selFolder + '/';
        
        
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
                    href: 'http://hoftheater-detmold.de/' + folderForEO,
                    html: 'Zur Erschließung mit Edirom Online',
                    target: "_blank"
                }
            }
            
            
            /* {xtype: 'button',
            disabled: true,
            text: '<font size = "1"><b style="color:gray;">XML ansehen</b></font>',
            style: {
            borderRight: '1px solid gray',
            borderLeft: '1px solid gray',
            borderTop: '1px solid gray',
            borderBottom: '1px solid gray'
            },
            margin: '0 3 0 5',
            listeners: {
            click: function (item, e, eOpts) {
            
            Ext.Ajax.request({
            
            url:'resources/xql/getXML.xql',
            method: 'GET',
            params: {
            uri: '/db/apps/theater-data/works/'+me.workID+'.xml',
            type: 'work'
            },
            success: function (response) {
            var testText = response.responseText;
            
            var fragment = document.createDocumentFragment('div');
            var tempDiv = document.createElement('div');
            fragment.appendChild(tempDiv);
            tempDiv.innerHTML = testText;
            
            var tmp = hljs.highlightAuto($(tempDiv).html()).value;
            var htmlVersion = '<pre>' + tmp + '</<pre>';
            var win = new Ext.window.Window({
            title: '<font style="color:gray;">XML for ' + me.workName+'</font>',
            html: htmlVersion,
            icon: me.workIcon,
            bodyStyle:{"background-color":"white"},
            height: 600,
            width: 800,
            autoScroll: true,
            bodyPadding: 10
            });
            win.show();
            
            }
            });
            
            
            }
            }
            },
             */ /*{xtype: 'button',
            text: '<font size = "1"><b style="color:gray;">XML laden</b></font>',
            disabled: true,
            style: {
            borderRight: '1px solid gray',
            borderLeft: '1px solid gray',
            borderTop: '1px solid gray',
            borderBottom: '1px solid gray'
            }
            }*/]
        };
        
        
        
        
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
        var tabpanel = tab.up('tabpanel');
        tabpanel.setActiveTab(idx);
        });
        });
        //}
        }
        }*/
        
        me.callParent();
    }
});