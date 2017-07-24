xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";
                 
let $bookName := request:get-parameter('regieName', '')

let $path := 'xmldb:exist:///apps/theater-data/theaterjournal/'


let $file := collection($path)
let $fileNames := $file//tei:TEI[tei:teiHeader//tei:titleStmt[1]/tei:title[tei:date = $bookName]]
                 
let $snippet := 
<html manifest="">
    <head>
        <meta charset="UTF-8"/>
    </head>
    <body>
<div>
      
            {
                               
                                $fileNames/tei:text/tei:body/child::*

                             }
       </div> 
       </body>
</html>

return

    $snippet