xquery version "3.0";

import module namespace freidi-pmd="http://www.freischuetz-digital.de/pmdCE-new" at "../../modules/app.xql";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";
(: 
declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";:)
declare option exist:serialize "method=text media-type=text/plain omit-xml-declaration=yes";


declare variable $path := request:get-parameter('path', '');
declare variable $staffN := request:get-parameter('staff', '');

declare variable $resourceName := tokenize($path,'/')[last()];
declare variable $parentCollectionURI := substring-before($path, $resourceName);

declare variable $doc := collection($freidi-pmd:ce-data)//mei:surface[@xml:id = $path]/root();

declare variable $pb.before := $doc//mei:pb[@facs = '#' || $path];

declare variable $snippet := <controlEvents>{
                                for $elem in $doc//mei:measure[preceding::mei:pb[1]/@xml:id = $pb.before/@xml:id]
                                return
                                    $elem

                             }</controlEvents>;

declare variable $surface := $doc//id($path);

declare variable $slurs := $snippet//(mei:slur[not(./parent::mei:*/parent::mei:choice)]|mei:choice[.//mei:slur]);
declare variable $dynams := $snippet//(mei:dynam[not(./parent::mei:*/parent::mei:choice)]|mei:choice[.//mei:dynam]);
declare variable $dirs := $snippet//mei:dir;
declare variable $choicesSlur := $snippet//(mei:choice[.//mei:slur]);


declare function local:jsonifySlurs($slurs) {
    let $strings := for $elem in $slurs
                    
                    let $id := if($elem//@xml:id) then($elem//@xml:id[1]) else(generate-id($elem))
                    let $measureID := $elem/ancestor::mei:measure/@xml:id
                    let $measureN := $elem/ancestor::mei:measure/@n
                    
                    let $obvious := 'true'
                                         
                    let $ambiguous := 'false'
                    
                    let $place := $elem/string(@curvedir)
                    let $staffText := $elem/@staff
                    
                     let $staffText1 := if(contains($staffText,' '))then(substring-before($staffText, ' '))else($staffText)
                     let $staffText2 := if(contains($staffText,' '))then(substring-after($staffText, ' '))else()
                                        
                    
                    let $tstamp := $elem/(@tstamp)
                    let $tstamp2 := $elem/(@tstamp2)
                    
                    let $startID := $elem//@startid
                    let $endID := $elem//@endid
                    
                      let $name := concat($staffText, '_m', $measureN, '_', $place)
                      
                    return 
                        concat('{"id":"',$id,'",',
                            '"name":"',$name,'",',
                             '"type":"slur",',
                            '"obvious":"',$obvious,'",',
                            '"ambiguous":"',$ambiguous,'",',                           
                            (: '"icon":"resources/images/mix_volume.png",',:)
                            '"measureid":"',$measureID,'",',
                            '"measurenr":"',$measureN,'",',
                           (: '"children":[{',  
                            '"icon":"resources/images/details-xml.png",',:)
                            '"tstamp":"',$tstamp,'",',
                            '"tstamp2":"',$tstamp2,'",',
                             '"startid":"',$startID,'",',
                            '"endid":"',$endID,'",',
                            '"curvedir":"',$place,'",',
                            '"tag":"",', 
                            '"staff":"',$staffText1,'",',
                            '"staff2":"',$staffText2,'",',
                            (:'"test":"',$test,'",',
                           
                            '"choces":[',local:jsonifyChoices($choices, $test),'],',:)
                             '"leaf":true',
                            
                            
                           (: '}]',:)
                       
                        '}')
    
    return 
        string-join($strings,',')
    
};

declare function local:jsonifyElements($elements) {
    let $strings := for $x in $elements
                        (:let $testelem := $x//mei:dynam:)
                        let $name1 := local-name($x)
                        let $place := $x//@curvedir
                        let $staffText := $x//@staff
                        
                         let $staffText1 := if(contains($staffText,' '))then(substring-before($staffText, ' '))else($staffText)
                         let $staffText2 := if(contains($staffText,' '))then(substring-after($staffText, ' '))else()
                       
                        let $tstamp := $x//@tstamp
                        let $tstamp2 := $x//@tstamp2
                        
                         let $startID := $x//@startid
                    	let $endID := $x//@endid
                    
                    return 
                        concat('{"name":"',$name1,'",',   
                            '"type":"slur",',
                           (:  '"icon":"resources/images/mix_volume.png",',:)
                            '"tstamp":"',$tstamp,'",',
                            '"tstamp2":"',$tstamp2,'",',
                            '"startid":"',$startID,'",',
                            '"endid":"',$endID,'",',
                            '"curvedir":"',$place,'",',
                            '"tag":"',$name1,'",',
                            '"staff":"',$staffText1,'",',
                            '"staff2":"',$staffText2,'",',
                             '"leaf":true',
                        '}')
    
    return 
        string-join($strings,',')
    
};

declare function local:jsonifySlurChoices($choicesSlur) {
    let $strings := for $elem in $choicesSlur
                    
                    let $id := if($elem//@xml:id) then($elem//@xml:id[1]) else(generate-id($elem))
                    let $measureID := $elem/ancestor::mei:measure/@xml:id
                    let $measureN := $elem/ancestor::mei:measure/@n
                    
                    let $obvious := 'false'                                        
                    let $ambiguous := 'true'
                    
                    let $name := concat('choice_m', $measureN)
                    
                    let $testarray := local:jsonifyElements($elem/*)
                 
                    return 
                        concat('{"id":"',$id,'",',
                            '"name":"',$name,'",',
                            '"type":"slur",',
                            '"obvious":"',$obvious,'",',
                            '"ambiguous":"',$ambiguous,'",',                           
                            (: '"icon":"resources/images/details-xml.png",',:)
                            '"measureid":"',$measureID,'",',
                            '"measurenr":"',$measureN,'",',
                            '"children":[',  
                                $testarray,                          
                           ']',
                       
                        '}')
    
    return 
        string-join($strings,',')
};


declare function local:jsonifyDirs($dirs) {
    let $strings := for $dir in $dirs
                    let $id := if($dir/@xml:id) then($dir/@xml:id) else(generate-id($dir))
                    return 
                        concat('{"id":"',$id,'"}')
    
    return 
        string-join($strings,',')
    
};


declare function local:jsonifySlursChoice($slurs, $choicesSlur) {
        let $test4 := local:jsonifySlurs($slurs)
        let $test3 :=  local:jsonifySlurChoices($choicesSlur)

    return if($test4 != '')
    then( concat($test4, ',', $test3))
    else(concat($test4, $test3))
   
    
};



(:concat('["',string-join($sources/@xml:id,'","'),'"]'):)
  (
    '{"children":[',
        local:jsonifySlursChoice($slurs, $choicesSlur),
    '],"dirs":[',
        local:jsonifyDirs($dirs),
    ']}'

)
