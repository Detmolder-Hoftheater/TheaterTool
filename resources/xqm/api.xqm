xquery version "3.1";

module namespace api = "http://www.hoftheater-detmold.de/xquery/api";
declare namespace mei="http://www.music-encoding.org/ns/mei";

declare variable $api:INVALID_PARAMETER := QName("http://www.hoftheater-detmold.de/xquery/api", "ParameterError");
declare variable $api:UNSUPPORTED_ID_SCHEMA := QName("http://www.hoftheater-detmold.de/xquery/api", "UnsupportedIDSchema");

(:~
: Returns a JSON representation of all Annotations of a document
:
: @param $uri The document to process
: @return The JSON representation
:)
declare function api:documents($model as map()) {
    let $docs := collection('/db/apps/theater-data/works')
    return
        api:document(api:subsequence($docs, $model), $model)
};

(:~
 :  Helper function for creating a subsequence based on external parameters
~:)
declare %private function api:subsequence($seq as item()*, $model as map()) {
    let $offset := if($model('offset') castable as xs:integer) then $model('offset') cast as xs:integer else 0
    let $limit := if($model('limit') castable as xs:integer) then $model('limit') cast as xs:integer else 0
    return
        if($offset gt 0 and $limit gt 0) then subsequence($seq, $offset, $limit)
        else if($offset gt 0) then subsequence($seq, $offset)
        else if($limit gt 0) then subsequence($seq, 1, $limit)
        else $seq
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
        let $id := $doc/mei:work/data(@xml:id)
        let $docType := substring-after(document-uri($doc), 'theater-data')
        return
            map { 
                'uri' := $scheme || '://' || $host || substring-before($basePath, 'api') || $id,
                'docID' := $id,
                'docType' := $docType,
                'title' := 'some title'
            } 
};

declare function api:validate-limit($model as map()) as map()? {
    if($model('limit') castable as xs:positiveInteger and xs:integer($model('limit')) le 200) then $model 
    else error($api:INVALID_PARAMETER, 'Unsupported value for parameter "limit". It should be a positive integer less or equal to 200.')
};

(:~
 : Check parameter offset
~:)
declare function api:validate-offset($model as map()) as map()? {
    if($model('offset') castable as xs:positiveInteger) then $model 
    else error($api:INVALID_PARAMETER, 'Unsupported value for parameter "offset". It should be a positive integer.')
};

(:~
 : Fallback for unknown API parameters 
 : Simply returns an error message
~:)
declare function api:validate-unknown-param($model as map()) as map()? {
    error($api:INVALID_PARAMETER, 'Unsupported parameter "' || string-join(map:keys($model), '; ') || '". If you believe this to be an error please send a note to info@hoftheater-detmold.de.')
};
