Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitSection', {
    extend: 'Ext.panel.Panel',
    
    bodyPadding: 10,
    
    meiE: null,
    titlename: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.listeners = {
            'render': function (panel) {
                panel.body.on('click', function () {
                    var win = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitWindow({
                        bodyStyle: {
                            "background-color": "white"
                        },
                        title: me.titlename
                    });
                    win.show();
                    
                    win.showNoten(me.meiE);
                });
            }
        }
        me.callParent()
    },
    
    setTextInfo: function (meiE) {
        var me = this;
        me.meiE = meiE;
        
        var options = JSON.stringify({
            noLayout: 1,
            scale: 20
        });
        renderer.setOptions(options);
        
        renderer.loadData(meiE);
        
        var svg_1 = renderer.renderData(meiE, options);
        $('#' + this.id + '-innerCt').html(svg_1);
       
    }
});