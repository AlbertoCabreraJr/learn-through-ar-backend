export const modules = [
  {
    _id: 1,
    title: 'Module 1',
    subtitle: 'Introduction To Programming',
    totalTopicsAndExam: 4,
    topics: [
      {
        _id: 1,
        title: 'Definition of programming',
        finished: true,
        module: {}
      },
      {
        _id: 2,
        title: 'History of programming',
        finished: true,
        module: {}
      },
      {
        _id: 3,
        title: 'How and Where a program is written',
        finished: true,
        module: {}
      }
    ],
    progress: 4,
    exam: {
      title: 'Practice Assessment',
      module: {},
      questions: [
        {
          text: 'What is programming?',
          choices: [
            {
              _id: 1,
              text: 'A process of writing instructions for a computer to execute tasks and solve problems'
            },
            {
              _id: 2,
              text: 'A way to design computer hardware'
            },
            {
              _id: 3,
              text: 'A type of software application'
            }
          ],
          correctChoice: 1
        },
        {
          text: 'Where is a program written?',
          choices: [
            {
              _id: 1,
              text: 'A text editor or integrated development environment (IDE)'
            },
            {
              _id: 2,
              text: 'A web browser'
            },
            {
              _id: 3,
              text: 'A word processing program'
            }
          ],
          correctChoice: 1
        }
      ],
      score: 0,
      finished: true
    },
    finished: true
  },
  {
    _id: 2,
    title: 'Module 2',
    subtitle: 'Data Types',
    totalTopicsAndExam: 5,
    topics: [
      {
        _id: 1,
        title: 'Data Types Introduction',
        finished: true,
        module: {}
      },
      {
        _id: 2,
        title: 'Data Types Introduction 2 ',
        finished: false,
        module: {}
      },
      {
        _id: 3,
        title: 'Data Types Introduction 3',
        finished: false,
        module: {}
      },
      {
        _id: 4,
        title: 'Data Types Introduction 4',
        finished: false,
        module: {}
      }
    ],
    progress: 1,
    exam: {
      title: 'Practice Assessment',
      module: {},
      questions: [
        {
          text: 'What is the appropriate data type to use for a person’s address?',
          choices: [
            {
              _id: 1,
              text: 'String'
            },
            {
              _id: 2,
              text: 'Integer'
            },
            {
              _id: 3,
              text: 'Float'
            },
            {
              _id: 4,
              text: 'Boolean'
            }
          ],
          correctChoice: 1
        },
        {
          text: 'What is the appropriate data type to use for a laptop price?',
          choices: [
            {
              _id: 1,
              text: 'String'
            },
            {
              _id: 2,
              text: 'Integer'
            },
            {
              _id: 3,
              text: 'Float'
            },
            {
              _id: 4,
              text: 'Boolean'
            }
          ],
          correctChoice: 3
        }
      ],
      score: 0,
      finished: false
    },
    finished: false
  },
  {
    _id: 3,
    title: 'Module 3',
    subtitle: 'Variables',
    totalTopicsAndExam: 2,
    topics: [
      {
        _id: 1,
        title: 'Variables Introduction',
        finished: false,
        module: {}
      }
    ],
    progress: 0,
    exam: {
      title: 'Practice Assessment',
      module: {},
      questions: [
        {
          text: "What's a variable in programming? Think of it like a…",
          choices: [
            {
              _id: 1,
              text: 'Calculator'
            },
            {
              _id: 2,
              text: 'Box that holds stuff'
            },
            {
              _id: 3,
              text: 'Robot'
            },
            {
              _id: 4,
              text: 'Library book'
            }
          ],
          correctChoice: 2
        },
        {
          text: 'How can you change the value of a variable in a program?',
          choices: [
            {
              _id: 1,
              text: 'By asking it nicely'
            },
            {
              _id: 2,
              text: 'By giving it a new value'
            },
            {
              _id: 3,
              text: 'By clapping your hands'
            },
            {
              _id: 4,
              text: 'By telling it a secret'
            }
          ],
          correctChoice: 2
        }
      ],
      score: 0,
      finished: false
    },
    finished: false
  }
]

