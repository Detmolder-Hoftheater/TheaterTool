Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    flex: 1,
    border: false,
    
    navButton: null,
    year: null,
    monat: null,
    workPanel: null,
    
    initComponent: function () {
        var me = this;
        
        var navTree = new TheaterTool.view.tabPanel.playSchedules.ScheduleMenuItemTree({
            year: me.year
        });
        var store = new TheaterTool.store.schedule.ScheduleMonths();
        store.getProxy().extraParams.selectedYear = me.year;
        store.load();
        navTree.getView().bindStore(store);
        navTree.setRepertoirePanel(me);
        
        me.navButton = me.createButton(navTree);
        navTree.setNavButton(me.navButton);
        
        if (me.monat !== null) {
            me.workPanel = new TheaterTool.view.tabPanel.playSchedules.SchedulePanelDetails({
                month: me.monat, year: me.year
            });
            me.items =[me.workPanel]
            me.navButton.setText('<b style="color:gray;">' + me.monat + '</b>');
        }
        
        me.tbar = {
            style: {
                background: '#dcdcdc'
            },
            height: 33,
            items:[me.navButton]
        };
        
        this.callParent();
    },
    
    createButton: function (navTree) {
        var me = this;
        var ceButton = Ext.create('Ext.button.Button', {
            text: '<b style="color:gray;">Monat<b>',
            menuAlign: 'tr-bl?',
            menu: Ext.create('Ext.menu.Menu', {
                style: {
                    background: '#dcdcdc'
                },
                items:[navTree]
            }),
            listeners: {
                afterrender: function () {
                    me.navButton.menu.show();
                    me.navButton.menu.setPosition(35, 100);
                }
            }
        });
        
        return ceButton;
    }
});