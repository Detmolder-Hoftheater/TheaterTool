Ext.define('TheaterTool.view.tabPanel.repertoire.rism.RISMPanel', {
    sourceID: null,
    werkTitle: null,
    
    extend: 'Ext.panel.Panel',
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    autoScroll: true,
    border: false,
    flex: 1,
    sourceID: null,
    header: {
        style: {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'none'
        }
    },
    
    initComponent: function () {
        var me = this;
        var ovPath = '';
        if (me.sourceID === 'H020149') {
            ovPath = 'Einleitung_Mus-n120_Aschenbroedel';
        } else if (me.sourceID === 'H020263') {
            ovPath = 'Einleitung_Mus-n237_Bettelstudent';
        } else {
            ovPath = 'Einleitung_Mus-n16_TeufelsAnteil';
        }
        
        
        me.overviewSection = new TheaterTool.view.tabPanel.repertoire.source.SourceOverviewSection({
            path: ovPath
        });
        
        me.items =[
        me.overviewSection]
        
        
        this.callParent();
    }
});