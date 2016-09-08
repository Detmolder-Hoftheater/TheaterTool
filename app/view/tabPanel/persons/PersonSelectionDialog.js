Ext.define('TheaterTool.view.tabPanel.persons.PersonSelectionDialog', {
	extend: 'Ext.window.Window',
	title: '<b style="color:#A87678;">Personen Auswahl</b>',

	selection: null,
	tabPanel: null,
	personen: null,
	persStore: null,

	modal: true,
	border: false,
	width: 400,
	height: 500,
	//flex: 1,
//layout: 'vbox',
	autoScroll: true,

/*layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},*/
	

	text: null,
	showPersonButton: null,
	
	initComponent: function () {
		var me = this;
Ext.Ajax.request({
				 url: 'resources/xql/getPersonsForSelection.xql',
				async: false,
				method: 'GET',
				params: {
					selection: me.selection
				},
				success: function (result) {
					
					var json = jQuery.parseJSON(result.responseText);
					
					
					var persons_list = json.persons;
					console.log(json);


		me.persStore = Ext.create('Ext.data.TreeStore', {
	model: 'TheaterTool.model.Person',
root: {
        text: 'Start',
   		children: [
    /*{text: 'isd', leaf: true, icon: 'resources/images/Mask-19.png'},
{text: 'asasda', leaf: true, icon: 'resources/images/Mask-19.png'},
{text: 'ydfsdfsg', leaf: true, icon: 'resources/images/Mask-19.png'}*/]
}
});


var rootNode = me.persStore.getRootNode();
		
		for(i = 0; i < persons_list.length; i++){
			var person_details = persons_list[i];
				rootNode.appendChild({
					"name": person_details[0],
 				'icon': 'resources/images/Mask-19.png',
				"persId": person_details[1],
				"forename": person_details[2],
				leaf: true 
				});


}
me.persStore.sort('name');

me.personen =Ext.create('Ext.tree.Panel', {
    store: me.persStore,
	reserveScrollbar: true,
	useArrows: true,
	rootVisible: false,
	sortableColumns: false,
    columnLines: true,
rowLines: true,
autoScroll: true,
    //height: 300,
    flex:1,
	columns: [
            {
            xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Nachname',
                flex: 2,
                menuDisabled: true,
                dataIndex: 'name'
               /* title: 'Personen',
                useArrows: true*/
            },
            {
                text: 'Vorname',
                flex: 2,
                menuDisabled: true,
                dataIndex: 'forename'
                
            }
        ]
//flex:1

});
		
		me.items =[ me.personen];
}
});
		
		me.buttons =[
			{
			text: 'Show',
			handler: function () {
				var personSelected = me.personen.getSelectionModel().getSelection()[0];
				var selectedId = personSelected.data.persId;
				var selectedName = personSelected.data.name + ', '+personSelected.data.forename;
				var repertoireTab = new TheaterTool.view.tabPanel.HTTab({
						title: '<font style="color:gray;">'+selectedName+'</font>',
						icon: 'resources/images/Mask-19.png'
					});
					var personDetails = new TheaterTool.view.tabPanel.persons.PersonPanelInTab({dbkey: selectedId});
					personDetails.setTitle('<font size="2" face="Arial" style="color:#A87678;">'+selectedName+'</font>');
					repertoireTab.add(personDetails);
					me.tabPanel.add(repertoireTab);
					me.tabPanel.setActiveTab(repertoireTab);
				this.up('window').close();
			}
		},

{
			text: 'Cancel',
			handler: function () {
				this.up('window').close();
			}
		}];

		me.callParent();
	}

});