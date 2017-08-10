xquery version "3.1";

module namespace api = "http://www.hoftheater-detmold.de/xquery/api";
declare namespace mei="http://www.music-encoding.org/ns/mei";
declare namespace tei="http://www.tei-c.org/ns/1.0";

declare namespace request="http://exist-db.org/xquery/request";

(:import module namespace core="http://xquery.weber-gesamtausgabe.de/modules/core" at "core.xqm";:)

declare variable $api:INVALID_PARAMETER := QName("http://www.hoftheater-detmold.de/xquery/api", "ParameterError");
declare variable $api:UNSUPPORTED_ID_SCHEMA := QName("http://www.hoftheater-detmold.de/xquery/api", "UnsupportedIDSchema");

declare variable $api:max-limit as xs:integer := 200;

(:~
: Returns a JSON representation of all Annotations of a document
:
: @param $uri The document to process
: @return The JSON representation
:)
declare function api:documents($model as map()) {

    let $test_1 := if(exists($model('docType')))
    then(for $i in request:get-parameter-names() return request:get-parameter($i, ''))else()
    
    let $path := concat('/db/apps/theater-data/', $test_1)
    
    (:let $test_2 := if(exists($model('docID')))
    then(for $i in request:get-parameter-names() return request:get-parameter($i, ''))else():)
    
    let $docs := collection($path)
    
    return
    if(exists($model('docID')))
    then (api:findByID($model('docID')))
    else (api:document(api:subsequence($docs, $model), $model))
};


(:declare function api:documents($model as map()) {
    let $ids :=
        if(exists($model('docID'))) then api:findByID($model('docID'))
        else for $docType in api:resolve-docTypes($model) return core:getOrCreateColl($docType, 'indices', true())
    return
        api:document(api:subsequence($ids, $model), $model)
};:)


declare function api:works($model as map()) {
    let $docs := collection('/db/apps/theater-data/works')
    return
        api:document(api:subsequence($docs, $model), $model)
};

declare function api:persons($model as map()) {
    let $docs := collection('/db/apps/theater-data/persons')
    return
        api:persons(api:subsequence($docs, $model), $model)
};

declare function api:sources($model as map()) {
    let $docs := collection('/db/apps/theater-data/sources')
    return
        api:source(api:subsequence($docs, $model), $model)
};

declare function api:regie($model as map()) {
    let $docs := collection('/db/apps/theater-data/regiebuecher')
    return
        api:theaterakten(api:subsequence($docs, $model), $model)
};

declare function api:gage($model as map()) {
    let $docs := collection('/db/apps/theater-data/gagenbuecher')
    return
        api:theaterakten(api:subsequence($docs, $model), $model)
};

declare %private function api:findByID($id as xs:string) as document-node()* {

    let $test_2 := for $i in request:get-parameter-names() return request:get-parameter($i, '')

    let $docs := collection('/db/apps/theater-data/')
    let $doc := for $elem in $docs
        return $elem//mei:work[@xml:id = $test_2]
    let $id := $doc/mei:work/data(@xml:id)
    let $docType := substring-after(document-uri($doc), 'theater-data')
    let $title := $doc/mei:work/mei:titleStmt[1]/mei:title   
			 return
			 $doc
           (: map { 
                (\:'uri' := $scheme || '://' || $host || substring-before($basePath, 'api') || $id,:\)
                'docID' := $id,
                'docType' := $docType,
                'titleVariations' := $title
            } :)
};


