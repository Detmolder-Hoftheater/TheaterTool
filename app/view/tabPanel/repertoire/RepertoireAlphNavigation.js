Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireAlphNavigation', {
    extend: 'Ext.tab.Panel',
    
    tabBar: {
        layout: {
            pack: 'center'
        }
        
    },
    
    defaults: {
        
        split: false
    },
   
    initComponent: function () {
        
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        
        
        var objs = new Array();
        
        for (var i = 0; i < alphabet.length; i++)
        objs[i] = {
            
            title: alphabet[i]
        };
        
        
        this.items = objs;
        
        this.callParent()
    }
});