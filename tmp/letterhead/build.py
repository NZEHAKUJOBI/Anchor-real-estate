from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, Mm, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_ALIGN_PARAGRAPH

root=Path('C:/sourcecode/Anchor-real-estate')
doc=Document()
s=doc.sections[0]
s.page_width=Mm(210); s.page_height=Mm(297)
s.left_margin=s.right_margin=Mm(22)
s.top_margin=Mm(58); s.bottom_margin=Mm(30)
s.header_distance=Mm(12); s.footer_distance=Mm(13)
normal=doc.styles['Normal']
normal.font.name='Calibri'; normal.font.size=Pt(11)
normal.paragraph_format.space_after=Pt(8)
h=s.header
p=h.paragraphs[0]; p.alignment=WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after=Pt(5)
p.add_run().add_picture(str(root/'src/app/logo.png'),width=Mm(26))
p=h.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after=Pt(2)
r=p.add_run('ANCHOR REAL ESTATE GROUP'); r.bold=True; r.font.name='Cambria'; r.font.size=Pt(19); r.font.color.rgb=RGBColor.from_string('000000')
p=h.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after=Pt(8)
r=p.add_run('MULTIPURPOSE COOPERATIVE SOCIETY LIMITED'); r.font.size=Pt(9); r.font.color.rgb=RGBColor.from_string('000000')
border=OxmlElement('w:pBdr'); b=OxmlElement('w:bottom')
for k,v in [('val','single'),('sz','12'),('color','B89A48'),('space','8')]: b.set(qn('w:'+k),v)
border.append(b); p._p.get_or_add_pPr().append(border)
f=s.footer.paragraphs[0]; f.alignment=WD_ALIGN_PARAGRAPH.CENTER
f.paragraph_format.space_after=Pt(4)
border=OxmlElement('w:pBdr'); b=OxmlElement('w:top')
for k,v in [('val','single'),('sz','8'),('color','195536'),('space','8')]: b.set(qn('w:'+k),v)
border.append(b); f._p.get_or_add_pPr().append(border)
for i,line in enumerate(['124 Sherifat Adenusi Crescent, ACO Estate, Life Camp, Abuja-FCT', '+234 902 525 0026  |  +234 803 612 5057  |  info@anchorcooperativeltd.com']):
    if i: f.add_run().add_break()
    r=f.add_run(line); r.font.size=Pt(9); r.font.color.rgb=RGBColor.from_string('195536')
doc.core_properties.title='Anchor Real Estate Group Letterhead'
doc.core_properties.author='Anchor Real Estate Group'
doc.save(root/'output/letterhead/Anchor-Letterhead.docx')
