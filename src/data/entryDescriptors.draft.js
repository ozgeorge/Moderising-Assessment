// =====================================================================
// DRAFT Entry-level descriptors (E1, E2, E3) for each evidence type.
// These are NOT in the published BETA 2.0 toolkit. They are derived from
// the official CQFW Entry-level summaries (see CQFW_DESCRIPTORS below) by
// scaling down the existing Level 1 wording into structured/familiar
// (E3), simple/familiar with guidance (E2), and elementary (E1) form.
// They MUST be reviewed and approved by the Agored Cymru assessment team
// before any external publication.
// =====================================================================
export const ENTRY_DESCRIPTORS = {
  'digital-documents': {
    'Report / Essay':         { e1: 'Recognises or marks key familiar words with prompts', e2: 'Copies or writes simple words and phrases with support', e3: 'Writes short sentences on a familiar topic using a given structure' },
    'Blog (written)':         { e1: 'Marks or selects words and images about themselves with help', e2: 'Shares a feeling or idea using simple words with support', e3: 'Writes a few sentences about a familiar experience with prompts' },
    'Reflective Journal':     { e1: 'Points to or marks how an activity went, with prompts', e2: 'Uses pictures or simple words to record an activity, with help', e3: 'Notes what happened in a familiar activity, using prompts' },
    'Annotated Photographs':  { e1: 'Identifies a familiar object in a photo with prompting', e2: 'Matches familiar words to objects in a photo with help', e3: 'Uses simple labels for familiar items in photos with support' },
    'Infographic':            { e1: 'Selects a familiar image from a small set with prompts', e2: 'Adds an image or word to a prepared layout with help', e3: 'Places familiar items into a simple template with support' },
    'Slide Deck + Notes':     { e1: 'Indicates which image goes on which slide with help', e2: 'Adds a single word or picture per slide with support', e3: 'Places familiar words or images onto pre-set slides with help' },
    'Planning Document':      { e1: 'Points to the first action of a known routine with prompts', e2: 'Identifies the next step in a familiar task with help', e3: 'Arranges familiar steps in order using a template with support' },
    'Case Study':             { e1: 'Recognises the situation being discussed with help', e2: 'Names parts of a familiar situation with support', e3: 'Describes a familiar situation in a few sentences with prompts' },
    'Spreadsheet':            { e1: 'Recognises familiar numbers or words in a chart with prompts', e2: 'Identifies where information goes in a prepared sheet with support', e3: 'Enters familiar information into prepared cells with guidance' },
    'Flowchart / Mind Map':   { e1: 'Identifies one connection between two familiar ideas with prompts', e2: 'Matches items to a prepared shape or category with help', e3: 'Arranges familiar items in a given order using a template' },
    'Poster or Flyer':        { e1: 'Points to or marks the topic of the poster with help', e2: 'Selects from a small set of images to add to a template', e3: 'Adds a familiar image and word to a prepared layout' },
    'Storyboard':             { e1: 'Identifies the first and last picture in a sequence with prompts', e2: 'Matches pictures to a simple sequence with support', e3: 'Puts familiar pictures in order with a given starting point' },
  },
  'video': {
    'Screencast':                          { e1: 'Indicates start or stop of a familiar action with help', e2: 'Records one step of a familiar task with support', e3: 'Records a few steps of a familiar task with prompts' },
    'Recorded presentation':               { e1: 'Says a familiar word or makes a recognisable sound with prompts', e2: 'Repeats a familiar phrase or short sentence with support', e3: 'Speaks a few rehearsed sentences with prompts and support' },
    'Video diary / vlog':                  { e1: 'Responds to a familiar prompt about themselves with help', e2: 'Says a familiar phrase about how something went with support', e3: 'Names what happened in a familiar activity on camera, with prompts' },
    'Practical demonstration':             { e1: 'Participates in a simple familiar action with prompts', e2: 'Follows rehearsed steps for a simple familiar task with support', e3: 'Carries out a structured familiar task with appropriate guidance' },
    'Role play / simulation':              { e1: 'Mirrors a familiar action or expression with prompts', e2: 'Says rehearsed lines in a simple scenario with support', e3: 'Takes part in a familiar role-play with structured prompts' },
    'Interview (as interviewer or subject)': { e1: 'Indicates yes or no to familiar questions with prompts', e2: 'Responds with single words or signs to familiar questions', e3: 'Answers familiar questions in short phrases with prompts' },
    'Explainer video':                     { e1: 'Recognises and indicates a familiar item or topic with help', e2: 'Repeats a familiar fact with support', e3: 'Names familiar steps or items in a structured way with prompts' },
    'Peer assessment (video)':             { e1: 'Shows a familiar gesture in response with prompts', e2: 'Indicates a thumbs-up or thumbs-down response with support', e3: "Says whether a piece of familiar work was 'good' or 'OK' with prompts" },
    'Guided tour / walkthrough':           { e1: 'Recognises a familiar location or item with prompts', e2: 'Points to or names one familiar object with support', e3: 'Names familiar parts of a setting in order with prompts' },
    'Time-lapse / montage':                { e1: 'Indicates change between two familiar states with help', e2: 'Records one stage of a familiar task with support', e3: 'Records start and end points of a familiar task with prompts' },
  },
  'audio': {
    'Podcast':                       { e1: 'Makes recognisable sounds or words about familiar things with help', e2: 'Repeats a familiar phrase about a known topic with support', e3: 'Speaks a few rehearsed sentences on a familiar topic with prompts' },
    'Voice note / reflection':       { e1: 'Indicates a familiar feeling with sound or expression, with prompts', e2: 'Names a familiar feeling using a single word with support', e3: 'Says how a familiar activity went using prompts' },
    'Oral explanation':              { e1: 'Recognises a familiar instruction and indicates understanding with prompts', e2: 'Repeats a familiar instruction with support', e3: 'Says a familiar fact or instruction in a short sentence with prompts' },
    'Audio feedback':                { e1: 'Vocalises agreement or disagreement with prompts', e2: "Indicates a familiar 'like / don't like' response with support", e3: 'Says whether something is good or not, using prompts' },
    'Storytelling / narration':      { e1: 'Recognises a familiar story and responds with prompts', e2: 'Names familiar characters or objects from a story with support', e3: 'Retells parts of a familiar story with prompts' },
    'Interview or Q&A':              { e1: 'Indicates yes or no to a familiar question with prompts', e2: 'Gives single-word answers to familiar questions with support', e3: 'Answers familiar questions in short phrases with prompts' },
    'Sound diary / log':             { e1: 'Makes a familiar sound or response on prompt', e2: 'Records a familiar sound or single word with support', e3: 'Makes short audio notes about familiar activities with prompts' },
    'Discussion or debate':          { e1: 'Indicates preference with sound, sign, or gesture, with prompts', e2: 'Names something they like or dislike with support', e3: 'States a familiar preference in a short sentence with prompts' },
    'Guided walkthrough':            { e1: 'Recognises a familiar step in an audio guide with prompts', e2: 'Says or signs one familiar step with support', e3: 'Names familiar steps of a known activity with prompts' },
    'Reading aloud + commentary':    { e1: 'Recognises and responds to a familiar word being read aloud', e2: 'Repeats a familiar word from a text with support', e3: 'Reads or repeats familiar words from a text with prompts' },
  },
  'web-interactive': {
    'Website page / mini-site':      { e1: 'Selects a familiar option in a prepared page with prompts', e2: 'Drags familiar items into place on a template with support', e3: 'Adds familiar text or images to prepared slots with guidance' },
    'Click-through presentation':    { e1: 'Recognises and points to a familiar button with prompts', e2: 'Clicks a familiar button to move to the next item, with support', e3: 'Clicks through a prepared sequence with prompts' },
    'Digital portfolio':             { e1: 'Recognises their own familiar work in a collection, with prompts', e2: 'Selects a familiar piece of work to include with support', e3: 'Adds familiar work items to a prepared portfolio with guidance' },
    'Hyperlinked infographic':       { e1: 'Recognises a familiar element on a graphic with prompts', e2: 'Clicks one familiar element to see more with support', e3: 'Hovers or clicks to reveal familiar information with prompts' },
    'Interactive quiz/resource':     { e1: 'Points to or marks a correct familiar item with prompts', e2: 'Selects a familiar option in a simple matching task with support', e3: 'Answers familiar questions by selecting from given options' },
    'App or game prototype':         { e1: 'Recognises a familiar element in a prototype with prompts', e2: 'Places one familiar item in a designated spot with support', e3: 'Arranges familiar items into a prepared layout with guidance' },
    'Online survey/form':            { e1: 'Indicates yes or no in response to familiar questions, with prompts', e2: 'Selects a single option from a familiar list with support', e3: 'Completes familiar fields using prepared options' },
    'Media-rich journal/blog':       { e1: 'Recognises their own photo in a journal with prompts', e2: 'Selects a photo from a familiar set to add to a journal with support', e3: 'Adds a photo or short note to a familiar template with prompts' },
    'AR/VR walkthrough':             { e1: 'Notices and responds to a familiar item in AR/VR with prompts', e2: 'Looks at or interacts with a familiar AR/VR item with support', e3: 'Follows a guided AR/VR experience with prompts' },
    'Interactive map/data viz':      { e1: 'Recognises a familiar location with prompts', e2: 'Identifies a familiar place or item on a simple map with support', e3: 'Points to a familiar location on a map with prompts' },
    'Collaborative board':           { e1: 'Indicates a preference on a shared board with prompts', e2: 'Selects a familiar item to post on a shared board with support', e3: 'Adds a familiar word or image to a shared board with prompts' },
  },
};

// Official CQFW level descriptors (verbatim from CQFW Level Descriptors,
// January 2009). Included as canonical reference so centres can validate
// their use of the matrix against the underlying framework.
