Ext.define('TheaterTool.view.tabPanel.repertoire.work.WorkDetailsTabPanel', {
    extend: 'Ext.panel.Panel',
    
    extend: 'Ext.panel.Panel',
    border: true,
    flex: 1,
    bodyBorder: true,
    bodyPadding: 10,
    autoScroll: true,
    
    initComponent: function () {
        
        var me = this;
        
        var path = dbPathsMap. get ('works');
        Ext.Ajax.request({
            url: 'resources/xql/getWorkText.xql',
            method: 'GET',
            params: {
                uri: path+ '/' + me.workID + '.xml',
                type: 'work'
            },
            success: function (response) {
                me.setTextInfo(response.responseText);
            }
        });
        
        this.callParent();
    },
   
    setTextInfo: function (infoText) {
        $('#' + this.id + '-innerCt').html(infoText);
    }
});