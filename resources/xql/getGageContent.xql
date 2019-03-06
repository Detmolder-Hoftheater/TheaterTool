xquery version "3.0";


declare namespace request="http://exist-db.org/xquery/request";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace xmldb="http://exist-db.org/xquery/xmldb";
declare namespace system="http://exist-db.org/xquery/system";
declare namespace transform="http://exist-db.org/xquery/transform";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";
                 
declare variable  $bookName := request:get-parameter('regieName', '');

declare variable  $path := 'xmldb:exist:///apps/theater-data/gagenbuecher/';

declare variable $file := collection($path);
declare variable $fileNames := $file/tei:TEI[tei:teiHeader//tei:titleStmt[1][tei:title = $bookName]];
declare variable $html_1 := $fileNames/tei:text/tei:body/child::*;
declare variable $html := local:dispatch($html_1);


  declare function local:dispatch($html_1 as node()*)  as item()* {
  for $node in $html_1
  return
  typeswitch($node)
  case text() return $node
  (:case element(tei:s) return local:s($node):)
  case element(tei:p) return local:p($node)
  case element(tei:hi) return local:hi($node)
  case element(tei:lb) return local:lb($node)
  case element(tei:div) return local:div($node)
  case element(tei:table) return local:table($node)
  case element(tei:body) return local:body($node)
  case element(tei:persName) return local:persName($node)
  (:case element(tei:rs) return local:rs($node):)
  case element(tei:head) return local:head($node)
 (: case element(tei:hi) return local:hi($node):)
  case element(tei:row) return local:row($node)
  case element(tei:cell) return local:cell($node)
  default return local:passthru($node)
  
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

(: <s> to <span> with attributes :)
declare function local:s($node as element(tei:s)) as element() {
  let $sentence := $node/@n
  return
  <span data-sentence="{$sentence}">{local:dispatch($node/node())}</span>
};

(: <p> to <p> with attributes :)
declare function local:p($node as element(tei:p)) as element() {
  <p>{local:dispatch($node/node())}</p>
};

declare function local:lb($node as element(tei:lb)) as element() {
  <br>{local:dispatch($node/node())}</br>
};

declare function local:div($node as element(tei:div)) as element() {
  let $linebreak := $node/@rend
  return
  <div align="{$linebreak}">{local:dispatch($node/node())}</div>
};

(: <hi> to <b>, <i>, or <span> :)
declare function local:hi($node as element(tei:hi)) as element() {
  let $rend := $node/@rend
  return
  if ($rend = 'bold') then
    <b>{local:dispatch($node/node())}</b>
  else if ($rend = 'italic') then
    <i>{local:dispatch($node/node())}</i>
     else if ($rend = 'latintype') then
    <i>{local:dispatch($node/node())}</i>
    else if ($rend = 'underline') then
    <u>{local:dispatch($node/node())}</u>
  else
    <span>{local:dispatch($node/node())}</span>
};
(: <quote> to <span> :)
declare function local:quote($node as element(tei:quote)) as element() {
  let $rend := $node/@rend
  return
  if ($rend = 'blockquote') then
    <blockquote>{local:dispatch($node/node())}</blockquote>
  else
    <q>{local:dispatch($node/node())}</q>
};
(: <q> to quote :)
declare function local:q($node as element(tei:q)) as element() {
  <span class="quotes">‘{local:dispatch($node/node())}’</span>
};
(: <body> to <div> with id attribute :)
declare function local:body($node as element(tei:body)) as element() {
  <div lang="la" id="tei-document">{local:dispatch($node/node())}</div>
};

declare function local:table($node as element(tei:table)) as element() {
(:td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;:)

  <table border="1" cellpadding="10" cellspacing="0" style="font-size: 12px; width:100%; border-collapse: collapse; font-family: arial, sans-serif">{local:dispatch($node/node())}</table>
};

declare function local:head($node as element(tei:head)) as element() {
  <caption>{local:dispatch($node/node())}</caption>
};

(:declare function local:hi($node as element(tei:hi)) as element() {
  <tr><td><hi rend="{$node/@rend}">{local:dispatch($node/node())}</hi></td></tr>
};:)

declare function local:row($node as element(tei:row)) as element() {
  <tr>{local:dispatch($node/node())}</tr>
};

declare function local:cell($node as element(tei:cell)) as element() {
  <td>{(local:dispatch($node/node()))}</td>
};

declare function local:persName($node as element(tei:persName)) as element() {
if($node/@key != '')then(
  <persName id='{$node/@key}'><a href="javascript:getPersonContent('{$node/@key}', '{$node/text()}');">{$node}</a></persName>
  )
  else(
  <persName>{$node}</persName>
  )
};

(:declare function local:rs($node as element(tei:rs)) as element() {
if($node/@key != '')then(
  <rs id='{$node/@key}'><a href="javascript:getPersonContent('{$node/@key}', '{$node/text()}');">{$node}</a></rs>
  )
  else(
  <rs>{$node}</rs>
  )
};:)

(
    $html
    )