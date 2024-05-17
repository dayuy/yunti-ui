import { PageBreadcrumb } from './Breadcrumb';
import { PageContent } from './Content';
import { PageFooter } from './Footer';
import { PageHeader } from './Header';
import { Page as InternalPage } from './Page';

export type { PageBreadcrumbProps } from './Breadcrumb';
export type { PageContentProps } from './Content';
export { HeaderButtonGroup } from './Header/ButtonGroup';
// export type { } from './Footer';
export type { PageHeaderProps } from './Header';
export type { HeaderButtonGroupProps } from './Header/ButtonGroup';
export type { PageProps } from './Page';

export const Page = InternalPage as typeof InternalPage & {
  Breadcrumb: typeof PageBreadcrumb;
  Header: typeof PageHeader;
  Content: typeof PageContent;
  Footer: typeof PageFooter;
};
Page.Breadcrumb = PageBreadcrumb;
Page.Header = PageHeader;
Page.Content = PageContent;
Page.Footer = PageFooter;