Ext.define('TheaterTool.view.tabPanel.media.MediaPanelInTab', {
    extend: 'Ext.panel.Panel',
    
    requires:[
    'Ext.toolbar.TextItem',
    'Ext.view.View',
    'Ext.ux.DataView.Animated'],
    
    xtype: 'dataview-multisort',
    layout: 'fit',
    
    autoScroll: true,
    border: false,
    bodyBorder: false,
    bodyPadding: 35,
    
    flex: 1,
    
    initComponent: function () {
        
        var me = this;
        
        me.items = {
            xtype: 'dataview',
            itemTpl:[
            '<div  class="arHeadline">',
            '<a href="{url}">',
            '<div>{name}</div>',
            '<p></p>',
            '<img width="40%" height="auto" src="/exist/rest/db/apps/theater-data/media/{thumb}" />',
            '</a>',
            '<p></p>',
            '</div>'],
            itemCls: 'dataview-item',
            itemSelector: 'div.dataview-multisort-item',
            store: Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields:[ 'name', 'thumb', 'url', 'type'],
                proxy: {
                    type: 'ajax',
                    url: '/exist/rest/db/apps/theater-data/data/media.json',
                    reader: {
                        type: 'json',
                        rootProperty: ''
                    }
                }
            })
        };
        
        me.callParent();
    }
});