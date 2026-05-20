// Official CQFW level descriptors (verbatim from CQFW Level Descriptors,
// January 2009). Included as canonical reference so centres can validate
// their use of the matrix against the underlying framework.
export const CQFW_DESCRIPTORS = [
  {
    level: 'Entry 1',
    summary: 'Recognises progress along a continuum that ranges from the most elementary of achievements to beginning to make use of skills, knowledge, or understanding that relate to the immediate environment.',
    ku: null, aa: null, au: null,
  },
  {
    level: 'Entry 2',
    summary: 'Reflects the ability to make use of skills, knowledge and understanding to carry out simple, familiar tasks and activities with guidance.',
    ku: 'Use knowledge or understanding to carry out simple, familiar activities. Know the steps needed to complete simple activities.',
    aa: 'Carry out simple, familiar tasks and activities. Follow instructions or use rehearsed steps to complete tasks and activities.',
    au: 'With appropriate guidance, begin to take some responsibility for the outcomes of simple activities. Actively participate in simple and familiar activities.',
  },
  {
    level: 'Entry 3',
    summary: 'Reflects the ability to make use of skills, structured tasks, knowledge and understanding to carry out structured tasks and activities in familiar contexts, with appropriate guidance where needed.',
    ku: 'Use knowledge or understanding to carry out structured tasks and activities in familiar contexts. Know and understand the steps needed to complete structured tasks and activities in familiar contexts.',
    aa: 'Carry out structured tasks and activities in familiar contexts. Be aware of the consequences of actions for self and others.',
    au: 'With appropriate guidance, take responsibility for the outcomes of structured activities. Actively participate in activities in familiar contexts.',
  },
  {
    level: 'Level 1',
    summary: 'Reflects the ability to use relevant knowledge, skills and procedures to complete routine tasks. Includes responsibility for completing tasks and procedures subject to direction or guidance.',
    ku: 'Use knowledge of facts, procedures and ideas to complete well-defined, routine tasks. Be aware of information relevant to the area of study or work.',
    aa: 'Complete well-defined, routine tasks. Use relevant skills and procedures. Select and use relevant information. Identify whether actions have been effective.',
    au: 'Take responsibility for completing tasks and procedures subject to direction or guidance as needed.',
  },
  {
    level: 'Level 2',
    summary: 'Reflects the ability to select and use relevant knowledge, ideas, skills and procedures to complete well-defined tasks and address straightforward problems. Includes taking responsibility for completing tasks and procedures and exercising autonomy and judgement subject to overall direction or guidance.',
    ku: 'Use understanding of facts, procedures and ideas to complete well-defined tasks and address straightforward problems. Interpret relevant information and ideas. Be aware of the types of information that are relevant to the area of study or work.',
    aa: 'Complete well-defined, generally routine tasks and address straightforward problems. Select and use relevant skills and procedures. Identify, gather and use relevant information to inform actions. Identify how effective actions have been.',
    au: 'Take responsibility for completing tasks and procedures. Exercise autonomy and judgement subject to overall direction or guidance.',
  },
  {
    level: 'Level 3',
    summary: 'Reflects the ability to identify and use relevant understanding, methods and skills to complete tasks and address problems that, while well-defined, have a measure of complexity. Includes taking responsibility for initiating and completing tasks and procedures as well as exercising autonomy and judgement within limited parameters. Also reflects awareness of different perspectives or approaches within an area of study or work.',
    ku: 'Use factual, procedural and theoretical understanding to complete tasks and address problems that, while well defined, may be complex and non-routine. Interpret and evaluate relevant information and ideas. Be aware of the nature of the area of study or work. Have awareness of different perspectives or approaches within the area of study or work.',
    aa: 'Address problems that, while well-defined, may be complex and non-routine. Identify, select and use appropriate skills, methods and procedures. Use appropriate investigation to inform actions. Review how effective methods and actions have been.',
    au: 'Take responsibility for initiating and completing tasks and procedures, including where relevant, responsibility for supervising or guiding others. Exercise autonomy and judgement within limited parameters.',
  },
];

// Helper to fetch the Entry-level descriptor for a given evidence type
