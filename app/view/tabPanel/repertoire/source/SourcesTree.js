/*var store = Ext.create('Ext.data.TreeStore', {
			model: 'TheaterTool.model.SourceDetails',
    		root: {
        		children: []
    		}
		})*/

/**
 * Creates class TheaterTool.view.tabPanel.CEPanel that extend from Ext.panel.Panel.
 * @class
 */
Ext.define('TheaterTool.view.tabPanel.repertoire.source.SourcesTree', {
	extend: 'Ext.tree.Panel',
	
/*reserveScrollbar: true,
	
	useArrows: true,
	rootVisible: false,
	store: store ,

	xtype: 'tree-grid',
	
	height: 200,
	
	selected_node: null,
source_list: null,*/

xtype: 'tree-grid',
    
    reserveScrollbar: true,
    
    //title: 'Core Team Projects',
//flex:1,
    height: 200,
    useArrows: true,
    rootVisible: false,
   // multiSelect: true,
   // singleExpand: true,
store: null,

selected_node: null,
source_list: null,
tablePanel: null,

initComponent: function() {
var me = this;
       // me.width = 500;

me.store = Ext.create('Ext.data.TreeStore', {
	model: 'TheaterTool.model.SourceDetails',
    root: {
        expanded: true,
        children: [
            ]
    }
});

me.columns = [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Titel',
                flex: 2,
                
                dataIndex: 'titel'
            },{
                text: 'Signatur',
                flex: 1,
                dataIndex: 'signatur'
                
            },{
                text: 'Inventarnummer',
                flex: 1,
                dataIndex: 'inventarnummer'
            },{
                text: 'Umfang',
                flex: 0.5,
                dataIndex: 'seitenzahl'
            },{
                text: 'Größe',
                flex: 0.5,
                dataIndex: 'groesse'
            },{
                text: 'Stamp',
                flex: 0.5
            }
            ]

me.listeners = {
			selectionchange: function (selected, eOpts) {
				console.log(selected);
				//this.setValues(selected);
				me.tablePanel.setValues(eOpts);
console.log(eOpts);
				//this.medium.setValue(selected.selected[0].items[0].data.medium);
		}
}

        me.callParent();
 },

setTablePanel: function(tablePanel){
	this.tablePanel=tablePanel;
},

createContentForSources: function(source_list){

	var rootNode = this.store.getRootNode();
		//var selected_node = null;
		for(i = 0; i < source_list.length; i++){
			var source_details = source_list[i];
var isLeaf = true;
if(source_details[0].source_hierlength > 0){
	isLeaf = false
}

			var source = Ext.create('TheaterTool.model.SourceDetails', {
				"titel": source_details[0].s_title,
 				'icon': 'resources/images/SourceBlue.png',
				"signatur": source_details[0].signatur,
				"inventarnummer": source_details[0].inventarnummer,
				'titlePages': source_details[0].titlePages,
				'medium': source_details[0].medium,
				'source_hier': source_details[0].source_hier,
				'inscription': source_details[0].inscription,
				's_bemerkungen': source_details[0].s_bemerkungen,
				'seitenzahl': source_details[0].seitenzahl,
				'groesse': source_details[0].groesse,
				//'condition': source_details[0].condition,
				'schreiber': source_details[0].schreiber,
				'sprache': source_details[0].sprache,
				'entstehung': source_details[0].entstehung,
				'auffuehrungen': source_details[0].auffuehrungen,
				'inhalt': source_details[0].inhalt,
				leaf: isLeaf 
			});
//console.log(source);
			rootNode.appendChild(source);

for(j = 0; j < source_details[0].source_hier.length; j++){
	var child = source_details[0].source_hier[j];
var child_source = Ext.create('TheaterTool.model.SourceDetails', {
				"titel": child.s_title,
 				'icon': 'resources/images/SourceBlue.png',
				"signatur": child.signatur,
				"inventarnummer": child.inventarnummer,
				'titlePages': child.titlePages,
				'medium': child.medium,
				'source_hier': child.source_hier,
				'inscription': child.inscription,
				's_bemerkungen': child.s_bemerkungen,
				'seitenzahl': child.seitenzahl,
				'groesse': child.groesse,
				//'condition': child.condition,
				'schreiber': child.schreiber,
				'sprache': child.sprache,
				'entstehung': child.entstehung,
				'auffuehrungen': child.auffuehrungen,
				'inhalt': child.inhalt,
				leaf: true 
			});
source.appendChild(child_source);


}

		}

}

/*setValues: function(selected){
    //this.selectedSource = selected;
	//this.sourcesTabPanel.setValues(selected);
this.sourcesTabPanel.setValue(selected.selected[0].items[0].data.medium);
},

setSourcesTabPanel: function(sourcesTabPanel){
	this.sourcesTabPanel = sourcesTabPanel;
}
*/
	/*initComponent: function() {
		var me = this;
		me.columns = [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Titel',
                flex: 2,
                
                dataIndex: 'titel'
            },{
                text: 'Signatur',
                flex: 1,
                dataIndex: 'signatur'
                
            },{
                text: 'Inventarnummer',
                flex: 1,
                dataIndex: 'inventarnummer'
            }
            ]

		var rootNode = store.getRootNode();
		me.selected_node = null;
		for(i = 0; i < me.source_list.length; i++){
			var source_details = me.source_list[i];
			var source = Ext.create('TheaterTool.model.SourceDetails', {
				"titel": source_details[0].s_title,
				"signatur": source_details[0].signatur,
				"inventarnummer": source_details[0].inventarnummer,
				leaf: true 
			});
			rootNode.appendChild(source);
			if(i===0){
				me.selected_node = source;
				console.log(me.selected_node);	
			}
		}

		//this.setSelection(me.selected_node);

 me.callParent();
    }*/

});