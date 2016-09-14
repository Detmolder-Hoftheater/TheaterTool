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
	
		this.text = '<p>Die Software „Theatre Tool“ befindet sich erst in der Entwicklungsphase. '+
'In einem ersten Schritt werden damit die erarbeiteten Informationen, die '+ 
'als XML-Daten abgelegt und als solche weiterverwendbar sein sollen, '+ 
'innerhalb einer katalogartigen Struktur zugänglich gemacht, visualisiert '+ 
'und mit einander verknüpft. Andere, benutzerfreundlichere Zugangsformen '+ 
'zu den Daten und Abbildungen sind erst nach Umsetzung dieser '+ 
'Basisfunktionen vorgesehen. '+ 
'Gegenwärtig werden die Text- und XML-Ansichten im Bereich des '+ 
'Repertoires (Einzelansichten der Werke und Quellen) sowie die '+ 
'referenzierten Personendaten bearbeitet und die entsprechenden Daten '+ 
'sukzessive integriert. '+ 
'Da sich die Darstellung der Texte noch in einem Entwurfsstadium '+ 
'befindet, haben Sie bitte Verständnis dafür, dass erst Teile der '+ 
'Informationen angezeigt werden können.</p><p></p>'+

'<p><b style="color:#A87678;">Navigation</b></p>'+

'<p>Einzelne Werke können durch einen Doppelklick auf die Items unter '+ 
'„Repertoire“ bzw. auf die unter „Tiefenerschlossene Werke“ aufgelisteten Werke '+ 
'im Navigationsbaum aufgerufen werden.</p><p></p>'+ 

'<p>Die vertakteten Partituren und Stimmen für die tiefenerschlossenen Werke werden mit Edirom Online dargestellt. '+ 
'Vorerst ist dies nur für Peter von Winters “Der Bettelstudent” umgesetzt. '+ 
'Die Edirom Online kann über einen Link in der Faksimilie-Ansicht der Quelle geöffnet werden.</p><p></p>'+

'<p>Erste Incipits sind unter „Tiefenerschlossene Werke“ für Peter von Winters “Der Bettelstudent” '+
'mit der Itemselektion "Incipits" bereits in einer vorläufigen Darstellung zu sehen. '+
'Ein Dppelklick in das Einzelincipit öffnet eine größere Darstellung.</p><p></p>'+

'<p>Die Spielpläne sind im Navigationsbaum unter "Programm", '+
'die Einnahmen und die Ausgaben unter "Finanzwesen" abrufbar.</p><p></p>'+

'<p>Die Informationen zu einer Person werden durch einen Doppelklick auf die Items unter '+ 
'„Personen“ im Navigationsbaum angezeigt.</p><p></p>'+

'<p>Die XML-Ansichten sind für alle Daten-Objekte im XML-Tab verfügbar.</p><p></p>';

		
		this.items =[ {
			html: this.text,
bodyPadding: 10
//margin: '10 10 10 10'
		}],
		
		
		this.callParent()
	}
});