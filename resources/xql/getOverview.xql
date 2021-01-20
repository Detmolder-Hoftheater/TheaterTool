xquery version "3.0";

declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";


declare variable $filename := request:get-parameter('path', '');

declare variable $uri := concat('/db/apps/theater-data/beschreibung/', $filename, '.xml');

declare variable $doc := doc($uri)/tei:TEI/tei:text/child::*;

declare variable $html := local:dispatch($doc);

declare function local:dispatch($html_1 as node()*) as item()* {
    for $node in $html_1
    return
        typeswitch ($node)
            case text()
                return
                    $node
            
            case element(tei:p)
                return
                    local:p($node)
            case element(tei:hi)
                return
                    local:hi($node)
            case element(tei:lb)
                return
                    local:lb($node)
            case element(tei:div)
                return
                    local:div($node)
            case element(tei:ref)
                return
                    local:ref($node)
                    
                    
            case element(tei:table)
                return
                    local:table($node)
            case element(tei:head)
                return
                    local:head($node)
            case element(tei:row)
                return
                    local:row($node)
            case element(tei:cell)
                return
                    local:cell($node)
            default
                return
                    local:passthru($node)

};

declare function local:passthru($node as node()*) as item()* {
    local:dispatch($node/node())
};

declare function local:cell($node as element(tei:cell)) as element() {
    <td
        width="300px">{(local:dispatch($node/node()))}</td>
    (:if($node//tei:rs/@type ='work')then(<td width="300px" bgcolor="red">{(local:dispatch($node/node()))}</td>)else(<td width="300px">{(local:dispatch($node/node()))}</td>)
  :)
};

declare function local:row($node as element(tei:row)) as element() {
    <tr>{local:dispatch($node/node())}</tr>
};

declare function local:head($node as element(tei:head)) as element() {
    <head>{local:dispatch($node/node())}</head>
};

declare function local:table($node as element(tei:table)) as element() {
    (:td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;:)
    if($node/ancestor::tei:table)
    then(
    local:dispatch($node/node())
    )
    else(
    <span><p></p><table
            border="1"
            cellpadding="10"
            cellspacing="0"
            style="font-size: 12px; border-collapse: collapse; table-layout:fixed; word-wrap:break-word; font-family: arial, sans-serif">
            {local:dispatch($node/node())}</table></span>
    )
    
};

declare function local:div($node as element(tei:div)) as element() {
    let $linebreak := $node/@rend
    return
        <div
            align="{$linebreak}">{local:dispatch($node/node())}</div>
};

declare function local:p($node as element(tei:p)) as element() {
    <p>{local:dispatch($node/node())}</p>
};

declare function local:lb($node as element(tei:lb)) as element() {
    <br>{local:dispatch($node/node())}</br>
};

declare function local:hi($node as element(tei:hi)) as element() {
    let $rend := $node/@rend
    return
        if ($rend = 'bold') then
            <b>{local:dispatch($node/node())}</b>
        else
            if ($rend = 'italic') then
                <i>{local:dispatch($node/node())}</i>
            else
                if ($rend = 'latintype') then
                    <i>{local:dispatch($node/node())}</i>
                else
                    if ($rend = 'underline') then
                        <u>{local:dispatch($node/node())}</u>
                    else
                        <span>{local:dispatch($node/node())}</span>
};

declare function local:ref($node as element(tei:ref)) as element() {
    let $link := $node/@target
    let $linkText := $node
    return
    <a target="_blank" href="{$link}">{$linkText}</a>
    
    
};

(
$html
)