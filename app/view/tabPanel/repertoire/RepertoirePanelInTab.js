/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab', {
	extend: 'Ext.panel.Panel',

	/*defaults: {
		autoScroll: true
		
	},
	flex: 1,
	border: false,
	bodyBorder: false,*/
  flex: 1,
//bodyPadding:10,
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
		/*layout: {
            pack: 'center'
        },*/
style: {
				//background: '#dadada'
background: '#dcdcdc'
			},
	height: 33,
border:false,
bodyBorder: false,
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

 /*{

				xtype: 'label',
        		html: /\*'<b style="color:gray;">Auswahl</b>',*\/
'<font size = "1"><b style="color:gray;">Auswahl</b></font>',
        		margin: '0 10 0 10'

			},*/
me.navButton
]
 //}]

 
                
           });


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
			 text: '<b style="color:gray;">Werk -> Quelle -> RISM/Facsimile/Incipits</b>',
		menuAlign: 'tr-bl?',
margin: '0 0 0 7',

/*style: {
				background: 'white'

			},*/
//border:true,
menu: Ext.create('Ext.menu.Menu', {


//title: '<b style="color:gray;">Werk -> Quelle -> RISM/Facsimile/Incipits</b>',
//collapsed: false,
//collapsible:true,

    //width: 100,

   // height: 100,

   // margin: '0 0 10 0',

    //floating: false,  // usually you want this set to True (default)

   // renderTo: Ext.getBody(),  // usually rendered by it's containing component

    items: [navTree]

}),



						/*menu:[	
							navTree

							
						],*/

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