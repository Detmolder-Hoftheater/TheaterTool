Ext.define('TheaterTool.view.tabPanel.issue.XMLSectionIssue', {
    
    extend: 'Ext.panel.Panel',
    
    title: '<b style="color:gray;">XML</b>',
    
    border: true,
    flex: 1,
    bodyBorder: true,
    bodyPadding: 10,
    autoScroll: true,
    
    
    issueName: null,
    year: null,
    
    initComponent: function () {
        
        var me = this;
       
        me.listeners = {
            activate: function (eOpts) {
                Ext.Ajax.request({
                    url: 'resources/xql/getIssueXML.xql',
                    method: 'GET',
                    params: {
                        issueName: me.issueName,
                        year: me.year
                    },
                    success: function (response) {
                        me.setTextInfo(response.responseText);
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