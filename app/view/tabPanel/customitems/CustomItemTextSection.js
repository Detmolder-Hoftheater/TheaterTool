Ext.define('TheaterTool.view.tabPanel.customitems.CustomItemTextSection', {
/*extend: 'Ext.panel.Panel',
   
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,*/
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    border: false,
    bodyBorder: false,
    
    flex: 1,
    
    
   itemName: null,
    dbPath: null,
    doctype: null,
    
    initComponent: function () {
        
        var me = this;
        
          if (me.doctype === 'html' || me.doctype === 'pdf') {
        me.items =[ {
                title: me.itemName,
                
                flex: 1,
                // width: 600,
                // height: 400,
                items: {
                    xtype: 'component',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        src: '/exist/rest' + me.dbPath
                    }
                }
            }]
            }
        else {
         // image
        }
       
        
        me.callParent();
    }
    
   
});