Ext.define('TheaterTool.view.tabPanel.abo.AboTabDetails', {
    extend: 'Ext.panel.Panel',
   
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    
    
    regieName: null,
    
    initComponent: function () {
        
        var me = this;
        
        
        Ext.Ajax.request({
            url: 'resources/xql/getAboContent.xql',
            method: 'GET',
            params: {
                regieName: me.regieName
            },
            success: function (response) {
                var tableInhalt = response.responseText;
                
                me.add({
                    
                    html: tableInhalt,
                    border: false
                });
               
            }
        });
        
        
        me.callParent();
    },
    
    setTextInfo: function (infoText) {
        $('#' + this.id + '-innerCt').html(infoText);
    }
});