<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" version="1.0">
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
    <xsl:template match="/">
        <h3 style="text-align:center">
            <xsl:value-of select="tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title"/>
        </h3>
        <table BORDER="1" CELLPADDING="10" CELLSPACING="0" style="width:100%">
            <xsl:for-each select="tei:TEI/tei:text/tei:body//tei:table//tei:row">
                <tr>
                    <xsl:for-each select="tei:cell">
                        <td style="text-align:left">
                            <xsl:value-of select="."/>
                        </td>
                    </xsl:for-each>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>