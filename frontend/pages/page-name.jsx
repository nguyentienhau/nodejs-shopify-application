import { useTranslation } from "react-i18next";
import { TitleBar } from "@shopify/app-bridge-react";
import { Card, Page, Text } from "@shopify/polaris";

export default function PageName() {
	const { t } = useTranslation();
	return (
		<Page>
			<TitleBar title={t("PageName.title")}>
				{/* eslint-disable-next-line react/no-unknown-property */}
				<button variant="primary" onClick={() => {}}>
					{t("PageName.primaryAction")}
				</button>
				<button onClick={() => {}}>{t("PageName.secondaryAction")}</button>
			</TitleBar>
			<Card sectioned>
				<Text variant="headingMd" as="h2">
					{t("PageName.heading")}
				</Text>
				<p>{t("PageName.body")}</p>
			</Card>
		</Page>
	);
}
