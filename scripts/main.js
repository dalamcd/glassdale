import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { AlibiList } from "./criminals/AlibiList.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { NoteForm } from "./notes/NoteForm.js";
import { NoteList } from "./notes/NoteList.js";
import { OfficerList } from "./officers/OfficerList.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { WitnessButton } from "./witnesses/WitnessList.js"

CriminalList();
ConvictionSelect();
OfficerList();
OfficerSelect();
NoteForm();
NoteList();
AlibiList();
WitnessButton();