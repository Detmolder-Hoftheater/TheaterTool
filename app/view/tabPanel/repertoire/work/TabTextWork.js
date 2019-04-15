Ext.define('TheaterTool.view.tabPanel.repertoire.work.TabTextWork', {
    extend: 'Ext.panel.Panel',
    
    bodyPadding: 10,
    
    minHeight: 200,
    
    resizable: true,
    
    autoScroll: true,
    reserveScrollbar: true,
    
    setTextInfo: function (infoText) {
        $('#' + this.id + '-innerCt').html(infoText);
    }
});