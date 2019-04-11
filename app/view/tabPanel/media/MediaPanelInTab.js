Ext.define('TheaterTool.view.tabPanel.media.MediaPanelInTab', {
extend: 'Ext.panel.Panel',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated'
    ],

    xtype: 'dataview-multisort',
    layout: 'fit', 
    
   /* layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },*/
    autoScroll: true,
    border: false,
    bodyBorder: false,
    bodyPadding: 10,
   
    
    flex: 1,
    dbkey: null,
    
    
    
    initComponent: function () {
        
        var me = this;
       
        me.items = {
           /* xtype: 'dataview',
            inline:true,*/
           xtype: 'dataview',
           
                //height: '100%',
                //flex:1,
               // styleHtmlContent: true,
               //width: '100%',
               // centered:true,
                /* layout: {
                    type: 'fit'
                },
                inline: {
                    wrap: true
                },*/
            itemTpl: [
                //'<tpl for=".">',
                    '<div  class="arHeadline">',
                   /* '<div class="dataview-multisort-item">', */                     
                        '<a href="{url}">',
                        '<div>{name}</div>',
                        '<p></p>',
                       '<img width="40%" height="auto" src="resources/images/media/{thumb}" />',
                      // <img src="resources/images/media/{thumb}" />',                       
                        '</a>',
                        '<p></p>',
                    '</div>'
                //'</tpl>'
            ],
            itemCls: 'dataview-item',
           /* plugins: {
                xclass: 'Ext.ux.DataView.Animated'
            },*/
            itemSelector: 'div.dataview-multisort-item',
            store: Ext.create('Ext.data.Store', {
                autoLoad: true,
                //sortOnLoad: true,
                fields: ['name', 'thumb', 'url', 'type'],
                proxy: {
                    type: 'ajax',
                    url : 'resources/data/sencha-touch-examples.json',
                    reader: {
                        type: 'json',
                        rootProperty: ''
                    }
                }
            })
        };

        //this.callParent(arguments);
        
        /*var test = new Array();
        for(i = 0; i < 38; i++){
        test[i] = {
        icon: 'resources/images/media/'+(i+1)+'.jpg'
            }
           
        }
        me.items =test;*/
        
       
       
        
        
        
       
       /* me.listeners = {
            click: function () {
                     console.log('da');       
                            }
                    
            }*/
        
        me.callParent();
       // me.updateStoreSorters();
    }
    
});