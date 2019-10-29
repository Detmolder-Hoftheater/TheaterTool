xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace mei = "http://www.music-encoding.org/ns/mei";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $workID := request:get-parameter('workID', '');
declare variable $uri := concat('/db/apps/theater-data/works/', $workID, '.xml');
declare variable $file := doc($uri);
declare variable $content := $file//mei:work;


declare function local:jsonifyRoles($id) {
    
    let $strings := for $elem in $id
    
    let $id_1 := normalize-space($elem)
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
    
    let $id := $elem//mei:titleStmt//mei:persName
    
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


declare function local:jsonifySprachen($content) {
    
    let $strings := for $elem in $content
    
    let $id := $elem//mei:langUsage/mei:language
    
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

declare function local:jsonifyInstr($content) {
    
    let $strings := for $elem in $content
    
    let $id := $elem//mei:instrumentation//mei:instrVoice
    
    let $names := local:jsonifyInstrVoice($id)
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


declare function local:jsonifyInstrVoice($id) {
    
    let $strings := for $elem in $id
    
    let $id_1 := $elem
    
    return
        if ($id_1 != '') then
            (
            concat('"', $id_1, '"'))
        else
            ()
    return
        string-join($strings, ',')

};


declare function local:jsonifyWorkTitel($content) {
    
    let $strings := for $elem in $content
    
    let $titles := $elem//mei:titleStmt[1]/mei:title
    let $content_title := local:jsonifyTitleInformation($titles)
    
    return
        if ($content_title != '') then
            ($content_title)
        else
            ()
    
    return
        string-join($strings, ',')

};


declare function local:jsonifyTitleInformation($titles) {
    
    let $strings := for $elem in $titles
    
    let $title := normalize-space($elem)
    let $type := $elem/@type
    let $language := $elem/@xml:lang
    
    return
        concat('["', replace($title, '"', '\\"'), '","', $type, '","', $language, '"]')
    return
        string-join($strings, ',')

};


declare function local:jsonifyHOverview($content) {
    
    let $strings := for $elem in $content
    
    let $id_1 := $elem//mei:history/mei:p
    
    let $id := local:jsonifyPs($id_1)
    
    
    
    return
        if ($id != '') then
            (
            concat(
            '["', $id, '"]'))
        else
            ()
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyPs($id_1) {
    
    let $strings := for $elem in $id_1
    
    let $id := normalize-space($elem)
    
    return
        if ($id != '') then
            (replace($id, '"', '\\"'))
        else
            ()
    
    return
        string-join($strings, ', ')

};

declare function local:jsonifyCreation($content) {
    
    let $strings := for $elem in $content
    
    let $date := $elem//mei:history/mei:creation/mei:date
    
    let $place := $elem//mei:history/mei:creation/mei:geogName
    
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

declare function local:jsonifyEventDetails($events) {
    
    let $strings := for $elem in $events
    
    let $ps := $elem/mei:p
    let $over := local:jsonifyPS($ps)
    let $date := normalize-space($elem/mei:date)
    let $geogNamesOrt := $elem/mei:geogName[@type = 'venue']
    let $geogNamesStadt := $elem/mei:geogName[@type = 'place']
    
    return
        
        concat('["', $over, '",', '"', $date, '",', '"', $geogNamesOrt, '",', '"', $geogNamesStadt, '"]')
    return
        string-join($strings, ',')

};

declare function local:jsonifyPS($ps) {
    
    let $strings := for $elem in $ps
    
    let $events := normalize-space($elem)
    
    return
        if ($events != '') then
            (
            replace($events, '"', '\\"')
            )
        else
            ()
    return
        string-join($strings, ',')


};


declare function local:jsonifyEvents($content) {
    
    let $strings := for $elem in $content
    
    let $events := $elem//mei:eventList//mei:event
    
    let $names := local:jsonifyEventDetails($events)
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

declare function local:jsonifyRoleReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/rollen_kostuem/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:rs[@key = $workID]:)
    
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
    let $names := concat($titleName, ': ', replace(normalize-space($elem), '"', '\\"'))
    
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

declare function local:jsonifyDayReport($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/tagesberichte/'
    let $rolefiles := collection($rolepath)
    
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:rs[@key = $workID]:)
    
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
    let $names := concat(normalize-space($titleName), ': ', normalize-space(replace($elem, '"', '\\"')))
    
    return
        if ($names != '') then
            (
            concat('["', $names, '", "', $dateSplit[1], '"]')
            )
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
            concat('', $names, '')
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
    let $names := concat(normalize-space($titleName), ': ', normalize-space(replace($elem, '"', '\\"')))
    
    return
        if ($names != '') then
            (
            concat('["', $names, '", "', $dateSplit[6], '"]')
            )
        else
            ()
    return
        string-join($strings, ',')

};

declare function local:jsonifyRevenueReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/einnahmen/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:rs[@key = $workID]:)
    
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
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:let $nameList := $rolefile//tei:TEI//tei:rs[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
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
        string-join($strings,',')
   :)

};

declare function local:jsonifyRegieReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/regiebuecher/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:rs[@key = $workID]:)
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
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:rs[@key = $workID]:)
    let $names := local:jsonifyRoleRefNames($nameList)
    
    return
        if ($names != '') then
            (
            concat('', $names, '')
            )
        else
            ()

};


