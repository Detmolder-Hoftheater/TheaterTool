Ext.define('TheaterTool.view.tabPanel.revenue.RevenuePanelInTab', {
    extend: 'Ext.panel.Panel',
    
    /*layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    flex: 1,
    border: false,
    
    navButton: null,
    year: null,
    monat: null,*/
       
    flex: 1,
    border: true,
    bodyBorder: false,
   
    autoScroll: true,
   
    year: null,
    monat: null,
    workPanel: null,
    
    selectedWorkID: null,  
    
    initComponent: function () {
        var me = this;
        
        Ext.Ajax.request({
            url: 'resources/xql/getMonthsByRevenueYear.xql',
            method: 'GET',
            params: {
                selectedYear: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                var objs = new Array();
                for (i = 0; i < json.names.length; i++) {
                    var name = json.names[i];
                    if (name === 'Januar') {
                        objs[1] = name;
                    } else if (name === 'Februar') {
                        objs[2] = name;
                    } else if (name === 'März') {
                        objs[3] = name;
                    } else if (name === 'April') {
                        objs[4] = name;
                    } else if (name === 'Mai') {
                        objs[5] = name;
                    } else if (name === 'Juni') {
                        objs[6] = name;
                    } else if (name === 'Juli') {
                        objs[7] = name;
                    } else if (name === 'August') {
                        objs[8] = name;
                    } else if (name === 'September') {
                        objs[9] = name;
                    } else if (name === 'Oktober') {
                        objs[10] = name;
                    } else if (name === 'November') {
                        objs[11] = name;
                    } else {
                        objs[12] = name;
                    }
                }
                
                for (i = 0; i < objs.length; i++) {
                    if (objs[i] !== undefined) {
                    
                      var detailSection = new TheaterTool.view.tabPanel.revenue.RevenueTextSection({
            month: objs[i], year: me.year, value: 2, title: '<b style="color:#A87678;">'+objs[i]+'</b>', selectedMonth: me.monat,
            selectedWorkID: me.selectedWorkID
        });
        me.add(detailSection);
                    }
                }
            }
        });
        
       /* var navTree = new TheaterTool.view.tabPanel.revenue.RevenueMenuItemTree({
            year: me.year
        });
        
        var store = new TheaterTool.store.revenue.RevenueMonths();
        store.getProxy().extraParams.selectedYear = me.year;
        store.load();
        navTree.getView().bindStore(store);        
        navTree.setRepertoirePanel(me);
        
        me.navButton = me.createButton(navTree);       
        navTree.setNavButton(me.navButton);
        
        if (me.monat !== null) {           
            me.workPanel = new TheaterTool.view.tabPanel.revenue.RevenuePanelDetails({
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
        
        me.callParent();
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