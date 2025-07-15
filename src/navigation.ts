'use client'
import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation'

import { locales } from '@/locales'

export const localePrefix = 'always'
const architectProfileRoutes = {
  '/architect-space/profile/achievements':
    '/architect-space/profile/achievements',
  '/architect-space/profile/about': '/architect-space/profile/about',
  '/architect-space/profile/services': '/architect-space/profile/services',
  '/architect-space/profile/customer-reviews':
    '/architect-space/profile/customer-reviews'
}
const architectSettingsRoutes = {
  '/architect-space/settings/informations':
    '/architect-space/settings/informations',
  '/architect-space/settings/companyInformation':
    '/architect-space/settings/companyInformation',
  '/architect-space/settings/services': '/architect-space/settings/services',
  '/architect-space/settings/preferences':
    '/architect-space/settings/preferences',
  '/architect-space/settings/password': '/architect-space/settings/password',
  '/architect-space/settings/tokenWallet':
    '/architect-space/settings/tokenWallet',
  '/architect-space/settings/subscriptionManagement':
    '/architect-space/settings/subscriptionManagement',
  '/architect-space/settings/billing': '/architect-space/settings/billing',
  '/architect-space/settings/bankAccount':
    '/architect-space/settings/bankAccount',
  '/architect-space/settings/userGuide': '/architect-space/settings/userGuide',
  '/architect-space/settings/inviteFriends':
    '/architect-space/settings/inviteFriends',
  '/architect-space/selections/ongoing': '/architect-space/selections/ongoing',
  '/architect-space/settings/skills': '/architect-space/settings/skills'
}
const architectPathnames = {
  '/architect': '/architect',
  '/architect/login': '/architect/login',
  '/architect/forget-password': '/architect/forget-password',
  '/architect/create-account': '/architect/create-account',
  '/architect-space': '/architect-space',
  '/architect-space/projects': '/architect-space/projects',
  '/architect-space/achievements': '/architect-space/achievements',
  '/architect-space/suppliers': '/architect-space/suppliers',
  '/architect-space/pricing': '/architect-space/pricing',
  'architect-space/projects/profile/': 'architect-space/projects/profile/',
  'architect-space/projects/profile/:id':
    'architect-space/projects/profile/:id',
  '/architect-space/quote': '/architect-space/quote',
  '/architect-space/quote/invoice': '/architect-space/quote/invoice',
  '/architect-space/quote/payment-tracking':
    '/architect-space/quote/payment-tracking',
  '/architect-space/selections/new-project':
    '/architect-space/selections/new-project',
  '/architect-space/quote/libraries': '/architect-space/quote/libraries',
  '/architect-space/quote/quote-template':
    '/architect-space/quote/quote-template',
  '/architect-space/quote/article-template':
    '/architect-space/quote/article-template',
  '/architect-space/quote/contacts': '/architect-space/quote/contacts',
  '/architect-space/quote/quote-template/head':
    '/architect-space/quote/quote-template/head',
  '/architect-space/quote/quote-template/footer':
    '/architect-space/quote/quote-template/footer',
  '/architect-space/quote/generate-quote':
    '/architect-space/quote/generate-quote',
  '/architect-space/quote/new-project': '/architect-space/quote/new-project',
  '/architect-space/quote/invoice/generate-invoice':
    '/architect-space/quote/invoice/generate-invoice',
  '/architect-space/suppliers/quote-requests':
    '/architect-space/suppliers/quote-requests',
  '/architect-space/suppliers/products-list':
    '/architect-space/suppliers/products-list',
  ...architectProfileRoutes
}
const clientPathnames = {
  '/client': '/client',
  '/client/login': '/client/login',
  '/client/login/phone': '/client/login/phone',
  '/client/login/email': '/client/login/email',
  '/client/home': '/client/home',
  '/client/projects': '/client/projects',
  '/client/about': '/client/about',
  '/client/contact': '/client/contact',
  '/client/forget-password': '/client/forget-password',
  '/client/createannouncemenet-success': '/client/createannouncemenet-success',
  '/client/create-announcement': '/client/create-announcement',
  '/client/ourSuppliers': '/client/ourSuppliers',
  '/client/inspirations': '/client/inspirations',
  '/client-space': '/client-space',
  '/client-space/profile': '/client-space/profile',
  '/client-space/profile/informations': '/client-space/profile/informations',
  '/client-space/profile/notification': '/client-space/profile/notification',
  '/client-space/profile/password': '/client-space/profile/password',
  '/client-space/projects': '/client-space/projects',
  '/client-space/projects/:id': '/client-space/projects/:id',
  '/client-space/achievements': '/client-space/achievements',
  '/client/help-center': '/client/help-center',
  '/client/help-center/guide': '/client/help-center/guide',
  '/client/help-center/guide/thematic': '/client/help-center/guide/thematic',
  '/client/help-center/guide/thematic/article':
    '/client/help-center/guide/thematic/article',
  '/client-space/create-announcement': '/client-space/create-announcement',
  '/client/help-center/cgvcgu': '/client/help-center/cgv-cgu',
  '/client/help-center/faq': '/client/help-center/faq',
  '/client/Inspirations': '/client/Inspirations'
}
const supplierPathnames = {
  '/supplier': '/supplier',
  '/supplier/login/simple-login-form': '/supplier/login/simple-login-form',
  '/supplier/login/first-login-email': '/supplier/login/first-login-email',
  '/supplier/login/first-login-password':
    '/supplier/login/first-login-password',
  '/supplier/login/forget-password': '/supplier/login/forget-password'
}

