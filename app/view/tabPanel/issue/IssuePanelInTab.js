Ext.define('TheaterTool.view.tabPanel.issue.IssuePanelInTab', {
	extend: 'Ext.panel.Panel',

 layout: {
		type: 'vbox',
		pack: 'start',
		align: 'stretch'
	},
		
	//bodyPadding: 1,
	
  flex: 1,
border: false,

   /* bodyBorder: false,
    bodyPadding: 5,
	border: false,*/

navButton: null,
year: null,
issueName: null,

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

if(me.issueName !== null){

var issuePanel = new TheaterTool.view.tabPanel.issue.IssuePanelDetails({issueName: me.issueName, year:me.year});
me.items = [
       issuePanel
    ]		
					me.navButton.setText('<b style="color:gray;">'+me.issueName+'</b>');
					
}

 	me.tbar = {
style: {
				//background: '#dadada'
		background: '#dcdcdc'
			},
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