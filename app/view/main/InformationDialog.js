Ext.define('TheaterTool.view.main.InformationDialog', {
	extend: 'Ext.window.Window',
	title: '<b style="color:#A87678;">Information</b>',
 
	id: 'infoDialog',
	
	border: false,
	width: 700,
	
	autoScroll: true,

layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
	

	text: null,
	
	initComponent: function () {
	
		this.text = '<p>This is first developer version of software „Theatre Tool“ '+
'and provide subsets from planned features.</p>'+
'<p><b style="color:#A87678;">Navigation</b></p>'+

'<p>Works, persons, playschedules, revenues, expensses and cutomized item will be schow '+ 
'with one click of end item in navigation tree.</p>'+ 

'<p>XML data accessible in tab sections.</p>'+

'<p>A simple search for works and persons is available in Toolbar.</p><p></p>';

		
		this.items =[ {
			html: this.text,
bodyPadding: 10
//margin: '10 10 10 10'
		}],
		
		
		this.callParent()
	}
});