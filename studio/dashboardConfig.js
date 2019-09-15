export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5d7ebf2e30bb95e8beea05fa',
                  title: 'Sanity Studio',
                  name: 'kpow-space-studio',
                  apiId: '4b1b7088-2d4b-455f-82db-c46a0ab41028'
                },
                {
                  buildHookId: '5d7ebf2ef1e17bd0b241abc2',
                  title: 'Portfolio Website',
                  name: 'kpow-space',
                  apiId: '4ae59242-b668-4b00-8bb5-ae9664540998'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/kpow/kpow-space',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://kpow-space.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
