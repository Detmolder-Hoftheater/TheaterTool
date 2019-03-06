xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $selectedYear := request:get-parameter('selectedYear', '');

declare variable $path := if($selectedYear != '')then(concat('xmldb:exist:///apps/theater-data/einnahmen/', $selectedYear, '/'))else();
declare variable $file := collection($path);

declare variable $path_1 := if($selectedYear != '')then(concat('xmldb:exist:///apps/theater-data/ausgaben/', $selectedYear, '/'))else();
declare variable $file_1 := collection($path_1);

declare variable $path_2 := if($selectedYear != '')then(concat('xmldb:exist:///apps/theater-data/spielplaene/', $selectedYear, '/'))else('xmldb:exist:///apps/theater-data/spielplaene/');
declare variable $file_2 := collection($path_2);

declare function local:getMonths($file, $file_1, $file_2) {

let $strings := for $elem in ($file, $file_1, $file_2)

                   (: let $monthName := if($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan'])then(

					$elem//tei:fileDesc//tei:title/tei:date)else()

					let $month := if($monthName != '')then(substring-before($monthName, " "))else():)
					
					let $monthName := if($elem/tei:TEI/tei:teiHeader/tei:profileDesc//tei:keywords/tei:term['Spielplan'] 
					or $selectedYear = '1820' or $selectedYear = '1821' or $selectedYear = '1822' or $selectedYear = '1823' or $selectedYear = '1824' or $selectedYear = '')then(

					$elem//tei:fileDesc//tei:titleStmt[1]/tei:title)else()
					
					let $month := $monthName
					
                    return 
						if($month != '')then(
                        concat('"',$month,
							
                            '"')
						)else()
    return 
        string-join($strings,',')   
};


 
   (

  '{"names":[',
        local:getMonths($file, $file_1, $file_2),

     ']}'
   
)
      