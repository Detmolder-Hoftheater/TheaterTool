<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mei="http://www.music-encoding.org/ns/mei" version="2.0">
	
	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>
	<xsl:template match="/">      
		<table BORDER="0" CELLPADDING="4" CELLSPACING="4" style="width:100%">			
			<xsl:for-each select="mei:source/mei:titleStmt/mei:title">	
				<tr>			
					<td style="text-align:center">
						<b>
                            <xsl:value-of select="."/>
                        </b>
						(<xsl:value-of select="@*"/>)
					</td>
				</tr>		
			</xsl:for-each>				
		</table>

		<table BORDER="1" CELLPADDING="4" CELLSPACING="0" style="width:100%">			
			<xsl:for-each select="mei:source/mei:titleStmt//mei:persName">	
				<tr>			
					<td style="text-align:left">
						<xsl:value-of select="@role"/>
					</td>
					<td style="text-align:left">
						<xsl:value-of select="."/>
					</td>
				</tr>		
			</xsl:for-each>				
		</table>

		<h3 style="text-align:center">
			Informationen zur Publikation
		</h3>
		<table BORDER="0" CELLPADDING="4" CELLSPACING="0" style="width:100%">			
			<xsl:for-each select="mei:source/mei:pubStmt/mei:date">	
				<tr>			
					<td style="text-align:left">
						<xsl:value-of select="."/>
					</td>
				</tr>		
			</xsl:for-each>				
		</table>

		<h3 style="text-align:center">
			Physikalische Beschreibung
		</h3>
		<table BORDER="0" CELLPADDING="4" CELLSPACING="0" style="width:100%">			
			<xsl:for-each select="mei:source/mei:physDesc/mei:provenance">	
				<tr>			
					<td style="text-align:left">
						<xsl:value-of select="mei:repository"/>
						(<xsl:value-of select="@analog"/>)
					</td>
				</tr>		
			</xsl:for-each>				
		</table>

		<h3 style="text-align:center">
			Physikalische Ort
		</h3>
		<p>
			<xsl:value-of select="mei:source/mei:physLoc//mei:name"/>
		</p>
		<p>
			<xsl:value-of select="mei:source/mei:physLoc//mei:identifier"/>
		</p>

		<h3 style="text-align:center">
			Vorhandene Sprache
		</h3>
		<p>
			<xsl:value-of select="mei:source//mei:language"/>
		</p>
		
		<h3 style="text-align:center">
			Annotationen
		</h3>
		<table BORDER="0" CELLPADDING="4" CELLSPACING="0" style="width:100%">			
			<xsl:for-each select="mei:source/mei:notesStmt/mei:annot">	
				<tr>			
					<td style="text-align:left">
						<xsl:value-of select="."/>
						(<xsl:value-of select="@*"/>)
					</td>
				</tr>		
			</xsl:for-each>				
		</table>
		
	</xsl:template>
</xsl:stylesheet>