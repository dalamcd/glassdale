import { CriminalList } from "./criminals/CriminalList.js";

const html = CriminalList();
const contentElement = document.querySelector(".criminalsContainer");

contentElement.innerHTML = html;