declare function local:getDates($dates) {
    
    let $strings := for $elem in $dates
    
    let $date := $elem
    
    
    return
        
        $date
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyIssueReferences($workID) {
    
    let $rolepath := 'xmldb:exist:///apps/theater-data/ausgaben/'
    let $rolefiles := collection($rolepath)
    let $rolefile := $rolefiles//tei:TEI
    
    let $nameList := $rolefile/root()//tei:rs[@key = $workID]
    (:$rolefile//tei:TEI//tei:rs[@key = $workID]:)
    
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
        let $dates := if($elem//tei:TEI//tei:rs[@key=$workID])then($elem//tei:titleStmt/tei:title/tei:date)else()
        let $date := if($dates != '')then(local:getDates($dates))else()
		let $names := if($elem//tei:TEI//tei:rs[@key=$workID])then($elem//tei:titleStmt/tei:title)else()
 return 
    if($names != '')then(                     
concat('["',$names, '",', '"', $date, '"]')
    )else()
    return 
        string-join($strings,','):)


};

declare function local:jsonifyWV($content) {

let $strings := for $elem in $content

					let $id :=$elem//mei:identifier[@type='WV']
					
					let $gndList := local:jsonifyWVList($id)
                   
                    return 
                        
concat('[',$gndList,']')
    
    return 
        string-join($strings,',') 
};

declare function local:jsonifyWVList($id) {

let $strings := for $elem in $id

					let $id :=$elem
                   
                    return 
                      if($id != '')then(        
concat(
							'"',$id,'"'))else()
    
    return 
        string-join($strings,',') 
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
    
    let $id := if ($elem/@type = 'WeGA') then
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
    
    let $id := if ($elem/mei:identifier/@type = 'gnd') then
        ($elem/mei:identifier)
    else
        ()
    
    let $gndList := if ($id != '') then
        (local:jsonifyGNDList($id))
    else
        ()
    
    return
        
        concat('[', $gndList, ']')
    
    return
        string-join($strings, ',')
};

declare function local:jsonifyWega($content) {
    
    let $strings := for $elem in $content
    
    let $id := if ($elem/mei:identifier/@type = 'WeGA') then
        ($elem/mei:identifier)
    else
        ()
    
    let $gndList := if ($id != '') then
        (local:jsonifyWegaList($id))
    else
        ()
    
    return
        concat('[', $gndList, ']')
    
    return
        string-join($strings, ',')
};


(
'{"autoren":[',
local:jsonifyAutoren($content),
'],"sprachen":[',
local:jsonifySprachen($content),
'],"gnd":[',
local:jsonifyGND($content),
'],"wv":[',
local:jsonifyWV($content),
'],"wega":[',
local:jsonifyWega($content),
'],"hoverview":[',
local:jsonifyHOverview($content),
'],"creation":[',
local:jsonifyCreation($content),
'],"events":[',
local:jsonifyEvents($content),
'],"instr":[',
local:jsonifyInstr($content),
'],"roleRef":[',
local:jsonifyRoleReferences($workID),
'],"dayReport":[',
local:jsonifyDayReport($workID),
'],"scheduleRef":[',
local:jsonifyScheduleReferences($workID),
'],"revenueRef":[',
local:jsonifyRevenueReferences($workID),
'],"journalRef":[',
local:jsonifyJournalReferences($workID),
'],"regieRef":[',
local:jsonifyRegieReferences($workID),
'],"taxation":[',
local:jsonifyTaxReferences($workID),
'],"issueRef":[',
local:jsonifyIssueReferences($workID),
'],"workTitel":[',
local:jsonifyWorkTitel($content),
']}'

)