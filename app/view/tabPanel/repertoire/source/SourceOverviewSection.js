Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection', {
    extend: 'Ext.panel.Panel',
   
    autoScroll: true,
    border: false,
    bodyPadding: 10,
    flex: 1,
    
    path: null,
    
    repertoireTab: null,
    
    initComponent: function () {
        
        var me = this;
        
        Ext.Ajax.request({
            url: 'resources/xql/getOverviewSource.xql',
            method: 'GET',
            params: {
                path: me.path
            },
            success: function (response) {
                // for Firefox
                var htmlText = response.responseText;
                me.html = htmlText;
                // for Safari
                me.setTextInfo(htmlText);
            }
        });
        
        this.callParent();
    },
    
    setTextInfo: function (infoText) {
        
        $('#' + this.id + '-innerCt').html(infoText);
    }
});