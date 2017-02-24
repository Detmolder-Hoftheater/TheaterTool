Ext.define('TheaterTool.view.tabPanel.playSchedules.ScheduleMenuItemTree', {
    extend: 'Ext.tree.Panel',
    requires:[
    /*'Ext.data.*',
    'Ext.grid.*',*/
    'Ext.tree.*',
    'TheaterTool.model.MonthNumber'],
    
    
    //reserveScrollbar: true,
    
    //useArrows: true,
    //rootVisible: false,
    //store: store ,
    
    reserveScrollbar: true,
    
    useArrows: true,
    rootVisible: false,
    //store: store,
    //lines: false,
    //rowLines: true,
    //columnLines: true,
    
    bodyPadding: 5,
    
    header: false,
    
    hideHeaders: true,
    
    //title: '<b style="color:gray;">Werke</b>',
    
    // region:'west',
    // region:'east',
    //       flex: 3.3,
    border: true,
    
    //height: 200,
    flex: 1,
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
    workName: null,
    
    navButton: null,
    year: null,
    
    initComponent: function () {
        
        var me = this;
        
        
        this.listeners = {
            
            selectionchange: function (selected, eOpts) {
                if (typeof eOpts[0] !== 'undefined') {
                    me.repertoirePanel.removeAll(true);
                    me.workPanel = new TheaterTool.view.tabPanel.playSchedules.SchedulePanelDetails({
                        month: eOpts[0].data.name, year: me.year
                    });
                    me.repertoirePanel.add(me.workPanel);
                    me.navButton.setText('<b style="color:gray;">' + eOpts[0].data.name + '</b>');
                }
            }
        };
        
        /*this.columns =[ {
        xtype: 'treecolumn',
        //header: '<b style="color:gray;">Werk -> Quelle -> Facsimile/Incipits/RISM</b>',
        flex: 1,
        //sortable: true,
        menuDisabled: true,
        dataIndex: 'name'
        
        
        }];*/
        
        
        this.columns =[ {
            //xtype: 'treecolumn',
            useArrows: true,
            dataIndex: 'name',
            flex: 1,
            menuDisabled: true
        }];
        
        
        
        this.callParent();
    },
    
    setRepertoirePanel: function (repertoirePanel) {
        
        this.repertoirePanel = repertoirePanel;
    },
    
    setNavButton: function (navButton) {
        
        this.navButton = navButton;
    }
});