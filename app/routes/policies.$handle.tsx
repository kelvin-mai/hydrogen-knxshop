import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { type Shop } from '@shopify/hydrogen/storefront-api-types';

import { POLICY_CONTENT_QUERY } from '~/graphql/storefront/policy';
import { PageLayout, RawHtml } from '~/components/common';

type SelectedPolicies = keyof Pick<
  Shop,
  'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
>;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.policy.title ?? ''}` }];
};

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  if (!params.handle) {
    throw new Response('No handle was passed in', { status: 404 });
  }

  const policyName = params.handle.replace(
    /-([a-z])/g,
    (_: unknown, m1: string) => m1.toUpperCase(),
  ) as SelectedPolicies;

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', { status: 404 });
  }

  return json({ policy });
};

export default function Policy() {
  const { policy } = useLoaderData<typeof loader>();

  return (
    <PageLayout title={policy.title}>
      <RawHtml html={policy.body} />
    </PageLayout>
  );
}
