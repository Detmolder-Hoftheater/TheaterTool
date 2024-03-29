xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

(:declare variable $month := request:get-parameter('month', '');
declare variable $year := request:get-parameter('year', '');

declare variable $uri := concat('/db/apps/theater-data/einnahmen/', $year, '/', $year, '_', $month, '.xml');

declare variable $file := doc($uri);

declare variable $headName := $file//tei:profileDesc//tei:keywords/tei:term['Spielplan'];

declare variable $schedule := if($headName != '')then($file)else();:)


declare variable $selectedYear := request:get-parameter('selectedYear', '');
declare variable $path := concat('xmldb:exist:///apps/theater-data/tagesberichte/', $selectedYear, '/');
declare variable $file := collection($path);

(:declare variable $fileNames := $file//mei:work/@xml:id;:)
(:declare variable $headName := $file//tei:profileDesc//tei:keywords/tei:term['Einnahmebeleg'];:)
declare variable $oneFile := $file//tei:TEI/tei:teiHeader;

declare function local:getMonths($file) {

let $strings := for $elem in $file

                   (: let $monthName := if($headName != '')then(

					$elem//tei:fileDesc//tei:title['Einnahmebeleg']/tei:date
					)else()

					let $month := if($headName != '')then(substring-before($monthName, " "))else():)

                    let $path := document-uri($elem)
					let $month := $elem//tei:fileDesc/tei:titleStmt[1]/tei:title
                    return
						if($month!= '')then(
						concat('["', normalize-space($month), '",', '"', $path, '"]')
						(:concat('"',$month,'"'):)
						)else()
                        
						
    return 
        string-join($strings,',')   
};

    
 (

  '{"names":[',
  
        local:getMonths($file),
        

     ']}'
   
)