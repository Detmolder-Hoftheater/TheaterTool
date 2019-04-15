Ext.define('TheaterTool.view.tabPanel.rolebooks.RoleTabXML', {
    extend: 'Ext.panel.Panel',
    
    border: false,
    
    flex: 1,
    bodyPadding: 10,
    
    autoScroll: true,
    
    title: '<b style="color:gray;">XML</b>',
    
    regieName: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.listeners = {
            activate: function (eOpts) {
                console.log("activate");
                
                Ext.Ajax.request({
                    url: 'resources/xql/getRoleBookXML.xql',
                    method: 'GET',
                    params: {
                        regieName: me.regieName
                        
                    },
                    success: function (response, options) {
                        
                        var object = response.responseText;
                        me.setTextInfo(response);
                    }
                });
            }
        },
        
        me.callParent();
    },
    
    
    setTextInfo: function (response) {
        
        var me = this;
        
        var testText = response.responseXML;
        
        var tempDiv = document.createElementNS('http://www.tei-c.org/ns/1.0l', 'div');
        var personArr = testText.getElementsByTagName('TEI');
        tempDiv.appendChild(personArr[0]);
        
        var tmp = hljs.highlightAuto($(tempDiv).html()).value;
        var htmlVersion = '<pre>' + tmp + '</<pre>';
        
        $('#' + me.id + '-innerCt').html(htmlVersion);
       
    }
});