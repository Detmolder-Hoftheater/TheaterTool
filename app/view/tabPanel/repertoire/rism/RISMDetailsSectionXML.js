Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMDetailsSectionXML', {
    extend: 'Ext.panel.Panel',
    
    border: true,
    flex: 1,
    bodyBorder: true,
    bodyPadding: 10,
    autoScroll: true,
    
    
    title: '<b style="color:gray;">XML</b>',
    
    repertoireTab: null,
    
    sourceID: null,
    
    initComponent: function () {
        
        var me = this;
       
        me.listeners = {
            activate: function (eOpts) {
                
                Ext.Ajax.request({
                    url: 'resources/xql/getRismXML.xql',
                    method: 'GET',
                    params: {
                        sourceID: me.sourceID
                    },
                    success: function (response, options) {
                        var object = response.responseText;
                        me.setTextInfo(object);
                    }
                });
            }
        }
        
        me.callParent();
    },
    
    setTextInfo: function (infoText) {
        
        var me = this;
        
        var fragment = document.createDocumentFragment('div');
        var tempDiv = document.createElement('div');
        fragment.appendChild(tempDiv);
        tempDiv.innerHTML = infoText;
       
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        
        $('#' + me.id + '-innerCt').html('<pre>' + tmp + '</pre>');
    }
});