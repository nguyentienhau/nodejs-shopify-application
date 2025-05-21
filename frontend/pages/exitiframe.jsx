import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Banner, Box } from "@shopify/polaris";

export default function ExitIframe() {
	const shopify = useAppBridge();
	const [searchParams] = useSearchParams();
	const [showWarning, setShowWarning] = useState(false);

	useEffect(() => {
		const redirectUri = searchParams?.get("redirectUri");

		if (shopify && redirectUri) {
			const url = new URL(decodeURIComponent(redirectUri));

			if (
				[location.hostname, "admin.shopify.com"].includes(url.hostname) ||
				url.hostname.endsWith(".myshopify.com")
			) {
				window.open(url, "_top");
			} else {
				setShowWarning(true);
			}
		}
	}, [shopify, searchParams]);

	return showWarning ? (
		<Page narrowWidth>
			<Box paddingBlockStart="600">
				<Banner title="Redirecting outside of Shopify" status="warning">
					Apps can only use /exitiframe to reach Shopify or the app itself.
				</Banner>
			</Box>
		</Page>
	) : null;
}
