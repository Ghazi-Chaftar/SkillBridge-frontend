export const clientExludedRoutes: string[] = [
  '/client/login',
  '/client/first-login',
  '/client/verify-email',
  '/client/create-announcement',
  '/client/forget-password'
]

export const architectExludedRoutes: string[] = [
  '/architect/login',
  '/architect/first-login',
  '/architect/create-account',
  '/architect/forget-password',
  '/architect-space/subscriptions',
  '/architect-space/payment'
]

export const authRoutes = [
  '/client-space/*',
  '/architect-space/*',
  '/supplier-space/*',
  '/office-space/*',
  '/admin-space/*'
]
export const visitorRoutes = [
  '/client/*',
  '/architect/*',
  '/supplier/*',
  '/office/*',
  '/admin/*'
]

export const officeExludedRoutes: string[] = [
  '/office/create-account',
  '/office/login/first-login-email',
  '/office/login/simple-login-form',
  '/login/first-login-password',
  '/office-space/first-connection',
  '/office-space/subscriptions',
  'office-space/payment'
]
export const officeStepperExludedRoutes: string[] = [
  '/office-space/offer-publication'
]
export const officeFooterExcludesRoutes: string[] = ['/office-space/candidacy']

export const officeFooterExludedRoutes: string[] = [
  '/office-space/offer-publication',
  '/office-space/candidacy',
  '/office-space/offer-management',
  '/office-space/profile-management',
  '/office-space/profile-detail',
  '/office-space/architect-detail'
]

export const quoteExludedRoutes: string[] = [
  '/architect-space/quote/generate-quote'
]

export const supplierQuoteExludedRoutes: string[] = [
  '/supplier-space/quote/generate-quote'
]

export const quoteExludedRoutesByID: string[] = [
  '/architect-space/quote/details'
]

export const supplierQuoteExludedRoutesByID: string[] = [
  '/supplier-space/quote/details'
]

export const InvoiceExludedRoutesByID: string[] = [
  '/architect-space/quote/invoice/details'
]

export const supplierInvoiceExludedRoutesByID: string[] = [
  '/supplier-space/quote/invoice/details'
]

export const NewInvoiceExludedRoutesByID: string[] = [
  '/architect-space/quote/invoice/generate-invoice'
]

export const supplierNewInvoiceExludedRoutesByID: string[] = [
  '/supplier-space/quote/invoice/generate-invoice'
]
type StepperVariableSizes = {
  sm: string
  md: string
  lg: string
}

export const STEPPER_VARIABLE_SIZES: StepperVariableSizes = {
  sm: '36px',
  md: '40px',
  lg: '44px'
}
