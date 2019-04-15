Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsTabPanel', {
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    bodyPadding: 10,
   
    autoScroll: true,
    
    border: false,
    
    setTextInfo: function (infoText) {
        $('#' + this.id + '-innerCt').html(infoText);
    }
});