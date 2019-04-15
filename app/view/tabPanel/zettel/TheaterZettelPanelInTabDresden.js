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
        
        Ext.Ajax.request({
            url: 'resources/xql/getMonthsByZettelYear.xql',
            method: 'GET',
            params: {
                selectedYear: me.year
            },
            success: function (response) {
                
                var json = jQuery.parseJSON(response.responseText);
              
                for (i = 0; i < json.names.length; i++) {
                    if (json.names[i] !== undefined) {
                        
                        console.log(json.names[i]);
                        me.section_details = new TheaterTool.view.tabPanel.zettel.ZettelTextSection({
                            regieName: json.names[i], title: '<font size="2" face="Arial" style="color:#A87678;">' + json.names[i] + '</font>', icon: 'resources/images/Day-17.png'
                        });
                        
                        me.add(me.section_details);
                    }
                }
            }
        });
       
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