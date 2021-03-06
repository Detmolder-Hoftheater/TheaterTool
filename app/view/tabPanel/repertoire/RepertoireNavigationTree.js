Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree', {
    extend: 'Ext.tree.Panel',
    
    requires:[
    /*'Ext.data.*',
    'Ext.grid.*',*/
    'Ext.tree.*',
    'TheaterTool.model.Werk'],
    
    //reserveScrollbar: true,
    
    //useArrows: true,
    //rootVisible: false,
    //store: store ,
    
    reserveScrollbar: true,
    
    useArrows: true,
    rootVisible: false,
    //lines: false,
    rowLines: true,
    columnLines: true,
    
    bodyPadding: 5,
    
    //header: false,
    icon: 'resources/images/BooksVert-17.png',
    
    //title: '<b style="color:gray;">Werke</b>',
    
    xmlColumn: null,
    incipitsColumn: null,
    detailsColumn: null,
    
    // region:'west',
    region: 'east',
    flex: 4,
    border: true,
    /* style: {
    borderRight: 'px solid whote'
    // borderLeft: '3px solid #FFF',
    // borderTop: '3px solid #FFF',
    // borderBottom: '3px solid #FFF'
    },*/
    
    
    collapsible: true,
    
    
    //bodyStyle:{"grid-row-cell-background-color":"#A80016"},
    
    workPanel: null,
    sourcePanel: null,
    rismPanel: null,
    repertoirePanel: null,
    beatPanel: null,
    workName: null,
    selectedWork: null,
    incipitsPanel: null,
    
    initComponent: function () {
        
        var me = this;
        
        //this.xmlColumn = this.createColumn('XML', 'resources/images/Download.png');
        //this.incipitsColumn = this.createColumn('Incipits', 'resources/images/Door-24.png');
        //this.detailsColumn = this.createColumn('Facsimile', 'resources/images/Door-24.png');
        
        this.listeners = {
            
            selectionchange: function (selected, eOpts) {
                if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 1) {
                    var workIcon = 'resources/images/Books1-17.png';
                    /*var workIcon = '';
                    if (extWorkKeys.indexOf(eOpts[0].data.werkID) > -1) {
                        workIcon = 'resources/images/BookBlau-16.png';
                    } else {
                        workIcon = 'resources/images/Books1-17.png';
                    }*/
                    me.repertoirePanel.removeAll(true);
                    me.workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails({
                        workID: eOpts[0].data.werkID, title: '<font size="2" face="Arial" style="color:#A87678;">' + GUI_NAMES.workTabTailTitle_1 + ': ' + eOpts[0].data.name + '</font>', icon: workIcon
                    });
                    me.repertoirePanel.add(me.workPanel);
                    //me.repertoirePanel.setTitle('<font size="2" face="Arial" style="color:#A87678;">Werk: '+eOpts[0].data.name+'</font>');
                    //me.repertoirePanel.setIcon(workIcon);
                } else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 2) {
                    me.repertoirePanel.removeAll(true);
                    var workIcon = 'resources/images/SourceRed.png';
                    /*var workIcon = '';
                    if (extWorkKeys.indexOf(eOpts[0].parentNode.data.werkID) > -1) {
                        workIcon = 'resources/images/SourceBlue.png';
                    } else {
                        workIcon = 'resources/images/SourceRed.png';
                    }*/
                    //console.log(workIcon);
                    me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel({
                        sourceID: eOpts[0].data.sourceID, werkTitle: eOpts[0].parentNode.data.name, title: '<font size="2" face="Arial" style="color:#A87678;">' + GUI_NAMES.workTabTailSourceTitle + ': ' + eOpts[0].data.name + '</font>', firstTabTitle: eOpts[0].data.physLocation, icon: workIcon, workId: eOpts[0].parentNode.data.werkID
                    });
                    me.repertoirePanel.add(me.sourcePanel);
                    //me.repertoirePanel.setTitle('<b style="color:#A87678;">'+eOpts[0].data.name+' (Werk: '+eOpts[0].parentNode.data.name+'; '+eOpts[0].parentNode.data.componist+')</b>');
                } else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 3) {
                    //console.log(eOpts[0].data);
                    
                    /*if(eOpts[0].data.name === 'Incipits' && name.indexOf('Bettelstudent') > -1){
                    me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel();
                    me.repertoirePanel.add(me.incipitsPanel);
                    me.repertoirePanel.setTitle('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> Incipits</b>');
                    }*/
                    //else
                    if (eOpts[0].data.name === 'Incipits') {
                        me.repertoirePanel.removeAll(true);
                        me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel({
                            sourceID: eOpts[0].parentNode.parentNode.data.werkID
                        });
                        me.repertoirePanel.add(me.incipitsPanel);
                        //me.repertoirePanel.setTitle('<b style="color:#A87678;">Incipits für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
                    } else if (eOpts[0].data.name === 'Beschreibung') {
                        me.repertoirePanel.removeAll(true);
                        me.rismPanel = new TheaterTool.view.tabPanel.repertoire.rism.RISMPanel({
                            sourceID: eOpts[0].parentNode.data.werkID, title: eOpts[0].parentNode.data.name, title: '<font size="2" face="Arial" style="color:#A87678;">Beschreibung für ' + eOpts[0].parentNode.data.name + '</font>'
                        });
                        me.repertoirePanel.add(me.rismPanel);
                        //me.repertoirePanel.setTitle('<b style="color:#A87678;">RISM für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
                    }
                    /*else if(eOpts[0].data.name === 'Faksimiles'){
                    me.repertoirePanel.removeAll(true);
                    me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel({selectedWork: eOpts[0].parentNode.parentNode.data.werkID, title: '<b style="color:#A87678;">Faksimiles für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>'});
                    me.repertoirePanel.add(me.beatPanel);
                    //me.repertoirePanel.setTitle('<b style="color:#A87678;">Faksimiles für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
                    }*/
                } else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 4) {
                    //console.log(eOpts[0].parentNode.parentNode.data.sourceID);
                    me.repertoirePanel.removeAll(true);
                    me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel({
                        sourceID: eOpts[0].parentNode.parentNode.data.sourceID,selectedWork: eOpts[0].parentNode.parentNode.parentNode.data.werkID, xmlId: eOpts[0].data.xmlid, title: '<b style="color:#A87678;">Faksimiles für ' + eOpts[0].data.name + ' (' + eOpts[0].parentNode.parentNode.data.name + ')</b>'
                    });
                    me.repertoirePanel.add(me.beatPanel);
                }
                /*if (typeof selectedObject !== 'undefined') {
                Ext.getCmp('leafletfacsimile').showMeasure(selectedObject);
                this.showXMLforSelectedElement(selectedObject);
                }*/
            }
        };
        
        
        this.columns =[ {
            xtype: 'treecolumn',
            header: '<b style="color:gray;">' + GUI_NAMES.workTabTableColumn_1 + '</b>',
            flex: 2,
            sortable: true,
            menuDisabled: true,
            dataIndex: 'name'
        },
        /*{
            header: '<b style="color:gray;">' + GUI_NAMES.workTabTableColumn_2 + '</b>',
            flex: 0.9,
            sortable: true,
            menuDisabled: true,
            //align: 'center',
            dataIndex: 'nametype',
            renderer: function (val, metadata, record) {
                if (val !== '') {
                    if (val === 'uniform') {
                        val = GUI_NAMES.workTabTableColumn_2_uni;
                    } else if (val === 'alt') {
                        val = GUI_NAMES.workTabTableColumn_2_alt;
                    }
                }
                return val;
            }
        },*/
        /*{
        header: '<b style="color:gray;">Sprache</b>',
        flex: 0.3,
        sortable: true,
        menuDisabled: true,
        //align: 'center',
        dataIndex: 'language'
        
        },*/ {
            header: '<b style="color:gray;">' + GUI_NAMES.workTabTableColumn_3 + '</b>',
            flex: 1.5,
            sortable: true,
            menuDisabled: true,
            //align: 'center',
            dataIndex: 'componist'
        }];
        
        this.callParent();
    },
    
    setWorkSelection: function (selectedWork) {
        this.selectedWork = selectedWork;
    },
    
    setRepertoirePanel: function (repertoirePanel) {
        
        this.repertoirePanel = repertoirePanel;
    },
    
    createColumn: function (headerName, path) {
        
        var eColumn = Ext.create('Ext.grid.column.Action', {
            xtype: 'actioncolumn',
            header: '<b style="color:gray;">' + headerName + '</b>',
            //width: 40,
            flex: 0.2,
            align: 'center',
            menuDisabled: true,
            renderer: function (val, metadata, record) {
                
                //console.log(record.data);
                
                if (headerName == 'XML') {
                    if (record.data.xml === true) {
                        this.items[0].icon = path;
                    } else {
                        this.items[0].icon = '';
                    }
                } else if (headerName == 'Incipits') {
                    if (record.data.incipits === true) {
                        this.items[0].icon = path;
                    } else {
                        this.items[0].icon = '';
                    }
                } else if (headerName == 'Facsimile') {
                    if (record.data.details === true) {
                        this.items[0].icon = path;
                    } else {
                        this.items[0].icon = '';
                    }
                }
                
                metadata.style = 'cursor: pointer;';
                return val;
            }
            //handler: this.changeElementDialog
        });
        return eColumn;
    }
});