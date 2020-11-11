import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { AlibiList } from "./criminals/AlibiList.js";
import { CriminalList, CriminalButton } from "./criminals/CriminalList.js";
import { FacilityButton } from "./facility/FacilityList.js";
import { NoteForm } from "./notes/NoteForm.js";
import { NoteList } from "./notes/NoteList.js";
import { OfficerList } from "./officers/OfficerList.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { WitnessButton } from "./witnesses/WitnessList.js"

CriminalButton();
CriminalList();
ConvictionSelect();
OfficerList();
OfficerSelect();
NoteForm();
NoteList();
AlibiList();
WitnessButton();
FacilityButton();