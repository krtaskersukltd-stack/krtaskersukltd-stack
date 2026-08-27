import type { SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { postType } from './post'
import { caseStudyType } from './caseStudy'
import { teamMemberType } from './teamMember'
import { pageType } from './page'
import { settingsType } from './settings'
import { navigationType } from './navigation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    serviceType,
    postType,
    caseStudyType,
    teamMemberType,
    pageType,
    settingsType,
    navigationType,
  ],
}
