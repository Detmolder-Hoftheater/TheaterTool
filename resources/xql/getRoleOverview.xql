xquery version "3.0";


declare namespace request = "http://exist-db.org/xquery/request";
declare namespace tei = "http://www.tei-c.org/ns/1.0";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace xmldb = "http://exist-db.org/xquery/xmldb";
declare namespace system = "http://exist-db.org/xquery/system";
declare namespace transform = "http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

declare variable $bookName := request:get-parameter('dbkey', '');
declare variable $path := concat('/db/apps/theater-data/rollen/', $bookName, '.xml');
declare variable $file := doc($path);
declare variable $html_1 := $file//tei:castItem;
declare variable $html := local:dispatch($html_1);

(:declare variable  $allSourceFiles := collection('/db/apps/theater-data/sources/');:)
declare variable $sorcepath := 'xmldb:exist:///apps/theater-data/sources/';
declare variable $allSourceFiles := collection($sorcepath);
declare variable $strings := for $elem in $allSourceFiles  
    return $elem/mei:source/mei:componentGrp/mei:source[descendant::*[@dbkey = $bookName]]/mei:physDesc/mei:inscription/mei:persName;

declare variable $htmlPerson := local:dispatch($strings);

declare function local:dispatch($html_1 as node()*) as item()* {
    for $node in $html_1
    return
        typeswitch ($node)
            case text()
                return
                    $node
                    
            (:case element(tei:s) return local:s($node):)
            (:case element(tei:p)
                return
                    local:p($node):)
            case element(tei:roleName)
                return
                    local:roleName($node)
            case element(tei:roleDesc)
                return
                    local:roleDesc($node)
            case element(tei:actor)
                return
                    local:roleActor($node)
            case element(tei:ref)
                return
                    local:workRef($node)
            case element(mei:persName) 
                return 
                    local:persName($node)
                    (:case element(tei:hi)
                return
                    local:hi($node)
            case element(tei:lb)
                return
                    local:lb($node)
            case element(tei:div)
                return
                    local:div($node)
            case element(tei:table)
                return
                    local:table($node)
            case element(tei:body)
                return
                    local:body($node)
            case element(tei:persName)
                return
                    local:persName($node)
            case element(tei:rs)
                return
                    local:rs($node)
            case element(tei:head)
                return
                    local:head($node)
                    (\: case element(tei:hi) return local:hi($node):\)
            case element(tei:row)
                return
                    local:row($node)
            case element(tei:cell)
                return
                    local:cell($node):)
            default
                return
                    local:passthru($node)

};

(: Recurse through child nodes :)
(:declare function local:passthru($node as node()*) as item()* {:)
declare function local:passthru($node as node()*) as item()* {
    local:dispatch($node/node())
    (:element {name($node)} 
{ if($node/@*!= '')then(
  ($node/@*,local:dispatch($node/node()))
  )else()}:)
};

declare function local:persName($node as element(mei:persName)) as element() {

if($node/@dbkey != '')then(
  <div><persName><a href="javascript:getPersonContent('{$node/@dbkey}', '{$node/text()}');">{$node}</a></persName></div>
  )
  else(
  <div><persName>{$node}</persName></div>
  )
};


declare function local:roleName($node as element(tei:roleName)) as element() {
(:let $roleType := $node/@type
let $roleTypeAsElem := if($roleType = 'reg')
    then(' (regulär)')
    else(if($roleType = 'full')
        then(' (vollständig)')
        else(if($roleType = 'alt')
            then(' (alternativ)')
            else(if($roleType = 'nick')
                then(' (nick)')
                else()))):)

let $roleId := $node/@key
let $roleName := $node/text()
let $parentRole := $node/parent::node()/local-name()
let $roleType := $node/@type
let $roleTypeValue := if($roleType != '')then(concat('(', $roleType, ')'))else()
return
    if($parentRole ='castItem')
        then(if ( $roleId!= '') then
        (       
        <dev><font size = "1"><b style="color:gray;">Rollenname {$roleTypeValue}: </b></font><a href="javascript:getRoleContent('{$roleId}', '{$roleName}');">{$roleName}</a></dev>
        )
    else
        (
        <p><font size = "1"><b style="color:gray;">Rollenname {$roleTypeValue}: </b></font>{$roleName}</p>
        ))
        else(if ( $roleId!= '') then
        (       
        <a href="javascript:getRoleContent('{$roleId}', '{$roleName}');">{$roleName}</a>
        )
    else
        (
        <p>{$roleName}</p>
        ))

   
    
};

declare function local:workRef($node as element(tei:ref)) as element() {
    let $workref := $node/@target
    let $workId := tokenize($workref, "#")[last()]
    let $workpath := concat('/db/apps/theater-data/works/', $workId, '.xml')
    let $workfile := doc($workpath)
    let $workcontent := $workfile//mei:work
    let $worktitle := $workcontent//mei:title[1]/text()
    return  
     <p><font size = "1"><b style="color:gray;">Werk: </b></font><a href="javascript:getWorkContent('{$workId}', '{$worktitle}');">{$worktitle}</a></p> 
};

declare function local:roleDesc($node as element(tei:roleDesc)) as element() {
    <p><font size = "1"><b style="color:gray;">Rollenbeschreibung: </b></font>{local:dispatch($node/node())}</p>
    (:<p>Beschreibung: {local:dispatch($node/node())}</p>:)
    (:{$node/text()[not($node/descendant::node())]}{local:dispatch($node/descendant::node())}{$node/descendant::text()}:)
};

declare function local:roleActor($node as element(tei:actor)) as element() {
    <p><font size = "1"><b style="color:gray;">Schauspieler(in): </b></font>{$node}</p>
};


(
$html,
if($htmlPerson != '')then(
(<hr size="1"color="#909090"></hr>),
(<b style="color:gray; font-size: 12px;">Referenzen in Spielbetrieb und Verwaltung</b>),
(<br></br>),
(:(<img src="resources/images/Mask-19.png"align="middle"/>),:)
(<br></br>),
(<b style="color:gray; font-size: 12px;">Personen (generiert aus den Quellenmaterialien)</b>),
(<br></br>),
$htmlPerson)else()
  
        (:local:getPersons($allSourceFiles):)

)