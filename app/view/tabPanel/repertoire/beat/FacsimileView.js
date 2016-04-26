/**
 * Creates class pmdCE.view.facsimileView.FacsimileView that extend from Ext.form.Panel.
 * @class
 * @classdesc pmdCE.view.facsimileView.FacsimileView for show facsimile.
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.beat.FacsimileView', {
	extend: 'Ext.panel.Panel',
	requires:[
	'TheaterTool.view.tabPanel.repertoire.beat.LeafletFacsimile'],

	// collapsible: false,
   //collapsed: true,

    //title: '<b style="color:gray;">Text</b>',
//border: false,
flex:1,
 //margin: '0 0 15 0',
bodyPadding: 5,
pageSpinner: null,
	
	/**
	 * Set title for view and create leaflet component.
	 * @overrides
	 */
	initComponent: function () {
		
		var me = this;


me.pageSpinner = Ext.create('TheaterTool.view.tabPanel.repertoire.beat.PageSpinner', {
			//width: 220,
			//cls: 'pageSpinner'
		});	
me.pageSpinner.setStore(25);	
		

		this.items =[ {
			xtype: 'leafletmapview',
margin: '0 0 5 0'
		},


me.pageSpinner
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
	
	click: function () {		
		console.log("Click");
	}
});



Ext.define('TheaterTool.view.tabPanel.repertoire.beat.PageSpinner', {
	extend: 'Ext.container.Container',
	
	alias: 'widget.verovioPageSpinner',
	
	layout: 'hbox',

	
	//pageBasedView: null,
	
	initComponent: function () {
		
		this.items =[];
		this.callParent();
	},
	
	next: function () {
		var newValue = this.combo.getValue() + 1;
		if (this.store.indexOf(newValue) != -1) {
			this.setPage(newValue);
			
		}
	},
	
	prev: function () {
		var newValue = this.combo.getValue() -1;
		if (this.store.indexOf(newValue) != -1) {
			this.setPage(newValue);
			
		}
	},
	
	
	setPage: function (id) {
		this.combo.setValue(id);
	},
	
	setStore: function (test) {
		
		var me = this;

test=25;
		
		this.removeAll();
		
		var storeField = new Array(test-1);
		var value = 1;
		for (var i = 0; i <= test-1; i++) {
			storeField[i] = value++;
		}
		
		this.store = storeField;
		
		this.combo = Ext.create('Ext.form.ComboBox', {
			//width: 150,
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
            			me.setPage(combo.getValue());
						
            		}
        		}
			}
		});
		
		this.add([ 

{
        xtype: 'label',
        text: 'Seite'
        //margins: '15 5 0 5'
    },
{
			xtype: 'button',
			icon: 'resources/images/page-prev-disabled.gif',


 
			//cls: 'prev toolButton',
			listeners: {
				scope: this,
				click: this.prev
			}
		},
		this.combo, 
		/*{
        xtype: 'label',
        text: 'von '+ test,
        margins: '15 5 0 5'
    },*/
		{
			xtype: 'button',
			icon: 'resources/images/page-next-disabled.gif',
			//cls: 'next toolButton',
			listeners: {
				scope: this,
				click: this.next
			}
		}]);
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