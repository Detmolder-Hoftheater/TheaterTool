xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace pasticcio = "https://pasticcio-project.eu/ns/1.0";
(:declare namespace tei = "http://www.tei-c.org/ns/1.0";:)
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";


declare default element namespace "http://www.tei-c.org/ns/1.0";


declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $personID := request:get-parameter('dbkey', '');
(:declare variable $persontailPath := request:get-parameter('dbPath', '');:)
declare variable $uri := concat('xmldb:exist:///apps/', 'xml-data/persons', '/');
declare variable $file := collection($uri);
declare variable $content := for $elem in $file
return
    if ($elem//person[@xml:id = $personID]) then
        ($elem)
    else
        ();

declare function local:jsonifyRoles($id) {
    
    let $strings := for $elem in $id
    
    let $id_1 := $elem
    let $role := $elem/@role
    let $dbkey := $elem/@dbkey
    
    return
        if ($id_1 != '') then
            (
            concat('["', $id_1, '",', '"', $role, '",', '"', $dbkey, '"]'))
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifyAutoren($content) {
    
    let $strings := for $elem in $content
    
    let $id := $elem//mei:persName
    
    let $names := local:jsonifyRoles($id)
    return
        if ($names != '') then
            (
            $names
            )
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:jsonifyGender($content) {
    
    let $strings := for $elem in $content
    
    let $id := $elem//sex
    
    return
        if ($id != '') then
            (
            concat(
            '"', $id, '"'))
        else
            ()
    
    return
        string-join($strings, ',')
};

(:declare function local:jsonifySummary($content) {
    
    let $strings := for $elem in $content
    
    let $id := $elem//tei:note//tei:list//tei:item
    
    let $names := local:jsonifyNotes($id)
    return
        if ($names != '') then
            (
            $names
            )
        else
            ()
    return
        string-join($strings, ',')


};:)


(:declare function local:jsonifyNotes($id) {
    
    let $strings := for $elem in $id
    
    let $id_1 := normalize-space($elem)
    
    return
        if ($id_1 != '') then
            (
            concat('"', replace($id_1, '"', '\\"'), '"'))
        else
            ()
    return
        string-join($strings, ',')

};:)

declare function local:jsonifyAffiliations($content) {
    
    let $strings := for $elem in $content
    
    let $affiliations := $elem//affiliation
    
    let $affiliation := local:jsonifyAff($affiliations)
    
    return
        
        $affiliation
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyAff($affiliations) {
    
    let $strings := for $elem in $affiliations
    
    let $orgname := $elem//orgName
    
    let $orgref := $elem//orgName/@ref
    
    let $dates := $elem//date
    
    let $date := local:jsonifyOrgDates($dates)
    
    (:let $refnotes := $elem//note[@type = 'reference']
    
    let $refnote := local:jsonifyRefNote($refnotes):)
    
    
    return
        concat('{', '"dates":[', $date, '],', '"org":["', $orgname, '","', $orgref, '"]', '}')
    (:concat('{', '"dates":[', $date, '],', '"org":["', $orgname, '","', $orgref, '"],', '"notes":[', $refnote, ']', '}')
    :)
    return
        
        string-join($strings, ',')


};

declare function local:jsonifyOrgDates($dates) {
    
    let $strings := for $elem in $dates
    
    let $elfrom := $elem/@from
    let $elwhen := $elem/@when
    let $elto := $elem/@to
    
    let $reWorkList := $elem/rs[@type = 'work']
    let $reWork := local:jsonifyWorkList($reWorkList)
    
    let $reOccList := $elem/rs[@type = 'occupation']
    let $rsOcc := local:jsonifyOccList($reOccList)
    
    let $reRefsList := $elem/note[@type = 'reference']
    let $refs := local:jsonifyRefNote($reRefsList)
    
    
    return
        
        concat('["', $elfrom, '","', $elwhen, '","', $elto, '",', '{"works":[', $reWork, ']},','{"occ":[', $rsOcc, ']},', '{"refs":[', $refs, ']}', ']')
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyOccList($reOccList) {
    
    let $strings := for $elem in $reOccList
    
    let $eltype := $elem/@type
    let $elref := $elem/@subtype
    
    let $rssng := $elem/rs[@type = 'singer_spec']
    let $rssngtype := $rssng/@type
    let $rssngrole := $rssng/@role
    let $rssngclef := $rssng/@clef
    let $rssngambitus := $rssng/@ambitus
    let $rssngvalue := $rssng
    let $rssngresult := concat('"', $rssngtype, '","', $rssngrole, '","', $rssngclef, '","', $rssngambitus, '","', $rssngvalue, '"')
    
    (:let $rssngresult := concat('"', $rssngtype, '","', $rssngrole, '","', $rssngvalue, '"'):)
    
    let $rsworkcomp := $elem/rs[@type = 'workComponent']
    let $rsworkcompresult := local:getComponentResult($rsworkcomp)
    
    
    return
        concat('["', $eltype, '","', $elref, '",', '{"sng":[', $rssngresult, ']},', '{"comp":[', $rsworkcompresult, ']}', ']')
    
    return
        string-join($strings, ',')

};

declare function local:getComponentResult($rsworkcomp) {
    
    let $strings := for $elem in $rsworkcomp
    
    let $rsworkcomptype := $elem/@type
    let $rsworkcompref := $elem/@ref
    let $rsworkcompvalue := $elem
    
    return
        
        concat('["', $rsworkcomptype, '","', $rsworkcompref, '","', $rsworkcompvalue, '"]')
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyWorkList($reWorkList) {
    
    let $strings := for $elem in $reWorkList
    
    let $eltype := $elem/@type
    let $elref := $elem/@ref
    let $elself := $elem
    
    
    return
        
        concat('["', $elself, '","', $eltype, '","', $elref, '"]')
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyResidences($content) {
    
    let $strings := for $elem in $content
    
    let $residences := $elem//residence
    
    let $res := local:jsonifyRes($residences)
    
    return
        
        $res
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyRes($notes) {
    
    let $strings := for $elem in $notes
    
    (: let $datesFrom := $elem//tei:date[@from != '']
    
    let $dateFrom := local:jsonifyNoteFrmoDates($datesFrom):)
    
    let $datesTo := $elem//date (:[@to != '']:)
    
    let $dateTo := local:jsonifyNoteToDates($datesTo)
    
    let $settls := $elem//settlement
    
    let $settl := local:jsonifySettls($settls)
    
    let $generals := $elem//note[@type = 'general']
    
    let $gen := local:jsonifyGenerNote($generals)
    
    let $refnotes := $elem//note[@type = 'reference']
    
    let $refnote := local:jsonifyRefNote($refnotes)
    
    
    return
        concat('{', '"datesTo":[', $dateTo, '],', '"settl":[', $settl, '],', '"genNote":[', $gen, '],', '"notes":[', $refnote, ']', '}')
    
    return
        
        string-join($strings, ',')


};

declare function local:jsonifyGenerNote($generals) {
    
    let $strings := for $elem in $generals
    
    let $partext := replace(normalize-space($elem), '"', '\\"')
    
    return
        if ($partext != '') then
            (
            concat('["', $partext, '"]'))
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifySettls($settls) {
    
    let $strings := for $elem in $settls
    
    let $el := $elem
    let $ref := $elem/@ref
    let $cert := $elem/@cert
    
    return
        if ($el != '') then
            (
            concat('{"settlement":"', $elem, '",', '"ref":"', $ref, '",', '"cert":"', $cert, '"}'))
            (:concat('["', $elem, '","', $ref, '","', $cert, '"]')):)
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyNoteFrmoDates($dates) {
    
    let $strings := for $elem in $dates
    
    let $el := $elem/@from
    let $elcert := $elem/@cert
    
    return
        if ($el != '') then
            (
            concat('["', $el, '","', $elcert, '"]'))
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyNoteToDates($dates) {
    
    let $strings := for $elem in $dates
    
    let $elTo := $elem/@to
    let $elFrom := $elem/@from
    let $elcert := $elem/@cert
    
    return
        
        concat('["', $elTo, '","', $elFrom, '","', $elcert, '"]')
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyNotes($content) {
    
    let $strings := for $elem in $content
    
    let $notes := $elem//note
    
    let $note := local:jsonifyNote($notes[@type = 'pasticcioInfo' or @type = 'bioSummary'])
    
    return
        if ($note != '') then
            (
            $note
            )
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyNote($notes) {
    
    let $strings := for $elem in $notes
    
    let $notetype := $elem/@type
    
    let $ps := $elem/p
    
    let $p := local:jsonifyP($ps)
    
    let $refnotes := $elem/note[@type = 'reference']
    
    let $refnote := local:jsonifyRefNote($refnotes)
    
    
    return
        concat('{', '"notetype":"', $notetype, '",', '"refNotes":[', $refnote, '],', '"par":[', $p, ']}')
    
    return
        
        string-join($strings, ',')


};

declare function local:jsonifyRefNote($refnotes) {
    
    let $strings := for $elem in $refnotes
    
    let $refNote := $elem
    
    let $bibls := $refNote/bibl
    
    let $bibl := local:jsonifyBibl($bibls)
    
    return
        concat('[', $bibl, ']')
    return
        string-join($strings, ',')

};

declare function local:jsonifyBibl($bibls) {
    
    let $strings := for $elem in $bibls
    
    let $biblvalue := replace(normalize-space($elem), '"', '\\"')
    
    let $bibltype := $elem/@type
    
    
    return
        concat('{', '"bibltype":"', $bibltype, '",', '"biblvalue":"', $biblvalue, '"}')
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyP($ps) {
    
    let $strings := for $elem in $ps
    
    let $partext := normalize-space($elem)
    
    return
        if ($partext != '') then
            (
            concat('["', replace($partext, '"', '\\"'), '"]'))
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifyReg($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem//persName[@type = 'reg']
    let $content_title := local:jsonifyRegNames($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyFulls($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem//persName[@type = 'full']
    let $content_title := local:jsonifyFullNames($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyAlts($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem//persName[@type = 'alt']
    let $content_title := local:jsonifyAltNames($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyReals($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem//persName[@type = 'real']
    let $content_title := local:jsonifyRealNames($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};

declare function local:jsonifyPseuds($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem//persName[@type = 'pseud']
    let $content_title := local:jsonifyPseudNames($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyPseudNames($titles) {
    
    let $strings := for $elem in $titles
    
    (: let $value := 
    if($elem[child::text()] = '')then(
       normalize-space($elem) 
    )else():)
    let $value := if (local-name($elem/element()) = '') then
        (normalize-space($elem/self::text()))
    else
        ()
    let $language := $elem/@xml:lang
    let $surName := $elem/surname
    let $surNames := local:jsonifySurname($surName)
    let $foreNameList := $elem/forename
    let $foreNames := local:jsonifyForename($foreNameList)
    
    (:let $title := $elem/tei:surname
	let $foreNameList := $elem/tei:forename
	let $foreNames := local:jsonifyForename($foreNameList)	               
	let $language := $elem/tei:nameLink:)
    
    return
        if ($value != '') then
            (
            concat('{', '"blocktype":"pseud",', '"value":"', $value, '"}')
            )
        else
            (
            concat('{', '"blocktype":"pseud",', '"language":"', $language, '",', '"surName":[', $surNames, '],', '"forename":[', $foreNames, ']}')
            
            )
            (: concat('["',$name, '","',   $title,  '","',   $foreNames, '","', $language,'"]'):)
    
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyAltNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $language := $elem/@xml:lang
    
    let $namesList := $elem/node()
    let $names := local:jsonifyNamesList($namesList)
    
    (:let $surName := $elem/tei:surname
    let $surNames := local:jsonifySurname($surName)
    let $foreNameList := $elem/tei:forename
    let $foreNames := local:jsonifyForename($foreNameList):)
    let $subType := $elem/@subtype
    
    return
        concat('{', '"blocktype":"alt",', '"language":"', $language, '",', '"names":[', $names, '],', '"subtype":"', $subType, '"}')
        
        (:concat('{', '"blocktype":"alt",', '"language":"', $language, '",', '"names":[', $names, '],', '"surName":[', $surNames, '],', '"subtype":"', $subType, '",', '"forename":[', $foreNames, ']}')
        :)
        
        (:concat('["',$sureNames, '","',  $foreNames,'"]'):)
    return
        string-join($strings, ',')
        
        (:let $strings := for $elem in $titles

	let $title := $elem
	
                    return 
concat('["',normalize-space($title),'"]')
    return 
        string-join($strings,','):)

};

declare function local:jsonifyRealNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $surName := $elem/surname
    let $surNames := local:jsonifySurname($surName)
    let $foreNameList := $elem/forename
    let $foreNames := local:jsonifyForename($foreNameList)
    
    
    return
        concat('{', '"blocktype":"real",', '"surName":[', $surNames, '],', '"forename":[', $foreNames, ']}')
        
        
        (:concat('["',$sureNames, '","',  $foreNames,'"]'):)
    return
        string-join($strings, ',')
        
        (:let $strings := for $elem in $titles

	let $title := $elem
	
                    return 
concat('["',normalize-space($title),'"]')
    return 
        string-join($strings,','):)

};

declare function local:jsonifyNamesList($namesList) {
    
    let $strings := for $elem in $namesList
    
    let $nameValue := $elem
    let $entityName := $elem/local-name()
    
    return
        if ($entityName != '') then
            (concat('["', $entityName, '","', $nameValue, '"]'))
        else
            ()
    
    
    return
        string-join($strings, ', ')

};


declare function local:jsonifyRegNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $language := $elem/@xml:lang
    let $namesList := $elem/node()
    let $names := local:jsonifyNamesList($namesList)
    
    (: let $surName := $elem/tei:surname
    let $surNames := local:jsonifySurname($surName)
    let $foreNameList := $elem/tei:forename
    let $foreNames := local:jsonifyForename($foreNameList)
    let $nameLinkList := $elem/tei:nameLink
    let $nameLinks := local:jsonifyNameLink($nameLinkList)
    let $roleNameList := $elem/tei:roleName
    let $roleNames := local:jsonifyRoleName($roleNameList)
    let $genName := $elem/tei:genName
    let $genNames := local:jsonifyGenName($genName):)
    
    return
        
        concat('{', '"blocktype":"reg",', '"language":"', $language, '",', '"names":[', $names, ']}')
        
        (: concat('{', '"blocktype":"reg",', '"language":"', $language, '",', '"names":[', $names, '],','"surName":[', $surNames, '],', '"forename":[', $foreNames, '],', '"nameLink":[', $nameLinks, '],', '"roleName":[', $roleNames, '],', '"genName":[', $genNames, ']}')
        :)
        (:concat('{"language":"', 'de', '"},','{"surName":"', $surNames, '"},','{"forename":"', $foreNames, '"},', '{"nameLink":"', $nameLinks, '"},', '{"roleName":"', $roleNames, '"},', '{"genName":"', $genNames,'"}')
 :)
    return
        string-join($strings, ',')

};

declare function local:jsonifyFullNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $language := $elem/@xml:lang
    
    let $namesList := $elem/node()
    let $names := local:jsonifyNamesList($namesList)
    
    (: let $surName := $elem/tei:surname
    let $surNames := local:jsonifySurname($surName)
    let $foreNameList := $elem/tei:forename
    let $foreNames := local:jsonifyForename($foreNameList):)
    
    
    return
        concat('{', '"blocktype":"full",', '"language":"', $language, '",', '"names":[', $names, ']}')
        
        (:concat('{', '"blocktype":"full",', '"language":"', $language, '",', '"names":[', $names, '],', '"surName":[', $surNames, '],', '"forename":[', $foreNames, ']}')
        :) (:concat('["',$sureNames, '","',  $foreNames,'"]'):)
    return
        string-join($strings, ',')

};


declare function local:jsonifyForename($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        concat('"', $forename, '"')
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifySurname($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        concat('"', $forename, '"')
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyNameLink($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        concat('"', $forename, '"')
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyRoleName($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        concat('"', $forename, '"')
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyGenName($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        concat('"', $forename, '"')
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyDeathDates($content) {
    
    let $strings := for $elem in $content
    
    let $dateList := $elem//death/date
    let $date := local:jsonifyDateList($dateList)
    return
        $date
        (: concat(
        '["', $data, '"]'):)
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyBirthDates($content) {
    
    let $strings := for $elem in $content
    
    let $dateList := $elem//birth/date
    let $date := local:jsonifyDateList($dateList)
    return
        $date
        (: concat(
        '["', $data, '"]'):)
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyDateList($dateList) {
    
    let $strings := for $elem in $dateList
    
    (: let $dateself := $elem:)
    let $when := $elem/@when
    let $cert := $elem/@cert
    let $notBefore := $elem/@notBefore
    let $notAfter := $elem/@notAfter
    let $type := $elem/@type
    
    return
        concat('{', '"when":"', $when, '",', '"cert":"', $cert, '",', '"type":"', $type, '",', '"notAfter":"', $notAfter, '",', '"notBefore":"', $notBefore, '"}')
        
        (: concat('{', '"dateself":"', $dateself, '",', '"when":"', $when, '",', '"cert":"', $cert, '",', '"notAfter":"', $notAfter, '",', '"notBefore":"', $notBefore, '"}')
        :) (:concat('"', $dateself, '"'):)
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyDeathPlaces($content) {
    
    let $strings := for $elem in $content
    
    let $placeList := $elem//death/placeName
    let $place := local:jsonifyPlaceList($placeList)
    
    return
        $place
        (:concat(
        '["', $data, '"]'):)
    
    return
        string-join($strings, ',')
};


declare function local:jsonifyBirthPlaces($content) {
    
    let $strings := for $elem in $content
    
    let $placeList := $elem//birth/placeName
    let $place := local:jsonifyPlaceList($placeList)
    
    return
        $place
        (:concat(
        '["', $data, '"]'):)
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyPlaceList($placeList) {
    
    let $strings := for $elem in $placeList
    
    let $settlemnetList := $elem/settlement
    let $settlemnet := local:jsonifySettlementList($settlemnetList)
    
    return
        concat('{', $settlemnet, '}')
        (:concat('{', '"settlemnet":[', $settlemnet, ']}'):)
        (:concat('"', $dateself, '"'):)
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifySettlementList($settlemnetList) {
    
    let $strings := for $elem in $settlemnetList
    
    let $settlemnet := $elem
    let $ref := $elem/@ref
    let $cert := $elem/@cert
    
    return
        concat('"settlement":"', $settlemnet, '",', '"ref":"', $ref, '",', '"cert":"', $cert, '"')
        (:concat('{', '"settlemnetself":"', $settlemnet,'",', '"ref":"', $ref, '",', '"cert":"', $cert, '"}'):)
        (:concat('"', $forename, '"'):)
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyDeath($content) {
    
    let $strings := for $elem in $content
    
    let $date := $elem//death/date/@when
    
    let $place := $elem//death/placeName/settlement
    
    let $data := if ($date != '')
    then
        (if ($place != '')
        then
            (concat($date, ', ', $place))
        else
            ($date))
    else
        (if ($place != '') then
            ($place)
        else
            ())
    
    return
        
        concat(
        '["', $data, '"]')
    
    return
        string-join($strings, ',')
};


declare function local:jsonifyResidenceDetails($events) {
    
    let $strings := for $elem in $events
    
    let $over := $elem/settlement
    let $date_from := $elem/@from
    let $date_to := $elem/@to
    let $date_when := $elem/@when
    (:let $geogNamesOrt :=$elem/mei:geogName[@type='venue']
					let $geogNamesStadt := $elem/mei:geogName[@type='place']:)
    
    return
        
        concat('["', $over, '",', '"', $date_from, '",', '"', $date_to, '",', '"', $date_when, '"]')
    return
        string-join($strings, ',')

};


declare function local:jsonifyResidence($content) {
    
    let $strings := for $elem in $content
    
    let $events := $elem//residence
    
    let $names := local:jsonifyResidenceDetails($events)
    return
        if ($names != '') then
            (
            $names
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyOccupation($content) {
    
    let $strings := for $elem in $content
    
    let $events := $elem//occupation
    
    let $names := local:jsonifyOccupationDetails($events)
    return
        if ($names != '') then
            (
            $names
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyOccupationDetails($events) {
    
    let $strings := for $elem in $events
    
    let $occ := $elem
    let $type := $elem/@type
    let $subtype := $elem/@subtype
    (:let $date_from := $elem/@from
    let $date_to := $elem/@to
    let $date_when := $elem/@when:)
    (:let $geogNamesOrt :=$elem/mei:geogName[@type='venue']
					let $geogNamesStadt := $elem/mei:geogName[@type='place']:)
    
    return
        concat('["', $occ, '",', '"', $type, '","', $subtype, '"]')
        (:concat('["', $occ, '",', '"', $type, '",', '"', $date_from, '",', '"', $date_to, '",', '"', $date_when, '"]'):)
    return
        string-join($strings, ',')

};


declare function local:jsonifyRoleReferences($workID) {
    
    let $roleTailPath := request:get-parameter('dbRolePath', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
        (:'xmldb:exist:///apps/theater-data/rollen_kostuem/':)
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//TEI
    (:if($rolefiles//tei:TEI//tei:rs[@key=$workID])then($rolefiles//tei:TEI)else():)
    (:let $rolefileTest := if($rolefile[@key=$workID != ''])then($rolefile)else():)
    (:let $refData := local:jsonifyRefDataRoles($rolefile):)
    
    let $strings := for $elem in $rolefile
    let $names := if ($elem//TEI//persName[@key = $workID]) then
        ($elem//titleStmt/title)
    else
        ()
    return
        if ($names != '') then
            (
            concat('"', $names, '"')
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyRegieReferences($workID) {
    
    let $roleTailPath := request:get-parameter('regie', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//TEI
    (:let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/':)
    
    let $strings := for $elem in $rolefile
    let $names := if ($elem//TEI//persName[@key = $workID]) then
        ($elem//titleStmt/title)
    else
        ()
    return
        if ($names != '') then
            (
            concat('"', $names, '"')
            )
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:jsonifySourcesReferences($workID) {
    
    let $roleTailPath := request:get-parameter('dbSourcePath', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
        (:let $rolepath := 'xmldb:exist:///apps/theater-data/sources/':)
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//mei:source/@xml:id
    
    let $strings := for $elem in $rolefile
    let $path1 := concat($rolepath, $elem, '.xml')
    let $file1 := doc($path1)
    let $names := $file1//mei:persName
    let $listNames := local:jsonifyPersNamesForSources($names, $file1)
    (:let $names := if($elem//mei:source//mei:persname[@dbkey=$workID])then($elem//mei:titlestmt/mei:title[1])else():)
    return
        if ($listNames != '') then
            (
            $listNames
            )
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:jsonifyWorksReferences($workID) {
    
    let $roleTailPath := request:get-parameter('dbWorkPath', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
        (:let $rolepath := 'xmldb:exist:///apps/theater-data/works/':)
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//mei:work/@xml:id
    
    let $strings := for $elem in $rolefile
    
    let $path1 := concat($rolepath, $elem, '.xml')
    let $file1 := doc($path1)
    let $names := $file1//mei:persName
    let $listNames := local:jsonifyPersNames($names, $file1)
    (: let $names := $elem/mei:work//mei:titlestmt[1]/mei:title[1]:)
    (:let $names := if($elem/mei:work//mei:persname[@dbkey=$workID])then($elem//mei:titlestmt[1]/mei:title[1])else():)
    return
        if ($listNames != '') then
            (
            $listNames
            )
        else
            ()
    return
        string-join($strings, ',')
};


declare function local:jsonifyPersNames($names, $file1) {
    
    let $strings := for $elem in $names
    
    let $name := if ($elem[@dbkey = $personID]) then
        ($file1//mei:title[1])
    else
        ()
    let $dbId := if ($elem[@dbkey = $personID]) then
        ($file1//mei:work/@xml:id)
    else
        ()
    
    return
        if ($name != '') then
            (
            concat('["', $name, '",', '"', $dbId, '"]')
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyPersNamesForSources($names, $file1) {
    
    let $strings := for $elem in $names
    
    let $name := if ($elem[@dbkey = $personID]) then
        ($file1//mei:titleStmt[not(ancestor::mei:componentGrp)][1]/mei:title[1])
    else
        ()
    let $dbId := if ($elem[@dbkey = $personID]) then
        ($file1/mei:source[not(ancestor::mei:componentGrp)]/@xml:id)
    else
        ()
        (:let $workIdREf:)
    let $worTargetId := if ($elem[@dbkey = $personID]) then
        ($file1/mei:source[not(ancestor::mei:componentGrp)]/mei:relationList/mei:relation[@rel = 'isEmbodimentOf']/@target)
    else
        ()
    let $workIdExpr := tokenize($worTargetId, "#")[last()]
    let $workRefId := substring-before($workIdExpr, '_')
    
    let $rismLabel := if ($elem[@dbkey = $personID]) then
        ($file1/mei:source//mei:identifier[@label = "RISM-label"][1])
    else
        ()
    let $physLoc := if ($elem[@dbkey = $personID]) then
        ($file1/mei:source//mei:identifier[@type = "shelfLocation"][1])
    else
        ()
    let $sourceName := concat('Quelle: ', $rismLabel, ' , ', $physLoc)
    
    return
        if ($name != '') then
            (
            
            concat('["', $name, '",', '"', $dbId, '",', '"', $workRefId, '",', '"', $sourceName, '",', '"', $physLoc, '"]')
            )
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:jsonifyJournalReferences($workID) {
    
    let $roleTailPath := request:get-parameter('dbJournalPath', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
        (:let $rolepath := 'xmldb:exist:///apps/theater-data/theaterjournal/':)
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//TEI
    
    let $strings := for $elem in $rolefile
    let $names := if ($elem//TEI//persName[@key = $workID]) then
        ($elem//titleStmt/title/date)
    else
        ()
    return
        if ($names != '') then
            (
            concat('"', $names, '"')
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyGagenRefReferences($workID) {
    
    let $roleTailPath := request:get-parameter('dbGagePath', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
        (:let $rolepath := 'xmldb:exist:///apps/theater-data/gagenbuecher/':)
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//TEI
    
    let $strings := for $elem in $rolefile
    let $names := if ($elem//TEI//persName[@key = $workID]) then
        ($elem//titleStmt/title)
    else
        ()
    return
        if ($names != '') then
            (
            concat('"', $names, '"')
            )
        else
            ()
    return
        string-join($strings, ',')


};

declare function local:getDateString($dates) {
    
    let $strings := for $elem in $dates
    
    let $onedate := $elem/@when
    
    return
        if ($onedate != '') then
            (
            
            $onedate)
        else
            ()
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyIssueReferences($workID) {
    
    let $roleTailPath := request:get-parameter('dbAusgabePath', '')
    let $rolepath := if ($roleTailPath != '') then
        (concat('/db/apps/', $roleTailPath, '/'))
    else
        ()
        (:let $rolepath := 'xmldb:exist:///apps/theater-data/ausgaben/':)
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//TEI
    
    let $strings := for $elem in $rolefile
    return
        (: let $date := if($elem//tei:TEI//tei:persName[@key=$workID])then($elem//tei:titleStmt/tei:title/tei:date[0])else():)
        let $dates := if ($elem//TEI//persName[@key = $workID]) then
            ($elem//titleStmt/title/date)
        else
            ()
        let $date := local:getDateString($dates)
        let $names := if ($elem//TEI//persName[@key = $workID]) then
            ($elem//titleStmt/title)
        else
            ()
        
        return
            if ($names != '') then
                (
                concat('["', normalize-space($names), '",', '"', $date, '"]')
                )
            else
                ()
    return
        string-join($strings, ',')


};

declare function local:jsonifyRefList($id) {
    
    let $strings := for $elem in $id
    
    let $id := $elem
    let $permtype := $elem/@type
    
    return
        if ($id != '') then
            (
            concat('["', $permtype, '",',
            '"', $id, '"]'))
        else
            ()
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyReferences($content) {
    
    let $strings := for $elem in $content
    
    let $id := $elem//idno
    
    let $gndList := local:jsonifyRefList($id)
    
    return
        $gndList
        (: concat('[', $gndList, ']'):)
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyRelations($content) {
    
    let $strings := for $elem in $content
    
    let $listRelation := $elem//listRelation
    
    let $relList := local:jsonifyRelationsList($listRelation)
    
    return
        $relList
        (: concat('[', $gndList, ']'):)
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyRelationsList($listRelation) {
    
    let $strings := for $elem in $listRelation
    
    let $relations := $elem//relation
    
    let $relation := local:jsonifyRelation($relations)
    
    return
        $relation
        (: concat('[', $gndList, ']'):)
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyRelation($relations) {
    
    let $strings := for $elem in $relations
    
    let $value := $elem
    let $act := $elem/@active
    let $pass := $elem/@passive
    let $subtype := $elem/@subtype
    let $type := $elem/@type
    
    return
        
        concat('["', $type, '",', '"', $subtype, '",', '"', $act, '",', '"', $pass, '",',
        '"', $value, '"]')
    
    return
        string-join($strings, ',')
};


(
(:'{"autoren":[',
        local:jsonifyAutoren($content),
	'],"geschlecht":[',
        local:jsonifyGender($content),
    '],"gnd":[',
        local:jsonifyGND($content),
    '],"wega":[',
         local:jsonifyWega($content),
    '],"viaf":[',
        local:jsonifyVIAF($content),
    '],"birth":[',
        local:jsonifyBirth($content),
     '],"death":[',
        local:jsonifyDeath($content),
    '],"occupation":[',
        local:jsonifyOccupation($content),
    '],"residence":[',
        local:jsonifyResidence($content),
     '],"summaryText":[',
        local:jsonifySummaryText($content),
   (\: '],"summary":[',
        local:jsonifySummary($content),:\)
     '],"roleRef":[',
        local:jsonifyRoleReferences($personID),
      '],"sourcesRef":[',
        local:jsonifySourcesReferences($personID),
      '],"worksRef":[',
        local:jsonifyWorksReferences($personID),
     '],"journalRef":[',
        local:jsonifyJournalReferences($personID), 
     '],"regieRef":[',
        local:jsonifyRegieReferences($personID), 
     '],"gagenRef":[',
        local:jsonifyGagenRefReferences($personID), 
     '],"issueRef":[',
        local:jsonifyIssueReferences($personID), 
        '],"pseud":[',:)

(:'{"pseud":[',
        local:jsonifyPseuds($content), 
     '],"alt":[',
        local:jsonifyAlts($content), 
    '],"full":[',
        local:jsonifyFulls($content), 
     '],"real":[',
        local:jsonifyReals($content), 
	'],"reg":[',
        local:jsonifyReg($content),
    ']}':)

'{"id":',
'"', $personID, '"',
',"persNameBlocks":[{',
'"alt":[',
local:jsonifyAlts($content),
'],"full":[',
local:jsonifyFulls($content),
(:'],"pseud":[',
local:jsonifyPseuds($content),:)
(:'],"real":[',
local:jsonifyReals($content),:)
'],"reg":[',
local:jsonifyReg($content),
']}],"gender":[',
local:jsonifyGender($content),
'],"relations":[',
local:jsonifyRelations($content),
'],"affiliations":[',
local:jsonifyAffiliations($content),
'],"residences":[',
local:jsonifyResidences($content),
'],"references":[',
local:jsonifyReferences($content),
'],"occupations":[',
local:jsonifyOccupation($content),
'],"birthdates":[',
local:jsonifyBirthDates($content),
'],"birthplaces":[',
local:jsonifyBirthPlaces($content),
'],"deathdates":[',
local:jsonifyDeathDates($content),
'],"deathplaces":[',
local:jsonifyDeathPlaces($content),
'],"notes":[',
local:jsonifyNotes($content),
']}'

)