export const course = {
  _id: '001',
  user: 'aacabrera2@up.edu.ph',
  name: 'Programming Fundamentals',
  modules: [
    {
      _id: 1,
      title: 'Module 1',
      subtitle: 'Introduction To Programming',
      totalTopicsAndExam: 4,
      topics: [
        {
          _id: 1,
          title: 'Definition of programming',
          finished: true,
          module: {}
        },
        {
          _id: 2,
          title: 'History of programming',
          finished: true,
          module: {}
        },
        {
          _id: 3,
          title: 'How and Where a program is written',
          finished: true,
          module: {}
        }
      ],
      progress: 4,
      exam: {
        title: 'Practice Assessment',
        module: {},
        questions: [
          {
            text: 'What is programming?',
            choices: [
              {
                _id: 1,
                text: 'A process of writing instructions for a computer to execute tasks and solve problems'
              },
              {
                _id: 2,
                text: 'A way to design computer hardware'
              },
              {
                _id: 3,
                text: 'A type of software application'
              }
            ],
            correctChoice: 1
          },
          {
            text: 'Where is a program written?',
            choices: [
              {
                _id: 1,
                text: 'A text editor or integrated development environment (IDE)'
              },
              {
                _id: 2,
                text: 'A web browser'
              },
              {
                _id: 3,
                text: 'A word processing program'
              }
            ],
            correctChoice: 1
          }
        ],
        score: 0,
        finished: true
      },
      finished: true
    },
    {
      _id: 2,
      title: 'Module 2',
      subtitle: 'Data Types',
      totalTopicsAndExam: 5,
      topics: [
        {
          _id: 1,
          title: 'Data Types Introduction',
          finished: false,
          module: {}
        }
      ],
      progress: 1,
      exam: {
        title: 'Practice Assessment',
        module: {},
        questions: [
          {
            text: 'What is the appropriate data type to use for a person’s address?',
            choices: [
              {
                _id: 1,
                text: 'String'
              },
              {
                _id: 2,
                text: 'Integer'
              },
              {
                _id: 3,
                text: 'Float'
              },
              {
                _id: 4,
                text: 'Boolean'
              }
            ],
            correctChoice: 1
          },
          {
            text: 'What is the appropriate data type to use for a laptop price?',
            choices: [
              {
                _id: 1,
                text: 'String'
              },
              {
                _id: 2,
                text: 'Integer'
              },
              {
                _id: 3,
                text: 'Float'
              },
              {
                _id: 4,
                text: 'Boolean'
              }
            ],
            correctChoice: 3
          }
        ],
        score: 0,
        finished: false
      },
      finished: false
    },
    {
      _id: 3,
      title: 'Module 3',
      subtitle: 'Variables',
      totalTopicsAndExam: 2,
      topics: [
        {
          _id: 1,
          title: 'Variables Introduction',
          finished: false,
          module: {}
        }
      ],
      progress: 0,
      exam: {
        title: 'Practice Assessment',
        module: {},
        questions: [
          {
            text: "What's a variable in programming? Think of it like a…",
            choices: [
              {
                _id: 1,
                text: 'Calculator'
              },
              {
                _id: 2,
                text: 'Box that holds stuff'
              },
              {
                _id: 3,
                text: 'Robot'
              },
              {
                _id: 4,
                text: 'Library book'
              }
            ],
            correctChoice: 2
          },
          {
            text: 'How can you change the value of a variable in a program?',
            choices: [
              {
                _id: 1,
                text: 'By asking it nicely'
              },
              {
                _id: 2,
                text: 'By giving it a new value'
              },
              {
                _id: 3,
                text: 'By clapping your hands'
              },
              {
                _id: 4,
                text: 'By telling it a secret'
              }
            ],
            correctChoice: 2
          }
        ],
        score: 0,
        finished: false
      },
      finished: false
    }
  ],

  currentModule: 2,
  currentTopic: 2,
  finishedModules: [1],
  finishedTopics: [1]
}

export const user = {
  name: 'Alberto Cabrera',
  email: 'aacabrera@up.edu.ph',
  course: '001'
}
