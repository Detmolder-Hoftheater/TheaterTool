xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $selectedYear := request:get-parameter('selectedYear', '');
declare variable $issuetailPath := request:get-parameter('dbPath', '');
declare variable $path := concat('/db/apps/', $issuetailPath, '/', $selectedYear, '/');
declare variable $file := collection($path);
declare variable $oneFile := $file//tei:TEI;

(:declare variable $path := concat('xmldb:exist:///apps/theater-data/einnahmen/', $selectedYear, '/');
declare variable $file := collection($path);:)

declare function local:getMonths($oneFile) {

let $strings := for $elem in $oneFile

                    (:let $monthName := $elem//tei:fileDesc//tei:title/tei:date:)

                    let $month := $elem/tei:teiHeader/tei:fileDesc/tei:titleStmt[1]/tei:title
					let $issueId := $elem/@xml:id
					(:let $month := if($monthName != '')then(substring-before($monthName, " "))else():)
					
                    return
						if($month!= '')then(concat('["',normalize-space($month),  '",', '"', $issueId, '"]'))else()
						(:if($monthName != '')then(
                        concat('"',$monthName,'"'))else():)
						
    return 
        string-join($strings,',')   
};


 
   (

  '{"names":[',
        local:getMonths($oneFile),

     ']}'
   
)
      