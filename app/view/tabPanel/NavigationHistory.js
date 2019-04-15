Ext.define('TheaterTool.view.tabPanel.NavigationHistory', {
    extend: 'Ext.panel.Panel',
    
    region: 'north',
    flex: 0.12,
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    
    bodyPadding: 5,
    
    border: false,
    collapsible: true,
    collapsed: true,
    title: '<b style="float: right; color:gray;">Verlauf</b>',
    bodyBorder: true,
    
    initComponent: function () {
        var me = this;
       
        me.items =[ {
            html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
            border: false
        }, {
            html: '<img src="resources/images/BooksVert-17.png" style="width:23px;height:23px;">',
            border: false
        }, {
            html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
            border: false
        }, {
            html: '<img src="resources/images/Gender.png" style="width:23px;height:23px;">',
            border: false
        }
       
        ]
        me.callParent();
    }
});
