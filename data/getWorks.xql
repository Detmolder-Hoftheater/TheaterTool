{
   
        children: [
            {
                name: 'Aschenbrödel',
				componist: 'Isouard',
				extName: 'Aschenbrödel: Isouard',
                icon: 'resources/images/Books1-17.png',
                 expanded: true,
                xml: true,               
                incipits: false,
                details: false,
                children: [
                    { name: 'Quelle: D-DT, Mus-n 120',
                    icon: 'resources/images/Book1-16.png',
					extName: 'Quelle: D-DT, Mus-n 120',
                    expanded: true,
                    xml: true,
                    details: true,
                    incipits: true,
                     children: [
                     
                    { name: 'RISM',
                    icon: 'resources/images/Literature-17.png',
						extName: 'RISM',
                    	leaf:true, 
                    	xml: true,
                    	incipits: false,
                    	 details: false
                    },
                   
 				{
                	name: 'Incipits',
					extName: 'Incipits',
                	leaf:true,
                	xml: false,
                	icon: 'resources/images/MusicTranscript-17.png',
                    	incipits: true,
                    	 details: false
                },
			{ leaf:true, 
                    name: 'Facsimile',
						extName: 'Facsimile',
                    		xml: false,
                    	incipits: false,
                    	 details: true,
                   icon: 'resources/images/Images-17.png'}
                ]
                }
               
       ] 
       }
]

}