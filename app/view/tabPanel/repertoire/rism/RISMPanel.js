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
        } else if(me.sourceID === 'H220079'){
            ovPath = 'Einleitung_Mus-n16_TeufelsAnteil';
        } else{
            ovPath = 'Einleitung_Mus-n43_DieUnbekannte';           
        }
        
        
        me.overviewSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMOverviewSection({
            path: ovPath
        });
        
        me.items =[
        me.overviewSection]
        
        
        this.callParent();
    }
});