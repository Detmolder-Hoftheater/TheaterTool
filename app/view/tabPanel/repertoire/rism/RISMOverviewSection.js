Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMOverviewSection', {
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
            url: 'resources/xql/getOverview.xql',
            method: 'GET',
            params: {
                path: me.path
            },
            success: function (response) {
                
                var htmlText = response.responseText;
                
                 me.text = htmlText;
                 me.add({
            html: me.text,
            bodyPadding: 10,
            border: false
        });
              
            }
        });
        
        this.callParent();
    },
    
    setTextInfo: function (infoText, me) {
    
    me.add(
            {
                html: infoText
            }
        );
       
    }
});