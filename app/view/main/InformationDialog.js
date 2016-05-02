Ext.define('TheaterTool.view.main.InformationDialog', {
	extend: 'Ext.window.Window',
	title: '<b style="color:#A87678;">Information</b>',
 
	id: 'infoDialog',
	
	border: false,
	
	autoScroll: true,

layout: {
					type: 'vbox',
					pack: 'start',
					align: 'stretch'
				},
	
	defaults: {
		bodyPadding: 10
	},
	
	text: null,
	
	initComponent: function () {
	
		this.text = '<p>Die Software „Theatre Tool“ befindet sich erst in der Entwicklungsphase.</p><p></p>'+

'<p>In einem ersten Schritt werden damit die erarbeiteten Informationen, die</p>'+ 
'<p>als XML-Daten abgelegt und als solche weiterverwendbar sein sollen,</p>'+ 
'<p>innerhalb einer katalogartigen Struktur zugänglich gemacht, visualisiert</p>'+ 
'<p>und mit einander verknüpft. Andere, benutzerfreundlichere Zugangsformen</p>'+ 
'<p>zu den Daten und Abbildungen sind erst nach Umsetzung dieser</p>'+ 
'<p>Basisfunktionen vorgesehen.</p><p></p>'+ 
'<p>Gegenwärtig werden die Text- und XML-Ansichten im Bereich des</p>'+ 
'<p>Repertoires (Einzelansichten der Werke und Quellen) sowie die</p>'+ 
'<p>referenzierten Personendaten bearbeitet und die entsprechenden Daten</p>'+ 
'<p>sukzessive integriert.</p><p></p>'+ 

'<p>Da sich die Darstellung der Texte noch in einem Entwurfsstadium</p>'+ 
'<p>befindet, haben Sie bitte Verständnis dafür, dass erst Teile der</p>'+ 
'<p>Informationen angezeigt werden können.</p><p></p>'+ 

'<p>Einzelne Werke können durch einen Doppelklick auf die Items unter</p>'+ 
'<p>„Repertoire“ bzw. auf die unter „Tiefenerschließung“ aufgelisteten Werke</p>'+ 
'<p>im Navigationsbaum aufgerufen werden.</p><p></p>';
		
		this.items =[ {
			html: this.text
		}],
		
		
		this.callParent()
	}
});