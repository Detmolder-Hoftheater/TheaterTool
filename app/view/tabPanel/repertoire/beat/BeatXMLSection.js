Ext.define('TheaterTool.view.tabPanel.repertoire.beat.BeatXMLSection', {
    extend: 'Ext.form.FieldSet',
    
    collapsible: true,
    collapsed: true,
    
    title: '<b style="color:gray;">XML</b>',
    
    flex: 1,
    
    initComponent: function () {
        
        var me = this;
        
        me.repertoireTab = new TheaterTool.view.tabPanel.repertoire.work.TabXMLWork({
            sourceID: this.sourceID
        });
        
        me.items =[
        this.repertoireTab],
        
        me.listeners = {
            expand: function (p, eOpts) {
                console.log("expand");
                
            }
        },
        
        this.callParent();
    }
  
});