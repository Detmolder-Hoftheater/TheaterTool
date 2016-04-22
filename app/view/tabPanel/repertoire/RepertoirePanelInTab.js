/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.RepertoirePanelInTab', {
	extend: 'Ext.panel.Panel',

 /*xtype: 'layout-border',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout: 'border',*/
  
	//flex: 1,


    bodyBorder: false,
   // border: false,
    bodyPadding: 5,
border: false,
 /*style: {
      borderRight: '7px solid white',
      borderLeft: '7px solid white',
      borderTop: '7px solid white',
     borderBottom: '7px solid white'
    },*/
    
   
 /*  defaults: {
		autoScroll: true,
		split: true
	},*/


	initComponent: function () {
var me = this;

var navTree = new TheaterTool.view.tabPanel.repertoire.RepertoireMenuItemTree();

								var app = TheaterTool.getApplication();
		
								var navTreeStore = app.handleStoreForWorks('Aschenbrödel');
								navTree.getView().bindStore(navTreeStore);
navTree.setRepertoirePanel(me);

 	this.tbar = {
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

{
                        text: '<b style="color:gray;">Navigation<b>',
						width: 90,
expand: true,
						menu:[

	
	navTree

							
						]
                  }]
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
	}
});