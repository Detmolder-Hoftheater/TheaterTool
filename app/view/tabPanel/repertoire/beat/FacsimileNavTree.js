/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.beat.FacsimileNavTree', {
	 extend: 'Ext.tree.Panel',
requires:[
	'Ext.tree.*',
	'TheaterTool.model.FacsimileNavigation'
	],
   //xtype: 'basic-trees',
    width: 200,
   // flex: 0.23,
    autoScroll: true,
  
	rootVisible: false,
	 //store: store,
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
header: false,
collapsible: true,
leafletFacsimile: null,
	pageSpinner: null,

//	title: '<font style="color:#A87678;">Spielbetrieb</font>',
/*'<b style="color:gray;">Spielbetrieb</b>',*/

	tabPanel: null,
    // style: {
     
     /* borderRight: '1px solid #A80016',
      borderLeft: '1px solid #A80016',*/
     // borderTop: '1px solid gray'
      //borderBottom: '1px solid #A80016'
   // },
border:true,
bodyborder: false,
bodyPadding: 3,

pageNumber: null,

selectedWork: null,
    
    initComponent: function() {

var me = this;

me.listeners = {
			
			itemclick: function (record, item, index, e, eOpts) {
				console.log(record);
console.log(item);
console.log(index);
console.log(e);
console.log(eOpts);
me.leafletFacsimile.clear();
me.leafletFacsimile.loadFacsimile(item.data.xmlid, 1, me.selectedWork);
var number = me.leafletFacsimile.getPageNumber();
me.pageSpinner.setStore(number);
me.pageSpinner.setPage(1);
me.pageSpinner.setPageID(item.data.xmlid);

			}
		};

       me.columns =[ {
			xtype: 'treecolumn',
			header: '<b style="color:gray;">Stimmen</b>',
			flex: 1,
			//sortable: true,
			menuDisabled: true,
			dataIndex: 'name'
			
		}

		//this.incipitsColumn,
		//this.detailsColumn,
		//this.xmlColumn
		
		];

        me.callParent();
    },

setLeafletFacsimile: function(leafletFacsimile){
	this.leafletFacsimile = leafletFacsimile;
},

setPageSpinner: function(pageSpinner){
	this.pageSpinner = pageSpinner;
}

	
});