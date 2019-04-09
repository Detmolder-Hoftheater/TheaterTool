xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $selectedYear := request:get-parameter('selectedYear', '');

declare variable $rolepath := concat('xmldb:exist:///apps/theater-data/einnahmen/', $selectedYear, '/');
declare variable $rolepath_1 := concat('xmldb:exist:///apps/theater-data/ausgaben/', $selectedYear, '/');

declare variable $rolefiles := collection($rolepath);

declare variable $rolefiles_1 := collection($rolepath_1);

declare function local:getMonths($rolefiles, $rolefiles_1) {
    
    let $strings := for $elem in ($rolefiles, $rolefiles_1)
    
    let $title := if ($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term = 'Spielplan')
    then
        ($elem/tei:TEI//tei:fileDesc//tei:titleStmt[1]/tei:title)
    else
        ()
    
    let $date := $elem//tei:fileDesc//tei:titleStmt[1]/tei:title/tei:date/@when
    let $month := substring-after($date, '-')
    
    return
        if ($title != '') then
            (
            concat('["', normalize-space($title), '","', $month,
            
            '"]')
            )
        else
            ()
    return
        string-join($strings, ',')
};



(

'{"names":[',
local:getMonths($rolefiles, $rolefiles_1),

']}'

)
