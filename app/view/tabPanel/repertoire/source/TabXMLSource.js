Ext.define('TheaterTool.view.tabPanel.repertoire.source.TabXMLSource', {
    extend: 'Ext.panel.Panel',
    
    bodyPadding: 10,
    
    autoScroll: true,
    
    border: true,
    
    initComponent: function () {
        this.callParent();
    },
    
    
    setTextInfo: function (infoText) {
       
        var me = this;
        
        var fragment = document.createDocumentFragment('div');
        var tempDiv = document.createElement('div');
        fragment.appendChild(tempDiv);
        tempDiv.innerHTML = infoText;
        
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        
        $('#' + me.id + '-body').html('<pre>' + tmp + '</pre>');
    }
});