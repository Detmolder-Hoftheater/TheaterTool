Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesTabPanel', {
    extend: 'Ext.tab.Panel',
   
    flex: 1,
    border: false,
    
    personSection: null,
    detailSection: null,
    sourcesSection: null,
    overviewSection: null,
    detailSection_xml: null,
    
    sourceID: null,
    werkTitle: null,
    firstTabTitle: null,
   
    tabBar: {
        style: {
            background: 'white'
            }
    },
    cls: 'navigationTabPanel1',
    
    initComponent: function () {
        
        var me = this;
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.source.SourceDetailsSection({
            sourceID: me.sourceID, title: '<b style="color:gray;">' + me.firstTabTitle + '</b>'
        });
        
        me.sourcesSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesSection({
            sourceID: me.sourceID
        });
        
        
        me.items =[
        me.detailSection,
        me.sourcesSection]
        
        me.detailSection.setTitelValue();
        me.sourcesSection.createContent();
       
        me.listeners = {
            render: function () {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        me.setActiveTab(idx);
                    });
                });
                
            }
            
        }
      
        me.callParent();
    }
});
