Ext.define('TheaterTool.view.tabPanel.persons.PersonPanelInTab', {
    /*extend: 'Ext.tab.Panel',
    
    border: false,
    
    flex: 1,
    
    dbkey: null,
    
    section_xml: null,
    section_details: null,*/
    extend: 'Ext.panel.Panel',
    
    flex: 1,
    border: true,
    bodyBorder: false,
   
    autoScroll: true,
    
    dbkey: null,
    
    initComponent: function () {
        
        var me = this;
        
        me.section_details = new TheaterTool.view.tabPanel.persons.PersonTabDetails({
            dbkey: me.dbkey, personName: me.title, personIcon: me.icon
        });
         me.section_details.createContent();
        //this.sourcesSection = new TheaterTool.view.tabPanel.repertoire.source.SourcesSection({sourceID: this.sourceID});
        
       /* me.section_xml = new TheaterTool.view.tabPanel.persons.PersonTabXML({
            dbkey: me.dbkey
        });*/
        me.items =[
        
        me.section_details
        //this.sourcesSection,
       //me.section_xml
        ];
        
       
        
       /* me.listeners = {
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
        }*/
        
        me.callParent();
    }
});