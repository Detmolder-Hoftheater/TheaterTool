Ext.define('TheaterTool.view.main.InformationDialog', {
	extend: 'Ext.window.Window',
	title: '<b style="color:#A87678;">Information</b>',
 
	id: 'infoDialog',
	
	border: false,
	
	autoScroll: true,
	
	defaults: {
		bodyPadding: 10
	},
	
	text: null,
	
	initComponent: function () {
	
		this.text = '<p>Die Software la vita di teatro befindet sich noch in der Entwicklungsphase.</p>'+ 
			'<p>Momentan werden die Text- und XML-Ansichten im Bereich “Details”'+ 
			'<br>und die referenzierten Personendaten in den Bereichen “Werke” und “Quellen” '+ 
			'<br>mit Informationen gefüllt.</p>'+ 
			'<p>Die Darstellung der Informationstexte ist noch im Entwurfsstadium.</p>'+
			'<p>Einzelne Werke können mit einem Doppelklick'+ 
			'<br>auf die “Repertoire”-Items oder auf die "Tiefenerschließung"-Items'+
			'<br>im Navigationsbaum angezeigt werden.</p>';
		
		this.items =[ {
			html: this.text
		}],
		
		
		this.callParent()
	}
});