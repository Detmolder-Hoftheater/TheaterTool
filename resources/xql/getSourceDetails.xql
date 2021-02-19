xquery version "3.1";

declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "json";
declare option output:media-type "application/json";


declare function local:manifestation($manifestation as element(mei:manifestation)) as map(*) {
    let $title := ($manifestation/mei:titleStmt/mei:title[@short], $manifestation/mei:titleStmt/mei:title)[1] => normalize-space() 
    let $seitenzahl := (($manifestation/mei:physDesc/mei:extent)[1] ! concat(normalize-space(.), ' ', ./@unit)) => string()
    let $groesse := (($manifestation/mei:physDesc/mei:dimensions)[1] ! concat(normalize-space(.), ' ', ./@unit)) => string() 
    let $creation := (($manifestation/mei:creation)[1] ! concat(./mei:date/@isodate, ' ', ./mei:geogName)) => string()
    let $einlagen := array { $manifestation/mei:componentList/mei:manifestation ! local:manifestation(.) }
    return
        (:'entstehung': source_details[0].entstehung,:)
    map {
        's_title': $title,
        'sourcetype': $manifestation/string(@type),
        's_titlecontent': $manifestation/mei:titleStmt/mei:title => local:titlecontent(),
        'signatur': ($manifestation/mei:physLoc/mei:identifier)[1] => normalize-space(),
        'inventarnummer': ($manifestation/mei:identifier[@label = "Inventarnummer"])[1] => normalize-space(),
        'titlePages': $manifestation/mei:physDesc/mei:titlePage => local:titlePages(),
        'medium': ($manifestation/mei:physDesc/mei:physMedium)[1] => normalize-space(),
        'source_hier': array {
            if(array:size($einlagen) gt 0) then map { 'sources_1': array { $einlagen } }
            else ()
        },
        'inscription': $manifestation/mei:physDesc/mei:inscription/mei:persName => local:inscription(),
        's_bemerkungen': array { $manifestation/mei:notesStmt/mei:annot ! normalize-space(.) },
        'seitenzahl': $seitenzahl,
        'groesse': $groesse,
        'condition': ($manifestation/mei:physDesc/mei:condition)[1] => normalize-space(),
        'schreiber': $manifestation/mei:physDesc/mei:handList/mei:hand => local:hands(),
        'sprache': array { $manifestation/mei:langUsage/mei:language ! normalize-space(.) },
        'events': $manifestation/mei:history/mei:eventList/mei:event => local:events(),
        'hoverview': array { $manifestation/mei:history/mei:p ! normalize-space(.) } ,
        'stempel': array { $manifestation/mei:physDesc/mei:stamp ! normalize-space(.) },
        'creation': $creation,
        'inhalt': array { $manifestation/mei:contents/mei:contentItem ! normalize-space(.) }
    }
};

declare %private function local:titlecontent($titles as element(mei:title)*) as array(*) {
    array {
        for $title in $titles
        return
            array {
                array { local:process2text($title/node()) },
                $title/string(@type)
            }
    }
};

declare %private function local:titlePages($titles as element(mei:titlePage)*) as array(*) {
    array {
        for $title in $titles
        return
            array {
                local:process2text($title/node()),
                array { 'label', concat('(', $title/@label, ')') }
            }
    }
};

declare %private function local:inscription($persNames as element(mei:persName)*) as array(*) {
    array {
        for $persName in $persNames
        return
            array { normalize-space($persName), $persName/string(@codedval) }
    }
};

declare %private function local:process2text($nodes as node()*) as array(*)* {
    for $node in $nodes
    return
        typeswitch($node)
        case(element(mei:lb)) return array {'br'}
        case(element(mei:add)) return array {'add', normalize-space($node)}
        case(element(mei:del)) return array {'del', normalize-space($node)}
        case(text()) return 
            if(normalize-space($node) = '') then ()
            else array {'text', $node}
        default return local:process2text($node/node())
}; 

declare %private function local:hands($hands as element(mei:hand)*) as array(*) {
    array {
        for $hand in $hands
        let $resp := $hand/@resp
        let $persNameElement := $hand/root()/id(substring-after($resp, '#'))
        let $persName := $persNameElement => normalize-space()
        return
            array { $persName, $hand/string(@medium), $hand/string(@initial), $persNameElement/string(@codedval) }
    }
};

declare %private function local:events($events as element(mei:event)*) as array(*) {
    array {
        for $event in $events
        return
            array { $event/mei:date/string(@isodate), normalize-space($event/mei:geogName) }
    }
};


let $source.ID := request:get-parameter('sourceID', '')
let $doc.path := concat('/db/apps/theater-data/sources/', $source.ID, '.xml')
let $doc := 
    if(doc-available($doc.path)) then doc($doc.path)
    else ()
let $hasPart.IDs := $doc/mei:manifestation/mei:relationList/mei:relation[@rel='hasPart']/substring-after(@target, '#')
return
    if($doc and $source.ID) then
        map {
            'sources': array { $doc/id($hasPart.IDs) ! array { local:manifestation(.) }}
        }
    else map {}
