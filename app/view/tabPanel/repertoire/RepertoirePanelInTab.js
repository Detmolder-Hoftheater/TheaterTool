/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab', {
	extend: 'Ext.panel.Panel',


layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
		
	//bodyPadding: 1,
	
  flex: 1,
border: false,
navButton: null,
selection: null,

	initComponent: function () {
var me = this;

var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireMenuItemTree();

								var app = TheaterTool.getApplication();
		
								var navTreeStore = app.handleStoreForWorks(me.selection);
								navTree.getView().bindStore(navTreeStore);
				navTree.setRepertoirePanel(me);

me.navButton = me.createCEButton(navTree);

navTree.setNavButton(me.navButton);
navTree.setWorkSelection(me.selection);



 	me.tbar =  new Ext.Toolbar({
		style: {
				//background: '#dadada'
		background: '#dcdcdc'
			},
		height: 33,
		border:false,
		bodyBorder: false,
              // items: [{
                    //xtype: 'segmentedbutton',

					
                    items: [
me.navButton
]
      
           });

    	this.callParent();
	},

createCEButton: function (navTree) {
		
		var me = this;
		var ceButton = Ext.create('Ext.button.Button', {
			//xtype: 'button',
			 text: '<b style="color:gray;">Werk -> Quelle -> RISM/Facsimile/Incipits</b>',
	
	menuAlign: 'tr-bl?',
margin: '0 0 0 7',

menu: Ext.create('Ext.menu.Menu', {
//closable: true,
		style: {
		background: '#dcdcdc'
			},
    items: [navTree]

}),

	listeners: {
          afterrender: function() {                       
			me.navButton.menu.show(); 
			me.navButton.menu.setPosition(35,100);

                    }
                }
                
		});
			
		return ceButton;
	}
});