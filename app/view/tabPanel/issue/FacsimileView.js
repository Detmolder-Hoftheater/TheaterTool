/**
 * Creates class pmdCE.view.facsimileView.FacsimileView that extend from Ext.form.Panel.
 * @class
 * @classdesc pmdCE.view.facsimileView.FacsimileView for show facsimile.
 */
Ext.define('TheaterTool.view.tabPanel.issue.FacsimileView', {
	extend: 'Ext.panel.Panel',
	requires:[
	'TheaterTool.view.tabPanel.issue.LeafletFacsimile'],

border: true,
	flex:1,
bodyBorder: true,
bodyPadding:10,
autoScroll: true,
region: 'east',
	
/*border: true,
flex:1,
bodyPadding: 5,*/
pageSpinner: null,

leafletFacsimile: null,

selectedWork: null,

	/**
	 * Set title for view and create leaflet component.
	 * @overrides
	 */
	initComponent: function () {
		
		var me = this;

	
		me.leafletFacsimile = new TheaterTool.view.tabPanel.issue.LeafletFacsimile({margin: '0 0 5 0'})

/*me.pageSpinner = Ext.create('TheaterTool.view.tabPanel.repertoire.beat.PageSpinner', {
			leafletFacsimile : me.leafletFacsimile,
			selectedWork: me.selectedWork
		});	*/
//me.pageSpinner.setStore(25);

		me.items =[ 
me.leafletFacsimile


/*{
			xtype: 'leafletmapview',
margin: '0 0 5 0'
		},*/


//me.pageSpinner


];

/*var Interactions = new Array(1, 2, 3);
this.bbar = Ext.create('Ext.PagingToolbar', {
            //store: Interactions,
            //displayInfo: false,
pageSize: 25,
			region: 'center'
            //preprendButtons: false,
          /\* listeners: {
                afterrender : function() {
                    this.child('#refresh').hide();
                }
            }*\/
        });*/


		this.callParent()
	},

	getLeafletFacsimile: function(){
		return this.leafletFacsimile;
	},

getPageSpinner: function(){
	return this.pageSpinner;
},
	
	click: function () {		
		console.log("Click");
	}
});



Ext.define('TheaterTool.view.tabPanel.issue.PageSpinner', {
	extend: 'Ext.container.Container',
	
	alias: 'widget.verPageSpinner',
	
	layout: 'hbox',

	pageID: null,

	leafletFacsimile: null,

	selectedWork: null,
	
	initComponent: function () {
		
		this.items =[];
		this.callParent();
	},
	
	next: function () {
		var newValue = this.combo.getValue() + 1;
		if (this.store.indexOf(newValue) != -1) {
			

			this.leafletFacsimile.clear();
			this.leafletFacsimile.loadFacsimile(this.pageID, newValue, this.selectedWork);

			this.setPage(newValue);

			
		}
	},
	
	prev: function () {
		var newValue = this.combo.getValue() -1;
		if (this.store.indexOf(newValue) != -1) {

this.leafletFacsimile.clear();
			this.leafletFacsimile.loadFacsimile(this.pageID, newValue, this.selectedWork);
			this.setPage(newValue);
			
		}
	},
	
	setPageID: function(pageID){
		this.pageID = pageID;
	},

	setPage: function (id) {
		this.combo.setValue(id);
	},
	
	setStore: function (test) {
		
		var me = this;

//test=25;
		
		this.removeAll();
		
		var storeField = new Array(test-1);
		var value = 1;
		for (var i = 0; i <= test-1; i++) {
			storeField[i] = value++;
		}
		
		this.store = storeField;
		
		this.combo = Ext.create('Ext.form.ComboBox', {
			width: 40,
//flex:1,
			hideTrigger: true,
			queryMode: 'local',
			store: this.store,
//fieldLabel: 'Seite',
			displayField: 'name',
			editable: true,
			valueField: 'id',
			//cls: 'pageInputBox',
			autoSelect: true,
			enableKeyEvents: true,
			listeners: {			
				keydown:function (combo, e, eOpts) {
            		if (e.getKey() == 13) {

						me.leafletFacsimile.clear();
						me.leafletFacsimile.loadFacsimile(me.pageID, combo.getValue(), this.selectedWork);
            			me.setPage(combo.getValue());
						
            		}
        		}
			}
		});
		
		this.add([ 
{
        xtype: 'label',
        text: 'Seite',
        margin: '3 5 0 5'
    },

{
			xtype: 'button',
			icon: 'resources/images/page-prev-disabled.gif',
margin: '0 5 0 5',

 
			//cls: 'prev toolButton',
			listeners: {
				scope: this,
				click: this.prev
			}
		},

		this.combo, 
		
		{
			xtype: 'button',
			icon: 'resources/images/page-next-disabled.gif',
margin: '0 5 0 5',
			//cls: 'next toolButton',
			listeners: {
				scope: this,
				click: this.next
			}
		},
{
        xtype: 'label',
        text: 'von '+ test,
        margin: '3 5 0 5'
    }


]);
	}
});


/*Ext.define('pmdCE.view.main.FacsimileView', {
extend: 'Ext.form.Panel',
layout:'absolute',
region:'south',
// floatable: false,
//    margin: '5 0 0 0',

flex: 1,

autoScroll: true,

me: null,
id: 'facsimileview',


initComponent: function() {

var selectedPage = Ext.getCmp('pages').getText();

var pageMeasuresMap = Ext.getCmp('cetoolbar').pageMeasuresMap;
var test = pageMeasuresMap[selectedPage];
var value = test[0];
var endValue = test[test.length-1];

var pageStaffMap = Ext.getCmp('cetoolbar').staffNr;
var test = pageStaffMap[selectedPage];
var staffNr = test[test.length-1];

this.title = selectedPage + ' (measures: '+ value + ' - ' + endValue + '; staffNr: ' + staffNr + ')';

me = this;

Ext.Ajax.request({
url: 'resources/xql/pmd_ce_getFacsimilePage.xql',
async: false,
method: 'GET',
params: {
path: selectedPage
},
success: function(response){

me.createImage(response.responseText);

}
});

//Ext.Ajax.request({
//    //url: 'resources/xql/getZones.xql',
//    url: 'data/getZones.xql',
//    async: false,
//    method: 'GET',
//    params: {
//        path: selectedPage
//    },
//    success: function(response){
//       console.log(response)
//
//    }
//});

this.callParent()

},

createImage: function(path){
var image = Ext.create('Ext.Img', {
src: path,
renderTo: Ext.getBody()
});
image.on("load", function() {
console.log("loaded");
});


this.items = [
image
]
}

});*/