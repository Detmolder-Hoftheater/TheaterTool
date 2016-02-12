xquery version "3.0";

declare namespace mei="http://www.music-encoding.org/ns/mei";

import module namespace functx="http://www.functx.com";

declare option exist:serialize "method=xml media-type=text/plain omit-xml-declaration=yes";

declare function local:findMeasure($doc, $startIds) {
    let $measures := for $startId in $startIds
                        return
                            $doc/id(substring-after($startId, '#'))/self::mei:measure
    return $measures[1]
  
};

let $xml := request:get-data()
let $user := xmldb:get-current-user()
let $change :=
    for $x in $xml/div/div
    let $source := $x/string(@sourcepath)
    let $id := $x/string(@id)
    let $operation := $x/string(@operation)
    let $test := $x/string(@measureid)
   (: let $measureID := for $test in $xml/div/div/* return $test/string(@measureId):)
    let $content := $x/*
     let $startIDs := for $slur in $xml/div/div/*/descendant-or-self::mei:hairpin[@startid] return $slur/string(@startid)
    let $doc := if(ends-with($source,'.xml'))then(doc('/db/apps/controlevents-data/' || $source))else(collection('/db/apps/controlevents-data/')/id($source)/root())
    (:let $measure := local:findMeasure($doc, $measureID[1]):)
   let $measure := $doc/id($test)/self::mei:measure
    let $change := 
        switch($operation)
            case 'create' return
                let $result := update insert $content into $measure
                return local-name($content) || ' with ID ' || $id || ' added'
            case 'change' return
                let $result := update delete $doc/id($id)
                let $result := update insert $content into $measure
                return local-name($content) || ' with ID ' || $id || ' changed'
            case 'remove' return
                let $result := update delete $doc/id($id)
                return local-name($content) || ' with ID ' || $id || ' removed'
            default return 'null'
        
    let $changeElem := <change n="{count($doc//mei:change) + 1}" xmlns="http://www.music-encoding.org/ns/mei">
                            <respStmt>
                                <persName>{$user}</persName>
                            </respStmt>
                            <changeDesc>
                                <p>pmdCE on {$test}: {string-join($change, ', ')}</p>
                            </changeDesc>
                            <date isodate="{substring(string(current-dateTime()),1,19)}"/>
                        </change>
    let $result := update insert $changeElem into $doc//mei:revisionDesc
        return
        $changeElem

return
    <result>{$change}</result>
