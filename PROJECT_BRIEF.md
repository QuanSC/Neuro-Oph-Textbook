# Project brief: Neuro-Ophthalmology: An Interactive Textbook

Author: Steven C. Quan, OD, FAAO (Assistant Professor of Ophthalmology and Visual Science, University of Chicago).
Independent work by the author; not an official University of Chicago publication. No UChicago branding.

Live site: https://quansc.github.io/Neuro-Oph-Textbook/
Repository: github.com/quansc/Neuro-Oph-Textbook (GitHub Pages, main branch, root folder)
Version: 1.0 (October 2026)

## What it is
Twenty-two interactive HTML study modules for optometry neuro-ophthalmology residents (second-year level), following the author's Neuro-Ophthalmology Curriculum outline. Hub page: index.html. Extra tools: eye_movement_localizer.html, brainstem_ocular_motor_map.html.

## File conventions
- Each module is one self-contained HTML file (module_01_foundations.html ... module_22_pediatric.html).
- site.js (shared): text size buttons, Print or PDF, deep links to tabs (#tabname), progress tracking in localStorage, "Report an error" link (GitHub issue), hub progress badges.
- author.jpg: headshot for the About the author tab.
- Module 3 embeds its own image data (no separate data file).
- All files must sit in the same folder.

## Standard module structure
Tabs: an interactive tool (first), topic cards, Cases (step-by-step reveal), Pearls (10), Self-quiz (10 questions), Goals and sources (curriculum checkpoints, "Where the numbers come from" citations, core readings from the curriculum).
Header: "Neuro-ophthalmology curriculum, module N of 22". Sticky tab bar starts with "All modules". Previous/next links top and bottom. Footer: author line, disclaimers, copyright, report-an-error link.

## Design system
- Colors (CSS variables, light and dark mode): ink #1B2836, background #EDF1F4, panel #FFFFFF, supranuclear purple #6A4C9C, internuclear teal #0E8585, infranuclear amber #B8740F, pupil pink #B83E78, neighbor gray #8A96A2, alert red #C2303B.
- Headings serif (Charter/Georgia stack); body system-ui. Minimal bold; no middle dots.
- Imaging shown in radiology convention (patient's right on viewer's left). Fundus drawings show the right eye.

## Copyright and licensing (decided)
- All rights reserved (switched from CC BY-NC to keep publication options open). Free to view for personal, non-commercial educational use.
- Third-party exception: Module 3's synthetic MRI images use brain tissue maps from the ICBM 2009a Nonlinear Symmetric (MNI152) template under its permissive license; the copyright notice must stay in Module 3 sources, the Module 3 data block, README and LICENSE. Cite Fonov et al., NeuroImage 2011;54(1):313-327 and 2009;47(suppl 1):S102.
- No images, figures or text copied from other publications. Facts are cited; expression is original.
- README states content was drafted with AI assistance and curated by the author.

## Evidence standards
- Every quantitative claim is traced to a primary source in the module's sources tab.
- The full verification pass is complete (all flagged citations confirmed).
- Errors already corrected: IONDT sample size (258 randomized), 2016 AAO HCQ author list (no Melles), NF1 pigmentary criteria wording, HCQ progression statement, anterior choroidal sectoranopia wording.
- Evidence to watch: CRAO thrombolysis (THEIA 2025, TenCRAOS 2026; REVISION pending), GLP-1 receptor agonists and NAION/IIH, AAO 2025 HCQ revision (Ophthalmology 2026;133(4):439-450), GCA steroid-sparing therapy (upadacitinib: SELECT-GCA, NEJM 2025;392:2013-2024, FDA 2025; ACR 2021 guideline predates it; watch for an ACR update).

## Open items
- Author action: correct the AHA CRAO citation in the curriculum outline to Stroke. 2021;52:e282-e294.
- Author action (2026-27 Resident Curriculum Resource Guide): (1) the Dejaco entry is the treat-to-target paper: Dejaco C, Kerschbaumer A, Aletaha D, et al. Treat-to-target recommendations in giant cell arteritis and polymyalgia rheumatica. Ann Rheum Dis. 2024;83(1):48-57; (2) block numbering conflicts with the annual calendar (ischemic optic neuropathy is Block 4 in the calendar, 3 in the guide); (3) GCA readings sit under the December orbital block rather than September.
- The project file heavy_eye_syndrome.pdf is Hennein and Robbins, Surv Ophthalmol 2021;66(1):138-144 (cited in Module 8), not the Pineles 2022 curriculum reading.
- Neuroradiology colleague review of Module 3 (14-question email sent with deep links); add a "radiologist's perspective" section from his answers, credited to him.
- Faculty and resident feedback invited by email (chair CC'd).
- Possible next steps: education research evaluation (IRB exempt), MedEdPORTAL or NANOS NOVEL submission, Zenodo DOI, check faculty IP policy.

## Workflow
- Before each edit session, pull the current files from GitHub (commits made directly on GitHub are newer than the Project copies) and edit those.

## Source PDFs pending upload (Project storage full)
- ACR/VF GCA guideline 2021 (Maz, Arthritis Rheumatol 2021;73(8):1349-1365), SELECT-GCA (Blockmans, NEJM 2025;392:2013-2024), Seibold 2010 (Am J Ophthalmol 150(6):807-814), Patel 2012 (Optom Vis Sci 89(5):E652-E666). Verified from publisher, PubMed and PMC text; add PDFs when space allows.

## Change log
- October 2026 session: Module 4 GCA expansion (ACR/VF 2021, Dejaco 2024 treat-to-target, SELECT-GCA upadacitinib; Case 2 extended to monitoring); Module 2 OCT device comparison (Seibold 2010, Patel 2012); Module 8 heavy eye syndrome (Hennein and Robbins 2021; Pineles 2022 reading); curriculum readings added to Modules 10 and 21; hub "How to use" tab gains a GCA evidence-to-watch item. A month-to-module block schedule was trialed on the hub and removed: block pacing is decided by faculty, not fixed in the textbook.

## Module 3 imaging engine (for future edits)
- Tissue contrast grid values (TS array) drive every image; edit there first.
- Synthetic images: MNI152 tissue maps plus author-drawn skull and orbits, two levels (basal ganglia, orbits), nine sequences, lesions with yellow arrows.
- tools/mri_build.py regenerates the embedded tissue maps (requires Python with nilearn, nibabel, scipy, Pillow).
