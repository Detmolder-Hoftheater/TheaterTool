xquery version "3.1";

declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace request = "http://exist-db.org/xquery/request";
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "json";
declare option output:media-type "application/json";


declare function local:alts($doc as document-node()) as array(*) {
    array {
        for $roleName in $doc/tei:castItem//tei:roleName[@type='alt'] 
        return 
            if($roleName[@subtype]) then normalize-space($roleName) || ' (' || $roleName/@subtype || ')'
            else normalize-space($roleName)
    }
};

declare function local:regs($doc as document-node()) as array(*) {
    array {
        $doc/tei:castItem//tei:roleName[@type='reg'] ! normalize-space(.)
    }
};

declare function local:actors($doc as document-node()) as array(*) {
    array {
        $doc//tei:actor ! normalize-space(.)
    }
};

declare function local:worksRef($doc as document-node()) as array(*) {
    array {
        for $ref in $doc/tei:castItem/tei:ref[@target]
        let $workId := substring-after($ref/@target, '#')
        let $workpath := concat('/db/apps/theater-data/works/', $workId, '.xml')
        let $workfile := 
            if(doc-available($workpath)) then doc($workpath)
            else ()
        let $workcontent := $workfile//mei:work
        let $worktitle := $workcontent/mei:title[1] => normalize-space()
        let $rolefile := $workcontent/data(@xml:id)
        return
            array { $worktitle, $rolefile}
    }
};

declare function local:sourcesRef($role.ID as xs:string) as array(*) {
    let $sources := collection('/db/apps/theater-data/sources/')
    let $manifestations := $sources//*[@codedval = $role.ID]/ancestor::mei:manifestation[parent::mei:componentList]
    return
        array {
            for $manifestation in $manifestations
            let $worktitle := $manifestation/parent::mei:componentList/parent::mei:manifestation/mei:titleStmt/mei:title[1] => normalize-space()
            let $sourceTitle := $manifestation/mei:titleStmt/mei:title[1] => normalize-space()
            let $sourceID := $manifestation/ancestor::mei:manifestation/data(@xml:id)
            let $workTargetId := $manifestation/parent::mei:componentList/parent::mei:manifestation[not(ancestor::mei:componentList)]/mei:relationList/mei:relation[@rel = 'isEmbodimentOf']/substring-after(@target, '#')
            let $workRefId := substring-before($workTargetId, '_')
            let $location := $manifestation/mei:physLoc/mei:identifier => normalize-space()
            let $rismLabel := ($manifestation//mei:identifier[@codedval = "RISM-label"])[1] => normalize-space()
            let $sourceName := concat('Quelle: ', $worktitle, ', Einzelquelle ', $sourceTitle, '; ', $rismLabel, $location)
            
            return 
                array { $sourceTitle, $sourceID, $workRefId, $sourceName, $location }
        }
};

declare function local:journalRef($role.ID as xs:string) as array(*) {
    let $journale := collection('/db/apps/theater-data/theaterjournal/')
    return
    array {
        for $rs in $journale//tei:rs[@key = $role.ID]
        let $title := ($rs/root()//tei:titleStmt/tei:title)[1] => normalize-space() 
        return
            $title || ': ' || normalize-space($rs)
    }
};

declare function local:summaryText($doc as document-node()) as array(*) {
    array {
        (for $roleDesc in $doc//tei:castItem//tei:roleDesc
        return 
            local:tei2html($roleDesc/node()) => string-join() 
        ) => string-join('; ') (: this should not be neessary but the current frontend does not support multiple array members :)
    }
};

declare function local:tei2html($nodes as node()*) as xs:string* {
    for $node in $nodes
    return
        typeswitch ($node)                     
            case element(tei:persName) 
                return local:persName($node)
            case element(tei:roleName) 
                return local:roleName($node)
            case text()
                return $node
            default
                return local:tei2html($node/node())
};

declare %private function local:persName($node as element(tei:persName)) as xs:string* {
    if ($node/@key) then
        concat(
        '<a href="javascript:getPersonContentForPerson(&apos;',
        $node/@key, '&apos;,&apos;',$node,'&apos;);">',$node,'</a>')
    else local:tei2html($node/node())
};

declare %private function local:roleName($node as element(tei:roleName)) as xs:string* {
    if ($node/@key) then
        concat(
        '<a href="javascript:getRoleContentForRole(&apos;',
        $node/@key, '&apos;,&apos;',$node,'&apos;);">',$node,'</a>')
    else local:tei2html($node/node())
};

let $role.ID := request:get-parameter('dbkey', '')
let $doc.path := concat('/db/apps/theater-data/rollen/', $role.ID, '.xml')
let $doc := 
    if(doc-available($doc.path)) then doc($doc.path)
    else ()
return
    if($doc and $role.ID) then
        map {
            'alts': local:alts($doc),
            'regs': local:regs($doc),
            'summaryText': local:summaryText($doc),
            'actors': local:actors($doc),
            'worksRef': local:worksRef($doc),
            'sourcesRef': local:sourcesRef($role.ID),
            'journalRef': local:journalRef($role.ID)
        }
    else map {}
