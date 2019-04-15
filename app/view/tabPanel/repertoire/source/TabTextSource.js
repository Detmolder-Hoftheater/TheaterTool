Ext.define('TheaterTool.view.tabPanel.repertoire.source.TabTextSource', {
    extend: 'Ext.panel.Panel',
    
    bodyPadding: 10,
    
    initComponent: function () {
        var me = this;
        
        
        Ext.Ajax.request({
            url: 'resources/xql/getSourceText.xql',
            method: 'GET',
            params: {
                uri: '/db/apps/theater-data/sources/' + this.sourceID + '.xml',
                type: 'source'
            },
            success: function (response) {
                $('#' + me.id + '-innerCt').html(response.responseText);
               
            }
        });
        
        this.callParent();
    },
    
    setTextInfo: function (infoText) {
        
        $('#' + this.id).html(infoText);
    }
});