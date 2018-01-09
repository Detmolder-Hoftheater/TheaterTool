Ext.define('TheaterTool.view.tabPanel.zettel.TheaterZettelPanelInTabDresden', {
	extend: 'Ext.panel.Panel',
	
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
        /*var messageWindow =  Ext.MessageBox.show({
           // title: 'Load Incipits',
            msg: 'Loading...'
            //buttons: Ext.MessageBox.OK
        });*/
        Ext.Ajax.request({
            url: 'resources/xql/getMonthsByZettelYear.xql',
            method: 'GET',
            params: {
                selectedYear: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
                
                /*var objs = new Array();
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
                }*/
                
                for (i = 0; i < json.names.length; i++) {
                    if (json.names[i] !== undefined) {
                    
                    console.log(json.names[i]);
                    /*me.title = '<font size="2" face="Arial" style="color:#A87678;">'+json.names[i] +'</font>';
        me.icon =  'resources/images/Day-17.png';*/
        me.section_details = new TheaterTool.view.tabPanel.zettel.ZettelTextSection({
            regieName: json.names[i], title: '<font size="2" face="Arial" style="color:#A87678;">'+json.names[i] +'</font>', icon: 'resources/images/Day-17.png'
        });
                    
                    
                     /* var detailSection = new TheaterTool.view.tabPanel.revenue.RevenueTextSection({
            month: json.names[i], year: me.year, value: 2, title: '<b style="color:#A87678;">'+objs[i]+'</b>', selectedMonth: me.monat,
            selectedWorkID: me.selectedWorkID, messageWindow: messageWindow, rev_index: i, rev_length:objs.length-1
        });*/
        me.add(me.section_details );
        
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