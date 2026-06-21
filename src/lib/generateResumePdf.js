import { jsPDF } from 'jspdf';

const MARGIN = 14;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;
const RIGHT_X = PAGE_W - MARGIN;

function ensureSpace(doc, y, needed, marginTop = 14) {
  if (y + needed > 285) {
    doc.addPage();
    return marginTop;
  }
  return y;
}

function drawSectionHeader(doc, y, title) {
  y = ensureSpace(doc, y, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 30, 30);
  doc.text(title.toUpperCase(), MARGIN, y);
  y += 1.5;
  doc.setDrawColor(60, 60, 60);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, RIGHT_X, y);
  return y + 5;
}

function drawBullets(doc, y, bullets, maxWidth = CONTENT_W - 4) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  for (const bullet of bullets) {
    const lines = doc.splitTextToSize(bullet, maxWidth - 6);
    y = ensureSpace(doc, y, lines.length * 4.2 + 2);
    doc.text('•', MARGIN + 1, y);
    doc.text(lines, MARGIN + 5, y);
    y += lines.length * 4.2 + 1.5;
  }
  return y;
}

function drawTwoColLine(doc, y, left, right, boldLeft = false) {
  y = ensureSpace(doc, y, 6);
  doc.setFont('helvetica', boldLeft ? 'bold' : 'normal');
  doc.setFontSize(boldLeft ? 10 : 9.5);
  doc.setTextColor(30, 30, 30);
  doc.text(left, MARGIN, y);
  if (right) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(right, RIGHT_X, y, { align: 'right' });
  }
  return y + 5;
}

export function generateResumePdf(resume) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = 16;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(20, 20, 20);
  doc.text(resume.name, MARGIN, y);
  y += 7;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);
  const contact = [
    resume.location,
    resume.phone,
    resume.email,
    resume.linkedin,
    resume.github,
  ].filter(Boolean);
  const contactLines = doc.splitTextToSize(contact.join('  |  '), CONTENT_W);
  doc.text(contactLines, MARGIN, y);
  y += contactLines.length * 3.8 + 5;

  // Summary
  y = drawSectionHeader(doc, y, 'Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  const summaryLines = doc.splitTextToSize(resume.summary, CONTENT_W);
  y = ensureSpace(doc, y, summaryLines.length * 4.2);
  doc.text(summaryLines, MARGIN, y);
  y += summaryLines.length * 4.2 + 4;

  // Education
  y = drawSectionHeader(doc, y, 'Education');
  for (const edu of resume.education) {
    y = drawTwoColLine(doc, y, edu.school, edu.dates, true);
    const degreeLine = [edu.degree, edu.gpa].filter(Boolean).join('  ');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    y = ensureSpace(doc, y, 5);
    doc.text(degreeLine, MARGIN, y);
    y += 5;
    if (edu.detail) {
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      y = ensureSpace(doc, y, 4);
      doc.text(edu.detail, MARGIN, y);
      y += 4;
    }
    y += 1;
  }
  y += 2;

  // Experience
  if (resume.experience?.length) {
    y = drawSectionHeader(doc, y, 'Experience');
    for (const exp of resume.experience) {
      y = drawTwoColLine(doc, y, exp.title, exp.dates, true);
      y = drawTwoColLine(doc, y, exp.company, exp.location || '');
      y = drawBullets(doc, y, exp.bullets);
      y += 2;
    }
  }

  // Projects
  y = drawSectionHeader(doc, y, 'Projects');
  for (const proj of resume.projects) {
    y = ensureSpace(doc, y, 8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    const titleLine = `${proj.title}  |  ${proj.stack}`;
    const titleWrapped = doc.splitTextToSize(titleLine, CONTENT_W - 22);
    doc.text(titleWrapped, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.text(proj.date, RIGHT_X, y, { align: 'right' });
    y += titleWrapped.length * 4.2 + 1;
    y = drawBullets(doc, y, proj.bullets);
    y += 1.5;
  }

  // Skills
  y = drawSectionHeader(doc, y, 'Technical Skills');
  doc.setFontSize(9.5);
  for (const [category, items] of Object.entries(resume.skills)) {
    if (!items?.length) continue;
    const value = items.join(', ');
    y = ensureSpace(doc, y, 6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(`${category}:`, MARGIN, y);
    const labelW = doc.getTextWidth(`${category}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    const valueLines = doc.splitTextToSize(value, CONTENT_W - labelW);
    doc.text(valueLines, MARGIN + labelW, y);
    y += valueLines.length * 4.2 + 1.5;
  }
  y += 2;

  // Achievements
  y = drawSectionHeader(doc, y, 'Achievements');
  y = drawBullets(doc, y, resume.achievements);

  const filename = `resume-${resume.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(filename);
}
