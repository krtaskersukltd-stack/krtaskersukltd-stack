import type { StructureResolver } from 'sanity/structure'
import { Icon } from '@sanity/icons'
import React from 'react'

const BoltIcon = () => React.createElement(Icon, { symbol: 'bolt' })
const BlogIcon = () => React.createElement(Icon, { symbol: 'document-text' })
const CaseIcon = () => React.createElement(Icon, { symbol: 'case' })
const UserIcon = () => React.createElement(Icon, { symbol: 'user' })
const PageIcon = () => React.createElement(Icon, { symbol: 'documents' })
const SettingsIcon = () => React.createElement(Icon, { symbol: 'cog' })
const NavIcon = () => React.createElement(Icon, { symbol: 'menu' })

export const structure: StructureResolver = (S) =>
  S.list()
    .title('KR Tasker CMS')
    .items([
      S.listItem()
        .title('Services')
        .icon(BoltIcon)
        .child(
          S.documentList()
            .title('All Services')
            .filter('_type == "service"')
        ),

      S.listItem()
        .title('Blog Articles')
        .icon(BlogIcon)
        .child(
          S.documentList()
            .title('All Blog Posts')
            .filter('_type == "post"')
        ),

      S.listItem()
        .title('Case Studies & Portfolio')
        .icon(CaseIcon)
        .child(
          S.documentList()
            .title('All Case Studies')
            .filter('_type == "caseStudy"')
        ),

      S.listItem()
        .title('Team Members')
        .icon(UserIcon)
        .child(
          S.documentList()
            .title('Team Members')
            .filter('_type == "teamMember"')
        ),

      S.listItem()
        .title('Pages & Content')
        .icon(PageIcon)
        .child(
          S.documentList()
            .title('All Custom Pages')
            .filter('_type == "page"')
        ),

      S.divider(),

      S.listItem()
        .title('Site Settings & Global')
        .icon(SettingsIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.listItem()
        .title('Navigation Menu')
        .icon(NavIcon)
        .child(
          S.documentList()
            .title('Navigation Links')
            .filter('_type == "navigation"')
        ),
    ])
