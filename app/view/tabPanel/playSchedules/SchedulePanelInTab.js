Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,
    //bodyPadding:10,
    
    autoScroll: true,
    
    //reserveScrollbar: true,
    
    /*layout: {
    type: 'hbox',
    pack: 'start',
    align: 'stretch'
    },*/
    
    /* flex: 1,
    border: false,*/
    
    navButton: null,
    year: null,
    monat: null,
    workPanel: null,
    
    selectedWorkID: null,
    
    
    initComponent: function () {
        var me = this;
        
        /*var navTree = new TheaterTool.view.tabPanel.playSchedules.ScheduleMenuItemTree({
        year: me.year
        });
        var store = new TheaterTool.store.schedule.ScheduleMonths();
        store.getProxy().extraParams.selectedYear = me.year;
        store.load();
        navTree.getView().bindStore(store);
        navTree.setRepertoirePanel(me);
        
        me.navButton = me.createButton(navTree);
        navTree.setNavButton(me.navButton);*/
        
        var messageWindow =  Ext.MessageBox.show({
           // title: 'Load Incipits',
            msg: 'Loading...'
            //buttons: Ext.MessageBox.OK
        });
        
        Ext.Ajax.request({
            url: 'resources/xql/getMonthsForSelectedYear.xql',
            method: 'GET',
            params: {
                selectedYear: me.year,
                dbPath: dbPathsMap.get('playschedule')
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                for (i = 0; i < json.names.length; i++) {
                    if (json.names[i] !== undefined) {
                        var nameArray = json.names[i];
                        var name = nameArray[0];
                        var schedID = nameArray[1];
                        var detailSection = new TheaterTool.view.tabPanel.playSchedules.ScheduleTextSection({
                            month: name, year: me.year, value: 2, title: '<b style="color:#A87678;">' + name + '</b>', selectedMonth: me.monat,
                            selectedWorkID: me.selectedWorkID, schedID: schedID, messageWindow: messageWindow, rev_index: i, rev_length:json.names.length-1
                        });
                        me.add(detailSection);
                    }
                }
            }
        });
        
        /* if (me.monat !== null) {
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
        };*/
        
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