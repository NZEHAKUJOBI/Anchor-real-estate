from pathlib import Path
from docx import Document
from docx.shared import Pt, Mm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

root=Path('C:/sourcecode/Anchor-real-estate')
doc=Document(); s=doc.sections[0]
s.page_width=Mm(210); s.page_height=Mm(297)
s.left_margin=s.right_margin=Mm(22)
s.top_margin=Mm(63); s.bottom_margin=Mm(25)
s.header_distance=Mm(10); s.footer_distance=Mm(14)
normal=doc.styles['Normal']; normal.font.name='Calibri'; normal.font.size=Pt(11)
normal.paragraph_format.space_after=Pt(8)
p=s.header.paragraphs[0]; p.alignment=WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after=Pt(0)
p.add_run().add_picture(str(root/'output/crestline/Crestline-Logo.png'),width=Mm(166))
def rule(p,side,color,size):
    borders=OxmlElement('w:pBdr'); b=OxmlElement('w:'+side)
    for k,v in [('val','single'),('sz',str(size)),('color',color),('space','1')]: b.set(qn('w:'+k),v)
    borders.append(b); p._p.get_or_add_pPr().append(borders)
p=s.header.add_paragraph(); p.paragraph_format.space_after=Pt(0); p.paragraph_format.space_before=Pt(0)
p.paragraph_format.line_spacing=Pt(2)
rule(p,'bottom','092E51',12)
p=s.footer.paragraphs[0]; p.paragraph_format.space_after=Pt(0)
rule(p,'top','3D9955',8)
doc.core_properties.title='Crestline Development and Innovation Center Ltd/Gte Letterhead'
doc.core_properties.author='Crestline Development and Innovation Center Ltd/Gte'
doc.save(root/'output/crestline/Crestline-Letterhead.docx')
