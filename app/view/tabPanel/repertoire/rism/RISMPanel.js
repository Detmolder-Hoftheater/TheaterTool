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
        console.log(me.sourceID);
        if (me.sourceID === 'H220074') {
            ovPath = 'Einleitung_Mus-n120_Aschenbroedel';
        } 
        else if (me.sourceID === 'H220080') {
            ovPath = 'Einleitung_Mus-n237_Bettelstudent';
        } 
        else if(me.sourceID === 'H220079'){
            ovPath = 'Einleitung_Mus-n16_TeufelsAnteil';
        } 
        else if(me.sourceID === 'H220004'){
            ovPath = 'Einleitung_Mus-n43_DieUnbekannte';           
        }
        else if(me.sourceID === 'H220233'){
            ovPath = 'Einleitung_Mus-n235_DerMueller';           
        }
        else if(me.sourceID === 'H220116'){
            ovPath = 'Einleitung_Mus-L31_Yelva_Lortzing';           
        }
        else if(me.sourceID === 'H220126'){
            ovPath = 'Einleitung_Mus-n195_Yelva_Reissiger';           
        }
        else if(me.sourceID === 'H220022'){
            ovPath = 'Einleitung_Mus_n58_Kapellmeister';           
        }
        else if(me.sourceID === 'H220154'){
            ovPath = 'Einleitung_Mus_n136_Joseph';           
        }
        
        
        me.overviewSection = new TheaterTool.view.tabPanel.repertoire.rism.RISMOverviewSection({
            path: ovPath
        });
        
        me.items =[
        me.overviewSection]
        
        
        this.callParent();
    }
});