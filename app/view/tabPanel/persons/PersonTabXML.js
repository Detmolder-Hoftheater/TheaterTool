Ext.define('TheaterTool.view.tabPanel.persons.PersonTabXML', {
    extend: 'Ext.panel.Panel',
    
    border: true,
    
    bodyPadding: 10,
    
    flex: 1,
    
    autoScroll: true,
    
    title: '<b style="color:gray;">XML</b>',
    
    repertoireTab: null,
    
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
       
        me.listeners = {
            activate: function (eOpts) {
                console.log("activate");
                
                Ext.Ajax.request({
                    url: 'resources/xql/getPersonXML.xql',
                    
                    method: 'GET',
                    params: {
                        dbkey: me.dbkey
                        
                    },
                    success: function (response, options) {
                        
                        var object = response.responseText;
                        me.setTextInfo(object);
                    }
                });
            }
        },
        
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