Ext.define('TheaterTool.view.main.InformationDialog', {
    extend: 'Ext.window.Window',
    title: '<b style="color:#A87678;">Information</b>',
    
    id: 'infoDialog',
    
    border: false,
    width: 950,
    height: 500,
    autoScroll: true,
    modal:true,
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
    
    text: null,
    
    initComponent: function () {
        this.text = '<p>'+
            '<b>Wir begrüßen Sie herzlich im Portal des Projektes „Detmolder Hoftheater '+
            '1825–1875“</b>'+
            '</p>'+
            '<p>'+
            '<span> </span>'+
            '</p>'+
            '<p>Alle Daten, die in diesem Portal erfasst sind, sind in den XML-Formaten der Music '+
            'Encoding Initiative (4.0) bzw. Text Encoding Initiative (5.0) gespeichert. Diese '+
            'Daten werden mit der eigens im Projekt entwickelten Software „Theatre Tool“ '+
            'dargestellt, so dass sowohl die erschlossenen Inhalte als auch die darin durch '+
            'Markup angelegten Verknüpfungen sichtbar werden. Die Software ist so angelegt, dass '+
            'sie nicht nur für dieses Projekt angewendet werden kann, sondern auf die '+
            'Erschließung ähnlicher Bestände übertragbar ist. Die Software wird auf GitHub zur '+
            'Verfügung gestellt: <a '+
            'href="https://github.com/Detmolder-Hoftheater/TheatreTool_1-Dev" target="_blank"'+
            '>https://github.com/Detmolder-Hoftheater/TheatreTool_1-Dev</a>. Das '+
            'Benutzerhandbuch ist auf der Portal-Startseite oben rechts unter dem Button „Hilfe“ '+
            'zu finden.</p>'+
            '<p>Viele erfasste Daten können als XML-Datei eingesehen und heruntergeladen werden, der '+
            'vollständige Datenbestand ist (ab März 2021) unter Zenodo abrufbar.</p>'+
            '<p>'+
            '<span> </span>'+
            '</p>'+
            '<p>Der Aufbau des Portals ist im Prinzip selbsterklärend und wird auch im '+
            'Benutzerhandbuch erläutert. Es sei an dieser Stelle nur auf einige wenige Punkte '+
            'hingewiesen.</p>'+
            '<ul>'+
            '<li>Spielbetrieb</li>'+
            '<li>Verwaltung</li>'+
            '<li>Tiefenerschlossene Werke</li>'+
            '<li>Parallelerschließung</li>'+
            '</ul>'+
            '<p>Die Informationen gliedern sich in den Bereich „Spielbetrieb“ und „Verwaltung“.'+
            '<br />Unter „<b>Spielbetrieb</b>“ finden sich die Angaben zum Repertoire und zu den '+
            'Akteuren des Theaters, wobei man (durch das im Hintergrund liegende FRBR-Modell) '+
            'über das Repertoire, also die Auflistung der dokumentierten Werke (Musik- und '+
            'Sprechtheater) zur Erschließung des erhaltenen Aufführungsmaterials gelangt. In '+
            'diesem Projekt konnten „nur“ die gut 250 Materialien zum Musiktheater erfasst '+
            'werden, die ebenfalls noch erhaltenen Rollenhefte zum Repertoire des Sprechtheaters '+
            'konnten nur in Ausnahmefällen (vgl. z. B. „Die Zeiträume“) einbezogen werden. Einen '+
            '„geführten“ Einblick in die Erschließung der Quellen erhalten Sie in unserem ' +
            '<a href="https://hoftheater-detmold.de/daten-hoftheater/zum-auffuehrungsmaterial/" ' +
            'target="_blank" alt="Videotutorial">Einführungsvideo</a>.</p>'+
            '<p>Neben diesen Säulen des Spielbetriebs (Personen, Werke, Aufführungsmaterial) finden '+
            'Sie in diesem Bereich auch ein Verzeichnis der Rollen, das auf Grund der '+
            'erschlossenen Quellen zum Musiktheater angelegt ist, also nur in Ausnahmefällen '+
            'Rollen aus Dramen, dafür aber aus Possen und Vaudevilles enthält, da diese durch den '+
            'regelmäßigen Einsatz von Musik unter den erschlossenen Materialien recht häufig '+
            'vertreten sind.</p>'+
            '<p>Außerdem findet sich unter „Spielbetrieb“ der Spielplan des Theaters für alle '+
            'Spielstätten (einige grundlegende Daten und Fakten des Theaters sind auf der '+
            'Homepage zusammengefasst.) Hierbei ist zu beachten, dass der Spielplan bereits 1820, '+
            'also fünf Jahre vor der Eröffnung des Detmolder Hoftheaters einsetzt. Das Rollen- '+
            'und Kostümbuch TA 55 wird seinem Namen nur in geringen Teilen recht. Zum größten '+
            'Teil ist es ein Spielplan der Gesellschaft von August Pichler aus den Jahren 1820 '+
            'bis 1825. Diese Gesellschaft, in der etliche Mitglieder spielten, die später auch '+
            'beim Hoftheater angestellt waren, spielte in einigen Städten um Detmold herum, in '+
            'Bremen, Minden, Paderborn, Osnabrück und vor allem in Pyrmont, denn das dortige '+
            'Theater gehörte seit 1818 Pichler persönlich.</p>'+
            '<p>'+
            '<span> </span>'+
            '</p>'+
            '<p> Im Bereich „<b>Verwaltung</b>“ findet sich die Erschließung der Akten, die '+
            'sowohl die finanzielle als auch die künstlerische Arbeit dokumentieren. Die '+
            'Finanzakten dokumentieren nur die Zeit von 1825 bis 1847. In den folgenden '+
            'Jahren erhielt die Theatergesellschaft zwar einen Zuschuss vom Fürstenhaus, '+
            'wirtschaftete aber selbständig, weshalb aus dieser Zeit kaum Dokumente erhalten '+
            'sind.'+
            '</p>'+
            '<p>Eine Besonderheit sind hierbei die sog. „Taxationen“: In diesen Büchern wurde 1828 '+
            'sämtliches Material, das August Pichler aus seiner früheren Tätigkeit als '+
            'Theaterdirektor mitgebracht hatte (neben den Aufführungsmaterialien auch die Kostüme '+
            'und Dekorationen) aufgelistet und bewertet.</p>'+
            '<p>Ergibt sich durch die Taxationen bereits ein guter Gesamteindruck von dem gespielten '+
            'Repertoire, so wird dieser noch ergänzt durch die Bestandsverzeichnisse, die zwar '+
            'auch z. T. früh angelegt, aber weit über diese Zeit hinaus weitergeführt wurden. </p>'+
            '<p>Einen Einblick in den Bühnenalltag gewähren die Tagesberichte, die aus den Jahren '+
            '1843 bis 1846 erhalten sind.</p>'+
            '<p>'+
            '<span> </span>'+
            '</p>'+
            '<p>'+
            '<b>Tiefenerschlossene Werke</b>'+
            '</p>'+
            '<p>In dem Projekt wird an einigen Beispielen gezeigt, wie weit eine Quellenbeschreibung '+
            'gehen kann, wenn gleichzeitig Faksimiles der Quellen zur Verfügung gestellt und '+
            'diese für einen taktgenauen Zugriff aufbereitet werden. D. h. bei diesen Quellen '+
            'enthalten die Beschreibungen auch taktgenaue Informationen zu Strichen und weiteren '+
            'Eintragungen. In einer Beschreibung werden erste Ergebnisse dieser detaillierten '+
            'Erschließung zusammengefasst.</p>'+
            '<p>Außerdem sind bei diesen Quellen auch Faksimiles verfügbar. Öffnet man diese, so '+
            'erscheinen die Dateien zunächst „nur“ als Bilddateien. Klickt man auf den Link „Zur '+
            'Erschließung mit Edirom online“, so können Sie das Faksimile erneut öffnen. Sie '+
            'haben hier die Möglichkeit unten links zwischen einer seiten- und einer '+
            'taktbasierten Ansicht zu wechseln (oder Sie wählen oben in der Leiste die Rubrik „Go '+
            'to“) und dann die einzelnen Sätze gezielt zu öffnen und darin taktgenau zu '+
            'navigieren. Um jeweils die Taktzahl im Notentext sehen zu können, markieren Sie '+
            'bitte unter der Rubrik „Display“ die Anzeige der Taktzahlen. </p>'+
            '<p>'+
            '<span> </span>'+
            '</p>'+
            '<p>'+
            '<b>'+
            '<span>Parallelerschließung</span>'+
            '</b>'+
            '</p>'+
            '<p>An einem Beispiel können wir demonstrieren, ob und welche Vorteile sich ergeben, wenn '+
            'nicht nur ein, sondern mehrere Materialien zu einem Werk erfasst werden können. Zu '+
            'der Oper <i>Joseph</i> von Etienne Nicolas Méhul wurden zusätzlich die erhaltenen '+
            'Materialien aus Berlin, Dresden, Frankfurt, München und eine weitere nicht zur '+
            'Aufführung bestimmte Partitur aus Leipzig (ganz oder teilweise) erfasst, wodurch ein '+
            'direkter Vergleich der Anlage der Materialien und der überlieferten Gestalt der Oper '+
            'möglich ist. </p>'+
            '<p>Unsere Aufgabe bestand darin, die Materialien zu erschließen, zu verknüpfen und '+
            'bereit zu stellen. Wir hoffen, dass jetzt viele Interessenten diese Informationen '+
            'nutzen, sei es für wissenschaftliche Forschung oder private Interessen, und damit '+
            'das Wissen über den Theaterbetrieb der Hoftheatergesellschaft bzw. des Fürstlichen '+
            'Theaters Detmold, über einzelne Darsteller, über Repertoireeigenheiten oder über '+
            'andere Themen, die Ihnen einfallen, erweitern. Sollten Sie dabei wichtige weitere '+
            'Dokumente erschließen, so melden Sie sich bitte, damit wir diese in dieses Portal '+
            'integrieren können.</p>'+
            '<p>Für Fragen stehen wir Ihnen jeder Zeit unter info@hoftheater-detmold.de zur '+
            'Verfügung.</p>';

        this.items =[ {
            html: this.text,
            bodyPadding: 10
            //margin: '10 10 10 10'
        }],
        
        
        this.callParent()
    }
});