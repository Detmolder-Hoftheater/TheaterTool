var store = Ext.create('Ext.data.TreeStore', {

 root: {
        text: 'Start',
		expanded: true,
   		children: [{
        	text: 'Bass-Violoncello',
			//icon: 'resources/images/Library-17.png',
        	leaf:true       	
    	},
{
        	text: 'Chorstimme Sopran 1',
			//icon: 'resources/images/Library-17.png',
        	leaf:true       	
    	},
{
        	text: 'Chorstimme Sopran 1=2',
			//icon: 'resources/images/Library-17.png',
        	leaf:true       	
    	}
]
}
})


/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree', {
	 extend: 'Ext.tree.Panel',
   //xtype: 'basic-trees',
    width: 200,
   // flex: 0.23,
   // autoScroll: true,
  
	rootVisible: false,
	 store: store,
height: 200,
	
 //  layout: {
  //      type: 'table'
        //columns: 4
       // tdAttrs: { style: 'padding: 10px;' }
 //   },
   
  /* defaults: {
        xtype: 'treepanel',
      	//width: 260,
      	
        rootVisible: false,
        store: store
    },*/

reserveScrollbar: true,
	
	useArrows: true,
	

//	title: '<font style="color:#A87678;">Spielbetrieb</font>',
/*'<b style="color:gray;">Spielbetrieb</b>',*/

	tabPanel: null,
    // style: {
     
     /* borderRight: '1px solid #A80016',
      borderLeft: '1px solid #A80016',*/
     // borderTop: '1px solid gray'
      //borderBottom: '1px solid #A80016'
   // },
border:false,
bodyborder: false,
bodyPadding: 3,
    
    initComponent: function() {

/*this.listeners = {
			
			itemdblclick: function (record, item, index, e, eOpts) {
				
			}
		};*/

        this.items = [
            {
                title: 'Start',
                useArrows: true
            }
        ];

        this.callParent();
    }

	
});