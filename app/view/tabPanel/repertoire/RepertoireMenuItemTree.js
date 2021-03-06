Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireMenuItemTree', {
    extend: 'Ext.tree.Panel',
    
    requires:[
    'Ext.tree.*',
    'TheaterTool.model.Werk'],
    
    //reserveScrollbar: true,
    
    //useArrows: true,
    //rootVisible: false,
    //store: store ,
    region: 'east',
    reserveScrollbar: true,
    
    useArrows: true,
    rootVisible: false,
    //lines: false,
    rowLines: true,
    columnLines: true,
    
    bodyPadding: 5,
    
    header: false,
    //hideHeaders: true,
    
    //title: '<b style="color:gray;">Werke</b>',
    
    // region:'west',
    // region:'east',
    //       flex: 3.3,
    border: true,
    
    flex: 1.6,
    width: 200,
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
    incipitsPanel: null,
    workName: null,
    sourceTitle: null,
    
    selectedWork: null,
    
    navButton: null,
    
    initComponent: function () {
        
        var me = this;
        
        //this.xmlColumn = this.createColumn('XML', 'resources/images/Download.png');
        //this.incipitsColumn = this.createColumn('Incipits', 'resources/images/Door-24.png');
        //this.detailsColumn = this.createColumn('Facsimile', 'resources/images/Door-24.png');
        
        this.listeners = {
            
            selectionchange: function (selected, eOpts) {
                
                if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 1) {
                    /*if(me.sourcePanel !== null){
                    me.repertoirePanel.removeAll(true);
                    }
                    if(me.rismPanel !== null){
                    me.repertoirePanel.removeAll(true);
                    }*/
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
                    //me.navButton.setText('<b style="color:#A87678;">Werk: '+eOpts[0].data.name+'; '+eOpts[0].data.componist+'</b>');
                } else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 2) {
                    me.repertoirePanel.removeAll(true);
                    var workIcon = 'resources/images/SourceRed.png';
                    /*var workIcon = '';
                    if (extWorkKeys.indexOf(eOpts[0].parentNode.data.werkID) > -1) {
                        workIcon = 'resources/images/SourceBlue.png';
                    } else {
                        workIcon = 'resources/images/SourceRed.png';
                    }*/
                    me.sourcePanel = new TheaterTool.view.tabPanel.repertoire.source.SourcePanel({
                        sourceID: eOpts[0].data.sourceID, werkTitle: eOpts[0].parentNode.data.name, title: '<font size="2" face="Arial" style="color:#A87678;">' + GUI_NAMES.workTabTailSourceTitle + ': ' + eOpts[0].data.name + '</font>', firstTabTitle: eOpts[0].data.physLocation, icon: workIcon, workId: eOpts[0].parentNode.data.werkID
                    });
                    me.repertoirePanel.add(me.sourcePanel);
                    //me.navButton.setText('<b style="color:#A87678;">'+eOpts[0].data.name+' (Werk: '+eOpts[0].parentNode.data.name+'; '+eOpts[0].parentNode.data.componist+')</b>');
                } else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 3) {
                    //console.log(eOpts[0].data);
                    
                    /*if(eOpts[0].data.name === 'Incipits' && name.indexOf('Bettelstudent') > -1){
                    me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsPanel({sourceID: eOpts[0].parentNode.parentNode.data.werkID});
                    me.repertoirePanel.add(me.incipitsPanel);
                    me.navButton.setText('<b style="color:gray;">Werk: '+eOpts[0].parentNode.parentNode.data.name+', '+eOpts[0].parentNode.parentNode.data.componist+' -> '+eOpts[0].parentNode.data.name+' -> Incipits</b>');
                    }*/
                    //else
                    if (eOpts[0].data.name === 'Incipits') {
                        me.repertoirePanel.removeAll(true);
                        var name = eOpts[0].parentNode.parentNode.data.name;
                        me.incipitsPanel = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel({
                            sourceID: eOpts[0].parentNode.parentNode.data.werkID
                        });
                        me.repertoirePanel.add(me.incipitsPanel);
                        //me.navButton.setText('<b style="color:#A87678;">Incipits für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
                    } else if (eOpts[0].data.name === 'Beschreibung') {
                        me.repertoirePanel.removeAll(true);
                        var name = eOpts[0].parentNode.parentNode.data.name;
                        me.rismPanel = new TheaterTool.view.tabPanel.repertoire.rism.RISMPanel({
                            sourceID: eOpts[0].parentNode.data.werkID, title: eOpts[0].parentNode.data.name, title: '<font size="2" face="Arial" style="color:#A87678;">Beschreibung für ' + eOpts[0].parentNode.data.name + '</font>'
                        });
                        me.repertoirePanel.add(me.rismPanel);
                        //me.navButton.setText('<b style="color:#A87678;">RISM für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
                    }
                    //else if(eOpts[0].data.name === 'Faksimiles'){
                    
                    //me.navButton.setText('<b style="color:#A87678;">Faksimiles für '+eOpts[0].parentNode.data.name+' (Werk: '+eOpts[0].parentNode.parentNode.data.name+'; '+eOpts[0].parentNode.parentNode.data.componist+')</b>');
                    //}
                } else if (typeof eOpts[0] !== 'undefined' && eOpts[0].data.depth === 4) {
                    console.log(eOpts[0].parentNode.parentNode.data);
                    me.repertoirePanel.removeAll(true);
                    me.beatPanel = new TheaterTool.view.tabPanel.repertoire.beat.BeatPanel({
                        sourceID: eOpts[0].parentNode.parentNode.data.sourceID,selectedWork: me.selectedWork, xmlId: eOpts[0].data.xmlid, title: '<b style="color:#A87678;">Faksimiles für ' + eOpts[0].data.name + ' (' + eOpts[0].parentNode.parentNode.data.name + ')</b>'
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
            flex: 1,
            //sortable: true,
            menuDisabled: true,
            dataIndex: 'name'
        }
        ];
       
        this.callParent();
    },
    
    setRepertoirePanel: function (repertoirePanel) {
        
        this.repertoirePanel = repertoirePanel;
    },
    
    setNavButton: function (navButton) {
        
        this.navButton = navButton;
    },
    
    setWorkSelection: function (selectedWork) {
        this.selectedWork = selectedWork;
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