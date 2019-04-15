Ext.define('TheaterTool.view.main.InformationDialog', {
    extend: 'Ext.window.Window',
    title: '<b style="color:#A87678;">Information</b>',
    
    id: 'infoDialog',
    
    border: false,
    width: 950,
    height: 500,
    autoScroll: true,
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    
    text: null,
    
    initComponent: function () {
        this.text = '<p>Die Software „Theatre Tool“ befindet sich in der Entwicklungsphase. ' +
        'Ziel der Software ist die Darstellung der in XML-Daten erschlossenen Inhalte und deren Verknüpfungen. ' +
        'Die Software ist so angelegt, dass Sie nicht nur für dieses Projekt angewendet werden kann, ' +
        'sondern auf die Erschließung ähnlicher Bestände übertragbar ist. ' +
        'Die Software wird auf github zur Verfügung gestellt:  <a href="https://github.com/Detmolder-Hoftheater/TheatreTool_1-Dev"  target="_blank">https://github.com/Detmolder-Hoftheater/TheatreTool_1-Dev</a>.</p>' +
        '<p>Dargestellt werden die Personen, die Werke und die Quellen sowie die im Aufbau befindlichen Rollen, ' +
        'darüber hinaus die Übertragungen der Theaterakten, wobei diesen z. T. die entsprechenden Faksimiles gegenübergestellt sind (vgl. z. B: die Einnahmen). ' +
        'Hierbei ist zu beachten, dass die Regie- und Kostümbücher nur als Regesten erschlossen sind, ' +
        'd. h. bis auf einige Ausnahmen sind diese Dateien „nur“ ein Inhaltsverzeichnis. ' +
        'Die Finanzakten sind nur in der Rubrik „Bibliothek“ und „Musikalien“ als Volltext erschlossen, ' +
        'die übrigen Rubriken sind nur in Auswahl erfasst. Die dazugehörigen Belege sind nicht im Volltext sondern als Regest erfasst. ' +
        'Auch hier sind nur die Belege zur Rubrik „Bibliothek“ und „Musikalien“ mit den wesentlichen Daten wiedergegeben.</p>' +
        '<p>Unter „Programm“ findet sich ein Spielplan für die Jahre 1820 bis 1847, der aus den Angaben zu den Einnahmen in den Theaterakten generiert ist.</p>' +
        '<p>Nach der Übertragung der Dokumente werden diese ausgezeichnet, so dass die Verbindungen zwischen den Dokumenten hergestellt werden können. ' +
        'Diese Auszeichnung, auf der die Nachweise der Referenzen bei den Personen, Werken und Rollen beruhen, ist für die erfassten Dokumente noch nicht abgeschlossen und nicht geprüft. ' +
        'Wir bitten Lücken und ev. Fehler zu entschuldigen.</p>' +
        '<p>Das Portal hat bisher eine einfache Suche nach Personen und Werken.</p>' +
        '<p>Die zugrundeliegenden XML-Daten können eingesehen und heruntergeladen werden.</p>' +
        '<p>Die Incipits sind für einige Quellen und für tiefenerschlossenen Werke verfügbar.</p>' +
        
        '<p><b>Tiefenerschlossene Werke</b></p>' +
        '<p>In dem Projekt wird an einigen Beispielen, den tiefenerschlossenen Werken, gezeigt, wie weit eine Quellenbeschreibung gehen kann, ' +
        'wenn gleichzeitig Faksimiles der Quellen zur Verfügung gestellt werden und diese für einen taktgenauen Zugriff aufbereitet werden. ' +
        'D. h. bei diesen Quellen enthalten die Beschreibungen auch taktgenaue Informationen zu Strichen und weiteren Eintragungen. ' +
        'Die Verknüpfung der Angaben in der Quellenbeschreibung direkt mit den Faksimiles ist noch nicht verfügbar.</p>' +
        '<p>Außerdem sind bei diesen auch Faksimiles verfügbar. ' +
        'Öffnet man diese, so erscheinen die Dateien zuerst „nur“ als Bilddateien. ' +
        'Klickt man auf den Link „Zur Erschließung mit Edirom online“, so öffnet sich das Faksimile erneut. ' +
        'Sie können jetzt unten links wechseln zwischen einer seiten- und einer taktbasierten Ansicht und dann die einzelnen Takte gezielt öffnen.</p>' +
        
        '<p><b style="color:#A87678;">Navigation</b></p>' +
        '<p>Auf der linken Seite finden Sie eine Gliederung des Inhalts des Portals. Dieses ist gegliedert in „Spielbetrieb“ und „Verwaltung“. ' +
        'Bei „Repertoire“, „Personen“ und „Rollen“ öffnet sich ein Alphabeth-Gruppierung. ' +
        'Klickt man diese an, öffnet sich rechts die vollständige Liste. (Die Suche nach Werken und Personen ist aber auch über das Suchfenster möglich.)</p>' +
        '<p>Klickt man auf die Einträge rechts, öffnet sich im Mittelfeld der Datensatz. ' +
        'Dieser enthält die Grundinformationen, die ggf. über die Angabe von Normdaten leicht erweitert werden können. ' +
        'Am Ende des Datensatzes sind die Querverweise zu den übrigen Materialien des Portals – nach den verschiedenen Quellenarten sortiert – aufgelistet.</p>' +
        '<p>Bei den Werken sind diejenigen, zu denen sich Aufführungsmaterialien erhalten haben, mit einem Dreieck markiert. ' +
        'Öffnet man die Quelle, so erscheinen zunächst die Grunddaten. ' +
        'Die detaillierte Quellenbeschreibung öffnet sich über den Reiter „Einzelquellen“. ' +
        'Auf Grund einer technischen Umstellung sind zur Zeit die Einlagen zu den einzelnen Quellen nicht einsehbar.</p>';
        
        
        /*this.text = '<p>Die Software „Theatre Tool“ befindet sich erst in der Entwicklungsphase. '+
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
        
        '<p>Einzelne Werke können durch einen Klick auf die Items unter '+
        '„Repertoire“ bzw. auf die unter „Tiefenerschlossene Werke“ aufgelisteten Werke '+
        'im Navigationsbaum aufgerufen werden.</p><p></p>'+
        
        '<p>Die vertakteten Partituren und Stimmen für die tiefenerschlossenen Werke werden mit Edirom Online dargestellt. '+
        'Die Edirom Online kann über einen Link in der Faksimilie-Ansicht der Quelle geöffnet werden.</p><p></p>'+
        
        '<p>Die Incipits sind unter „Tiefenerschlossene Werke“'+
        'mit der Itemselektion "Incipits" zu sehen. '+
        'Ein Dppelklick in das Einzelincipit öffnet eine größere Darstellung.</p><p></p>'+
        
        '<p>Allgemeine Informationen mit den Referenzen und XML-Ansichten sind für alle Daten-Objekte verfügbar und '+
        'können durch einen Klick auf die Items im Navigationsbaum angezeigt werden.</p><p></p>'+
        
        '<p>Eine einfache Suche nach Werken oder nach Personen ist in Toolbar vorhanden.</p><p></p>';*/
        
        
        this.items =[ {
            html: this.text,
            bodyPadding: 10
            //margin: '10 10 10 10'
        }],
        
        
        this.callParent()
    }
});