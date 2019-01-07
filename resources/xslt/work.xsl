<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mei="http://www.music-encoding.org/ns/mei" version="2.0">
	
	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>
	<xsl:template match="/">      
		<table BORDER="0" CELLPADDING="4" CELLSPACING="4" style="width:100%">			
			<xsl:for-each select="mei:work/mei:titleStmt/mei:title">	
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
			<xsl:for-each select="mei:work/mei:titleStmt//mei:persName">	
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
			Vorhandene Sprache
		</h3>
		<p>
			<xsl:value-of select="mei:work//mei:language"/>
		</p>
		

		<h3 style="text-align:center">
			Geschichte
		</h3>
		<p>
			<xsl:value-of select="mei:work/mei:history"/>
		</p>
		<h3 style="text-align:center">
			Instrumentierung
		</h3>
		<table BORDER="0" CELLPADDING="4" CELLSPACING="0" style="width:100%">			
			<xsl:for-each select="mei:work/mei:perfMedium/mei:instrumentation/mei:instrVoice">	
				<tr>			
					<td style="text-align:left">
						<xsl:value-of select="."/>
					</td>
				</tr>		
			</xsl:for-each>				
		</table>
		
		<xsl:for-each select="mei:work/mei:perfMedium/mei:instrumentation/mei:instrVoiceGrp">	
			<h3 style="text-align:center">
				Gruppe
			</h3>
			<table BORDER="0" CELLPADDING="4" CELLSPACING="0" style="width:100%">
				<xsl:for-each select="mei:instrVoice">	
					<tr>			
						<td style="text-align:left">
							<xsl:value-of select="."/>
						</td>
					</tr>
				</xsl:for-each>	
			</table>		
		</xsl:for-each>				
		
	</xsl:template>
</xsl:stylesheet>