Ext.define('TheaterTool.view.tabPanel.playSchedules.SchedulePanelInTab', {
	extend: 'Ext.panel.Panel',

layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
		
	bodyPadding: 1,
	
  flex: 1,
border: true,

   /* bodyBorder: false,
    bodyPadding: 5,
	border: false,*/

navButton: null,
year: null,

	initComponent: function () {
var me = this;

var navTree = new TheaterTool.view.tabPanel.playSchedules.ScheduleMenuItemTree({year: me.year});

var app = TheaterTool.getApplication();
		
								var store = app.creteStoreForComboMonth();
			store.getProxy().extraParams.selectedYear = me.year;
			store.load();
								navTree.getView().bindStore(store);
	


navTree.setRepertoirePanel(me);

me.navButton = me.createCEButton(navTree);
//me.navButton.getMenu().show(me.navButton.menu, 'tr-bl?');
//(me.navButton, 'tl-bl');
//show(me.el);
//show(me.navButton.el);


navTree.setNavButton(me.navButton);


 	me.tbar = {
		/*layout: {
            pack: 'center'
        },*/
	height: 33,
              // items: [{
                    //xtype: 'segmentedbutton',

					
                    items: [/*{
                        text: '<b style="color:gray;">Werk<b>',

							handler: function() {
                                console.log("Picked #1");
								me.removeAll(true);
								var workPanel = new TheaterTool.view.tabPanel.repertoire.work.WorkPanelDetails();
								me.add(workPanel);
                        
                            }
                    }, */


me.navButton
]
 //}]

 
                
            };



/*{
        text: 'Werk Details'
        
    }, 
'-',
{
        text: 'Quellen',
		menu:[{
                text:'Paste Menu Item'
            }]
       
    }*/


/*this.tbar = [{
            text:'Werk Details'
        },
'-',
{
            text:'Quellen',
            menu:[{
                text:'Paste Menu Item'
            }]
        }

  ]*/
	
	/*this.navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireNavigationTree();

	var app = TheaterTool.getApplication();
		
	this.navTreeStore = app.handleStoreForWorks(this.selection);

				this.navTree.getView().bindStore(this.navTreeStore);
				this.navTreeStore.sort('name');
	
	
	this.repertoirePanel = new TheaterTool.view.tabPanel.repertoire.RepertoirePanel();
	
	this.navTree.setRepertoirePanel(this.repertoirePanel);
	
    this.items = [
       this.navTree,
       this.repertoirePanel
    ]*/
    	this.callParent();
	},

createCEButton: function (navTree) {
		
		var me = this;
		var ceButton = Ext.create('Ext.button.Button', {
			//xtype: 'button',
			 text: '<b style="color:gray;">Monat<b>',
menuAlign: 'tr-bl?',

menu: Ext.create('Ext.menu.Menu', {
   
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