import * as fs from "fs"
import { Document, Packer, Paragraph, TextRun, SectionType, AlignmentType, UnderlineType } from "docx"
import { name } from "file-loader";


var obj = {
    'FirstName': 'ΓΙΑΝΝΗ ΠΡΟΚΟΠΟΥ',
    'LastName': 'Ali',
    'MiddleName': 'Zain'
  };

function makefile() {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'KΡΑΤΙΚΗ ΟΡΧΗΣΤΡΑ ΑΘΗΝΩΝ',
                            bold: true,
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        })
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'ΣΥΜΒΑΣΗ ΕΡΓΟΥ ΕΚΤΑΚΤΟΥ ΜΟΥΣΙΚΟΥ',
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'Μεταξύ',
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'α) της ',
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new TextRun({
                            text: 'ΚΡΑΤΙΚΗΣ ΟΡΧΗΣΤΡΑΣ ΑΘΗΝΩΝ',
                            bold: true,
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                        new TextRun({
                            text: ', που εδρεύει στην Αθήνα, (οδός Βασιλίσσης Σοφίας 86, Τ.Κ. 115 28) με ΑΦΜ 090340107 της ΔΟΥ ΙΒ΄ Αθηνών, και εκπροσωπείται νόμιμα από τον Διευθυντή της κ. Βασίλη Χριστόπουλο, η οποία θα καλείται στο εξής «η Ορχήστρα» και',
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `β) του ${obj.FirstName}, με ΑΦΜ 068960887 της ΔΟΥ ΙΘ’ Αθηνών και ΑΔΤ  ΑΙ 029461, Τρομπετίστα, ο οποίος  θα καλείται στο εξής «ο καλλιτέχνης»`,
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'ΣΥΜΦΩΝΗΘΗΚΑΝ ΑΜΟΙΒΑΙΑ ΚΑΙ ΑΝΕΠΙΦΥΛΑΚΤΑ ΤΑ ΕΞΗΣ :',
                            size: 24,
                            alignment: AlignmentType.JUSTIFIED
                        }),
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'Άρθρο 1 – Αντικείμενο',
                            size: 24,
                            bold: true,
                            underline: {
                                type: UnderlineType.SINGLE,
                            },
                            alignment: AlignmentType.JUSTIFIED
                        }),
                    ],
                }),
                new Paragraph({
                    size: 24, children: [] 
                }),
            ],
        }],
    })

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Test.docx", buffer);
    })
}

export default makefile