(:~
 :  Helper function for creating a subsequence based on external parameters
~:)
(:declare %private function api:subsequence($seq as item()*, $model as map()) {
    let $offset := if($model('offset') castable as xs:integer) then $model('offset') cast as xs:integer else 0
    let $limit := if($model('limit') castable as xs:integer) then $model('limit') cast as xs:integer else 0
    return
        if($offset gt 0 and $limit gt 0) then subsequence($seq, $offset, $limit)
        else if($offset gt 0) then subsequence($seq, $offset)
        else if($limit gt 0) then subsequence($seq, 1, $limit)
        else $seq:)

declare %private function api:subsequence($seq as item()*, $model as map()) {
    let $offset := if($model('offset') castable as xs:integer) then $model('offset') cast as xs:integer else 0
    let $limit := if($model('limit') castable as xs:integer) then $model('limit') cast as xs:integer else 0
    return
        if($offset gt 0 and $limit gt 0) then subsequence($seq, $offset, $limit)
        else if($offset gt 0) then subsequence($seq, $offset, $api:max-limit)
        else if($limit gt 0) then subsequence($seq, 1, $limit)
        else subsequence($seq, 1, $api:max-limit)
}; 


(:~
 :  Helper function for creating an URI for a resource
~:)
declare %private function api:document($documents as document-node()*, $model as map()) as map()* {
    let $host := $model('swagger:config')?host
    let $basePath := $model('swagger:config')?basePath
    let $scheme := $model('swagger:config')?schemes[1]
   
    return 
        for $doc in $documents
        let $id := $doc/*/data(@xml:id)
        let $docType := substring-before(substring-after(document-uri($doc), 'theater-data/'), '/')
        (:let $docType := if(contains($docType_temp, '?'))then(substring-before($docType_temp, '?'))else($docType_temp):)
        
        (:if(exists($model('docType')))
    then(for $i in request:get-parameter-names() return request:get-parameter($i, '')   
    )else(substring-before(substring-after(document-uri($doc), 'theater-data/'), '/')):)
        let $title := if($docType ='persons')then($doc/tei:person/tei:persName/self::node())else($doc//*:titleStmt[1]/*:title)
        return
            map { 
               (: 'uri' := $scheme || '://' || $host || substring-before($basePath, 'api') || $id,:)
                'docID' := $id,
                'docType' := $docType,
                'title' := $title
            } 
};


(:~
 :  Helper function for creating an URI for a resource
~:)
declare %private function api:source($documents as document-node()*, $model as map()) as map()* {
    let $host := $model('swagger:config')?host
    let $basePath := $model('swagger:config')?basePath
    let $scheme := $model('swagger:config')?schemes[1]
    return 
        for $doc in $documents
        let $id := $doc/mei:source/data(@xml:id)
        let $docType := substring-after(document-uri($doc), 'theater-data')
        let $title := $doc//*:titleStmt[1]/*:title
        return
            map { 
                (:'uri' := $scheme || '://' || $host || substring-before($basePath, 'api') || $id,:)
                'docID' := $id,
                'docType' := $docType,
                'title' := $title
            } 
};

declare %private function api:persons($documents as document-node()*, $model as map()) as map()* {
    let $host := $model('swagger:config')?host
    let $basePath := $model('swagger:config')?basePath
    let $scheme := $model('swagger:config')?schemes[1]
    return 
        for $doc in $documents
        let $id := $doc/tei:person/@xml:id
        let $docType := substring-after(document-uri($doc), 'theater-data')
        let $title := $doc/tei:person/tei:persName/self::node()
        return
            map { 
                (:'uri' := $scheme || '://' || $host || substring-before($basePath, 'api') || $id,:)
                'docID' := $id,
                'docType' := $docType,
                'title' := $title
            } 
};

declare %private function api:theaterakten($documents as document-node()*, $model as map()) as map()* {
    let $host := $model('swagger:config')?host
    let $basePath := $model('swagger:config')?basePath
    let $scheme := $model('swagger:config')?schemes[1]
    return 
        for $doc in $documents
      (:  let $id := $doc/tei:TEI/data(@xml:id)
        let $docType := substring-after(document-uri($doc), 'theater-data'):)
        
        let $title := $doc/tei:TEI/tei:teiHeader//tei:titleStmt//tei:title/text()
        let $desc :=  $doc/tei:TEI/tei:teiHeader/tei:encodingDesc/*
        return
            map { 
                (:'uri' := $scheme || '://' || $host || substring-before($basePath, 'api') || $id,
                'docID' := $id,
                'docType' := $docType,:)
                'title' := $title,
                'desc' := $desc
            } 
};

(:declare function api:validate-limit($model as map()) as map()? {
    if($model('limit') castable as xs:positiveInteger and xs:integer($model('limit')) le 200) then $model 
    else error($api:INVALID_PARAMETER, 'Unsupported value for parameter "limit". It should be a positive integer less or equal to 200.')
};:)

declare function api:validate-limit($model as map()) as map()? {
    if($model('limit') castable as xs:positiveInteger and xs:integer($model('limit')) le $api:max-limit) then $model 
    else error($api:INVALID_PARAMETER, 'Unsupported value for parameter "limit". It should be a positive integer less or equal to ' || $api:max-limit || '.')
};

(:~
 : Check parameter offset
~:)
declare function api:validate-offset($model as map()) as map()? {
    if($model('offset') castable as xs:positiveInteger) then $model 
    else error($api:INVALID_PARAMETER, 'Unsupported value for parameter "offset". It should be a positive integer.')
};

(:~
 : Check parameter docID
~:)
declare function api:validate-docID($model as map()) as map()? {
    (: Nothing to do here but decoding, IDs will be checked within api:findByID()   :)
    map { 'docID' := xmldb:decode-uri($model?docID) }
};

(:~
 : Check parameter docType and split comma separated value into a sequence
~:)
declare function api:validate-docType($model as map()) as map()? {
    (:let $wega-docTypes := for $func in api:members('unary-docTypes') return $func(())('name'):)
   (: return:)
        map:entry(
            'docType',
            'docType'
            )
};


(:~
 : Fallback for unknown API parameters 
 : Simply returns an error message
~:)
declare function api:validate-unknown-param($model as map()) as map()? {
    error($api:INVALID_PARAMETER, 'Unsupported parameter "' || string-join(map:keys($model), '; ') || '". If you believe this to be an error please send a note to info@hoftheater-detmold.de.')
};
