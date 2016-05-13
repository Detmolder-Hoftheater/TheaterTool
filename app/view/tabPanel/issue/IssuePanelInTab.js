Ext.define('TheaterTool.view.tabPanel.issue.IssuePanelInTab', {
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
navButton: null,
year: null,

	initComponent: function () {
var me = this;

var navTree = new TheaterTool.view.tabPanel.issue.IssueMenuItemTree({year: me.year});

var app = TheaterTool.getApplication();
		
								var store = app.creteStoreForComboMonthIssue();
			store.getProxy().extraParams.selectedYear = me.year;
			store.load();
								navTree.getView().bindStore(store);

navTree.setRepertoirePanel(me);

me.navButton = me.createCEButton(navTree);

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
	
    	this.callParent();
	},

createCEButton: function (navTree) {
		
		var me = this;
		var ceButton = Ext.create('Ext.button.Button', {
			//xtype: 'button',
			 text: '<b style="color:gray;">Ausgabe<b>',
menuAlign: 'tr-bl?',
//flex: 1,
//autoRender: true,
						//width: 130,
						menu:[	
							navTree

							
						]
                
		});
	
		
		return ceButton;
	}
});