const supplierSpacePathnames = {
  '/supplier-space/first-connection': '/supplier-space/first-connection',
  '/supplier-space/profile-management': '/supplier-space/profile-management',
  '/supplier-space/profile-management/profile':
    '/supplier-space/profile-management/profile',
  '/supplier-space/profile-management/general':
    '/supplier-space/profile-management/general',
  '/supplier-space/profile-management/social-links':
    '/supplier-space/profile-management/social-links',
  '/supplier-space/profile-management/security':
    '/supplier-space/profile-management/security',
  '/supplier-space/profile-management/subscription':
    '/supplier-space/profile-management/subscription',
  '/supplier-space': '/supplier-space',
  '/supplier-space/catalog-management': '/supplier-space/catalog-management',
  '/supplier-space/add-product': '/supplier-space/add-product',
  '/supplier-space/profile-catalog': '/supplier-space/profile-catalog',
  '/supplier-space/catalog-management?tab=product':
    '/supplier-space/catalog-management?tab=product',
  '/supplier-space/quote': '/supplier-space/quote',
  '/supplier-space/quote/generate-quote':
    '/supplier-space/quote/generate-quote',
  '/supplier-space/quote/quote-template':
    '/supplier-space/quote/quote-template',
  '/supplier-space/quote/quote-template/head':
    '/supplier-space/quote/quote-template/head',
  '/supplier-space/quote/payment-tracking':
    '/supplier-space/quote/payment-tracking'
}
const adminSpacePathnames = {
  '/admin-space': '/admin-space',
  '/admin-space/architect-requests': '/admin-space/architect-requests',
  '/admin-space/dashboard': '/admin-space/dashboard',
  '/admin-space/meets': '/admin-space/meets',
  '/admin-space/meets/events': '/admin-space/meets/events',
  '/admin-space/meets/events/new': '/admin-space/meets/events/new',
  '/admin-space/architect-profile': '/admin-space/architect-profile',
  '/admin-space/dashboard/statistics/architect':
    '/admin-space/dashboard/statistics/architect',
  '/admin-space/subscribes': '/admin-space/subscribes',
  '/admin-space/meets/schedule': '/admin-space/meets/schedule',
  '/admin-space/subscribes/subscribe-plan':
    '/admin-space/subscribes/subscribe-plan',
  '/admin-space/subscribes/token-pack': '/admin-space/subscribes/token-pack',
  '/admin-space/subscribes/booster-pack':
    '/admin-space/subscribes/booster-pack',
  '/admin-space/announcements': '/admin-space/announcements',
  '/admin-space/follow-up': '/admin-space/follow-up',
  '/admin-space/follow-up/selection': '/admin-space/follow-up/selection',
  '/admin-space/follow-up/selection/settings':
    '/admin-space/follow-up/selection/settings',
  '/admin-space/follow-up/contact': '/admin-space/follow-up/contact',
  '/admin-space/follow-up/contact/settings':
    '/admin-space/follow-up/contact/settings',
  '/admin-space/follow-up/quote': '/admin-space/follow-up/quote',
  '/admin-space/follow-up/quote/settings':
    '/admin-space/follow-up/quote/settings',
  '/admin-space/reporting': '/admin-space/reporting',

  '/admin-space/payment': '/admin-space/payment',
  '/admin-space/blogs': '/admin-space/blogs',
  '/admin-space/invitations': '/admin-space/invitations',
  '/admin-space/access': '/admin-space/access',
  '/admin-space/cms': '/admin-space/cms',
  '/admin-space/cms/FAQ': '/admin-space/cms/FAQ',
  '/admin-space/blogs/blogs-management/blogs-list':
    '/admin-space/blogs/blogs-management/blogs-list',
  '/admin-space/blogs/blogs-management/add-blog':
    '/admin-space/blogs/blogs-management/add-blog',
  '/admin-space/blogs/blogs-management/blogs-categories-list':
    '/admin-space/blogs/blogs-management/blogs-categories-list',
  '/admin-space/cms/cmsChoices': '/admin-space/cms/cmsChoices',
  '/admin-space/cms/cmsChoices/guide': '/admin-space/cms/cmsChoices/guide',
  '/admin-space/supplier-requests': '/admin-space/supplier-requests',
  '/admin-space/customer-support': '/admin-space/customer-support',
  '/admin-space/office-requests': '/admin-space/office-requests',
  '/admin-space/cms/messages': '/admin-space/cms/messages',
  '/admin-space/cms/messages/questionResponse':
    '/admin-space/cms/messages/questionResponse',
  '/admin-space/cms/FAQ/QuestionResponse':
    '/admin-space/cms/FAQ/QuestionResponse',
  '/admin-space/cms/policies': '/admin-space/cms/policies',
  '/admin-space/cms/policies/privacyPolicy':
    '/admin-space/cms/policies/privacyPolicy',
  '/admin-space/subscribes/discount': '/admin-space/subscribes/discount',
  '/admin-space/subscribes/supplier-subscription-plans':
    '/admin-space/subscribes/supplier-subscription-plans',
  '/admin-space/cms/policies/cgu-cgv': '/admin-space/cms/policies/cgu-cgv',
  '/admin-space/cms/policies/cookies': '/admin-space/cms/policies/cookies',
  '/admin-space/reporting/candidate-reports':
    '/admin-space/reporting/candidate-reports'
}
const adminPathnames = {
  '/admin': '/admin',

  '/admin-space/reporting/client-review-reports':
    '/admin-space/reporting/client-review-reports',
  '/admin-space/reporting/client-reports':
    '/admin-space/reporting/client-reports',
  '/admin-space/reporting/architect-reports':
    '/admin-space/reporting/architect-reports',
  '/admin-space/reporting/architect-reports/architect-reports-detail':
    '/admin-space/reporting/architect-reports/architect-reports-detail',
  '/admin-space/follow-up/unlocking-request':
    '/admin-space/follow-up/unlocking-request',
  '/admin-space/follow-up/selection-reports':
    '/admin-space/follow-up/selection-reports',
  '/admin-space/announcements/settings': '/admin-space/announcements/settings'
}

