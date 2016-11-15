Ext.define('TheaterTool.view.tabPanel.repertoire.incipits.IncipitsTabPanel', {
    extend: 'Ext.tab.Panel',
    
    //autoScroll: true,
    
    flex: 1,
    border: false,
    //bodyPadding:15,
    
    personSection: null,
    detailSection: null,
    sourcesSection: null,
    overviewSection: null,
    detailSection_xml: null,
    
    sourceID: null,
    werkTitle: null,
    
    
    initComponent: function () {
        
        var me = this;
        
        /*var app = TheaterTool.getApplication();
        var sourceStore = app.createStoreForSource();
        sourceStore.getProxy().extraParams.sourceID = this.sourceID;
        sourceStore.load();*/
        
        //this.personSection = new TheaterTool.view.tabPanel.repertoire.RepertoirePersonSection({workID: this.sourceID, type: 'source'});
        
        me.detailSection = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSection({
            sourceID: me.sourceID
        });
        
        me.detailSection_xml = new TheaterTool.view.tabPanel.repertoire.incipits.IncipitDetailsSectionXML({
            sourceID: me.sourceID
        });
        
        me.items =[        
            me.detailSection,
            me.detailSection_xml
        ]
        
        me.listeners = {
            render: function () {
                //if (Ext.browser.is('Firefox')) {
                me.items.each(function (itm, idx) {
                    itm.tab.on('focus', function (tab) {
                        var tabpanel = tab.up('tabpanel');
                        tabpanel.setActiveTab(idx);
                    });
                });
                //}
            }
        }
        
        me.callParent();
    }
});