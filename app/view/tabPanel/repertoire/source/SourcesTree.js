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
flex:1,
    height: 200,
    useArrows: true,
    rootVisible: false,
   // multiSelect: true,
   // singleExpand: true,
store: null,

selected_node: null,
source_list: null,

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
            }
            ]


        me.callParent();
 },

createContentForSources: function(source_list){

	var rootNode = this.store.getRootNode();
		//var selected_node = null;
		for(i = 0; i < source_list.length; i++){
			var source_details = source_list[i];
			var source = Ext.create('TheaterTool.model.SourceDetails', {
				"titel": source_details[0].s_title,
				"signatur": source_details[0].signatur,
				"inventarnummer": source_details[0].inventarnummer,
				leaf: true 
			});
console.log(source);
			rootNode.appendChild(source);
			/*if(i===0){
				selected_node = source;
				console.log(selected_node);	
			}*/
		}

}

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