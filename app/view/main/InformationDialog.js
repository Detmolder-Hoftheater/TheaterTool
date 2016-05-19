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
'zu den Daten und Abbildungen sind erst nach Umsetzung dieser'+ 
'Basisfunktionen vorgesehen. '+ 
'Gegenwärtig werden die Text- und XML-Ansichten im Bereich des '+ 
'Repertoires (Einzelansichten der Werke und Quellen) sowie die '+ 
'referenzierten Personendaten bearbeitet und die entsprechenden Daten '+ 
'sukzessive integriert. '+ 
'Da sich die Darstellung der Texte noch in einem Entwurfsstadium '+ 
'befindet, haben Sie bitte Verständnis dafür, dass erst Teile der '+ 
'Informationen angezeigt werden können.</p><p></p>'+

'<p>Einzelne Werke können durch einen Doppelklick auf die Items unter '+ 
'„Repertoire“ bzw. auf die unter „Tiefenerschlossene Werke“ aufgelisteten Werke '+ 
'im Navigationsbaum aufgerufen werden.</p><p></p>'+ 

'<p>Die Vertaktete Partituren und Stimmen für die tiefenerschlossene Werke werden mit Edirom Online, momentan nur für "Bettelstudent", dargestellt. '+  
'Dies kann mit einem Link von der Faksimilie-Ansicht in Quellen gestartet werden.</p><p></p>'+

'<p>Die Spielpläne sind im Navigationsbaum unter Programm und die Einnahmen unter Finanzwesen abrufbar.</p><p></p>';
		
		this.items =[ {
			html: this.text,
bodyPadding: 10
//margin: '10 10 10 10'
		}],
		
		
		this.callParent()
	}
});