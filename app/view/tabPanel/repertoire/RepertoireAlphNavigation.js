/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoireAlphNavigation', {
	 extend: 'Ext.tab.Panel',
   // xtype: 'navigation-tabs',


   // height: 400,
   // width: 600,

//flex:1,
   // ui: 'navigation',
    tabBar: {
        layout: {
            pack: 'center'
        }
        // turn off borders for classic theme.  neptune and crisp don't need this
        // because they are borderless by default
       // border: false
    },
    
    defaults: {
       // iconAlign: 'top',
       // bodyPadding: 15,
		split: false
    },
    
    /**
	 * Create buttons and icons.
	 * @overrides
	 */
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