const officePathnames = {
  '/office': '/office',
  '/office-space': '/office-space',
  '/office/create-account': '/office/create-account',
  '/office/login/first-login-email': '/office/login/first-login-email',
  '/office/login/simple-login': '/office/login/simple-login',
  '/office/login/forget-password': '/office/login/forget-password',
  '/office-space/first-connexion': '/office-space/first-connexion',
  '/office-space/subscriptions': '/office-space/subscriptions',
  '/office-space/profile-management/profile':
    '/office-space/profile-management/profile',
  '/office-space/profile-management/social-links':
    '/office-space/profile-management/social-links',
  '/office-space/profile-management/billing':
    '/office-space/profile-management/billing',
  '/office-space/offer-management': '/office-space/offer-management',
  '/office-space/offer-publication': '/office-space/offer-publication',
  '/office-space/profile-detail': '/office-space/profile-detail',
  '/office-space/profile-management/appointment':
    '/office-space/profile-management/appointment'
}

export const pathnames = {
  '/': '/',
  '/about': '/about',

  ...clientPathnames,
  ...architectPathnames,
  ...supplierPathnames,
  ...supplierSpacePathnames,
  ...adminPathnames,
  ...adminSpacePathnames,
  ...architectSettingsRoutes,
  ...officePathnames
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })
