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
    declare variable $rolepath_2 := concat('xmldb:exist:///apps/theater-data/spielplaene/', $selectedYear, '/');
    
    declare variable $rolefiles := collection($rolepath);
    declare variable $file := if ($rolefiles/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan']
    ) then
        ($rolefiles/tei:TEI)
    else
        ();
    
    declare variable $rolefiles_1 := collection($rolepath_1);
    declare variable $file_1 := if ($rolefiles_1/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan']
    ) then
        ($rolefiles_1/tei:TEI)
    else
        ();
    
    declare variable $rolefiles_2 := collection($rolepath_2);
    declare variable $file_2 := $rolefiles_2/tei:TEI;
    
   
declare function local:getMonths($file, $file_1, $file_2) {
    
    let $strings := for $elem in ($file, $file_1, $file_2)
    
    let $month := $elem//tei:fileDesc//tei:titleStmt[1]/tei:title
    
    return
        if ($month != '') then
            (
            concat('"', $month,
            
            '"')
            )
        else
            ()
    return
        string-join($strings, ',')
};



(

'{"names":[',
local:getMonths($file, $file_1, $file_2),

']}'

)
