import { useTranslation, Trans } from "react-i18next";
import { TitleBar } from "@shopify/app-bridge-react";
import { Card, Page, Image, InlineStack, Link, Text } from "@shopify/polaris";
import { HomeTrophyImage } from "@frontend/images";

export default function HomePage() {
	const { t } = useTranslation();
	return (
		<Page narrowWidth>
			<TitleBar title={t("HomePage.title")} />
			<Card>
				<InlineStack wrap={false} gap="400">
					<InlineStack>
						<Text as="h2" variant="headingMd">
							{t("HomePage.heading")}
						</Text>
						<Trans
							i18nKey="HomePage.yourAppIsReadyToExplore"
							components={{
								PolarisLink: <Link url="https://polaris.shopify.com/" external />,
								AdminApiLink: <Link url="https://shopify.dev/api/admin-graphql" external />,
								AppBridgeLink: <Link url="https://shopify.dev/apps/tools/app-bridge" external />
							}}
						/>
					</InlineStack>
					<InlineStack>
						<Image source={HomeTrophyImage} alt={t("HomePage.trophyAltText")} width={120} />
					</InlineStack>
				</InlineStack>
			</Card>
		</Page>
	);
}
