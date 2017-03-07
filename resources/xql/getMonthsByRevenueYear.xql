xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $selectedYear := request:get-parameter('selectedYear', '');

declare variable $path := concat('xmldb:exist:///apps/theater-data/einnahmen/', $selectedYear, '/');
declare variable $file := collection($path);

declare function local:getMonths($file) {

let $strings := for $elem in $file

                    let $monthName := $elem//tei:fileDesc//tei:title/tei:date

					let $month := if($monthName != '')then(substring-before($monthName, " "))else()
					
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
        local:getMonths($file),

     ']}'
   
)
      