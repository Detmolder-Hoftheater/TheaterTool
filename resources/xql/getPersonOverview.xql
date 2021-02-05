xquery version "3.1";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $workID := request:get-parameter('dbkey', '');
declare variable $uri := concat('/db/apps/theater-data/persons/', $workID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//tei:person;


declare function local:jsonifyRoles($id) {
    
    let $strings := for $elem in $id
    
    let $id_1 := $elem
    let $role := $elem/@role
    let $dbkey := $elem/@codedval
    
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
    
    let $id := $elem//tei:sex
    
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

declare function local:jsonifySummary($content) {
    
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


};


declare function local:jsonifyNotes($id) {
    
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

};

declare function local:jsonifySummaryText($content) {
    
    let $strings := for $elem in $content
    
    (:let $id_1 := normalize-space($elem//tei:note):)
    let $notetext := $elem/tei:note/node()
    
    let $completNote := local:jsonifyOneEl($notetext)
    
    return
        if ($completNote != '') then
            
            concat('"',normalize-space((replace($completNote, '"', '\\"'))), '"')
        else
            ()
    return
        string-join($strings, ', ')

};

declare function local:jsonifyOneEl($notetext) {
    
    let $strings := for $elem in $notetext
    
    let $oneEl := if($elem/local-name() = 'persName')then(local:dispatch($elem))else($elem)
      
    return
       
        if ($oneEl != '') then
           $oneEl
        else
            ()
    
    return
        string-join($strings, ' ')

};

declare function local:dispatch($id_1 as node()*) as item()* {
    for $nodet in $id_1
    return
        typeswitch ($nodet)                     
            case element(tei:persName) 
                return 
                    local:persName($nodet)
            case text()
                return
                    $nodet 
            default
                return
                    local:passthru($nodet)

};

declare function local:passthru($node as node()*) as item()* {
    local:dispatch($node/node())
};

declare function local:persName($node as element(tei:persName)) as element() {
    if ($node/@key != '') then
        <persName>{concat(
        '<persName id=', $node/@key,
        '><a href="javascript:getPersonContentForPerson(&apos;',
        $node/@key, '&apos;,&apos;',$node,'&apos;);">',$node,'</a></persName>')}</persName>
    else(
        
        <persName>{concat('"', $node, '"')}</persName>
        )
        
};

declare function local:jsonifyBiblText($content) {
    
    let $strings := for $elem in $content
    
    let $id_1 := local:jsonifyBiblValues($elem//tei:bibl/node())(:if($elem//tei:bibl/node() ='')then(normalize-space($elem//tei:bibl))else(local:jsonifyBiblValues($elem//tei:bibl/node())):)
    
    return
        if ($id_1 != '') then
            (
            concat('"', replace($id_1, '"', '\\"'), '"'))
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyBiblValues($content) {
    
    let $strings := for $elem in $content
    
    let $id_1 := $elem
    
    return
        if ($id_1 != '') then
            (
            $id_1 )
        else
            ()
    return
        string-join($strings, ' ')

};


declare function local:jsonifyRegs($content) {

    ($content//tei:persName[@type = 'reg'] ! local:jsonifyRegNames(.)) => string-join(',')
    
};

declare function local:jsonifyFulls($content) {
    
    let $strings := for $elem in $content
    
    let $titles := for $title in $elem//tei:persName
    return
        if ($title/@type = 'full') then
            ($title)
        else
            ()
            
            (:let $titles := $elem//tei:persName[@type = 'full']:)
    let $content_title := local:jsonifyRegNames($titles)
    
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
    
    let $titles := for $title in $elem//tei:persName
    return
        if ($title/@type = 'real') then
            ($title)
        else
            ()
            
            (:let $titles := $elem//tei:persName[@type = 'full']:)
    let $content_title := local:jsonifyRegNames($titles)
    
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
    
    let $titles := for $title in $elem//tei:persName
    return
        if ($title/@type = 'alt') then
            ($title)
        else
            ()
            
            (:let $titles := $elem//tei:persName[@type = 'alt']:)
    let $content_title := local:jsonifyAltNames($titles)
    
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
    
    let $titles := for $title in $elem//tei:persName
    return
        if ($title/@type = 'pseud') then
            ($title)
        else
            ()
            
            (:let $titles := $elem//tei:persName[@type = 'pseud']:)
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
    
    let $name := $elem
    
    (:let $title := $elem/tei:surname
	let $foreNameList := $elem/tei:forename
	let $foreNames := local:jsonifyForename($foreNameList)	               
	let $language := $elem/tei:nameLink:)
    
    return
        (: concat('["',$name, '","',   $title,  '","',   $foreNames, '","', $language,'"]'):)
        concat('["', normalize-space($name), '"]')
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyAltNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $title := $elem
    let $subtype := $elem/@subtype
    
    return
        if ($subtype != "") then
            (concat('["', normalize-space($title), ' (', $subtype, ')', '"]'))
        else
            (concat('["', normalize-space($title), '"]'))
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyRegNames($titles) {
    
    let $strings := for $elem in $titles
    
    let $title1 := $elem/node()
    let $title := local:jsonifyForename($title1)
  
    return
        concat('["', $title, '"]')
    return
        string-join($strings, ',')

};


declare function local:jsonifyForename($foreNameList) {
    
    let $strings := for $elem in $foreNameList
    
    let $forename := $elem
    
    return
        normalize-space($forename)
    
    return
        string-join($strings, ' ')

};



declare function local:jsonifyBirth($content) {
    
    let $strings := for $elem in $content
    
    let $date := $elem//tei:birth/tei:date/@when
    
    let $place := $elem//tei:birth/tei:placeName/tei:settlement
    
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

declare function local:jsonifyDeath($content) {
    
    let $strings := for $elem in $content
    
    let $date := $elem//tei:death/tei:date/@when
    
    let $place := $elem//tei:death/tei:placeName/tei:settlement
    
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
    
    let $over := $elem/tei:settlement
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
    
    let $events := $elem//tei:residence
    
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

declare function local:jsonifyAffiliation($content) {
    
    let $strings := for $elem in $content
    
    let $events := $elem//tei:affiliation
    
    let $names := local:jsonifyAffiliationDetails($events)
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

declare function local:jsonifyAffiliationDetails($events) {
    
    let $strings := for $elem in $events
    
    let $over := $elem/tei:orgName
    let $date_from := if($elem/@from != '')then($elem/@from)else($over/@from)
    let $date_to := if($elem/@to != '')then($elem/@to)else($over/@to)
    let $date_when := if($elem/@when != '')then($elem/@when)else($over/@when)
    (:let $geogNamesOrt :=$elem/mei:geogName[@type='venue']
					let $geogNamesStadt := $elem/mei:geogName[@type='place']:)
    
    return
        
        concat('["', $over, '",', '"', $date_from, '",', '"', $date_to, '",', '"', $date_when, '"]')
    return
        string-join($strings, ',')

};

declare function local:jsonifyOccupation($content) {
    
    let $strings := for $elem in $content
    
    let $events := $elem//tei:occupation
    
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
    
    let $occ := normalize-space(replace($elem, '"', ' '))
    let $type := $elem/@type
    let $date_from := $elem/@from
    let $date_to := $elem/@to
    let $date_when := $elem/@when
    (:let $geogNamesOrt :=$elem/mei:geogName[@type='venue']
					let $geogNamesStadt := $elem/mei:geogName[@type='place']:)
    
    return
        
        concat('["', $occ, '",', '"', $type, '",', '"', $date_from, '",', '"', $date_to, '",', '"', $date_when, '"]')
    return
        string-join($strings, ',')

};

declare function local:jsonifyDayReport($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/tagesberichte/'
    let $rolefiles := collection($rolepath)
    
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
   (: $rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyReportRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()


};

declare function local:jsonifyReportRefNames($nameList) {
    
    let $strings := for $elem in $nameList
    let $titleName := $elem/root()//tei:titleStmt/tei:title
    let $volldate := $elem/root()//tei:titleStmt/tei:title/tei:date[1]/@when
    
    let $dateSplit := tokenize($volldate, '-')
    let $names := concat($titleName, ': ', normalize-space(replace($elem, '"', ' ')))
    
    return
        if ($names != '') then
            (
            concat('["', normalize-space($names), '", "', $dateSplit[1], '"]')
            )
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifyRoleReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/rollen_kostuem/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    (:if($rolefiles//tei:TEI//tei:rs[@key=$workID])then($rolefiles//tei:TEI)else():)
    (:let $rolefileTest := if($rolefile[@key=$workID != ''])then($rolefile)else():)
    (:let $refData := local:jsonifyRefDataRoles($rolefile):)
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
   (: $rolefile//tei:TEI//tei:persName[@key = $workID]:)
    
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};

declare function local:jsonifyRoleRefNames($nameList) {
    
    let $strings := for $elem in $nameList
    let $titleName := $elem/root()//tei:titleStmt/tei:title
    let $names := concat($titleName, ': ', normalize-space($elem))
    
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
    
    (:let $roleTailPath := request:get-parameter('regie', '')
let $rolepath := if($roleTailPath != '')then(concat('/db/apps/', $roleTailPath, '/'))else():)
    let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
};

declare function local:jsonifyTaxReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/taxation/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    (:let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/':)
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};

declare function local:jsonifyBestandReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/bestand/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    (:let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/':)
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};

declare function local:jsonifySourcesReferences($workID) {
    
    let $sources := collection('/db/apps/theater-data/sources/')
    let $persNames := $sources//mei:persName[@codedval = $workID]
    let $manifestations := $persNames/root()//mei:manifestation[not(ancestor::mei:componentList)]
    
    let $refs :=
        for $manifestation in $manifestations
        let $title := $manifestation/mei:titleStmt[1]/mei:title[1]
        let $dbId := $manifestation/data(@xml:id)
        let $workRefId := $manifestation/mei:relationList/mei:relation[@rel = 'isEmbodimentOf']/substring-after(@target, '#') => substring-before('_')
        let $physLoc := ($manifestation//mei:identifier[@type = "shelfLocation"])[1] => normalize-space()
        let $rismLabel := ($manifestation//mei:identifier[@codedval = "RISM-label"])[1] => normalize-space()
        let $sourceName := concat('Quelle: ', $rismLabel, ', ', $physLoc)
        return
            concat('["', replace(normalize-space($title), '"', '\\"'), '",', '"', $dbId, '",', '"', $workRefId, '",', '"', $sourceName, '",', '"', $physLoc, '"]')
    return
        string-join($refs, ',')
};

declare function local:jsonifyRollenReferences($workID as xs:string) as array(*)? {
    
    let $sources := collection('/db/apps/theater-data/sources/')
    let $titlePages := $sources//@codedval[. = $workID]/ancestor::mei:manifestation[count(ancestor::*) = 2]/mei:physDesc/mei:titlePage
    let $names := $titlePages/mei:p/mei:name
    return 
        array { 
            for $name in $names
            return
                array { normalize-space($name), $name/data(@codedval) }
        }
};


declare function local:jsonifyWorksReferences($workID as xs:string) as array(*)? {
    
    let $works := collection('/db/apps/theater-data/works/')//@codedval[. = $workID]/ancestor::mei:work
    return
        array { 
            for $work in $works
            let $title := ($work//mei:title)[1] => normalize-space()
            return
                array { $title, $work/data(@xml:id) }
        }
};


declare function local:jsonifyRevenueReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/einnahmen/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
   (: $rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyReportRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
            
            (:let $strings := for $elem in $rolefile
		let $names := if($elem//tei:TEI//tei:rs[@key=$workID])then($elem//tei:titleStmt/tei:title/tei:date)else()
 return 
    if($names != '')then(                     
concat('"',$names, '"')
    )else()
    return 
        string-join($strings,','):)


};


declare function local:jsonifyJournalReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/theaterjournal/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
            (:
    let $strings := for $elem in $rolefile
    let $names := if ($elem//tei:TEI//tei:persName[@key = $workID]) then
        ($elem//tei:titleStmt/tei:title/tei:date)
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
:)

};

declare function local:jsonifyGagenRefReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/gagenbuecher/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
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
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/ausgaben/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:persName[@key = $workID]
    (:$rolefile//tei:TEI//tei:persName[@key = $workID]:)
    let $names := local:jsonifyReportRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()
            
            (:let $strings := for $elem in $rolefile
    return
        let $dates := if ($elem//tei:TEI//tei:persName[@key = $workID]) then
            ($elem//tei:titleStmt/tei:title/tei:date)
        else
            ()
        let $date := local:getDateString($dates)
        let $names := if ($elem//tei:TEI//tei:persName[@key = $workID]) then
            ($elem//tei:titleStmt/tei:title)
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
        string-join($strings, ','):)


};

declare function local:jsonifyGNDList($id) {
    
    let $strings := for $elem in $id
    
    let $id := if ($elem/@type = 'gnd') then
        ($elem)
    else
        ()
    
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

declare function local:jsonifyWegaList($id) {
    
    let $strings := for $elem in $id
    
    let $id := if ($elem/@type = 'wega') then
        ($elem)
    else
        ()
    
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

declare function local:jsonifyIdnoList($id) {
    
    let $strings := for $elem in $id
    
    let $id := if ($elem/@type = 'viaf') then
        ($elem)
    else
        ()
    
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

declare function local:jsonifyGND($content) {
    
    let $strings := for $elem in $content
    
    (:let $id :=$elem//tei:idno[@type='gnd']:)
    let $id := if ($elem/tei:idno/@type = 'gnd') then
        ($elem/tei:idno)
    else
        ()
        (:let $gndList :=if($elem/tei:idno/@type ='gnd')then(local:jsonifyGNDList($elem/tei:idno))else():)
    
    let $gndList := local:jsonifyGNDList($id)
    
    return
        if ($gndList != '') then
            (concat('[', $gndList, ']'))
        else
            ()
    
    
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyWega($content) {
    
    let $strings := for $elem in $content
    
    (:let $id :=$elem//tei:idno[@type='wega']:)
    let $id := if ($elem/tei:idno/@type = 'wega') then
        ($elem/tei:idno)
    else
        ()
    
    let $gndList := local:jsonifyWegaList($id)
    
    return
        
        if ($gndList != '') then
            (concat('[', $gndList, ']'))
        else
            ()
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyVIAF($content) {
    
    let $strings := for $elem in $content
    
    (:let $id :=$elem//tei:idno[@type='viaf']:)
    let $id := if ($elem/tei:idno/@type = 'viaf') then
        ($elem/tei:idno)
    else
        ()
    
    let $gndList := local:jsonifyIdnoList($id)
    
    return
        
        if ($gndList != '') then
            (concat('[', $gndList, ']'))
        else
            ()
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyScheduleReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/einnahmen/'
    let $rolepath_1 := 'xmldb:exist:///apps/theater-data/ausgaben/'
    let $rolepath_2 := 'xmldb:exist:///apps/theater-data/spielplaene/'
    
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI//tei:term['Spielplan']
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    
    let $rolefiles_1 := collection($rolepath_1)
    let $rolefile_1 := $rolefiles_1//tei:TEI//tei:term['Spielplan']
    let $nameList_1 := $rolefile_1/root()//tei:rs[@key = $workID]
    
    let $rolefiles_2 := collection($rolepath_2)
    let $nameList_2 := $rolefiles_2//tei:TEI//tei:rs[@key = $workID]
    
    let $names := local:jsonifyScheduleRefNames($nameList, $nameList_1, $nameList_2)
    
    return
        if ($names != '') then
            (
            concat('', normalize-space($names), '')
            )
        else
            ()
};

declare function local:jsonifyScheduleRefNames($nameList, $nameList_1, $nameList_2) {
    
    let $strings := for $elem in ($nameList, $nameList_1, $nameList_2)
    let $titleName := $elem/root()//tei:titleStmt/tei:title
    (:let $volldate := $elem/root()//tei:titleStmt/tei:title/tei:date[1]/@when:)
    let $volldate := document-uri($elem/root())
    
    let $dateSplit := tokenize($volldate, '/')
    let $names := concat(normalize-space($titleName), ': ', normalize-space($elem))
    
    return
        if ($names != '') then
            (
            concat('["', normalize-space($names), '", "', $dateSplit[6], '"]')
            )
        else
            ()
    return
        string-join($strings, ',')

};


(
'{"autoren":[',
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
'],"affiliation":[',
local:jsonifyAffiliation($content),
'],"summaryText":[',
local:jsonifySummaryText($content),
'],"biblText":[',
local:jsonifyBiblText($content),
(: '],"summary":[',
        local:jsonifySummary($content),:)
'],"roleRef":[',
local:jsonifyRoleReferences($workID),
'],"sourcesRef":[',
local:jsonifySourcesReferences($workID),
'],"rollen":',
local:jsonifyRollenReferences($workID) => serialize(<output:serialization-parameters><output:method>json</output:method></output:serialization-parameters>),
',"dayReport":[',
local:jsonifyDayReport($workID),
'],"taxation":[',
local:jsonifyTaxReferences($workID),
'],"bestand":[',
local:jsonifyBestandReferences($workID),
'],"worksRef":',
local:jsonifyWorksReferences($workID) => serialize(<output:serialization-parameters><output:method>json</output:method></output:serialization-parameters>),
',"journalRef":[',
local:jsonifyJournalReferences($workID),
'],"regieRef":[',
local:jsonifyRegieReferences($workID),
'],"gagenRef":[',
local:jsonifyGagenRefReferences($workID),
'],"revenueRef":[',
local:jsonifyRevenueReferences($workID),
'],"issueRef":[',
local:jsonifyIssueReferences($workID),
'],"scheduleRef":[',
local:jsonifyScheduleReferences($workID),
'],"pseuds":[',
local:jsonifyPseuds($content),
'],"alts":[',
local:jsonifyAlts($content),
'],"fulls":[',
local:jsonifyFulls($content),
'],"reals":[',
local:jsonifyReals($content),
'],"regs":[',
local:jsonifyRegs($content),
']}'
)
