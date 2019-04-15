Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitWindow', {
    extend: 'Ext.window.Window',
    title: '<b style="color:#A87678;">Incipit</b>',
    
    
    width: 1000,
    height: 500,
    
    border: false,
    
    autoScroll: true,
    
    maximizable: true,
    meiE: null,
    
    showNoten: function (meiE) {
        var me = this;
        var options = JSON.stringify({
            noLayout: 1,
            scale: 50
        });
        renderer.setOptions(options);
        
        renderer.loadData(meiE);
        console.log(me.id);
        var svg_1 = renderer.renderData(meiE, options);
        $('#' + me.id + '-innerCt').html(svg_1);
    }
});